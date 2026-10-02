import { createContext, useContext } from 'react'
import type { CartItem, Coupon, Product } from '../types'

export interface CartContextValue {
  items: CartItem[]
  coupon: Coupon | null
  cep: string
  addToCart: (product: Product, quantity: number) => void
  changeQuantity: (productId: number, quantity: number) => void
  removeFromCart: (productId: number) => void
  setCoupon: (coupon: Coupon | null) => void
  setCep: (cep: string) => void
  clearCart: () => void
}

export const CartContext = createContext<CartContextValue | null>(null)

/** Dá acesso ao carrinho em qualquer componente dentro do <CartProvider>. */
export function useCart(): CartContextValue {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart precisa ser usado dentro de <CartProvider>')
  }
  return context
}
