import test from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"

test("checkout aliases redirect to the Stripe-verified Apple Pay domain", () => {
  const proxy = readFileSync(new URL("../proxy.ts", import.meta.url), "utf8")

  assert.ok(proxy.includes('const CHECKOUT_HOST = "ready.recoverrevenue.company"'))
  assert.ok(proxy.includes("request.nextUrl.hostname === CHECKOUT_HOST"))
  assert.ok(proxy.includes('matcher: ["/checkout"]'))
})

test("an empty Stripe iframe cannot hide the Apple Pay fallback", () => {
  const walletCss = readFileSync(
    new URL("../app/checkout/checkout-wallet-fix.css", import.meta.url),
    "utf8",
  )

  assert.equal(walletCss.includes(":has(.native-wallet-mount:not(:empty))"), false)
})
