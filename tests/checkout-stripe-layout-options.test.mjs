import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const source = readFileSync(new URL('../app/checkout/checkout-form.tsx', import.meta.url), 'utf8')

test('Stripe payment accordion uses current radios enum', () => {
  assert.equal(source.includes('radios: false'), false)
  assert.ok(source.includes('radios: "never"'))
})
