import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StarRatingProps {
  rating: number
  count?: number
  size?: 'sm' | 'md'
  className?: string
}

export function StarRating({ rating, count, size = 'sm', className }: StarRatingProps) {
  const starSize = size === 'sm' ? 12 : 16

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={starSize}
            className={star <= Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-zinc-600'}
          />
        ))}
      </div>
      {count !== undefined && (
        <span className="text-xs text-zinc-400">({count.toLocaleString()})</span>
      )}
    </div>
  )
}
