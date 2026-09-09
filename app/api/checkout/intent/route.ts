import { NextResponse } from "next/server"

const PAYMENT_BACKEND = "https://recoverrevenue.company/api/public/website-build/intent"

export async function POST() {
  try {
    const response = await fetch(PAYMENT_BACKEND, {
      method: "POST",
      headers: {
        "x-recover-checkout-source": "yours-havac-v1",
        "content-type": "application/json",
      },
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    })
    const payload = await response.json().catch(() => null)

    if (!response.ok || !payload?.data?.clientSecret || !payload?.data?.publishableKey) {
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
