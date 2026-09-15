import type { Metadata } from "next"
import HVACSite from "../../components/hvac-site"
import PersonalizedPreviewBrand from "../../components/personalized-preview-brand"
import { businessNameFromPreviewSlug } from "../../lib/preview-url"

type PrettyPreviewPageProps = {
  params: Promise<{ previewSlug: string }>
}

export async function generateMetadata({ params }: PrettyPreviewPageProps): Promise<Metadata> {
  const { previewSlug } = await params
  const businessName = businessNameFromPreviewSlug(previewSlug)
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

export default async function PrettyPreviewPage({ params }: PrettyPreviewPageProps) {
  const { previewSlug } = await params
  const businessName = businessNameFromPreviewSlug(previewSlug)

  return (
    <>
      <PersonalizedPreviewBrand businessName={businessName} />
      <HVACSite currentPage="home" />
    </>
  )
}
