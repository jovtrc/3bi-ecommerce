import { useState, type FormEvent } from 'react'
import { useCart } from '../context/CartContext'
import { getRegion } from '../lib/shipping'
import { isValidCep } from '../lib/validators'

export function ShippingForm() {
  const { cep, setCep } = useCart()
  const [value, setValue] = useState(cep)
  const [error, setError] = useState('')

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    if (isValidCep(value)) {
      setCep(value.trim())
      setError('')
    } else {
      setError('CEP inválido')
    }
  }

  return (
    <form className="box inline-form" onSubmit={handleSubmit} noValidate>
      <label className="field">
        <span>CEP</span>
        <input
          inputMode="numeric"
          placeholder="00000-000"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </label>
      <button type="submit" className="button button-secondary">
        Calcular frete
      </button>
      {error && (
        <p role="alert" className="error">
          {error}
        </p>
      )}
      {!error && cep && <p className="muted">Entrega para a região {getRegion(cep)}</p>}
    </form>
  )
}
