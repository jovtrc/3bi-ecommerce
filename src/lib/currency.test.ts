// EXEMPLO DE TESTE UNITÁRIO (Vitest)
// Rode com: npm test
import { describe, expect, it } from 'vitest'
import { formatCurrency } from './currency'

// `describe` agrupa testes relacionados.
describe('formatCurrency', () => {
  // `it` é um caso de teste. O texto explica o comportamento esperado.
  it('formata centavos como reais', () => {
    // Arrange (preparar)
    const valorEmCentavos = 1990

    // Act (executar)
    const resultado = formatCurrency(valorEmCentavos)

    // Assert (verificar)
    expect(resultado).toBe('R$ 19,90')
  })

  // TODO: escreva mais casos. Ideias: zero, 5 centavos, R$ 1.234,56, valores negativos...
})
