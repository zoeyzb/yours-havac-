const MAX_BUSINESS_SLUG_LENGTH = 64

function normalizeWhitespace(value: string) {
  return value.trim().replace(/\s+/g, " ")
}

export function toPreviewSlug(businessName: string, _leadId?: string) {
  const normalized = normalizeWhitespace(businessName)
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, MAX_BUSINESS_SLUG_LENGTH)
    .replace(/-+$/g, "")

  return normalized || "website-preview"
}

export function businessNameFromPreviewSlug(slug: string) {
  // Keep compatibility with the older clean-link format that ended in a
  // six-character lead-id suffix. New links no longer include that suffix.
  const withoutLegacyShortId = slug.replace(/-[a-f0-9]{6}$/i, "")
  const words = withoutLegacyShortId.split("-").filter(Boolean)

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
