import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const config = readFileSync(new URL('../lib/site-config.ts', import.meta.url), 'utf8')
const component = readFileSync(new URL('../components/handyman-site.tsx', import.meta.url), 'utf8')
const homepage = readFileSync(new URL('../app/page.tsx', import.meta.url), 'utf8')

test('universal HVAC master has broad services and no financing assumption', () => {
  const servicesBlock = config.match(/services:\s*\[(.*?)\],\n\s*reviews:/s)?.[1] ?? ''
  const serviceCount = (servicesBlock.match(/title:\s*"/g) ?? []).length

  assert.ok(serviceCount >= 8, `expected at least 8 services, found ${serviceCount}`)
  assert.equal(/financing/i.test(config), false, 'universal master should not assume financing')
})

test('homepage includes proof, process, FAQ, and mobile service actions', () => {
  for (const required of ['Before & After', 'How It Works', 'Frequently Asked Questions', 'Schedule Service', 'MobileServiceBar']) {
    assert.ok(component.includes(required), `missing required homepage element: ${required}`)
  }
})

test('homepage metadata is HVAC-specific and contains no handyman base branding', () => {
  assert.equal(/Oakwell|Handyman/i.test(homepage), false, 'homepage still contains stale handyman branding')
  assert.ok(homepage.includes('Prime Heating & Cooling'), 'homepage title should use the HVAC demo brand')
})
