'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Trash2, ShoppingBag, ArrowLeft, Tag } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { Button } from '@/components/ui/Button'
import { formatPrice, getProductPrice, getPrimaryImage } from '@/lib/utils'

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, subtotal } = useCart()

  const shipping = subtotal >= 15000 ? 0 : 590
  const tax = subtotal * 0.1
  const total = subtotal + shipping + tax

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 flex flex-col items-center text-center gap-6">
        <ShoppingBag size={64} strokeWidth={1} className="text-zinc-400" />
        <h1 className="text-2xl font-bold text-zinc-900">Your cart is empty</h1>
        <p className="text-zinc-500 text-sm max-w-sm">Looks like you haven&apos;t added anything yet. Start browsing our products!</p>
        <Link href="/shop">
          <Button size="lg">Continue Shopping</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-zinc-900">Shopping Cart</h1>
        <button onClick={clearCart} className="text-sm text-zinc-500 hover:text-brand-600 transition-colors">
          Clear all
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const price = getProductPrice(item.product) + (item.variant?.extra_price ?? 0)
            const image = getPrimaryImage(item.product.images)

            return (
              <div key={`${item.product.id}-${item.variant?.id}`} className="flex gap-4 bg-zinc-100 border border-zinc-200 rounded-xl p-4">
                <div className="w-24 h-24 bg-zinc-200 rounded-xl relative shrink-0 overflow-hidden">
                  {image && <Image src={image.url} alt={item.product.name} fill unoptimized className="object-cover" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-2">
                    <div>
                      {item.product.brand && (
                        <p className="text-xs text-brand-600 font-medium uppercase mb-1">{item.product.brand.name}</p>
                      )}
                      <Link href={`/products/${item.product.slug}`} className="text-sm font-medium text-zinc-900 hover:text-brand-600 transition-colors line-clamp-2">
                        {item.product.name}
                      </Link>
                      {item.variant && (
                        <p className="text-xs text-zinc-500 mt-0.5">{item.variant.variant_name}</p>
                      )}
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id, item.variant?.id)}
                      className="p-1.5 text-zinc-400 hover:text-brand-600 transition-colors shrink-0"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-zinc-300 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.variant?.id, item.quantity - 1)}
                        className="px-3 py-1.5 text-zinc-500 hover:text-zinc-900 transition-colors text-sm"
                      >
                        −
                      </button>
                      <span className="px-3 text-sm text-zinc-900">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.variant?.id, item.quantity + 1)}
                        className="px-3 py-1.5 text-zinc-500 hover:text-zinc-900 transition-colors text-sm"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-base font-bold text-zinc-900">{formatPrice(price * item.quantity)}</p>
                      {item.quantity > 1 && (
                        <p className="text-xs text-zinc-500">{formatPrice(price)} each</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}

          <Link href="/shop" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 transition-colors mt-2">
            <ArrowLeft size={16} /> Continue Shopping
          </Link>
        </div>

        {/* Summary */}
        <div className="space-y-4">
          {/* Order Summary */}
          <div className="bg-zinc-100 border border-zinc-200 rounded-xl p-5 space-y-3">
            <h2 className="text-base font-semibold text-zinc-900 mb-4">Order Summary</h2>

            <div className="flex justify-between text-sm text-zinc-500">
              <span>Subtotal</span>
              <span className="text-zinc-900">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-zinc-500">
              <span>Shipping</span>
              <span className={shipping === 0 ? 'text-green-600' : 'text-zinc-900'}>
                {shipping === 0 ? 'Free' : formatPrice(shipping)}
              </span>
            </div>
            <div className="flex justify-between text-sm text-zinc-500">
              <span>Tax (10%)</span>
              <span className="text-zinc-900">{formatPrice(tax)}</span>
            </div>

            {subtotal < 15000 && (
              <p className="text-xs text-zinc-500 bg-zinc-200 rounded-lg px-3 py-2">
                Add {formatPrice(15000 - subtotal)} more for free shipping
              </p>
            )}

            <div className="pt-3 border-t border-zinc-200 flex justify-between">
              <span className="font-semibold text-zinc-900">Total</span>
              <span className="text-xl font-bold text-zinc-900">{formatPrice(total)}</span>
            </div>

            <Button size="lg" className="w-full mt-2">
              Proceed to Checkout
            </Button>

            <div className="flex justify-center gap-3 pt-1">
              {['visa', 'mastercard', 'paypal', 'amex'].map((card) => (
                <div key={card} className="px-2 py-1 bg-zinc-200 rounded text-xs text-zinc-500 uppercase font-medium">
                  {card}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
