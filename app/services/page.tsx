import type { Metadata } from "next"
import HandymanPremiumSite from "../../components/handyman-site"

export const metadata: Metadata = {
  title: "Services | Oakwell House Care",
  description: "Premium handyman services page template for residential maintenance and home-improvement businesses.",
}

export default function ServicesPage() {
  return <HandymanPremiumSite currentPage="services" />
}

