import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)
}

export function getProductPrice(product: { base_price: number; sale_price: number | null }) {
  return product.sale_price ?? product.base_price
}

export function getDiscount(base: number, sale: number): number {
  return Math.round(((base - sale) / base) * 100)
}

export function getPrimaryImage(images?: { url: string; is_primary: boolean; alt_text: string | null }[]) {
  if (!images || images.length === 0) return null
  return images.find((i) => i.is_primary) ?? images[0]
}
