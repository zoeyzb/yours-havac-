import type { Metadata } from "next"
import HandymanPremiumSite from "../../components/handyman-site"

export const metadata: Metadata = {
  title: "Request A Quote | Oakwell House Care",
  description: "Premium residential handyman quote page template with a calmer enquiry flow and polished local positioning.",
}

export default function QuotePage() {
  return <HandymanPremiumSite currentPage="quote" />
}

