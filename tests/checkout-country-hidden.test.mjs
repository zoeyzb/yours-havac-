import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const checkoutForm = readFileSync(new URL('../app/checkout/checkout-form.tsx', import.meta.url), 'utf8')

test('card checkout hides the visible country selector but still supplies a billing country', () => {
  assert.ok(checkoutForm.includes('fields: { billingDetails: { address: "never" } }'), 'card Payment Element should not render a billing country selector')
  assert.ok(checkoutForm.includes('getBillingCountry()'), 'card confirmation should resolve a billing country without asking the buyer')
  assert.ok(checkoutForm.includes('payment_method_data: { billing_details: { address: { country: billingCountry } } }'), 'card confirmation must pass the hidden billing country to Stripe')
})
