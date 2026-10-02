import type { CartItem, CheckoutData, Coupon, OrderSummary } from '../types'
import { getSubtotal } from './cart'
import { calculateDiscount } from './coupon'
import { calculateShipping } from './shipping'
import { isValidCep, isValidCpf, isValidEmail, isValidName } from './validators'

/**
 * Calcula subtotal, desconto, frete e total do pedido.
 * Sem CEP, o frete ainda não é conhecido (null) e não entra no total.
 */
export function calculateOrderSummary(
  items: CartItem[],
  coupon: Coupon | null,
  cep: string | null,
): OrderSummary {
  const subtotal = getSubtotal(items)
  const discount = calculateDiscount(subtotal, coupon)

  let shipping: number | null = null
  if (cep && isValidCep(cep)) {
    shipping = coupon?.type === 'free-shipping' ? 0 : calculateShipping(cep, subtotal)
  }

  const total = subtotal - discount + (shipping ?? 0)

  return { subtotal, discount, shipping, total }
}

/** Parcelas disponíveis no cartão: 1x até 3x sem juros. */
export const MAX_INSTALLMENTS = 3

export type CheckoutErrors = Partial<Record<keyof CheckoutData, string>>

/** Valida o formulário de checkout. Retorna um objeto vazio quando está tudo certo. */
export function validateCheckout(data: CheckoutData): CheckoutErrors {
  const errors: CheckoutErrors = {}

  if (!isValidName(data.name)) {
    errors.name = 'Informe nome e sobrenome'
  }
  if (!isValidEmail(data.email)) {
    errors.email = 'E-mail inválido'
  }
  if (!isValidCpf(data.cpf)) {
    errors.cpf = 'CPF inválido'
  }
  if (!isValidCep(data.cep)) {
    errors.cep = 'CEP inválido'
  }
  if (data.address.trim().length < 5) {
    errors.address = 'Informe o endereço completo'
  }
  if (data.payment === 'cartao' && (data.installments < 1 || data.installments > MAX_INSTALLMENTS)) {
    errors.installments = 'Número de parcelas inválido'
  }

  return errors
}
