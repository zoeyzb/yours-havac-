import { readFileSync } from "node:fs"
import { describe, expect, it } from "vitest"

const source = readFileSync("app/checkout/checkout-form.tsx", "utf8")

describe("Apple Pay checkout integration", () => {
  it("uses Stripe Payment Element as the single Apple Pay integration", () => {
    expect(source).toContain('wallets: { applePay: "auto"')
    expect(source).not.toContain('create("expressCheckout"')
    expect(source).not.toContain("appleRef")
  })
})
