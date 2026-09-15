import { readFileSync } from "node:fs"
import test from "node:test"
import assert from "node:assert/strict"

const source = readFileSync("app/checkout/checkout-form.tsx", "utf8")

test("Apple Pay uses native Stripe Express Checkout on the card Elements instance", () => {
  assert.ok(source.includes('applePay: "always"'))
  assert.ok(source.includes('const appleElements = cardElements'))
  assert.ok(source.includes('appleElements.create("expressCheckout"'))
  assert.ok(source.includes('wallets: { link: "never" }'))
  assert.ok(source.includes('apple.on("ready"'))
  assert.ok(source.includes('apple.on("availablepaymentmethodschange"'))
  assert.ok(source.includes('ref={appleRef}'))
  assert.equal(source.includes('Loading Apple Pay…'), false)
  assert.equal(source.includes('Apple Pay unavailable'), false)
})
