import { redirect } from "next/navigation"

const checkoutUrl = "https://buy.stripe.com/dRm00ia7agwLdrX6JzeEo00"

export default function ClaimPage() {
  redirect(checkoutUrl)
}
