'use client'

import Image from 'next/image'
import Link from 'next/link'
import { X, Trash2, ShoppingBag } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { formatPrice, getProductPrice, getPrimaryImage } from '@/lib/utils'
import { Button } from '@/components/ui/Button'

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalItems, subtotal } = useCart()

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm" onClick={closeCart} />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800 z-50 flex flex-col transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-zinc-200 dark:border-zinc-800">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
            <ShoppingBag size={20} />
            Cart
            {totalItems > 0 && (
              <span className="ml-1 text-sm bg-red-600 text-white rounded-full px-2 py-0.5">{totalItems}</span>
            )}
          </h2>
          <button onClick={closeCart} className="p-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-zinc-400 dark:text-zinc-500">
              <ShoppingBag size={48} strokeWidth={1} />
              <p className="text-sm">Your cart is empty</p>
              <Button variant="outline" size="sm" onClick={closeCart}>
                Continue Shopping
              </Button>
            </div>
          ) : (
            items.map((item) => {
              const price = getProductPrice(item.product) + (item.variant?.extra_price ?? 0)
              const image = getPrimaryImage(item.product.images)
              return (
                <div key={`${item.product.id}-${item.variant?.id}`} className="flex gap-3 bg-zinc-100 dark:bg-zinc-900 rounded-xl p-3">
                  <div className="w-20 h-20 bg-zinc-200 dark:bg-zinc-800 rounded-lg relative shrink-0 overflow-hidden">
                    {image && (
                      <Image src={image.url} alt={item.product.name} fill className="object-contain p-1" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-zinc-900 dark:text-white line-clamp-2">{item.product.name}</p>
                    {item.variant && (
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{item.variant.variant_name}</p>
                    )}
                    <p className="text-sm font-bold text-zinc-900 dark:text-white mt-1">{formatPrice(price)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-zinc-300 dark:border-zinc-700 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.variant?.id, item.quantity - 1)}
                          className="px-2 py-1 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                        >
                          −
                        </button>
                        <span className="px-3 text-sm text-zinc-900 dark:text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.variant?.id, item.quantity + 1)}
                          className="px-2 py-1 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id, item.variant?.id)}
                        className="p-1.5 text-zinc-400 dark:text-zinc-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-5 border-t border-zinc-200 dark:border-zinc-800 space-y-3">
            <div className="flex justify-between text-sm text-zinc-500 dark:text-zinc-400">
              <span>Subtotal</span>
              <span className="text-zinc-900 dark:text-white font-semibold text-base">{formatPrice(subtotal)}</span>
            </div>
            <p className="text-xs text-zinc-400 dark:text-zinc-500">Shipping and taxes calculated at checkout</p>
            <Link href="/cart" onClick={closeCart}>
              <Button size="lg" className="w-full">Proceed to Checkout</Button>
            </Link>
            <Button variant="outline" size="md" className="w-full" onClick={closeCart}>
              Continue Shopping
            </Button>
          </div>
        )}
      </div>
    </>
  )
}
