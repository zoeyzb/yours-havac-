# Yours HVAC — Premium Master

A reusable, Vercel-ready HVAC website built for fast prospect personalization without redesigning the site every time.

## The idea

Keep the premium layout fixed. Change the business-specific facts in one file:

`lib/site-config.ts`

That config controls:

- company name and tagline
- city and service areas
- phone and email
- hero copy and hero image
- trust points
- HVAC services
- ratings/stats
- reviews
- financing language

The homepage, services page, quote page, metadata, footer, and mobile actions read from that master setup.

## Pages

- `/` — premium conversion-focused HVAC homepage
- `/services` — clear heating and cooling services
- `/quote` — polished service-request flow ready to connect to a real form/CRM

## Homepage sections

- image-led hero with primary call/book CTAs
- immediate trust strip
- AC / heating / installation / maintenance cards
- proof/stat section
- homeowner reviews
- financing CTA
- local service areas
- final booking CTA
- sticky mobile Call / Book actions

## Personalize a prospect

Edit `lib/site-config.ts` and replace the placeholders with the real business data. The highest-impact fields are:

1. `brand.name`
2. `brand.city`
3. `brand.phoneDisplay` / `brand.phoneHref`
4. `hero.image`
5. `reviews`
6. `serviceAreas`
7. financing language

Do not invent ratings, reviews, licensing claims, financing, or availability for a real business. Only use facts you can support.

## Run

```bash
pnpm install
pnpm dev
```

## Verify

```bash
pnpm run typecheck
pnpm run build
```

GitHub Actions also runs both checks on every push and pull request.

## Deploy on Vercel

Import the repository into Vercel, set `NEXT_PUBLIC_SITE_URL`, and deploy.

## Foundation

This project began from the Apache-2.0 `handyman-premium-home-services` template by TwoSquaresHQ and was adapted into a reusable HVAC master experience. See `LICENSE` for the repository license.
