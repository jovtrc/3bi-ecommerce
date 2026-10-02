import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatCurrency } from '../lib/currency'
import type { Product } from '../types'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const outOfStock = product.stock === 0
  const titleId = `product-${product.id}-title`

  return (
    <article className="card" aria-labelledby={titleId}>
      <div className="card-image" aria-hidden="true">
        {product.image}
      </div>

      <h3 id={titleId} className="card-title">
        <Link to={`/produto/${product.id}`}>{product.name}</Link>
      </h3>

      <p className="price">{formatCurrency(product.price)}</p>
      {outOfStock && <p className="tag tag-danger">Esgotado</p>}

      <button
        type="button"
        className="button"
        onClick={() => addToCart(product, 1)}
        disabled={outOfStock}
      >
        Adicionar ao carrinho
      </button>
    </article>
  )
}
