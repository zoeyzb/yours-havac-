import Link from "next/link"
import {
  ArrowLeft,
  BadgeCheck,
  BarChart3,
  CheckCircle2,
  LockKeyhole,
  Settings2,
  ShieldCheck,
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
  { icon: BadgeCheck, title: "Trusted by 8,500+", copy: "HVAC pros nationwide." },
] as const

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
            A high-converting website for your HVAC business. Approve first, then pay the remaining balance.
          </p>

          <div className="checkout-outcome-grid" aria-label="What your finished site includes">
            {outcomes.map(({ icon: Icon, title, copy }, index) => (
              <div
                key={title}
                className={index === outcomes.length - 1 ? "checkout-outcome-card checkout-outcome-card--proof" : "checkout-outcome-card"}
              >
                <div className="checkout-outcome-icon"><Icon size={21} strokeWidth={2.1} /></div>
                <div className="checkout-outcome-copy">
                  <strong>{title}</strong>
                  <span>{copy}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="site-checkout-trust">
            <div className="checkout-trust-shield"><ShieldCheck size={28} /></div>
            <div className="checkout-trust-main">
              <strong>Approve first</strong>
              <span>Approve the finished site, then pay the remaining $500.</span>
            </div>
            <div className="checkout-trust-points">
              <span><CheckCircle2 size={15} /> No risk</span>
              <span><CheckCircle2 size={15} /> No long-term contracts</span>
              <span><CheckCircle2 size={15} /> Cancel anytime</span>
            </div>
          </div>
        </aside>

        <section className="site-checkout-payment">
          <div className="checkout-payment-topline">
            <div className="checkout-payment-secure"><LockKeyhole size={16} /> Secure payment</div>
            <div className="checkout-payment-step"><span>Step 1 of 2</span><i /><i /></div>
          </div>

          <div className="site-checkout-payment-head">
            <h2>Start for $97</h2>
            <p>Launch your HVAC website today. Approve the final site, then pay the remaining $500.</p>
          </div>

          <CheckoutForm />

          <div className="checkout-security-row" aria-label="Checkout protections">
            <span><ShieldCheck size={16} /> Encrypted checkout</span>
            <span><CheckCircle2 size={16} /> Your information is secure</span>
            <span><BadgeCheck size={16} /> No hidden fees</span>
          </div>
        </section>
      </div>
    </main>
  )
}
