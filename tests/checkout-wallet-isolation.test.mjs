import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const source = readFileSync(new URL('../app/checkout/checkout-form.tsx', import.meta.url), 'utf8')

test('Apple Pay uses a dedicated Stripe Elements instance and does not duplicate inside the card form', () => {
  assert.ok(source.includes('appleElementsRef'), 'Apple Pay needs its own Elements instance')
  assert.ok(source.includes('confirm(appleElementsRef.current)'), 'top Apple Pay must confirm its own intent')

  const cardStart = source.indexOf('card = cardElements.create("payment"')
  const cardEnd = source.indexOf('card.mount(cardRef.current)')
  const cardBlock = source.slice(cardStart, cardEnd)

  assert.ok(cardBlock.includes('applePay: "never"'), 'card Payment Element must not render a second Apple Pay option')
  assert.ok(cardBlock.includes('googlePay: "never"'), 'card Payment Element must not render Google Pay inside the card form')
  assert.ok(source.includes('stripe.elements({ clientSecret: appleIntent.clientSecret'), 'top Apple Pay must use a separate intent from the card form')
})
