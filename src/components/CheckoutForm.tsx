import { useState, type FormEvent } from 'react'
import { MAX_INSTALLMENTS, validateCheckout, type CheckoutErrors } from '../lib/checkout'
import { formatCurrency } from '../lib/currency'
import type { CheckoutData, PaymentMethod } from '../types'

interface CheckoutFormProps {
  total: number
  initialCep?: string
  submitting?: boolean
  onCepChange?: (cep: string) => void
  onSubmit: (data: CheckoutData) => void
}

type TextFieldName = 'name' | 'email' | 'cpf' | 'cep' | 'address'

const TEXT_FIELDS: { name: TextFieldName; label: string; placeholder?: string }[] = [
  { name: 'name', label: 'Nome completo' },
  { name: 'email', label: 'E-mail', placeholder: 'voce@exemplo.com' },
  { name: 'cpf', label: 'CPF', placeholder: '000.000.000-00' },
  { name: 'cep', label: 'CEP', placeholder: '00000-000' },
  { name: 'address', label: 'Endereço', placeholder: 'Rua, número e bairro' },
]

const PAYMENT_OPTIONS: { value: PaymentMethod; label: string }[] = [
  { value: 'cartao', label: 'Cartão de crédito' },
  { value: 'pix', label: 'Pix' },
  { value: 'boleto', label: 'Boleto' },
]

export function CheckoutForm({
  total,
  initialCep = '',
  submitting = false,
  onCepChange,
  onSubmit,
}: CheckoutFormProps) {
  const [data, setData] = useState<CheckoutData>({
    name: '',
    email: '',
    cpf: '',
    cep: initialCep,
    address: '',
    payment: 'pix',
    installments: 1,
  })
  const [errors, setErrors] = useState<CheckoutErrors>({})

  function updateField<K extends keyof CheckoutData>(field: K, value: CheckoutData[K]) {
    setData((current) => ({ ...current, [field]: value }))
    if (field === 'cep') {
      onCepChange?.(value as string)
    }
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const validationErrors = validateCheckout(data)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      onSubmit(data)
    }
  }

  return (
    <form className="checkout-form" onSubmit={handleSubmit} noValidate>
      <fieldset>
        <legend>Seus dados</legend>
        {TEXT_FIELDS.map((field) => {
          const error = errors[field.name]
          const errorId = `${field.name}-error`
          return (
            <div className="field" key={field.name}>
              <label htmlFor={field.name}>{field.label}</label>
              <input
                id={field.name}
                value={data[field.name]}
                placeholder={field.placeholder}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? errorId : undefined}
                onChange={(event) => updateField(field.name, event.target.value)}
              />
              {error && (
                <p id={errorId} className="error">
                  {error}
                </p>
              )}
            </div>
          )
        })}
      </fieldset>

      <fieldset>
        <legend>Forma de pagamento</legend>
        <p className="muted">Pagamento fictício: nenhuma cobrança será feita.</p>
        <div className="radio-group">
          {PAYMENT_OPTIONS.map((option) => (
            <label key={option.value} className="radio">
              <input
                type="radio"
                name="payment"
                value={option.value}
                checked={data.payment === option.value}
                onChange={() => updateField('payment', option.value)}
              />
              {option.label}
            </label>
          ))}
        </div>

        {data.payment === 'cartao' && (
          <div className="field">
            <label htmlFor="installments">Parcelas</label>
            <select
              id="installments"
              value={data.installments}
              onChange={(event) => updateField('installments', Number(event.target.value))}
            >
              {Array.from({ length: MAX_INSTALLMENTS }, (_, index) => index + 1).map((n) => (
                <option key={n} value={n}>
                  {n}x de {formatCurrency(Math.round(total / n))} sem juros
                </option>
              ))}
            </select>
          </div>
        )}
      </fieldset>

      <button type="submit" className="button button-large" disabled={submitting}>
        {submitting ? 'Processando...' : 'Confirmar pedido'}
      </button>
    </form>
  )
}
