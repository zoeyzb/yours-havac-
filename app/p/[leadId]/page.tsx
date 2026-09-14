import type { Metadata } from "next"
import HVACSite from "../../../components/hvac-site"

const DEFAULT_TITLE = "HVAC Website Preview"

function cleanBusinessName(value?: string) {
  if (!value) return DEFAULT_TITLE
  const cleaned = value.trim().replace(/\s+/g, " ").slice(0, 120)
  return cleaned || DEFAULT_TITLE
}

type PreviewPageProps = {
  params: Promise<{ leadId: string }>
  searchParams: Promise<{ business?: string | string[] }>
}

export async function generateMetadata({ searchParams }: PreviewPageProps): Promise<Metadata> {
  const query = await searchParams
  const rawBusiness = Array.isArray(query.business) ? query.business[0] : query.business
  const businessName = cleanBusinessName(rawBusiness)
  const title = `${businessName} — Website Preview`
  const description = `A website preview prepared for ${businessName}.`

  return {
    title,
    description,
    robots: { index: false, follow: false },
    openGraph: {
      title,
      description,
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  }
}

export default function PersonalizedPreviewPage() {
  return <HVACSite currentPage="home" />
}
