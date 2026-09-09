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


test('owner conversion layer stays visible and sends every owner CTA straight to Stripe', () => {
  const header = component.match(/function Header[\s\S]*?function Hero/)?.[0] ?? ''
  assert.equal(header.includes('<PhoneAction'), false, 'placeholder phone action should not appear in the main homeowner header')
  assert.ok(component.includes('Your website preview is ready.'), 'sticky owner preview bar should remain the dominant owner control')
  assert.ok(component.includes('Start for $97'), 'owner CTA should be short and priced')
  assert.ok(component.includes('https://buy.stripe.com/dRm00ia7agwLdrX6JzeEo00'), 'owner CTAs should go straight to Stripe')
  assert.equal(component.includes('href="/claim"'), false, 'owner CTAs should not add an intermediate claim page')
  assert.ok(styles.includes('.owner-preview-bar') && styles.includes('position: sticky'), 'preview bar should stay visible while scrolling')
  assert.ok(component.includes('function OwnerFloatingClaimBar'), 'desktop and mobile should have a persistent lower owner CTA')
})

test('owner offer is compact, punchy, and keeps the four-step motion inside the price card', () => {
  const source = `${component}\n${styles}`
  for (const required of [
    'The website is built.',
    'Add your details. Go live.',
    'More visibility',
    'More calls',
    'Mobile-first',
    'Your services + area',
    'Your reviews + trust',
    'Domain + launch',
    'Start with $97 today',
    'owner-card-flow',
    'owner-card-flow__line',
    'Reserve',
    'Customize',
    'Approve',
    'Launch',
  ]) {
    assert.ok(source.includes(required), `missing compact owner funnel element: ${required}`)
  }
  for (const rejected of [
    'From preview to live.',
    'owner-steps',
    'Built to get calls',
    'Looks established',
    'Ready on mobile',
    'Make this preview yours',
  ]) {
    assert.equal(source.includes(rejected), false, `repetitive owner element should be removed: ${rejected}`)
  }
})


test('claim flow goes straight to live Stripe and preserves the post-payment handoff', () => {
  const claimUrl = new URL('../app/claim/page.tsx', import.meta.url)
  const successUrl = new URL('../app/claim/success/page.tsx', import.meta.url)
  assert.ok(existsSync(claimUrl), 'legacy claim route should remain as a redirect')
  assert.ok(existsSync(successUrl), 'post-payment success page should exist')
  if (!existsSync(claimUrl) || !existsSync(successUrl)) return

  const claimPage = readFileSync(claimUrl, 'utf8')
  const successPage = readFileSync(successUrl, 'utf8')
  assert.ok(claimPage.includes('redirect('), 'claim route should immediately hand off to Stripe')
  assert.ok(claimPage.includes('https://buy.stripe.com/dRm00ia7agwLdrX6JzeEo00'), 'claim redirect should use the live Stripe payment link')
  assert.ok(successPage.includes('Payment received'), 'success page should confirm the deposit and explain next steps')
})


test('preview removes fake business branding entirely', () => {
  assert.equal(config.includes('name: "Your Heating & Cooling"'), false, 'fake generic business name should be removed')
  assert.equal(config.includes('name: "Prime Heating & Cooling"'), false, 'demo company name should not leak into cold outreach previews')
  assert.ok(config.includes('name: "HVAC Website Preview"'), 'internal metadata may identify this as a website preview')
  assert.ok(component.includes('Comfort at home.'), 'header should use a neutral homeowner tagline instead of a fake business name')
  assert.equal(component.includes('<BrandMark />'), false, 'fake brand mark should not appear in the public header or footer')
  assert.equal(component.includes('Residential HVAC service</div>'), true, 'hero service label should remain but without a tool icon')
})

test('owner sales UI uses a persistent preview strip plus one floating checkout action', () => {
  const source = `${component}\n${styles}`
  assert.ok(component.includes('Your website preview is ready.'), 'top owner strip should read like a preview control')
  assert.ok(component.includes('Start for $97'), 'owner CTA should use one short priced action')
  assert.ok(component.includes('function OwnerFloatingClaimBar'), 'floating claim action should exist on desktop and mobile')
  assert.ok(source.includes('owner-floating-claim'), 'floating claim bar should have dedicated responsive styles')
})

test('owner price card keeps the approval-first risk reversal without repeated paragraphs', () => {
  const source = `${component}\n${styles}`
  assert.ok(source.includes('$597 total'))
  assert.ok(source.includes('Remaining $500 only after you approve'))
  assert.ok(source.includes('We add your details'))
  assert.ok(source.includes('Review + request changes'))
  assert.ok(source.includes('3 business days'))
  assert.equal(source.includes('We replace the preview details with yours.'), false)
})

test('legacy claim route redirects immediately to Stripe', () => {
  const claimPage = readFileSync(new URL('../app/claim/page.tsx', import.meta.url), 'utf8')
  assert.ok(claimPage.includes('redirect('), 'legacy claim route should redirect instead of rendering another sales page')
  assert.ok(claimPage.includes('https://buy.stripe.com/dRm00ia7agwLdrX6JzeEo00'), 'legacy claim route should redirect to the live Stripe checkout')
  assert.equal(claimPage.includes('Make this website yours.'), false, 'intermediate claim page should be removed')
})
