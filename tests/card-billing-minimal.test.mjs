import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const checkout = readFileSync(new URL('../app/checkout/checkout-form.tsx', import.meta.url), 'utf8')

test('card checkout does not opt out of all billing address fields', () => {
  assert.equal(checkout.includes('address: "never"'), false, 'hiding the whole billing address makes Stripe require every omitted address field at confirm time')
  assert.ok(checkout.includes('address: "if_required"'), 'Stripe should collect only billing fields that are actually required')
  assert.equal(checkout.includes('getBillingCountry()'), false, 'do not infer and inject a billing country from the browser')
})
