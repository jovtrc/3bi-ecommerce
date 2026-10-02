import { useCart } from '../context/CartContext'

/** Bolinha com a quantidade de unidades no carrinho (soma das quantidades). */
export function CartBadge() {
  const { items } = useCart()
  const count = items.length

  return (
    <span className="badge">
      {count} <span className="sr-only">{count === 1 ? 'item' : 'itens'}</span>
    </span>
  )
}
