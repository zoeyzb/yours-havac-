import Link from "next/link"
import { ArrowLeft, Check, ShieldCheck, Sparkles } from "lucide-react"
import { CheckoutForm } from "./checkout-form"
import "./checkout.css"

export const metadata = {
  title: "Secure Website Checkout",
  description: "Start your website build with a secure $97 deposit.",
  robots: { index: false, follow: false },
}

export default function CheckoutPage() {
  return (
    <main className="site-checkout-page">
      <div className="site-checkout-shell">
        <aside className="site-checkout-summary">
          <Link href="/" className="site-checkout-back"><ArrowLeft size={15} /> Back to preview</Link>

          <div className="site-checkout-kicker"><Sparkles size={14} /> WEBSITE BUILD</div>
          <h1>Your site is built.<br /><span>Finish it your way.</span></h1>
          <p className="site-checkout-intro">
            Start with $97. We add your real details, you review the finished site, and the remaining $500 is only due after you approve it.
          </p>

          <div className="site-checkout-price">
            <div><span>Today</span><strong>$97</strong></div>
            <div><span>Total</span><strong>$597</strong></div>
            <div><span>After approval</span><strong>$500</strong></div>
          </div>

          <div className="site-checkout-benefits">
            {[
              "Your branding + contact info",
              "Your services + service area",
              "Your real customer reviews",
              "Domain connection + launch",
            ].map((item) => (
              <div key={item}><Check size={15} />{item}</div>
            ))}
          </div>

          <div className="site-checkout-trust">
            <ShieldCheck size={18} />
            <div><strong>Approval-first pricing</strong><span>No final $500 until you approve the finished site.</span></div>
          </div>
        </aside>

        <section className="site-checkout-payment">
          <div className="site-checkout-payment-head">
            <span>SECURE PAYMENT</span>
            <h2>Start for $97</h2>
            <p>USD only. Card is ready below. Apple Pay appears when your device supports it; Cash App Pay is available where eligible.</p>
          </div>
          <CheckoutForm />
        </section>
      </div>
    </main>
  )
}
