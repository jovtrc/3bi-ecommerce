/** Remove tudo o que não for número. "123.456.789-09" -> "12345678909" */
export function onlyDigits(value: string): string {
  return value.replace(/\D/g, '')
}

/** Nome completo: pelo menos duas palavras com 2 letras ou mais. */
export function isValidName(name: string): boolean {
  const words = name.trim().split(/\s+/)
  return words.length >= 2 && words.every((word) => word.length >= 2)
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

/** Aceita "01310-100" ou "01310100". */
export function isValidCep(cep: string): boolean {
  return /^\d{5}-?\d{3}$/.test(cep.trim())
}

/**
 * Valida um CPF, com ou sem pontuação.
 * Confere os dois dígitos verificadores e recusa CPFs com
 * todos os dígitos iguais (ex.: 111.111.111-11).
 */
export function isValidCpf(cpf: string): boolean {
  const digits = onlyDigits(cpf)

  if (digits.length !== 11) {
    return false
  }

  const numbers = digits.split('').map(Number)
  const firstCheck = calculateCpfCheckDigit(numbers.slice(0, 9))
  const secondCheck = calculateCpfCheckDigit(numbers.slice(0, 10))

  return firstCheck === numbers[9] && secondCheck === numbers[10]
}

function calculateCpfCheckDigit(numbers: number[]): number {
  // Pesos decrescentes: para 9 números começa em 10; para 10 números começa em 11.
  let sum = 0
  numbers.forEach((n, index) => {
    sum += n * (numbers.length + 1 - index)
  })

  const rest = (sum * 10) % 11
  return rest === 10 ? 0 : rest
}
