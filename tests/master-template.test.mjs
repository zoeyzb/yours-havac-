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

test('premium visual contract avoids SaaS blue and demo-template language', () => {
  assert.equal(component.includes('bg-blue-600'), false, 'primary actions still use cheap SaaS blue')
  assert.equal(component.includes('text-blue-600'), false, 'section accents still use cheap SaaS blue')
  assert.equal(component.includes('master site'), false, 'public copy still describes the template itself')
  assert.equal(component.includes('Before & After'), false, 'fake before/after proof should be removed')
  assert.ok(component.includes('Service in Action'), 'missing HVAC-specific visual proof section')
})

test('homepage keeps trust, reviews, rating, process, FAQ, and mobile service actions', () => {
  for (const required of ['4.9', 'Reviews', 'How It Works', 'Frequently Asked Questions', 'Schedule Service', 'MobileServiceBar']) {
    assert.ok(component.includes(required), `missing required homepage element: ${required}`)
  }
})

test('homepage metadata is HVAC-specific and contains no stale public handyman branding', () => {
  assert.equal(homepage.includes('Oakwell House Care'), false, 'homepage still contains old Oakwell branding')
  assert.equal(homepage.includes('Premium Handyman Template'), false, 'homepage still contains old handyman metadata')
  assert.ok(homepage.includes('Prime Heating & Cooling'), 'homepage title should use the HVAC demo brand')
})
