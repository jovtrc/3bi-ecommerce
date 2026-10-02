import { useState, type ReactNode } from 'react'
import { addItem, removeItem, updateQuantity } from '../lib/cart'
import type { CartItem, Coupon } from '../types'
import { CartContext } from './CartContext'

interface CartProviderProps {
  children: ReactNode
  // Usado pelos testes para começar com o carrinho já preenchido.
  initialItems?: CartItem[]
  initialCoupon?: Coupon | null
}

// O carrinho fica só na memória: ao recarregar a página, ele volta vazio.
export function CartProvider({ children, initialItems = [], initialCoupon = null }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>(initialItems)
  const [coupon, setCoupon] = useState<Coupon | null>(initialCoupon)
  const [cep, setCep] = useState('')

  const value = {
    items,
    coupon,
    cep,
    addToCart: (product: CartItem['product'], quantity: number) =>
      setItems((current) => addItem(current, product, quantity)),
    changeQuantity: (productId: number, quantity: number) =>
      setItems((current) => updateQuantity(current, productId, quantity)),
    removeFromCart: (productId: number) => setItems((current) => removeItem(current, productId)),
    setCoupon,
    setCep,
    clearCart: () => {
      setItems([])
      setCoupon(null)
    },
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
