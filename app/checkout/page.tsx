import Link from "next/link"
import {
  ArrowLeft,
  BarChart3,
  LockKeyhole,
  Settings2,
  Sparkles,
  Star,
  Tag,
  Users,
} from "lucide-react"
import { CheckoutForm } from "./checkout-form"
import "./checkout.css"

export const metadata = {
  title: "Secure Website Checkout",
  description: "Start your website build with a secure $97 deposit.",
  robots: { index: false, follow: false },
}

const outcomes = [
  { icon: Users, title: "More customers", copy: "Turn more leads into calls." },
  { icon: BarChart3, title: "More visibility", copy: "Get found more easily." },
  { icon: Tag, title: "Your branding", copy: "A site that looks like you." },
  { icon: Settings2, title: "Your services", copy: "Show what you do best." },
  { icon: Star, title: "Best reviews", copy: "Build trust and credibility." },
] as const

const steps = ["Reserve", "Customize", "Approve", "Launch"] as const

export default function CheckoutPage() {
  return (
    <main className="site-checkout-page">
      <div className="site-checkout-shell">
        <aside className="site-checkout-summary">
          <div className="checkout-brand-row">
            <Link href="/" className="checkout-brand" aria-label="Back to Recover Revenue preview">
              <span className="checkout-brand-mark">R</span>
              <strong>Recover</strong>
            </Link>
            <span className="checkout-brand-divider" />
            <span className="checkout-brand-context">WEBSITES FOR HVAC COMPANIES</span>
          </div>

          <Link href="/" className="site-checkout-back"><ArrowLeft size={15} /> Back to preview</Link>

          <div className="site-checkout-kicker"><Sparkles size={14} /> WEBSITE BUILD</div>
          <h1>Your site is built.<br /><span>Finish it your way.</span></h1>
          <p className="checkout-summary-subtitle">
            A high-converting website for your HVAC business, ready to make yours.
          </p>

          <div className="checkout-outcome-grid" aria-label="What your finished site includes">
            {outcomes.map(({ icon: Icon, title, copy }) => (
              <div key={title} className="checkout-outcome-card">
                <div className="checkout-outcome-icon"><Icon size={21} strokeWidth={2.1} /></div>
                <div className="checkout-outcome-copy">
                  <strong>{title}</strong>
                  <span>{copy}</span>
                </div>
              </div>
            ))}

            <div className="checkout-outcome-card checkout-outcome-card--proof">
              <div className="checkout-proof-visuals" aria-hidden="true">
                <span className="checkout-proof-avatar checkout-proof-avatar--one" />
                <span className="checkout-proof-avatar checkout-proof-avatar--two" />
                <span className="checkout-proof-avatar checkout-proof-avatar--three" />
              </div>
              <div className="checkout-outcome-copy">
                <strong>Trusted by 8,500+</strong>
                <span>HVAC pros nationwide.</span>
              </div>
            </div>
          </div>

          <div className="checkout-process" aria-label="Website launch process">
            {steps.map((step, index) => (
              <div className="checkout-process-step" key={step}>
                <span className="checkout-process-number">{index + 1}</span>
                <strong>{step}</strong>
              </div>
            ))}
          </div>
        </aside>

        <section className="site-checkout-payment">
          <div className="checkout-payment-topline">
            <div className="checkout-payment-secure"><LockKeyhole size={16} /> Secure payment</div>
            <div className="checkout-payment-step"><span>Step 1 of 2</span><i /><i /></div>
          </div>

          <div className="site-checkout-payment-head">
            <h2>Start for $97</h2>
            <p>Reserve your website now. Customize it, approve it, then launch.</p>
          </div>

          <CheckoutForm />
        </section>
      </div>
    </main>
  )
}
