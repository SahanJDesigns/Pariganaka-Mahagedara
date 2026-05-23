import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return 'Rs. ' + new Intl.NumberFormat('en-LK', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(price)
}

export function getProductPrice(product: { base_price: number; sale_price: number | null }) {
  return product.sale_price ?? product.base_price
}

export function getDiscount(base: number, sale: number): number {
  return Math.round(((base - sale) / base) * 100)
}

export function getPrimaryImage(images?: { url: string; is_primary: boolean; alt_text: string | null }[]) {
  if (!images || images.length === 0) return null
  const valid = images.filter((i) => i.url)
  if (!valid.length) return null
  return valid.find((i) => i.is_primary) ?? valid[0]
}
