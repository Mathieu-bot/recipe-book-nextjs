import Image from 'next/image'
import type { RecipeWithFavorite } from '@/types/recipe'
import styles from './RecipeCard.module.css'

interface RecipeCardProps {
  recipe: RecipeWithFavorite
  onToggleFavorite: (id: string) => void
  priority?: boolean
}

export default function RecipeCard({ recipe, onToggleFavorite, priority = false }: RecipeCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={recipe.image}
          alt={`Photo of ${recipe.name}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={styles.image}
          priority={priority}
        />
      </div>
      <div className={styles.body}>
        <h2 className={styles.name}>{recipe.name}</h2>
        <div className={styles.meta}>
          <span className={styles.badge}>{recipe.category}</span>
          <span className={styles.duration}>{recipe.duration} min</span>
        </div>
        <button
          type="button"
          className={`${styles.favoriteBtn} ${recipe.isFavorite ? styles.favoriteActive : ''}`}
          onClick={() => onToggleFavorite(recipe.id)}
          aria-pressed={recipe.isFavorite}
        >
          <span className={styles.heartIcon} aria-hidden="true">
            {recipe.isFavorite ? '♥' : '♡'}
          </span>
          {recipe.isFavorite ? 'Remove favorite' : 'Add favorite'}
        </button>
      </div>
    </article>
  )
}