'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Heart } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { StarRating } from '@/components/ui/StarRating'
import { useCart } from '@/context/CartContext'
import { formatPrice, getProductPrice, getDiscount, getPrimaryImage } from '@/lib/utils'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const price = getProductPrice(product)
  const primaryImage = getPrimaryImage(product.images)

  return (
    <div className="group relative bg-white border border-zinc-200 rounded-xl overflow-hidden hover:border-zinc-400 transition-all duration-300 flex flex-col">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
        {product.sale_price && (
          <Badge variant="sale">-{getDiscount(product.base_price, product.sale_price)}%</Badge>
        )}
        {product.is_new_arrival && <Badge variant="new">New</Badge>}
        {product.is_best_seller && <Badge variant="hot">Best Seller</Badge>}
      </div>

      {/* Wishlist */}
      <button className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-zinc-100/80 text-zinc-500 hover:text-brand-600 hover:bg-zinc-100 transition-colors opacity-0 group-hover:opacity-100">
        <Heart size={16} />
      </button>

      {/* Image */}
      <Link href={`/products/${product.slug}`} className="block bg-zinc-100 relative aspect-4/3 overflow-hidden">
        {primaryImage ? (
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt_text ?? product.name}
            fill
            unoptimized
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-zinc-400 text-sm">No image</div>
        )}
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        {product.brand && (
          <span className="text-xs text-brand-600 font-medium uppercase tracking-wide">{product.brand.name}</span>
        )}

        <Link href={`/products/${product.slug}`}>
          <h3 className="text-sm font-medium text-zinc-900 leading-snug line-clamp-2 hover:text-brand-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        <StarRating rating={product.rating_avg} count={product.rating_count} />

        <div className="flex items-center gap-2 mt-auto pt-2">
          <span className="text-lg font-bold text-zinc-900">{formatPrice(price)}</span>
          {product.sale_price && (
            <span className="text-sm text-zinc-400 line-through">{formatPrice(product.base_price)}</span>
          )}
        </div>

        <button
          onClick={() => addItem(product, null)}
          disabled={product.stock_qty === 0}
          className="mt-1 w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 disabled:bg-zinc-200 disabled:text-zinc-400 disabled:cursor-not-allowed text-white text-sm font-medium transition-colors"
        >
          <ShoppingCart size={15} />
          {product.stock_qty === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  )
}
