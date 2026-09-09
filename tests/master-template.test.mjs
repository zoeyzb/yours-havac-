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


test('owner conversion layer uses one fixed lower CTA and keeps the top strip non-sticky', () => {
  const header = component.match(/function Header[\s\S]*?function Hero/)?.[0] ?? ''
  assert.equal(header.includes('<PhoneAction'), false, 'placeholder phone action should not appear in the main homeowner header')
  assert.ok(component.includes('We put in the work. Your site is ready.'), 'top preview strip should use the punchier owner message')
  assert.ok(component.includes('Start for $97'), 'owner CTA should be short and priced')
  assert.ok(component.includes('const checkoutUrl = "/checkout"'), 'owner CTAs should use the custom onsite checkout')
  assert.equal(component.includes('https://buy.stripe.com/'), false, 'hosted payment link should not be used from the preview')
  assert.equal(component.includes('href="/claim"'), false, 'owner CTAs should not add an intermediate claim page')
  assert.ok(styles.includes('.owner-preview-bar') && styles.includes('position: relative'), 'top preview strip should scroll away normally')
  assert.ok(component.includes('function OwnerFloatingClaimBar'), 'desktop and mobile should have one persistent lower CTA')
  assert.ok(component.includes('Get more customers & visibility'), 'floating CTA should lead with the customer outcome')
})

