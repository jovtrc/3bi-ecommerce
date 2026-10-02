import { useState, type ReactNode } from 'react'
import type { Order } from '../types'
import { OrdersContext } from './OrdersContext'

interface OrdersProviderProps {
  children: ReactNode
  // Usado pelos testes para começar com pedidos já feitos.
  initialOrders?: Order[]
}

// Os pedidos ficam só na memória: ao recarregar a página, a lista some.
export function OrdersProvider({ children, initialOrders = [] }: OrdersProviderProps) {
  const [orders, setOrders] = useState<Order[]>(initialOrders)

  const value = {
    orders,
    addOrder: (order: Order) => setOrders((current) => [order, ...current]),
  }

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>
}
