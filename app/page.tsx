import type { Metadata } from "next"
import HandymanPremiumSite from "../components/handyman-site"

export const metadata: Metadata = {
  title: "Oakwell House Care | Premium Handyman Template",
  description: "Premium handyman homepage template for residential trust, polished presentation, and local home-service lead generation.",
}

export default function HomePage() {
  return <HandymanPremiumSite currentPage="home" />
}

