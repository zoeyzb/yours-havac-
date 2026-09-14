import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

test('Stripe checkout boots independently and never covers the native Apple Pay button while checking', () => {
  const checkoutForm = readFileSync(new URL('../app/checkout/checkout-form.tsx', import.meta.url), 'utf8')

  assert.equal(checkoutForm.includes('from "next/script"'), false)
  assert.ok(checkoutForm.includes('ensureStripeJs()'))
  assert.ok(checkoutForm.includes('availablepaymentmethodschange'))
  assert.ok(checkoutForm.includes('Boolean(event?.paymentMethods)'))
  assert.equal(
    checkoutForm.includes('wallet-checking'),
    false,
    'a checking overlay must never sit on top of Stripe\'s native Apple Pay mount',
  )
  assert.ok(
    checkoutForm.includes('native-wallet-mount native-wallet-mount--visible'),
    'the native Stripe Apple Pay mount must stay visible while availability resolves',
  )
})
