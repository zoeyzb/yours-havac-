import type { Metadata } from "next"
import HVACSite from "../../components/hvac-site"

export const metadata: Metadata = {
  title: "Request HVAC Service | Prime Heating & Cooling",
  description: "Request local heating and cooling service or call Prime Heating & Cooling for help with your HVAC system.",
}

export default function QuotePage() {
  return <HVACSite currentPage="quote" />
}
