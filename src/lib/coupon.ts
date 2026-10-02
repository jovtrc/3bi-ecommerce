import type { Coupon } from '../types'

export const COUPONS: Coupon[] = [
  { code: 'PROMO10', type: 'percent', value: 10 },
  { code: 'DESCONTO50', type: 'fixed', value: 5000 },
  { code: 'FRETEGRATIS', type: 'free-shipping', value: 0 },
  { code: 'NATAL2025', type: 'percent', value: 20, expiresAt: '2025-12-31' },
]

export type CouponResult =
  | { valid: true; coupon: Coupon }
  | { valid: false; error: string }

/**
 * Procura um cupom pelo código.
 * O código não diferencia maiúsculas de minúsculas e ignora espaços nas pontas.
 * `today` existe para que os testes consigam controlar a data.
 */
export function validateCoupon(code: string, today: Date = new Date()): CouponResult {
  const normalized = code.trim().toUpperCase()

  if (normalized === '') {
    return { valid: false, error: 'Digite um cupom' }
  }

  const coupon = COUPONS.find((c) => c.code === normalized)

  if (!coupon) {
    return { valid: false, error: 'Cupom inválido' }
  }

  if (coupon.expiresAt && isAfterDay(today, coupon.expiresAt)) {
    return { valid: false, error: 'Cupom expirado' }
  }

  return { valid: true, coupon }
}

/**
 * Calcula o desconto em centavos que o cupom dá sobre o subtotal.
 * O desconto nunca é maior que o subtotal (o total nunca fica negativo).
 */
export function calculateDiscount(subtotal: number, coupon: Coupon | null): number {
  if (!coupon) {
    return 0
  }

  switch (coupon.type) {
    case 'percent':
      return Math.round((subtotal * coupon.value) / 100)
    case 'fixed':
      return coupon.value
    case 'free-shipping':
      return 0
  }
}

// Compara só o dia (o cupom vale até o fim do dia de expiração).
function isAfterDay(date: Date, isoDay: string): boolean {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}` > isoDay
}
