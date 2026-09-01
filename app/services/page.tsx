import type { Metadata } from "next"
import HVACSite from "../../components/hvac-site"

export const metadata: Metadata = {
  title: "HVAC Services | Prime Heating & Cooling",
  description: "Heating, cooling, maintenance, repair, replacement, airflow, controls, and indoor comfort services.",
}

export default function ServicesPage() {
  return <HVACSite currentPage="services" />
}
