import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ReactElement } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { CartProvider } from '../context/CartProvider'
import { OrdersProvider } from '../context/OrdersProvider'
import { PRODUCTS } from '../data/products'
import type { CartItem, Coupon, Order } from '../types'

interface RenderOptions {
  /** Rota inicial, ex.: '/carrinho' ou '/produto/4' */
  route?: string
  cartItems?: CartItem[]
  coupon?: Coupon | null
  orders?: Order[]
}

/**
 * Renderiza um componente com tudo o que ele precisa para funcionar
 * (roteador, carrinho e pedidos) e devolve também um `user` para
 * simular cliques e digitação.
 */
export function renderWithProviders(ui: ReactElement, options: RenderOptions = {}) {
  const { route = '/', cartItems = [], coupon = null, orders = [] } = options

  const user = userEvent.setup()
  const result = render(
    <MemoryRouter initialEntries={[route]}>
      <CartProvider initialItems={cartItems} initialCoupon={coupon}>
        <OrdersProvider initialOrders={orders}>{ui}</OrdersProvider>
      </CartProvider>
    </MemoryRouter>,
  )

  return { user, ...result }
}

/** Atalho para pegar um produto dos dados falsos pelo id. */
export function getProduct(id: number) {
  const product = PRODUCTS.find((p) => p.id === id)
  if (!product) {
    throw new Error(`Produto ${id} não existe`)
  }
  return product
}
