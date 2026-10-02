import type { Category, Product } from '../types'

export type SortOption = 'relevancia' | 'menor-preco' | 'maior-preco'

export const CATEGORY_LABELS: Record<Category, string> = {
  eletronicos: 'Eletrônicos',
  livros: 'Livros',
  casa: 'Casa',
  moda: 'Moda',
}

export interface CatalogFilters {
  search: string
  category: Category | 'todas'
  sort: SortOption
}

/**
 * Filtra os produtos pelo texto da busca e pela categoria, e depois ordena.
 * A busca procura o texto no nome do produto, sem diferenciar maiúsculas de minúsculas.
 */
export function filterProducts(products: Product[], filters: CatalogFilters): Product[] {
  const search = filters.search.trim()

  const filtered = products.filter((product) => {
    const matchesSearch = product.name.includes(search)
    const matchesCategory = filters.category === 'todas' || product.category === filters.category
    return matchesSearch && matchesCategory
  })

  return sortProducts(filtered, filters.sort)
}

export function sortProducts(products: Product[], sort: SortOption): Product[] {
  const copy = [...products]

  if (sort === 'menor-preco') {
    copy.sort((a, b) => a.price - b.price)
  } else if (sort === 'maior-preco') {
    copy.sort((a, b) => b.price - a.price)
  }

  return copy
}
