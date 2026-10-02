// API FALSA: não existe servidor. As funções só esperam um pouquinho
// (para parecer uma requisição de verdade) e devolvem dados da memória.
import { PRODUCTS } from '../data/products'
import type { CartItem, CheckoutData, Coupon, Order, OrderSummary, Product } from '../types'

const NETWORK_DELAY_MS = 300
const PAYMENT_DELAY_MS = 600

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function fetchProducts(): Promise<Product[]> {
  await wait(NETWORK_DELAY_MS)
  return PRODUCTS
}

export async function fetchProductById(id: number): Promise<Product | undefined> {
  await wait(NETWORK_DELAY_MS)
  return PRODUCTS.find((product) => product.id === id)
}

export interface NewOrder {
  items: CartItem[]
  coupon: Coupon | null
  customer: CheckoutData
  summary: OrderSummary
}

let lastOrderNumber = 0

/** Simula o envio do pedido. Nenhum pagamento de verdade acontece. */
export async function submitOrder(newOrder: NewOrder): Promise<Order> {
  await wait(PAYMENT_DELAY_MS)

  lastOrderNumber += 1

  return {
    ...newOrder,
    id: `PED-${String(lastOrderNumber).padStart(4, '0')}`,
    createdAt: new Date().toISOString(),
  }
}
