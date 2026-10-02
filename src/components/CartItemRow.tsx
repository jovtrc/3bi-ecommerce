import { useCart } from '../context/CartContext'
import { formatCurrency } from '../lib/currency'
import type { CartItem } from '../types'

interface CartItemRowProps {
  item: CartItem
}

export function CartItemRow({ item }: CartItemRowProps) {
  const { changeQuantity, removeFromCart } = useCart()
  const { product, quantity } = item

  return (
    <li className="cart-item" aria-label={product.name}>
      <span className="cart-item-image" aria-hidden="true">
        {product.image}
      </span>

      <div className="cart-item-info">
        <strong>{product.name}</strong>
        <span className="muted">{formatCurrency(product.price)} cada</span>
      </div>

      <div className="quantity">
        <button
          type="button"
          aria-label={`Diminuir quantidade de ${product.name}`}
          onClick={() => changeQuantity(product.id, quantity - 1)}
          disabled={quantity <= 1}
        >
          −
        </button>
        <output aria-label={`Quantidade de ${product.name}`}>{quantity}</output>
        <button
          type="button"
          aria-label={`Aumentar quantidade de ${product.name}`}
          onClick={() => changeQuantity(product.id, quantity + 1)}
        >
          +
        </button>
      </div>

      <strong className="cart-item-total">{formatCurrency(product.price * quantity)}</strong>

      <button
        type="button"
        className="link-button"
        aria-label={`Remover ${product.name}`}
        onClick={() => removeFromCart(product.id)}
      >
        Remover
      </button>
    </li>
  )
}
