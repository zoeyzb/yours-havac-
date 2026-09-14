import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

test('Apple Pay slot is owned by Stripe with no custom loading or unavailable overlay', () => {
  const checkout = readFileSync(new URL('../app/checkout/checkout-form.tsx', import.meta.url), 'utf8')
  assert.ok(!checkout.includes('Loading Apple Pay…'))
  assert.ok(!checkout.includes('Apple Pay unavailable'))
  assert.ok(!checkout.includes('apple-pay-unavailable'))
  assert.ok(checkout.includes('paymentMethods: { applePay: "always"'))
  assert.ok(checkout.includes('ref={appleRef}'))
})
