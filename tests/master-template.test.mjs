import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const config = readFileSync(new URL('../lib/site-config.ts', import.meta.url), 'utf8')
const component = readFileSync(new URL('../components/hvac-site.tsx', import.meta.url), 'utf8')
const styles = readFileSync(new URL('../app/globals.css', import.meta.url), 'utf8')
const homepage = readFileSync(new URL('../app/page.tsx', import.meta.url), 'utf8')
const packageJson = readFileSync(new URL('../package.json', import.meta.url), 'utf8')

test('universal HVAC master stays broad and avoids financing assumptions', () => {
  const servicesBlock = config.match(/services:\s*\[(.*?)\],\n\s*reviews:/s)?.[1] ?? ''
  const serviceCount = (servicesBlock.match(/title:\s*"/g) ?? []).length
  assert.ok(serviceCount >= 8, `expected at least 8 services, found ${serviceCount}`)
  assert.equal(/financing/i.test(`${config}\n${component}`), false, 'universal master should not assume financing')
})

test('contact placeholders never create broken phone or email actions', () => {
  assert.ok(config.includes('phoneDisplay: "Add Your Number"'))
  assert.ok(config.includes('phoneHref: ""'))
  assert.ok(component.includes('const hasPhone'))
  assert.ok(component.includes('function PhoneAction'))
  assert.ok(component.includes('function EmailAction'))
  assert.equal(component.includes('href={phoneHref}'), false, 'placeholder template must not expose a raw tel link')
})

test('homepage has premium motion and accessible interaction primitives', () => {
  assert.ok(packageJson.includes('"motion"'), 'Motion dependency is required')
  assert.ok(packageJson.includes('"@radix-ui/react-accordion"'), 'Radix Accordion dependency is required')
  assert.ok(component.includes('from "motion/react"'), 'Motion React should drive scroll and hover movement')
  assert.ok(component.includes('@radix-ui/react-accordion'), 'FAQ should use Radix Accordion')
  assert.ok(component.includes('whileInView'), 'scroll-triggered motion should be present')
  assert.ok(component.includes('useReducedMotion'), 'motion must respect reduced-motion preferences')
  assert.ok(styles.includes('prefers-reduced-motion'), 'CSS motion must have a reduced-motion fallback')
})

test('homepage uses contractor-first proof, service standards, compact workflow, and clear CTA', () => {
  for (const required of [
    'Comfort back.',
    'contractor-proof-strip',
    'service-standard-grid',
    'workflow-compact',
    'cta-outcome',
    'Homeowner Reviews',
    'review-marquee',
    'MobileServiceBar',
    'Schedule Service',
  ]) {
    assert.ok(`${component}\n${styles}`.includes(required), `missing contractor-first element: ${required}`)
  }

  for (const rejected of [
    'hero-trust-orbit',
    'proof-constellation',
    'proof-satellite',
    'credibility-stage',
    'credibility-core',
    'credibility-callout',
    'workflow-traveler',
  ]) {
    assert.equal(`${component}\n${styles}`.includes(rejected), false, `cartoon/decorative pattern should be removed: ${rejected}`)
  }

  assert.equal(component.includes('No vague answers.'), false, 'childish gradient credibility headline should be replaced')
  assert.ok(component.includes('What homeowners can expect'), 'credibility section should lead with practical expectations')
  assert.ok(component.includes('From first call to system running'), 'workflow copy should describe a practical service outcome')
  assert.ok(component.includes('Need HVAC help?'), 'final CTA should be immediately understandable')
})

test('visual contract avoids cheap SaaS styling and fake proof', () => {
  assert.equal(component.includes('bg-blue-600'), false, 'primary actions should not regress to generic SaaS blue')
  assert.equal(component.includes('Before & After'), false, 'fake before/after proof should stay removed')
  assert.equal(/100% satisfaction guaranteed/i.test(`${component}\n${config}`), false)
})

test('homepage metadata is HVAC-specific and contains no stale handyman branding', () => {
  assert.equal(homepage.includes('Oakwell House Care'), false, 'homepage still contains old Oakwell branding')
  assert.equal(homepage.includes('Premium Handyman Template'), false, 'homepage still contains old handyman metadata')
  assert.ok(homepage.includes('Prime Heating & Cooling'), 'homepage title should use the HVAC demo brand')
})
