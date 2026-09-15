import { NextResponse } from "next/server"

function safeString(value: unknown, max = 800) {
  return typeof value === "string" ? value.slice(0, max) : null
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({})) as Record<string, unknown>
  const record = {
    stage: safeString(body.stage, 80),
    hostname: safeString(body.hostname, 200),
    userAgent: safeString(body.userAgent, 800),
    platform: safeString(body.platform, 120),
    applePaySession: body.applePaySession === true,
    canMakePayments: typeof body.canMakePayments === "boolean" ? body.canMakePayments : null,
    paymentRequest: body.paymentRequest === true,
    availablePaymentMethods: body.availablePaymentMethods && typeof body.availablePaymentMethods === "object" ? body.availablePaymentMethods : null,
    paymentMethods: body.paymentMethods && typeof body.paymentMethods === "object" ? body.paymentMethods : null,
    error: body.error && typeof body.error === "object" ? body.error : null,
  }

  console.info("[apple-pay-debug]", JSON.stringify(record))
  return NextResponse.json({ ok: true }, { headers: { "cache-control": "no-store" } })
}
