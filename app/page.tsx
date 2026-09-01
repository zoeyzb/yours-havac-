import type { Metadata } from "next"
import HandymanPremiumSite from "../components/handyman-site"

export const metadata: Metadata = {
  title: "Prime Heating & Cooling | HVAC Service",
  description: "Professional heating, cooling, repair, installation, maintenance, and indoor comfort service for local homeowners.",
}

export default function HomePage() {
  return <HandymanPremiumSite currentPage="home" />
}
