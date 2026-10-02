import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header } from './components/Header'
import { CartProvider } from './context/CartProvider'
import { OrdersProvider } from './context/OrdersProvider'
import { CartPage } from './pages/CartPage'
import { CatalogPage } from './pages/CatalogPage'
import { CheckoutPage } from './pages/CheckoutPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { OrderConfirmationPage } from './pages/OrderConfirmationPage'
import { OrdersPage } from './pages/OrdersPage'
import { ProductDetailPage } from './pages/ProductDetailPage'

/** Cabeçalho + páginas. Separado do App para os testes usarem outro roteador. */
export function AppRoutes() {
  return (
    <>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<CatalogPage />} />
          <Route path="/produto/:id" element={<ProductDetailPage />} />
          <Route path="/carrinho" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/pedido/:id" element={<OrderConfirmationPage />} />
          <Route path="/pedidos" element={<OrdersPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <footer className="footer container">
        Loja fictícia para fins didáticos. Nenhum pagamento é processado.
      </footer>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <OrdersProvider>
          <AppRoutes />
        </OrdersProvider>
      </CartProvider>
    </BrowserRouter>
  )
}
