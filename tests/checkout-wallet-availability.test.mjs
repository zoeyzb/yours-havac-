import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

test('Stripe wallet availability uses each wallet available flag and never covers native Apple Pay', () => {
  const checkoutForm = readFileSync(new URL('../app/checkout/checkout-form.tsx', import.meta.url), 'utf8')

  assert.equal(checkoutForm.includes('from "next/script"'), false)
  assert.ok(checkoutForm.includes('ensureStripeJs()'))
  assert.ok(checkoutForm.includes('availablepaymentmethodschange'))
  assert.ok(
    checkoutForm.includes('e?.paymentMethods?.applePay?.available === true'),
    'Apple Pay must use Stripe paymentMethods.applePay.available',
  )
  assert.ok(
    checkoutForm.includes('e?.paymentMethods?.googlePay?.available === true'),
    'Google Pay must use Stripe paymentMethods.googlePay.available',
  )
  assert.equal(
    checkoutForm.includes('Boolean(e?.paymentMethods)'),
    false,
    'the paymentMethods object can exist while a wallet is unavailable',
  )
  assert.equal(checkoutForm.includes('wallet-checking'), false)
  assert.ok(checkoutForm.includes('native-wallet-mount native-wallet-mount--visible'))
})
