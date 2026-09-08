import type { Metadata } from "next"
import HVACSite from "../components/hvac-site"
import { siteConfig } from "../lib/site-config"

export const metadata: Metadata = {
  title: `${siteConfig.brand.name} | HVAC Service`,
  description: "Professional heating, cooling, repair, maintenance, replacement, and indoor comfort service for local homeowners.",
}

export default function HomePage() {
  return <HVACSite currentPage="home" />
}
