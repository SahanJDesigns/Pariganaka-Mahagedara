import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'sale' | 'new' | 'hot' | 'default'
  className?: string
}

const variants = {
  sale: 'bg-brand-600 text-white',
  new: 'bg-brand-600 text-white',
  hot: 'bg-orange-500 text-white',
  default: 'bg-zinc-200 text-zinc-700',
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span className={cn('inline-block px-2 py-0.5 text-xs font-semibold rounded', variants[variant], className)}>
      {children}
    </span>
  )
}
