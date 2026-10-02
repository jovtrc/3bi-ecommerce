// Todos os preços do projeto são guardados em CENTAVOS (números inteiros).
// Exemplo: R$ 19,90 é guardado como 1990.
// Assim evitamos erros de arredondamento como 0.1 + 0.2 = 0.30000000000000004.

export type Category = 'eletronicos' | 'livros' | 'casa' | 'moda'

export interface Product {
  id: number
  name: string
  description: string
  price: number
  category: Category
  stock: number
  image: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export type CouponType = 'percent' | 'fixed' | 'free-shipping'

export interface Coupon {
  code: string
  type: CouponType
  value: number
  expiresAt?: string
}

export interface OrderSummary {
  subtotal: number
  discount: number
  shipping: number | null
  total: number
}

export type PaymentMethod = 'cartao' | 'pix' | 'boleto'

export interface CheckoutData {
  name: string
  email: string
  cpf: string
  cep: string
  address: string
  payment: PaymentMethod
  installments: number
}

export interface Order {
  id: string
  createdAt: string
  items: CartItem[]
  coupon: Coupon | null
  customer: CheckoutData
  summary: OrderSummary
}
