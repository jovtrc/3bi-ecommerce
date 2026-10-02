import { useState, type FormEvent } from 'react'
import { useCart } from '../context/CartContext'
import { validateCoupon } from '../lib/coupon'

export function CouponForm() {
  const { coupon, setCoupon } = useCart()
  const [code, setCode] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const result = validateCoupon(code)

    if (result.valid) {
      setCoupon(result.coupon)
      setCode('')
      setError('')
    } else {
      setError(result.error)
    }
  }

  if (coupon) {
    return (
      <div className="box">
        <p role="status" className="success">
          Cupom <strong>{coupon.code}</strong> aplicado
        </p>
        <button type="button" className="link-button" onClick={() => setCoupon(null)}>
          Remover cupom
        </button>
      </div>
    )
  }

  return (
    <form className="box inline-form" onSubmit={handleSubmit} noValidate>
      <label className="field">
        <span>Cupom de desconto</span>
        <input value={code} onChange={(event) => setCode(event.target.value)} />
      </label>
      <button type="submit" className="button button-secondary">
        Aplicar cupom
      </button>
      {error && (
        <p role="alert" className="error">
          {error}
        </p>
      )}
    </form>
  )
}
