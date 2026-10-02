import { Link, NavLink } from 'react-router-dom'
import { CartBadge } from './CartBadge'

export function Header() {
  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo">
          <span aria-hidden="true">🧪</span> Lojinha QA
        </Link>

        <nav aria-label="Menu principal" className="nav">
          <NavLink to="/" end>
            Produtos
          </NavLink>
          <NavLink to="/pedidos">Meus pedidos</NavLink>
          <NavLink to="/carrinho" className="nav-cart">
            <span aria-hidden="true">🛒</span> Carrinho <CartBadge />
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
