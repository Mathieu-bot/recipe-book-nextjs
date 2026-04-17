'use client'

import { useState, useEffect, useMemo } from 'react'
import recipesData from '@/data/recipes'
import type { Recipe, RecipeWithFavorite } from '@/types/recipe'
import RecipeList from '@/components/RecipeList/RecipeList'
import SearchBar from '@/components/SearchBar/SearchBar'
import styles from './page.module.css'

const recipes: Recipe[] = recipesData as Recipe[]

export default function Home() {
  const [sortAscending, setSortAscending] = useState(true)
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [favoriteIds, setFavoriteIds] = useState<string[]>([])
  const [isHydrated, setIsHydrated] = useState(false)

  // Only run on client after hydration
  useEffect(() => {
    setIsHydrated(true)
    try {
      const raw = localStorage.getItem('favoriteRecipeIds')
      if (raw) {
        const parsed = JSON.parse(raw)
        setFavoriteIds(Array.isArray(parsed) ? parsed : [])
      }
    } catch {
      // ignore parse errors
    }
  }, [])

  useEffect(() => {
    if (!isHydrated) return
    try {
      localStorage.setItem('favoriteRecipeIds', JSON.stringify(favoriteIds))
    } catch {
      // ignore write errors (private mode / quota)
    }
  }, [favoriteIds, isHydrated])

  const recipesWithFavorites: RecipeWithFavorite[] = useMemo(() => {
    return recipes.map((recipe) => ({
      ...recipe,
      isFavorite: favoriteIds.includes(recipe.id),
    }))
  }, [favoriteIds])

  const sortedRecipes = sortAscending
    ? recipesWithFavorites
    : [...recipesWithFavorites].reverse()

  const visibleRecipes = sortedRecipes.filter((recipe) => {
    const matchesSearch = !searchTerm.trim() ||
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFavorite = !showFavoritesOnly || recipe.isFavorite
    return matchesSearch && matchesFavorite
  })

  function handleToggleFavorite(recipeId: string) {
    setFavoriteIds((prev) =>
      prev.includes(recipeId)
        ? prev.filter((id) => id !== recipeId)
        : [...prev, recipeId]
    )
  }

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerRow}>
          <h1 className={styles.title}>Recipe Book</h1>
          <div className={styles.controls}>
            <button
              type="button"
              className={`${styles.toggle} ${showFavoritesOnly ? styles.active : ''}`}
              onClick={() => setShowFavoritesOnly((prev) => !prev)}
              aria-pressed={showFavoritesOnly}
            >
              {showFavoritesOnly ? 'Show all' : 'Favorites only'}
            </button>
            <button
              type="button"
              className={styles.toggle}
              onClick={() => setSortAscending((prev) => !prev)}
            >
              {sortAscending ? 'A → Z' : 'Z → A'}
            </button>
          </div>
        </div>
      </header>
      <main className={styles.main}>
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <RecipeList
          recipes={visibleRecipes}
          onToggleFavorite={handleToggleFavorite}
        />
      </main>
    </div>
  )
}