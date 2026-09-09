import { NextResponse } from "next/server"

const PAYMENT_BACKEND = "https://recoverrevenue.company/api/public/website-build/checkout-session"

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({})) as { method?: unknown }
  const method = body.method === "bank" ? "bank" : body.method === "bnpl" ? "bnpl" : null

  if (!method) {
    return NextResponse.json(
      { error: { code: "PAYMENT_METHOD_REJECTED", message: "Payment method was rejected." } },
      { status: 400, headers: { "cache-control": "no-store" } },
    )
  }

  try {
    const response = await fetch(PAYMENT_BACKEND, {
      method: "POST",
      headers: {
        "x-recover-checkout-source": "yours-havac-v1",
        "content-type": "application/json",
      },
      body: JSON.stringify({ method }),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    })
    const payload = await response.json().catch(() => null)

    if (!response.ok || !payload?.data?.url) {
      return NextResponse.json(
        { error: { code: payload?.error?.code || "CHECKOUT_FAILED", message: "Secure checkout could not be prepared." } },
        { status: response.ok ? 502 : response.status, headers: { "cache-control": "no-store" } },
      )
    }

    return NextResponse.json(
      { data: payload.data },
      { headers: { "cache-control": "no-store" } },
    )
  } catch {
    return NextResponse.json(
      { error: { code: "CHECKOUT_FAILED", message: "Secure checkout could not be prepared." } },
      { status: 502, headers: { "cache-control": "no-store" } },
    )
  }
}
