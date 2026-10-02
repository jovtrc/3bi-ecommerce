import { CATEGORY_LABELS, type CatalogFilters as Filters, type SortOption } from '../lib/catalog'
import type { Category } from '../types'

interface CatalogFiltersProps {
  filters: Filters
  onChange: (filters: Filters) => void
}

export function CatalogFilters({ filters, onChange }: CatalogFiltersProps) {
  return (
    <div className="filters">
      <label className="field">
        <span>Buscar produtos</span>
        <input
          type="search"
          placeholder="Ex.: caneca"
          value={filters.search}
          onChange={(event) => onChange({ ...filters, search: event.target.value })}
        />
      </label>

      <label className="field">
        <span>Categoria</span>
        <select
          value={filters.category}
          onChange={(event) =>
            onChange({ ...filters, category: event.target.value as Category | 'todas' })
          }
        >
          <option value="todas">Todas</option>
          {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </label>

      <label className="field">
        <span>Ordenar por</span>
        <select
          value={filters.sort}
          onChange={(event) => onChange({ ...filters, sort: event.target.value as SortOption })}
        >
          <option value="relevancia">Relevância</option>
          <option value="menor-preco">Menor preço</option>
          <option value="maior-preco">Maior preço</option>
        </select>
      </label>
    </div>
  )
}
