import { createContext, useContext } from 'react'
import type { Order } from '../types'

export interface OrdersContextValue {
  orders: Order[]
  addOrder: (order: Order) => void
}

export const OrdersContext = createContext<OrdersContextValue | null>(null)

/** Dá acesso aos pedidos em qualquer componente dentro do <OrdersProvider>. */
export function useOrders(): OrdersContextValue {
  const context = useContext(OrdersContext)
  if (!context) {
    throw new Error('useOrders precisa ser usado dentro de <OrdersProvider>')
  }
  return context
}
