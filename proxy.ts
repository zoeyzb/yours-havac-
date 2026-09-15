import { NextRequest, NextResponse } from "next/server"
import { toPreviewSlug } from "./lib/preview-url"

const CHECKOUT_HOST = "ready.recoverrevenue.company"

export function proxy(request: NextRequest) {
  const canonicalUrl = request.nextUrl.clone()
  canonicalUrl.protocol = "https:"
  canonicalUrl.hostname = CHECKOUT_HOST
  canonicalUrl.port = ""

  const personalizedMatch = canonicalUrl.pathname.match(/^\/p\/([^/]+)$/)
  if (personalizedMatch) {
    const business = canonicalUrl.searchParams.get("business")
    const leadId = personalizedMatch[1]

    if (business) {
      canonicalUrl.pathname = `/${toPreviewSlug(business, leadId)}`
      canonicalUrl.search = ""
      return NextResponse.redirect(canonicalUrl, 308)
    }
  }

  if (request.nextUrl.hostname === CHECKOUT_HOST) {
    return NextResponse.next()
  }

  return NextResponse.redirect(canonicalUrl, 307)
}

export const config = {
  matcher: ["/checkout", "/p/:path*"],
}
