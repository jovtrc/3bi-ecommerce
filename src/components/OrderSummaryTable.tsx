import { formatCurrency } from '../lib/currency'
import type { OrderSummary } from '../types'

interface OrderSummaryTableProps {
  summary: OrderSummary
}

function formatShipping(shipping: number | null): string {
  if (shipping === null) return 'Informe o CEP'
  if (shipping === 0) return 'Grátis'
  return formatCurrency(shipping)
}

export function OrderSummaryTable({ summary }: OrderSummaryTableProps) {
  return (
    <table className="summary">
      <caption>Resumo do pedido</caption>
      <tbody>
        <tr>
          <th scope="row">Subtotal</th>
          <td>{formatCurrency(summary.subtotal)}</td>
        </tr>
        {summary.discount > 0 && (
          <tr>
            <th scope="row">Desconto</th>
            <td className="success">-{formatCurrency(summary.discount)}</td>
          </tr>
        )}
        <tr>
          <th scope="row">Frete</th>
          <td>{formatShipping(summary.shipping)}</td>
        </tr>
        <tr className="summary-total">
          <th scope="row">Total</th>
          <td>{formatCurrency(summary.total)}</td>
        </tr>
      </tbody>
    </table>
  )
}
