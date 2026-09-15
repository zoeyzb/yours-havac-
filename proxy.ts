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

    if (business) {
      canonicalUrl.pathname = `/${toPreviewSlug(business)}`
      canonicalUrl.search = ""
      return NextResponse.redirect(canonicalUrl, 308)
    }
  }

  // Redirect the previous clean-link format (business-name-abcdef) to the
  // final business-name-only URL so the address bar stays clean.
  const legacyPrettyMatch = canonicalUrl.pathname.match(/^\/([^/]+)-([a-f0-9]{6})$/i)
  if (legacyPrettyMatch) {
    canonicalUrl.pathname = `/${legacyPrettyMatch[1]}`
    canonicalUrl.search = ""
    return NextResponse.redirect(canonicalUrl, 308)
  }

  if (request.nextUrl.hostname === CHECKOUT_HOST) {
    return NextResponse.next()
  }

  return NextResponse.redirect(canonicalUrl, 307)
}

export const config = {
  matcher: ["/checkout", "/p/:path*", "/:previewSlug"],
}
