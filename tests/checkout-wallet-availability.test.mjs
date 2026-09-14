import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

test('Stripe wallet availability uses the current Express Checkout event shape', () => {
  const checkoutForm = readFileSync(new URL('../app/checkout/checkout-form.tsx', import.meta.url), 'utf8')

  assert.ok(
    checkoutForm.includes('event?.paymentMethods'),
    'Express Checkout availability must read event.paymentMethods from availablepaymentmethodschange',
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
