import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'

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
    'standards-rail',
    'workflow-compact',
    'cta-outcome',
    'Homeowner Reviews',
    'review-marquee',
    'MobileServiceBar',
    'Request Service',
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
  assert.ok(homepage.includes('siteConfig.brand.name'), 'homepage title should derive from the configured preview brand')
})


test('conversion pass removes template leakage and adds outcome-focused proof', () => {
  const source = `${component}\n${config}\n${styles}`
  for (const required of [
    'service-outcome',
    'service-path',
    'review-meta',
    'faq-help-panel',
    'faq-help-actions',
    'standards-rail',
    'Heating or AC problem?',
  ]) {
    assert.ok(source.includes(required), `missing conversion improvement: ${required}`)
  }

  for (const rejected of [
    'Template contact details stay inactive',
    'Add the actual service area before sending this page to a customer',
    'Before sharing this template',
    'Give homeowners one clear next step',
  ]) {
    assert.equal(component.includes(rejected), false, `public-facing template instruction should be removed: ${rejected}`)
  }
})


test('aggressive contractor redesign uses bold industrial hierarchy instead of subtle pale panels', () => {
  const source = `${component}\n${styles}`
  for (const required of [
    'hero-industrial',
    'hero-quick-actions',
    'proof-ribbon',
    'service-card--industrial',
    'standards-rail',
    'work-strip',
    'faq-panel--dark',
    'cta-panel--orange',
  ]) {
    assert.ok(source.includes(required), `missing bold contractor redesign element: ${required}`)
  }

  assert.equal(source.includes('service-standard-bar'), false, 'subtle standards bar should be replaced with a stronger rail')
  assert.equal(source.includes('proof-board__grid'), false, 'subtle proof grid should be replaced with a bolder proof ribbon')
})


test('owner conversion layer feels separate from the homeowner website and removes placeholder header leakage', () => {
  const header = component.match(/function Header[\s\S]*?function Hero/)?.[0] ?? ''
  assert.equal(header.includes('<PhoneAction'), false, 'placeholder phone action should not appear in the main homeowner header')
  assert.ok(component.includes('Your website preview is ready.'), 'owner preview bar should read like a preview control')
  assert.ok(component.includes('Make It Yours — $97'), 'owner CTAs should use one clear priced claim action')
  assert.equal(component.includes('href="https://recoverrevenue.company"'), false, 'owner CTAs should not dump buyers on the generic Recover Revenue homepage')
})

test('owner offer uses an aligned motion-led four-step rail', () => {
  const source = `${component}\n${styles}`
  for (const required of [
    'From preview to live.',
    'owner-steps',
    'owner-steps__line',
    'owner-step__node',
  ]) {
    assert.ok(source.includes(required), `missing owner step rail element: ${required}`)
  }
  assert.equal(source.includes('owner-journey__track'), false, 'wavy journey track should stay removed')
})


test('claim flow has a dedicated product page, live Stripe deposit, and post-payment handoff', () => {
  const claimUrl = new URL('../app/claim/page.tsx', import.meta.url)
  const successUrl = new URL('../app/claim/success/page.tsx', import.meta.url)
  assert.ok(existsSync(claimUrl), 'dedicated claim page should exist before sending a buyer to Stripe')
  assert.ok(existsSync(successUrl), 'post-payment success page should exist')
  if (!existsSync(claimUrl) || !existsSync(successUrl)) return

  const claimPage = readFileSync(claimUrl, 'utf8')
  const successPage = readFileSync(successUrl, 'utf8')
  assert.ok(claimPage.includes('Make this website yours.'), 'claim page should explain the transaction')
  assert.ok(claimPage.includes('$97') && claimPage.includes('today'), 'claim page should make the deposit obvious')
  assert.ok(claimPage.includes('Remaining $500 only after you approve'), 'claim page should preserve the risk reversal')
  assert.ok(claimPage.includes('https://buy.stripe.com/dRm00ia7agwLdrX6JzeEo00'), 'claim page should use the live Stripe payment link')
  assert.ok(successPage.includes('Payment received'), 'success page should confirm the deposit and explain next steps')
})


test('preview uses generic owner-safe branding instead of pretending to know the business name', () => {
  assert.ok(config.includes('name: "Your Heating & Cooling"'), 'preview brand should stay generic until real business details are supplied')
  assert.equal(config.includes('name: "Prime Heating & Cooling"'), false, 'demo company name should not leak into cold outreach previews')
  assert.equal(homepage.includes('Prime Heating & Cooling'), false, 'homepage metadata should not hard-code the old demo business')
})

test('owner sales UI is restrained on desktop and uses one clear claim action', () => {
  const source = `${component}\n${styles}`
  assert.ok(component.includes('Your website preview is ready.'), 'top owner strip should read like a preview control')
  assert.ok(component.includes('Make It Yours — $97'), 'owner CTA should say exactly what happens and what it costs')
  assert.ok(component.includes('function OwnerMobileClaimBar'), 'mobile-only owner CTA should exist')
  assert.equal(component.includes('function OwnerFloatingBar'), false, 'desktop floating sales bar should be removed')
  assert.ok(source.includes('owner-mobile-claim'), 'mobile claim bar should have a dedicated responsive class')
})

test('owner offer is simpler, outcome-led, and uses an aligned four-step rail', () => {
  const source = `${component}\n${styles}`
  for (const required of [
    'Your website is already built.',
    'Make it yours.',
    'Remaining $500 only after you approve',
    'owner-steps',
    'owner-steps__line',
    'Reserve — $97',
    'We customize',
    'You approve',
    'Pay $500 + launch',
  ]) {
    assert.ok(source.includes(required), `missing owner polish element: ${required}`)
  }
  for (const rejected of [
    'More trust. More calls. A cleaner path to the next job.',
    'owner-journey__track',
    'owner-journey__pulse',
    'Four moves. No agency maze.',
  ]) {
    assert.equal(source.includes(rejected), false, `old noisy owner element should be removed: ${rejected}`)
  }
})

test('claim page keeps checkout concise and approval-first', () => {
  const claimPage = readFileSync(new URL('../app/claim/page.tsx', import.meta.url), 'utf8')
  assert.ok(claimPage.includes('Make this website yours.'), 'claim page should use a short contractor-friendly headline')
  assert.ok(claimPage.includes('Remaining $500 only after you approve'), 'claim page should emphasize approval before the balance')
  assert.ok(claimPage.includes('Make It Yours — $97'), 'claim page CTA should match the preview CTA')
})
