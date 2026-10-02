import { useEffect, useState } from 'react'
import { CatalogFilters } from '../components/CatalogFilters'
import { ProductCard } from '../components/ProductCard'
import { filterProducts, type CatalogFilters as Filters } from '../lib/catalog'
import { fetchProducts } from '../services/api'
import type { Product } from '../types'

export function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<Filters>({
    search: '',
    category: 'todas',
    sort: 'relevancia',
  })

  useEffect(() => {
    let ignore = false
    fetchProducts().then((data) => {
      if (!ignore) {
        setProducts(data)
        setLoading(false)
      }
    })
    return () => {
      ignore = true
    }
  }, [])

  const visibleProducts = filterProducts(products, filters)

  return (
    <section>
      <h1>Produtos</h1>
      <CatalogFilters filters={filters} onChange={setFilters} />

      {loading ? (
        <p>Carregando produtos...</p>
      ) : (
        <>
          <p className="muted" role="status">
            {visibleProducts.length === 1
              ? '1 produto encontrado'
              : `${visibleProducts.length} produtos encontrados`}
          </p>

          {visibleProducts.length === 0 ? (
            <p>Nenhum produto encontrado.</p>
          ) : (
            <div className="grid">
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  )
}
