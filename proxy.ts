import { NextRequest, NextResponse } from "next/server"

const CHECKOUT_HOST = "ready.recoverrevenue.company"

export function proxy(request: NextRequest) {
  if (request.nextUrl.hostname === CHECKOUT_HOST) {
    return NextResponse.next()
  }

  const canonicalUrl = request.nextUrl.clone()
  canonicalUrl.protocol = "https:"
  canonicalUrl.hostname = CHECKOUT_HOST
  canonicalUrl.port = ""

  return NextResponse.redirect(canonicalUrl, 307)
}

export const config = {
  matcher: ["/checkout"],
}
