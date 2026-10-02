// EXEMPLO DE TESTE DE COMPONENTE (Vitest + Testing Library)
// Rode com: npm test
import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { getProduct, renderWithProviders } from '../test/utils'
import { ProductCard } from './ProductCard'

describe('ProductCard', () => {
  it('mostra o nome e o preço formatado', () => {
    // renderWithProviders desenha o componente com roteador e carrinho (veja src/test/utils.tsx)
    renderWithProviders(<ProductCard product={getProduct(8)} />)

    // Procuramos os elementos como um usuário veria: pelo papel (role) e pelo texto.
    expect(screen.getByRole('heading', { name: 'Caneca Térmica' })).toBeInTheDocument()
    expect(screen.getByText('R$ 49,90')).toBeInTheDocument()
  })

  it('mostra "Esgotado" e desabilita o botão quando não há estoque', () => {
    renderWithProviders(<ProductCard product={getProduct(4)} />)

    expect(screen.getByText('Esgotado')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Adicionar ao carrinho' })).toBeDisabled()
  })

  // TODO: o nome do produto leva para a página certa?
  // TODO: clicar em "Adicionar ao carrinho" atualiza o contador do cabeçalho? (dica: renderize o <Header /> junto)
})
