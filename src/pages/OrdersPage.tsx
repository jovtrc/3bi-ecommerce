import { Link } from 'react-router-dom'
import { useOrders } from '../context/OrdersContext'
import { getItemCount } from '../lib/cart'
import { formatCurrency } from '../lib/currency'

export function OrdersPage() {
  const { orders } = useOrders()

  if (orders.length === 0) {
    return (
      <section>
        <h1>Meus pedidos</h1>
        <p>Você ainda não fez nenhum pedido.</p>
        <Link to="/">Ver produtos</Link>
      </section>
    )
  }

  return (
    <section>
      <h1>Meus pedidos</h1>

      <ul className="orders">
        {orders.map((order) => {
          const count = getItemCount(order.items)
          return (
            <li key={order.id}>
              <article className="box" aria-labelledby={`order-${order.id}`}>
                <h2 id={`order-${order.id}`}>Pedido {order.id}</h2>
                <p className="muted">{new Date(order.createdAt).toLocaleString('pt-BR')}</p>
                <p>{count === 1 ? '1 item' : `${count} itens`}</p>
                <p>
                  Total:{' '}
                  <strong>{formatCurrency(order.summary.subtotal - order.summary.discount)}</strong>
                </p>
                <Link to={`/pedido/${order.id}`}>Ver detalhes</Link>
              </article>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
