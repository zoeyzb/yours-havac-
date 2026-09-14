import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const source = readFileSync(new URL('../app/checkout/checkout-form.tsx', import.meta.url), 'utf8')

test('Apple Pay shares the working card Stripe Elements instance without duplicating inside the card form', () => {
  assert.equal(source.includes('appleElementsRef'), false, 'Apple Pay must not create a second Elements instance')
  assert.ok(source.includes('apple = cardElements.create("expressCheckout"'), 'top Apple Pay must bind to the same card Elements instance')
  assert.ok(source.includes('confirm(cardElementsRef.current)'), 'top Apple Pay must confirm the same intent as the working card checkout')

  const cardStart = source.indexOf('card = cardElements.create("payment"')
  const cardEnd = source.indexOf('card.mount(cardRef.current)')
  const cardBlock = source.slice(cardStart, cardEnd)

  assert.ok(cardBlock.includes('applePay: "never"'), 'card Payment Element must not render a second Apple Pay option')
  assert.ok(cardBlock.includes('googlePay: "never"'), 'card Payment Element must not render Google Pay inside the card form')
  assert.equal(source.includes('createIntent("card"),\n          createIntent("card")'), false, 'checkout must not create a duplicate Apple Pay PaymentIntent on load')
})
