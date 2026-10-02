import { Link } from 'react-router-dom'
import { CartItemRow } from '../components/CartItemRow'
import { CouponForm } from '../components/CouponForm'
import { OrderSummaryTable } from '../components/OrderSummaryTable'
import { ShippingForm } from '../components/ShippingForm'
import { useCart } from '../context/CartContext'
import { calculateOrderSummary } from '../lib/checkout'
import { formatCurrency } from '../lib/currency'
import { FREE_SHIPPING_THRESHOLD } from '../lib/shipping'

export function CartPage() {
  const { items, coupon, cep } = useCart()

  if (items.length === 0) {
    return (
      <section>
        <h1>Carrinho</h1>
        <p>Seu carrinho está vazio.</p>
        <Link to="/" className="button">
          Ver produtos
        </Link>
      </section>
    )
  }

  const summary = calculateOrderSummary(items, coupon, cep || null)
  const missingForFreeShipping = FREE_SHIPPING_THRESHOLD - summary.subtotal

  return (
    <section>
      <h1>Carrinho</h1>

      <div className="two-columns">
        <ul className="cart-list" aria-label="Itens do carrinho">
          {items.map((item) => (
            <CartItemRow key={item.product.id} item={item} />
          ))}
        </ul>

        <aside className="sidebar">
          <p className="free-shipping-hint">
            {missingForFreeShipping > 0
              ? `Faltam ${formatCurrency(missingForFreeShipping)} para ganhar frete grátis`
              : 'Você ganhou frete grátis!'}
          </p>
          <CouponForm />
          <ShippingForm />
          <OrderSummaryTable summary={summary} />
          <Link to="/checkout" className="button button-large">
            Finalizar compra
          </Link>
        </aside>
      </div>
    </section>
  )
}
