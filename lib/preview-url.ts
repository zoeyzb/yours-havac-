const MAX_BUSINESS_SLUG_LENGTH = 48

function normalizeWhitespace(value: string) {
  return value.trim().replace(/\s+/g, " ")
}

export function toPreviewSlug(businessName: string, leadId?: string) {
  const normalized = normalizeWhitespace(businessName)
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, MAX_BUSINESS_SLUG_LENGTH)
    .replace(/-+$/g, "")

  const base = normalized || "website-preview"
  const shortId = leadId?.replace(/[^a-zA-Z0-9]/g, "").slice(0, 6).toLowerCase()

  return shortId ? `${base}-${shortId}` : base
}

export function businessNameFromPreviewSlug(slug: string) {
  const withoutShortId = slug.replace(/-[a-f0-9]{6}$/i, "")
  const words = withoutShortId.split("-").filter(Boolean)

  if (!words.length) return "Website Preview"

  return words
    .map((word) => {
      if (["hvac", "ac", "llc", "inc"].includes(word.toLowerCase())) {
        return word.toUpperCase()
      }
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(" ")
    .replace(/\bAnd\b/g, "&")
}
