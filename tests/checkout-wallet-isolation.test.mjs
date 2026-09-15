import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const source = readFileSync(new URL('../app/checkout/checkout-form.tsx', import.meta.url), 'utf8')

test('Apple Pay uses Stripe official shared Elements pattern below card', () => {
  assert.ok(source.includes('const appleRef = useRef<HTMLDivElement>(null)'), 'Apple Pay needs its native mount')
  assert.equal(source.includes('appleElementsRef'), false, 'Apple Pay must not create a separate Elements instance')
  assert.equal(source.includes('createIntent("card"),\n          createIntent("card")'), false, 'checkout must create only one card PaymentIntent on load')
  assert.ok(source.includes('apple = cardElements.create("expressCheckout"'), 'Apple Pay must use Express Checkout on the same Elements instance as card')
  assert.ok(source.includes('applePay: "always"'), 'Express Checkout must request Apple Pay from Stripe')
  assert.ok(source.includes('confirm(cardElementsRef.current)'), 'Apple Pay must confirm the shared Elements instance')
  assert.ok(source.includes('<div className="apple-pay-below-card"><div ref={appleRef} /></div>'), 'Apple Pay must mount directly below the card fields')

  const cardStart = source.indexOf('card = cardElements.create("payment"')
  const cardEnd = source.indexOf('card.mount(cardRef.current)')
  const cardBlock = source.slice(cardStart, cardEnd)
  assert.equal(cardBlock.includes('applePay: "never"'), false, 'Payment Element must not disable Apple Pay on the shared Elements instance')
  assert.ok(cardBlock.includes('applePay: "auto"'), 'Payment Element should leave Apple Pay enabled so Express Checkout can own it')
})
