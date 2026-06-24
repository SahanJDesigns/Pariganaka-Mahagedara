'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { formatPrice, getProductPrice, getDiscount, getPrimaryImage } from '@/lib/utils'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const price = getProductPrice(product)
  const primaryImage = getPrimaryImage(product.images)

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative bg-white border border-zinc-200 rounded-xl overflow-hidden hover:border-zinc-400 hover:shadow-lg transition-all duration-300 flex flex-col"
    >
      {/* Badges */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
        {product.sale_price && (
          <Badge variant="sale">-{getDiscount(product.base_price, product.sale_price)}%</Badge>
        )}
        {product.is_new_arrival && <Badge variant="new">New</Badge>}
        {product.is_best_seller && <Badge variant="hot">Best Seller</Badge>}
      </div>

      {/* Wishlist */}
      <button
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
        className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-zinc-100/80 text-zinc-500 hover:text-brand-600 hover:bg-zinc-100 transition-colors opacity-0 group-hover:opacity-100"
      >
        <Heart size={16} />
      </button>

      {/* Image */}
      <div className="bg-zinc-100 relative aspect-square overflow-hidden">
        {primaryImage ? (
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt_text ?? product.name}
            fill
            unoptimized
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-zinc-400 text-sm">No image</div>
        )}
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col gap-1 flex-1">
        {product.brand && (
          <span className="text-[10px] sm:text-xs text-brand-600 font-medium uppercase tracking-wide truncate">{product.brand.name}</span>
        )}

        <h3 className="text-xs sm:text-sm font-medium text-zinc-900 leading-snug line-clamp-2 group-hover:text-brand-600 transition-colors">
          {product.name}
        </h3>

        <div className="flex items-baseline gap-1.5 mt-auto pt-1 flex-wrap">
          <span className="text-sm sm:text-base font-bold text-zinc-900 whitespace-nowrap">{formatPrice(price)}</span>
          {product.sale_price && (
            <span className="text-[10px] sm:text-xs text-zinc-400 line-through whitespace-nowrap">{formatPrice(product.base_price)}</span>
          )}
        </div>
      </div>
    </Link>
  )
}
