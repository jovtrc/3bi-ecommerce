import { Link, useParams } from 'react-router-dom'
import { OrderSummaryTable } from '../components/OrderSummaryTable'
import { useOrders } from '../context/OrdersContext'
import { formatCurrency } from '../lib/currency'
import type { PaymentMethod } from '../types'

const PAYMENT_LABELS: Record<PaymentMethod, string> = {
  cartao: 'Cartão de crédito',
  pix: 'Pix',
  boleto: 'Boleto',
}

export function OrderConfirmationPage() {
  const { id } = useParams()
  const { orders } = useOrders()
  const order = orders.find((o) => o.id === id)

  if (!order) {
    return (
      <section>
        <h1>Pedido não encontrado</h1>
        <p className="muted">
          Os pedidos ficam guardados só na memória: ao recarregar a página, eles somem.
        </p>
        <Link to="/">Voltar para os produtos</Link>
      </section>
    )
  }

  const { customer } = order
  const firstName = customer.name.trim().split(' ')[0]

  return (
    <section>
      <h1>Pedido confirmado!</h1>
      <p>
        Obrigado, {firstName}! Número do pedido: <strong>{order.id}</strong>
      </p>

      <div className="two-columns">
        <div className="box">
          <h2>Itens</h2>
          <ul className="mini-list">
            {order.items.map((item) => (
              <li key={item.product.id}>
                {item.quantity}x {item.product.name}
                <span>{formatCurrency(item.product.price * item.quantity)}</span>
              </li>
            ))}
          </ul>

          <h2>Entrega e pagamento</h2>
          <p>
            {customer.address} — CEP {customer.cep}
          </p>
          <p>
            {PAYMENT_LABELS[customer.payment]}
            {customer.payment === 'cartao' && ` em ${customer.installments}x`}
          </p>
        </div>

        <aside className="sidebar">
          <OrderSummaryTable summary={order.summary} />
          <Link to="/pedidos" className="button">
            Ver meus pedidos
          </Link>
          <Link to="/">Continuar comprando</Link>
        </aside>
      </div>
    </section>
  )
}
