import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { CATEGORY_LABELS } from '../lib/catalog'
import { formatCurrency } from '../lib/currency'
import { fetchProductById } from '../services/api'
import type { Product } from '../types'

export function ProductDetailPage() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const [product, setProduct] = useState<Product | undefined>()
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState('1')
  const [message, setMessage] = useState('')

  useEffect(() => {
    let ignore = false
    fetchProductById(Number(id)).then((data) => {
      if (!ignore) {
        setProduct(data)
        setLoading(false)
      }
    })
    return () => {
      ignore = true
    }
  }, [id])

  if (loading) {
    return <p>Carregando produto...</p>
  }

  if (!product) {
    return (
      <section>
        <h1>Produto não encontrado</h1>
        <Link to="/">Voltar para os produtos</Link>
      </section>
    )
  }

  const outOfStock = product.stock === 0

  const handleAdd = () => {
    const amount = Number(quantity)

    if (!Number.isInteger(amount) || amount < 1) {
      setMessage('Quantidade inválida')
      return
    }

    addToCart(product, amount)
    setMessage('Produto adicionado ao carrinho!')
  }

  return (
    <section>
      <Link to="/">← Voltar para os produtos</Link>

      <div className="detail">
        <div className="detail-image" aria-hidden="true">
          {product.image}
        </div>

        <div className="detail-info">
          <p className="muted">{CATEGORY_LABELS[product.category]}</p>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p className="price price-large">{formatCurrency(product.price)}</p>

          {outOfStock ? (
            <p className="tag tag-danger">Esgotado</p>
          ) : (
            <p className="muted">{product.stock} em estoque</p>
          )}

          <div className="inline-form">
            <label className="field">
              <span>Quantidade</span>
              <input
                type="number"
                min={1}
                max={product.stock}
                value={quantity}
                disabled={outOfStock}
                onChange={(event) => setQuantity(event.target.value)}
              />
            </label>

            <button type="button" className="button" onClick={handleAdd}>
              Adicionar ao carrinho
            </button>
          </div>

          {message && (
            <p role="status" className={message.includes('inválida') ? 'error' : 'success'}>
              {message} {!message.includes('inválida') && <Link to="/carrinho">Ir para o carrinho</Link>}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
