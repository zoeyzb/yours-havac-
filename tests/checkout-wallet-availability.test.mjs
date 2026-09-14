import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

test('Stripe wallet availability resolves initially and on later changes', () => {
  const checkoutForm = readFileSync(new URL('../app/checkout/checkout-form.tsx', import.meta.url), 'utf8')

  assert.equal(checkoutForm.includes('from "next/script"'), false)
  assert.ok(checkoutForm.includes('ensureStripeJs()'))
  assert.ok(checkoutForm.includes('apple.on("ready"'))
  assert.ok(checkoutForm.includes('e?.availablePaymentMethods?.applePay === true'))
  assert.ok(checkoutForm.includes('apple.on("availablepaymentmethodschange"'))
  assert.ok(checkoutForm.includes('e?.paymentMethods?.applePay?.available === true'))
  assert.ok(checkoutForm.includes('el.on("ready"'))
  assert.ok(checkoutForm.includes('e?.availablePaymentMethods?.googlePay === true'))
  assert.ok(checkoutForm.includes('e?.paymentMethods?.googlePay?.available === true'))
  assert.equal(checkoutForm.includes('Boolean(e?.paymentMethods)'), false)
  assert.equal(checkoutForm.includes('wallet-checking'), false)
  assert.ok(checkoutForm.includes('native-wallet-mount native-wallet-mount--visible'))
})
