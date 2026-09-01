import type { Metadata } from "next"
import HVACSite from "../components/hvac-site"

export const metadata: Metadata = {
  title: "Prime Heating & Cooling | HVAC Service",
  description: "Professional heating, cooling, repair, maintenance, replacement, and indoor comfort service for local homeowners.",
}

export default function HomePage() {
  return <HVACSite currentPage="home" />
}
