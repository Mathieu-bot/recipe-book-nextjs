import Image from 'next/image'
import type { RecipeWithFavorite } from '@/types/recipe'
import styles from './RecipeCard.module.css'

interface RecipeCardProps {
  recipe: RecipeWithFavorite
  onToggleFavorite: (id: string) => void
}

export default function RecipeCard({ recipe, onToggleFavorite }: RecipeCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={recipe.image}
          alt={`Photo of ${recipe.name}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={styles.image}
        />
      </div>
      <div className={styles.body}>
        <h2 className={styles.name}>{recipe.name}</h2>
        <span className={styles.badge}>{recipe.category}</span>
        <p className={styles.duration}>{recipe.duration} min</p>
        <button
          type="button"
          className={styles.favoriteBtn}
          onClick={() => onToggleFavorite(recipe.id)}
          aria-pressed={recipe.isFavorite}
        >
          {recipe.isFavorite ? 'Remove favorite' : 'Add favorite'}
        </button>
      </div>
    </article>
  )
}