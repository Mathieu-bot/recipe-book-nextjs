import RecipeCard from '../RecipeCard/RecipeCard'
import type { RecipeWithFavorite } from '@/types/recipe'
import styles from './RecipeList.module.css'

interface RecipeListProps {
  recipes: RecipeWithFavorite[]
  onToggleFavorite: (id: string) => void
}

export default function RecipeList({ recipes, onToggleFavorite }: RecipeListProps) {
  if (recipes.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No recipes found.</p>
      </div>
    )
  }

  return (
    <ul className={styles.list}>
      {recipes.map((recipe, index) => (
        <li key={recipe.id} className={styles.item}>
          <RecipeCard
            recipe={recipe}
            onToggleFavorite={onToggleFavorite}
            priority={index < 3}
          />
        </li>
      ))}
    </ul>
  )
}