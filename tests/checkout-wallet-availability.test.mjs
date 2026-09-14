import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

test('Stripe checkout boots independently of Next Script callbacks', () => {
  const checkoutForm = readFileSync(new URL('../app/checkout/checkout-form.tsx', import.meta.url), 'utf8')

  assert.equal(
    checkoutForm.includes('from "next/script"'),
    false,
    'checkout must not depend on Next Script onReady to initialize Stripe',
  )
  assert.ok(
    checkoutForm.includes('ensureStripeJs()'),
    'checkout must explicitly load or reuse Stripe.js before mounting Elements',
  )
  assert.ok(
    checkoutForm.includes('availablepaymentmethodschange'),
    'Express Checkout availability must come from Stripe availability events',
  )
  assert.ok(
    checkoutForm.includes('Boolean(event?.paymentMethods)'),
    'Apple/Google wallet slots configure one wallet each, so any rendered paymentMethods means that wallet is available',
  )
  assert.equal(
    checkoutForm.includes('applePayElement.on("ready"'),
    false,
    'ready must not be treated as the wallet availability event',
  )
})
