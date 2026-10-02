import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <section>
      <h1>Página não encontrada</h1>
      <Link to="/">Voltar para os produtos</Link>
    </section>
  )
}
