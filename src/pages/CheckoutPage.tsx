import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CheckoutForm } from '../components/CheckoutForm'
import { OrderSummaryTable } from '../components/OrderSummaryTable'
import { useCart } from '../context/CartContext'
import { useOrders } from '../context/OrdersContext'
import { calculateOrderSummary } from '../lib/checkout'
import { formatCurrency } from '../lib/currency'
import { isValidCep } from '../lib/validators'
import { submitOrder } from '../services/api'
import type { CheckoutData } from '../types'

export function CheckoutPage() {
  const { items, coupon, cep } = useCart()
  const { addOrder } = useOrders()
  const navigate = useNavigate()
  const [formCep, setFormCep] = useState(cep)
  const [submitting, setSubmitting] = useState(false)

  if (items.length === 0) {
    return (
      <section>
        <h1>Checkout</h1>
        <p>Seu carrinho está vazio.</p>
        <Link to="/">Ver produtos</Link>
      </section>
    )
  }

  const summary = calculateOrderSummary(items, coupon, isValidCep(formCep) ? formCep : null)

  async function handleSubmit(customer: CheckoutData) {
    setSubmitting(true)

    const order = await submitOrder({
      items,
      coupon,
      customer,
      summary: calculateOrderSummary(items, coupon, customer.cep),
    })

    addOrder(order)
    navigate(`/pedido/${order.id}`)
  }

  return (
    <section>
      <h1>Checkout</h1>

      <div className="two-columns">
        <CheckoutForm
          total={summary.total}
          initialCep={cep}
          submitting={submitting}
          onCepChange={setFormCep}
          onSubmit={handleSubmit}
        />

        <aside className="sidebar">
          <ul className="mini-list" aria-label="Itens do pedido">
            {items.map((item) => (
              <li key={item.product.id}>
                {item.quantity}x {item.product.name}
                <span>{formatCurrency(item.product.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          {coupon && <p className="success">Cupom {coupon.code} aplicado</p>}
          <OrderSummaryTable summary={summary} />
        </aside>
      </div>
    </section>
  )
}
