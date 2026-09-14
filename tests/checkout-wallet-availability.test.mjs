import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

test('Stripe wallet availability is resolved from the initial Express Checkout ready event', () => {
  const checkoutForm = readFileSync(new URL('../app/checkout/checkout-form.tsx', import.meta.url), 'utf8')

  assert.ok(
    checkoutForm.includes('applePayElement.on("ready"'),
    'Apple Pay availability must be resolved from the initial Express Checkout ready event',
  )
  assert.ok(
    checkoutForm.includes('event?.availablePaymentMethods'),
    'The ready event must read availablePaymentMethods from Stripe',
  )
  assert.ok(
    checkoutForm.includes('googlePayElement.on("ready"'),
    'Google Pay availability must also be resolved from the initial ready event',
  )
  assert.equal(
    checkoutForm.includes('setApplePayAvailable((current) => current === null ? false : current)'),
    false,
    'Apple Pay must not be marked unavailable by a timer before Stripe reports availability',
  )
  assert.equal(
    checkoutForm.includes('setGooglePayAvailable((current) => current === null ? false : current)'),
    false,
    'Google Pay must not be marked unavailable by a timer before Stripe reports availability',
  )
})
