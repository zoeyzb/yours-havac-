import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const checkoutForm = readFileSync(new URL('../app/checkout/checkout-form.tsx', import.meta.url), 'utf8')

test('card confirmation lets Stripe collect billing details instead of forcing an incomplete US profile', () => {
  assert.equal(
    checkoutForm.includes('fields: { billingDetails: "never" }'),
    false,
    'suppressing all billing details can make Stripe confirmPayment throw when required billing values are missing',
  )
  assert.equal(
    checkoutForm.includes('address: { country: "US" }'),
    false,
    'checkout must not force a US billing country for every card',
  )
})

test('unexpected Stripe confirmation exceptions surface their actual message during checkout testing', () => {
  assert.ok(
    checkoutForm.includes('err instanceof Error ? err.message'),
    'the checkout should expose the Stripe integration error instead of replacing it with a generic failure',
  )
})
