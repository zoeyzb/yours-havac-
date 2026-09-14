import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const source = readFileSync(new URL('../app/checkout/checkout-form.tsx', import.meta.url), 'utf8')

test('Apple Pay uses the previously working dedicated Stripe Elements flow and mounts below card', () => {
  assert.ok(source.includes('const appleRef = useRef<HTMLDivElement>(null)'), 'Apple Pay needs its own native mount')
  assert.ok(source.includes('const appleElementsRef = useRef<any>(null)'), 'Apple Pay needs its own Elements instance')
  assert.ok(source.includes('createIntent("card"),\n          createIntent("card")'), 'Apple Pay should receive its own card PaymentIntent as in the previously working flow')
  assert.ok(source.includes('const appleElements = stripe.elements({ clientSecret: appleIntent.clientSecret, appearance })'), 'Apple Pay must use the dedicated PaymentIntent')
  assert.ok(source.includes('apple = appleElements.create("expressCheckout"'), 'Apple Pay must use Stripe Express Checkout')
  assert.ok(source.includes('applePay: "always"'), 'Apple Pay must be requested from Stripe')
  assert.ok(source.includes('confirm(appleElementsRef.current)'), 'Apple Pay must confirm its own Elements instance')
  assert.ok(source.includes('<div className="apple-pay-below-card">'), 'Apple Pay must mount below the card fields')

  const cardStart = source.indexOf('card = cardElements.create("payment"')
  const cardEnd = source.indexOf('card.mount(cardRef.current)')
  const cardBlock = source.slice(cardStart, cardEnd)
  assert.ok(cardBlock.includes('applePay: "never"'), 'card Payment Element must not compete with the dedicated Apple Pay element')
})
