import Link from "next/link"
import { ArrowLeft, ShieldCheck, Sparkles } from "lucide-react"
import { CheckoutForm } from "./checkout-form"
import "./checkout.css"

export const metadata = {
  title: "Secure Website Checkout",
  description: "Start your website build with a secure $97 deposit.",
  robots: { index: false, follow: false },
}

const outcomes = [
  "More customers",
  "More visibility",
  "Your branding",
  "Your services",
  "Best reviews",
  "Trusted by 8,500+",
] as const

export default function CheckoutPage() {
  return (
    <main className="site-checkout-page">
      <div className="site-checkout-shell">
        <aside className="site-checkout-summary">
          <Link href="/" className="site-checkout-back"><ArrowLeft size={15} /> Back to preview</Link>

          <div className="site-checkout-kicker"><Sparkles size={14} /> WEBSITE BUILD</div>
          <h1>Your site is built.<br /><span>Finish it your way.</span></h1>

          <div className="checkout-outcome-grid" aria-label="What your finished site includes">
            {outcomes.map((item, index) => (
              <div
                key={item}
                className={index === outcomes.length - 1 ? "checkout-outcome-card checkout-outcome-card--proof" : "checkout-outcome-card"}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item}</strong>
              </div>
            ))}
          </div>

          <div className="site-checkout-trust">
            <ShieldCheck size={18} />
            <div><strong>Approve first</strong><span>Approve the finished site, then pay the remaining $500.</span></div>
          </div>
        </aside>

        <section className="site-checkout-payment">
          <div className="site-checkout-payment-head">
            <span>SECURE PAYMENT</span>
            <h2>Start for $97</h2>
          </div>
          <CheckoutForm />
        </section>
      </div>
    </main>
  )
}