test('owner offer is compact, punchy, and keeps the four-step motion inside the price card', () => {
  const source = `${component}\n${styles}`
  for (const required of [
    'The website is built.',
    'Add your details. Go live.',
    'More visibility',
    'More customers',
    'Your branding',
    'Your services',
    'Best reviews',
    'Trusted by 8,500+',
    'Make it yours',
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


test('checkout stays onsite and uses a custom Stripe Elements handoff', () => {
  const checkoutUrl = new URL('../app/checkout/page.tsx', import.meta.url)
  const formUrl = new URL('../app/checkout/checkout-form.tsx', import.meta.url)
  const proxyUrl = new URL('../app/api/checkout/intent/route.ts', import.meta.url)
  const successUrl = new URL('../app/payment/success/page.tsx', import.meta.url)
  for (const file of [checkoutUrl, formUrl, proxyUrl, successUrl]) assert.ok(existsSync(file), `missing custom checkout file: ${file.pathname}`)

  const checkoutPage = readFileSync(checkoutUrl, 'utf8')
  const checkoutForm = readFileSync(formUrl, 'utf8')
  const proxy = readFileSync(proxyUrl, 'utf8')
  const successPage = readFileSync(successUrl, 'utf8')

  assert.ok(checkoutPage.includes('Your site is built.'), 'checkout should preserve offer continuity')
  assert.equal(checkoutPage.includes('USD only.'), false, 'checkout should not explain internal currency mechanics to the buyer')
  assert.ok(checkoutForm.includes('paymentMethodOrder: ["card"]'), 'main card form should stay open and focused')
  assert.ok(checkoutForm.includes('paymentMethodOrder: ["cashapp"]'), 'Cash App should use its own focused payment flow')
  assert.ok(checkoutForm.includes('applePay: "always"'), 'Apple Pay should be requested aggressively when the device supports it')
  assert.ok(checkoutForm.includes('buttonHeight: 55'), 'Express Checkout wallet height must stay within Stripe\'s 40-55px limit')
  assert.ok(checkoutForm.includes('buttonType: { applePay: "plain" }'), 'Apple Pay should use Stripe\'s native Apple Pay branding')
  assert.equal(checkoutForm.includes('apple-pay-fallback'), false, 'checkout must never fake an Apple Pay button')
  assert.ok(checkoutForm.includes('createIntent("bnpl")'), 'BNPL should use a real Stripe intent instead of a decorative button')
  assert.ok(proxy.includes('body.method === "bnpl"'), 'checkout proxy should pass BNPL through to the payment backend')
  assert.ok(checkoutForm.indexOf('cardElement.mount(cardRef.current)') < checkoutForm.indexOf('elements.create("expressCheckout"'), 'card checkout should mount before optional wallet UI')
  assert.ok(checkoutForm.includes('wallets: { link: "never" }'), 'Link should be disabled in each Payment Element instance')
  assert.ok(checkoutForm.includes('fields: { billingDetails: "never" }'), 'visible billing/contact fields should be suppressed')
  assert.ok(checkoutForm.includes('address: { country: "US" }'), 'the hidden billing country should remain fixed to the US')
  assert.equal(checkoutForm.includes('US checkout'), false, 'checkout should not show a redundant US checkout badge')
  assert.equal(checkoutForm.includes('Where should we send the finished site?'), false, 'checkout should not collect an extra email before payment')
  assert.ok(proxy.includes('recoverrevenue.company/api/public/website-build/intent'), 'site should create payment state through the Recover payment backend')
  assert.ok(successPage.includes('Your build is reserved.'), 'post-payment handoff should explain the next step')
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
  assert.ok(component.includes('We put in the work. Your site is ready.'), 'top owner strip should use the finished-work message')
  assert.ok(component.includes('Start for $97'), 'owner CTA should use one short priced action')
  assert.ok(component.includes('function OwnerFloatingClaimBar'), 'floating claim action should exist on desktop and mobile')
  assert.ok(source.includes('owner-floating-claim'), 'floating claim bar should have dedicated responsive styles')
})

test('owner price card removes redundant price math and keeps the approval-first risk reversal', () => {
  const source = `${component}\n${styles}`
  assert.equal(source.includes('$597 total'), false)
  assert.equal(source.includes('Remaining $500 only after you approve'), false)
  assert.ok(source.includes('Approve first'))
  assert.ok(source.includes('Approve the finished site, then pay the remaining $500.'))
  assert.ok(source.includes('We add your details'))
  assert.ok(source.includes('You review it'))
  assert.ok(source.includes('3 business days'))
  assert.equal(source.includes('We replace the preview details with yours.'), false)
})

test('legacy claim route redirects to the custom onsite checkout', () => {
  const claimPage = readFileSync(new URL('../app/claim/page.tsx', import.meta.url), 'utf8')
  assert.ok(claimPage.includes('redirect('), 'legacy claim route should remain a redirect')
  assert.ok(claimPage.includes('"/checkout"'), 'legacy claim route should use the custom onsite checkout')
  assert.equal(claimPage.includes('buy.stripe.com'), false, 'legacy claim route should not use the hosted Stripe payment link')
})


test('checkout payment hierarchy keeps wallets first, card open, and optional methods below', () => {
  const checkoutForm = readFileSync(new URL('../app/checkout/checkout-form.tsx', import.meta.url), 'utf8')
  const checkoutPage = readFileSync(new URL('../app/checkout/page.tsx', import.meta.url), 'utf8')

  assert.ok(checkoutForm.includes('applePay: "always"'), 'Apple Pay should remain a real Stripe Express Checkout option')
  assert.ok(checkoutForm.includes('Cash App Pay'), 'Cash App Pay should remain beside Apple Pay')
  assert.equal(checkoutForm.includes('Bank transfer'), false, 'disabled bank transfer should not be shown')
  assert.equal(checkoutForm.includes('Pay another way'), false, 'card should not be nested behind a duplicate pay-another-way chooser')

  const cardHeading = checkoutForm.indexOf('Enter card details')
  const moreOptions = checkoutForm.indexOf('More payment options')
  assert.ok(cardHeading >= 0 && moreOptions > cardHeading, 'card form should be open before optional payment methods')

  assert.equal(checkoutPage.includes('Encrypted checkout'), false, 'avoid fear-triggering checkout reassurance copy')
  assert.equal(checkoutPage.includes('Your information is secure'), false, 'avoid introducing security anxiety')
  assert.ok(checkoutPage.includes('checkout-outcome-icon--proof'), 'trusted-by proof should use a clean non-pixelated trust treatment')
})


test('checkout visual polish keeps proof people, four-step flow, and orange CTA', () => {
  const checkoutPage = readFileSync(new URL('../app/checkout/page.tsx', import.meta.url), 'utf8')
  const checkoutForm = readFileSync(new URL('../app/checkout/checkout-form.tsx', import.meta.url), 'utf8')
  const checkoutStyles = readFileSync(new URL('../app/checkout/checkout.css', import.meta.url), 'utf8')

  for (const step of ['Reserve', 'Customize', 'Approve', 'Launch']) {
    assert.ok(checkoutPage.includes(step), `missing checkout process step: ${step}`)
  }

  assert.ok(checkoutStyles.includes('.checkout-process'), 'four-step checkout flow should have dedicated styling')
  assert.ok(checkoutStyles.includes('.checkout-outcome-icon--proof'), 'trusted proof should avoid low-resolution avatar crops')
  assert.ok(checkoutStyles.includes('linear-gradient(135deg, #f05d34, #ff6f43)'), 'Pay $97 CTA should stay orange')
  assert.ok(checkoutStyles.includes('pointer-events: none'), 'unsupported Apple Pay fallback must not be clickable')
  assert.ok(checkoutForm.includes('Available in Safari'), 'unsupported Apple Pay state should explain the browser requirement')
  assert.ok(checkoutForm.includes('type: "tabs"'), 'BNPL should use a cleaner Stripe tab layout')
})


test('checkout optional payments are one layer and process sits beside the purchase', () => {
  const checkoutPage = readFileSync(new URL('../app/checkout/page.tsx', import.meta.url), 'utf8')
  const checkoutForm = readFileSync(new URL('../app/checkout/checkout-form.tsx', import.meta.url), 'utf8')
  const checkoutStyles = readFileSync(new URL('../app/checkout/checkout.css', import.meta.url), 'utf8')

  assert.equal(checkoutForm.includes('FAST PAY'), false, 'redundant fast-pay label should be removed')
  assert.equal(checkoutForm.includes('Pay over time</strong>'), false, 'optional payments should not add a second nested pay-over-time toggle')
  assert.ok(checkoutForm.includes('defaultCollapsed: true'), 'BNPL choices should stay compact until the provider is selected')
  assert.ok(checkoutPage.includes('checkout-process--payment'), 'Reserve → Customize → Approve → Launch belongs next to Start for $97')
  assert.ok(checkoutStyles.includes('checkoutProgressSweep'), 'purchase process should have a restrained moving progress line')
})
