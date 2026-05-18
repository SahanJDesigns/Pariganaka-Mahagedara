import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'sale' | 'new' | 'hot' | 'default'
  className?: string
}

const variants = {
  sale: 'bg-red-500 text-white',
  new: 'bg-red-500 text-white',
  hot: 'bg-orange-500 text-white',
  default: 'bg-zinc-700 text-zinc-200',
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span className={cn('inline-block px-2 py-0.5 text-xs font-semibold rounded', variants[variant], className)}>
      {children}
    </span>
  )
}
