import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

test('checkout preloads the current Stripe Dahlia runtime before wallet initialization', () => {
  const rootLayout = readFileSync(new URL('../app/layout.tsx', import.meta.url), 'utf8')
  assert.ok(rootLayout.includes('https://js.stripe.com/dahlia/stripe.js'))
  assert.ok(rootLayout.includes('strategy="beforeInteractive"'))
})
