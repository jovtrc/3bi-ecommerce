/**
 * Formata um valor em centavos como moeda brasileira.
 *
 * formatCurrency(1990)   -> "R$ 19,90"
 * formatCurrency(123456) -> "R$ 1.234,56"
 */
export function formatCurrency(cents: number): string {
  const sign = cents < 0 ? '-' : ''
  const absolute = Math.abs(Math.round(cents))

  const reais = Math.floor(absolute / 100)
  const centavos = absolute % 100

  const reaisWithDots = reais.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  const centavosWithTwoDigits = centavos.toString().padStart(2, '0')

  return `${sign}R$ ${reaisWithDots},${centavosWithTwoDigits}`
}
