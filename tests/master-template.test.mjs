import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const config = readFileSync(new URL('../lib/site-config.ts', import.meta.url), 'utf8')
const component = readFileSync(new URL('../components/handyman-site.tsx', import.meta.url), 'utf8')
const homepage = readFileSync(new URL('../app/page.tsx', import.meta.url), 'utf8')

test('universal HVAC master stays broad and avoids financing assumptions', () => {
  const servicesBlock = config.match(/services:\s*\[(.*?)\],\n\s*reviews:/s)?.[1] ?? ''
  const serviceCount = (servicesBlock.match(/title:\s*"/g) ?? []).length
  assert.ok(serviceCount >= 8, `expected at least 8 services, found ${serviceCount}`)
  assert.equal(/financing/i.test(`${config}\n${component}`), false, 'universal master should not assume financing')
})

test('supplied photos are wired into the most important sections', () => {
  assert.ok(config.includes('/hvac/hero-tech.svg'), 'hero should use the supplied smiling HVAC technician photo')
  assert.ok(config.includes('/hvac/local-tech.svg'), 'local section should use the supplied thumbs-up technician photo')
  assert.ok(config.includes('/hvac/ac-repair.svg'), 'AC repair should use the supplied service photo')
})

test('homepage is clear, trust-heavy, and mobile ready', () => {
  for (const required of [
    'Comfort back.',
    'Why Choose Us',
    'How It Works',
    'Frequently Asked Questions',
    'Reviews',
    'Local HVAC help, close to home.',
    'MobileServiceBar',
    'Schedule Service',
  ]) {
    assert.ok(component.includes(required), `missing required homepage element: ${required}`)
  }
})

test('reviews stay location-neutral for reuse across cities', () => {
  const reviewsBlock = config.match(/reviews:\s*\[(.*?)\],\n\s*projects:/s)?.[1] ?? ''
  assert.ok((reviewsBlock.match(/Local homeowner/g) ?? []).length >= 6, 'reviews should use location-neutral homeowner labels')
  for (const city of ['Austin', 'Phoenix', 'Round Rock', 'Cedar Park', 'Pflugerville']) {
    assert.equal(reviewsBlock.includes(city), false, `review copy should not hard-code ${city}`)
  }
})

test('public implementation language does not leak into the site', () => {
  const publicSource = `${component}\n${config}`.toLowerCase()
  for (const banned of ['master template', 'stock photo', 'sounds like real service', 'demo-template']) {
    assert.equal(publicSource.includes(banned), false, `public-facing implementation language leaked into site: ${banned}`)
  }
})

test('visual contract keeps the warm premium direction and photo fallbacks', () => {
  assert.equal(component.includes('bg-blue-600'), false, 'primary actions should not regress to SaaS blue')
  assert.equal(component.includes('Before & After'), false, 'fake before/after proof should stay removed')
  assert.ok(component.includes('onError'), 'photos should fail gracefully if an external source breaks')
})

test('homepage metadata is HVAC-specific and contains no stale handyman branding', () => {
  assert.equal(homepage.includes('Oakwell House Care'), false, 'homepage still contains old Oakwell branding')
  assert.equal(homepage.includes('Premium Handyman Template'), false, 'homepage still contains old handyman metadata')
  assert.ok(homepage.includes('Prime Heating & Cooling'), 'homepage title should use the HVAC demo brand')
})
