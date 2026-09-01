import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const config = readFileSync(new URL('../lib/site-config.ts', import.meta.url), 'utf8')
const component = readFileSync(new URL('../components/handyman-site.tsx', import.meta.url), 'utf8')
const homepage = readFileSync(new URL('../app/page.tsx', import.meta.url), 'utf8')

function quotedValues(block, key) {
  return [...block.matchAll(new RegExp(`${key}:\\s*"([^"]+)"`, 'g'))].map((match) => match[1])
}

test('universal HVAC master has broad services and no financing assumption', () => {
  const servicesBlock = config.match(/services:\s*\[(.*?)\],\n\s*reviews:/s)?.[1] ?? ''
  const serviceCount = (servicesBlock.match(/title:\s*"/g) ?? []).length
  assert.ok(serviceCount >= 8, `expected at least 8 services, found ${serviceCount}`)
  assert.equal(/financing/i.test(config), false, 'universal master should not assume financing')
})

test('service photography is unique, descriptive, and not recycled into proof cards', () => {
  const servicesBlock = config.match(/services:\s*\[(.*?)\],\n\s*reviews:/s)?.[1] ?? ''
  const projectsBlock = config.match(/projects:\s*\[(.*?)\],\n\s*faqs:/s)?.[1] ?? ''
  const serviceImages = quotedValues(servicesBlock, 'image')
  const serviceAlts = quotedValues(servicesBlock, 'imageAlt')
  const projectImages = quotedValues(projectsBlock, 'image')

  assert.ok(serviceImages.length >= 8, 'each service should have its own image')
  assert.equal(new Set(serviceImages).size, serviceImages.length, 'service image URLs must be unique')
  assert.equal(serviceAlts.length, serviceImages.length, 'each service image needs useful alt text')
  for (const image of projectImages) {
    assert.equal(serviceImages.includes(image), false, `proof image is recycled from a service card: ${image}`)
  }
})

test('public copy never talks about templates, stock photos, or sounding real', () => {
  const publicSource = `${component}\n${config}`.toLowerCase()
  for (const banned of [
    'reviews that sound like real service',
    'looks like hvac work',
    'stock photos',
    'master site',
    'template itself',
    'demo-template',
  ]) {
    assert.equal(publicSource.includes(banned), false, `public-facing implementation language leaked into site: ${banned}`)
  }
})

test('image cards have a designed fallback instead of blank empty panels', () => {
  assert.ok(component.includes('onError'), 'image elements need an error fallback')
  assert.ok(component.includes('Photo unavailable'), 'image fallback should remain informative instead of blank')
})

test('premium visual contract avoids SaaS blue and fake before-after proof', () => {
  assert.equal(component.includes('bg-blue-600'), false, 'primary actions still use cheap SaaS blue')
  assert.equal(component.includes('text-blue-600'), false, 'section accents still use cheap SaaS blue')
  assert.equal(component.includes('Before & After'), false, 'fake before/after proof should be removed')
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
