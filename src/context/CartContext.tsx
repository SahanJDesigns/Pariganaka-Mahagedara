'use client'

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import type { CartItem, Product, ProductVariant } from '@/types'

interface CartState {
  items: CartItem[]
  isOpen: boolean
}

type CartAction =
  | { type: 'ADD_ITEM'; product: Product; variant: ProductVariant | null }
  | { type: 'REMOVE_ITEM'; productId: number; variantId?: number }
  | { type: 'UPDATE_QTY'; productId: number; variantId: number | undefined; quantity: number }
  | { type: 'CLEAR' }
  | { type: 'TOGGLE_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'HYDRATE'; items: CartItem[] }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'HYDRATE':
      return { ...state, items: action.items }

    case 'ADD_ITEM': {
      const variantId = action.variant?.id
      const existing = state.items.find(
        (i) => i.product.id === action.product.id && i.variant?.id === variantId
      )
      const items = existing
        ? state.items.map((i) =>
            i.product.id === action.product.id && i.variant?.id === variantId
              ? { ...i, quantity: i.quantity + 1 }
              : i
          )
        : [...state.items, { product: action.product, variant: action.variant, quantity: 1 }]
      return { ...state, items, isOpen: true }
    }

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(
          (i) => !(i.product.id === action.productId && i.variant?.id === action.variantId)
        ),
      }

    case 'UPDATE_QTY':
      return {
        ...state,
        items: state.items
          .map((i) =>
            i.product.id === action.productId && i.variant?.id === action.variantId
              ? { ...i, quantity: action.quantity }
              : i
          )
          .filter((i) => i.quantity > 0),
      }

    case 'CLEAR':
      return { ...state, items: [] }

    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen }

    case 'CLOSE_CART':
      return { ...state, isOpen: false }

    default:
      return state
  }
}

interface CartContextValue extends CartState {
  addItem: (product: Product, variant: ProductVariant | null) => void
  removeItem: (productId: number, variantId?: number) => void
  updateQuantity: (productId: number, variantId: number | undefined, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  closeCart: () => void
  totalItems: number
  subtotal: number
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false })

  useEffect(() => {
    try {
      const saved = localStorage.getItem('cart')
      if (saved) dispatch({ type: 'HYDRATE', items: JSON.parse(saved) })
    } catch {}
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items))
  }, [state.items])

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0)
  const subtotal = state.items.reduce((sum, i) => {
    const base = i.product.sale_price ?? i.product.base_price
    const extra = i.variant?.extra_price ?? 0
    return sum + (base + extra) * i.quantity
  }, 0)

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem: (product, variant) => dispatch({ type: 'ADD_ITEM', product, variant }),
        removeItem: (productId, variantId) => dispatch({ type: 'REMOVE_ITEM', productId, variantId }),
        updateQuantity: (productId, variantId, quantity) =>
          dispatch({ type: 'UPDATE_QTY', productId, variantId, quantity }),
        clearCart: () => dispatch({ type: 'CLEAR' }),
        toggleCart: () => dispatch({ type: 'TOGGLE_CART' }),
        closeCart: () => dispatch({ type: 'CLOSE_CART' }),
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
