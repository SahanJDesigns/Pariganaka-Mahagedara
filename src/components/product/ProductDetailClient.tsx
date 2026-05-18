'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, ChevronRight, Package, Shield, Truck, Check } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { StarRating } from '@/components/ui/StarRating'
import { formatPrice, getProductPrice, getDiscount } from '@/lib/utils'
import type { Product, ProductVariant } from '@/types'

interface Props {
  product: Product
}

export function ProductDetailClient({ product }: Props) {
  const { addItem } = useCart()
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants?.find((v) => v.is_active) ?? null
  )
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  const images = product.images ?? []
  const price = getProductPrice(product) + (selectedVariant?.extra_price ?? 0)
  const stock = selectedVariant?.stock_qty ?? product.stock_qty
  const isOutOfStock = stock === 0

  const specGroups = (product.specifications ?? []).reduce<Record<string, { name: string; value: string }[]>>(
    (acc, spec) => {
      if (!acc[spec.spec_group]) acc[spec.spec_group] = []
      acc[spec.spec_group].push({ name: spec.spec_name, value: spec.spec_value })
      return acc
    },
    {}
  )

  function handleAddToCart() {
    for (let i = 0; i < qty; i++) {
      addItem(product, selectedVariant)
    }
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1 text-sm text-zinc-500 mb-8">
        <Link href="/" className="hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">Home</Link>
        <ChevronRight size={14} />
        {product.category && (
          <>
            <Link href={`/shop/${product.category.slug}`} className="hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">{product.category.name}</Link>
            <ChevronRight size={14} />
          </>
        )}
        <span className="text-zinc-700 dark:text-zinc-300 line-clamp-1">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-10 mb-16">

        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden relative">
            {images[selectedImage] ? (
              <Image
                src={images[selectedImage].url}
                alt={images[selectedImage].alt_text ?? product.name}
                fill
                className="object-contain p-8"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-zinc-400 dark:text-zinc-600">No image</div>
            )}
            {product.sale_price && (
              <div className="absolute top-4 left-4">
                <Badge variant="sale">-{getDiscount(product.base_price, product.sale_price)}%</Badge>
              </div>
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {images.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 shrink-0 rounded-xl bg-zinc-100 dark:bg-zinc-900 border-2 overflow-hidden relative transition-all ${selectedImage === i ? 'border-red-500' : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600'}`}
                >
                  <Image src={img.url} alt={img.alt_text ?? ''} fill className="object-contain p-2" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-5">
          {product.brand && (
            <Link href={`/shop?brand=${product.brand.slug}`} className="text-sm text-red-500 dark:text-red-400 font-medium uppercase tracking-wide hover:text-red-600 dark:hover:text-red-300">
              {product.brand.name}
            </Link>
          )}

          <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white leading-snug">{product.name}</h1>

          <StarRating rating={product.rating_avg} count={product.rating_count} size="md" />

          {product.short_description && (
            <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">{product.short_description}</p>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-bold text-zinc-900 dark:text-white">{formatPrice(price)}</span>
            {product.sale_price && (
              <span className="text-xl text-zinc-400 dark:text-zinc-500 line-through">{formatPrice(product.base_price + (selectedVariant?.extra_price ?? 0))}</span>
            )}
          </div>

          {/* Stock */}
          <div className={`flex items-center gap-2 text-sm ${isOutOfStock ? 'text-red-500 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
            <Package size={16} />
            {isOutOfStock ? 'Out of Stock' : `In Stock (${stock} available)`}
          </div>

          {/* Variants */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-zinc-600 dark:text-zinc-300">Options</p>
              <div className="flex flex-wrap gap-2">
                {product.variants.filter((v) => v.is_active).map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    className={`px-4 py-2 rounded-xl text-sm border transition-all ${
                      selectedVariant?.id === v.id
                        ? 'border-red-500 bg-red-600/20 text-zinc-900 dark:text-white'
                        : 'border-zinc-300 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                    }`}
                  >
                    {v.variant_name}
                    {v.extra_price > 0 && <span className="ml-1 text-zinc-400 dark:text-zinc-500">+{formatPrice(v.extra_price)}</span>}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity + Add to Cart */}
          <div className="flex items-center gap-3 pt-2">
            <div className="flex items-center border border-zinc-300 dark:border-zinc-700 rounded-xl overflow-hidden">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-3 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">−</button>
              <span className="px-4 text-zinc-900 dark:text-white font-medium">{qty}</span>
              <button onClick={() => setQty(Math.min(stock, qty + 1))} className="px-4 py-3 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">+</button>
            </div>
            <Button size="lg" className="flex-1" onClick={handleAddToCart} disabled={isOutOfStock}>
              {added ? <><Check size={16} /> Added!</> : <><ShoppingCart size={16} /> Add to Cart</>}
            </Button>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            {[
              { icon: Truck,  text: 'Free shipping over $100' },
              { icon: Shield, text: '2-year warranty included' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3">
                <Icon size={16} className="text-red-500 dark:text-red-400 shrink-0" />
                <span className="text-xs text-zinc-500 dark:text-zinc-400">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Specifications */}
      {Object.keys(specGroups).length > 0 && (
        <section className="mb-16">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-6">Specifications</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(specGroups).map(([group, specs]) => (
              <div key={group} className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
                <div className="px-5 py-3 bg-zinc-200/50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-800">
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">{group}</h3>
                </div>
                <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {specs.map((spec) => (
                    <div key={spec.name} className="flex items-start px-5 py-3 gap-4">
                      <span className="text-sm text-zinc-500 w-36 shrink-0">{spec.name}</span>
                      <span className="text-sm text-zinc-700 dark:text-zinc-200">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
