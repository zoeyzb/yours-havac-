import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const checkout = readFileSync(new URL('../app/checkout/checkout-form.tsx', import.meta.url), 'utf8')

test('card checkout hides billing country and Apple Pay cannot hang forever', () => {
  assert.ok(
    checkout.includes('fields: { billingDetails: { address: "never" } }'),
    'card Payment Element should not render country/ZIP billing address fields',
  )
  assert.ok(
    checkout.includes('setTimeout(() =>') && checkout.includes('setAppleAvailable(false)'),
    'Apple Pay must resolve to an unavailable state instead of loading forever',
  )
  assert.ok(
    checkout.includes('Open in Safari for Apple Pay'),
    'unsupported in-app browsers should tell buyers how to use Apple Pay',
  )
})
