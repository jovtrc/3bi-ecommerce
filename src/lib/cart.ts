import type { CartItem, Product } from '../types'

/**
 * Adiciona um produto ao carrinho.
 * Se o produto já estiver no carrinho, soma a quantidade.
 * A quantidade final nunca passa do estoque do produto.
 */
export function addItem(items: CartItem[], product: Product, quantity = 1): CartItem[] {
  if (product.stock <= 0 || quantity <= 0) {
    return items
  }

  const existing = items.find((item) => item.product.id === product.id)

  if (!existing) {
    return [...items, { product, quantity: Math.min(quantity, product.stock) }]
  }

  return items.map((item) =>
    item.product.id === product.id
      ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock) }
      : item,
  )
}

/**
 * Troca a quantidade de um produto que já está no carrinho.
 * Quantidade 0 (ou menor) remove o produto.
 * A quantidade nunca passa do estoque do produto.
 */
export function updateQuantity(items: CartItem[], productId: number, quantity: number): CartItem[] {
  if (quantity <= 0) {
    return removeItem(items, productId)
  }

  return items.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
}

/** Remove um produto do carrinho. */
export function removeItem(items: CartItem[], productId: number): CartItem[] {
  return items.filter((item) => item.product.id !== productId)
}

/** Quantidade total de unidades no carrinho (soma das quantidades). */
export function getItemCount(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.quantity, 0)
}

/** Soma de preço x quantidade de todos os itens, em centavos. */
export function getSubtotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.product.price * item.quantity, 0)
}
