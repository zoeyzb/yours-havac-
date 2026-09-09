import Link from "next/link"
import { CheckCircle2, ArrowRight } from "lucide-react"

export const metadata = { title: "Payment received", robots: { index: false, follow: false } }

export default function PaymentSuccessPage() {
  return (
    <main className="min-h-screen bg-[#f5f2ed] px-4 py-16 text-[#102630]">
      <section className="mx-auto max-w-2xl rounded-[28px] border border-[#dfe5e2] bg-white p-8 shadow-[0_28px_70px_rgba(16,38,48,.10)] sm:p-12">
        <div className="grid h-12 w-12 place-items-center rounded-full bg-[#edf6f0] text-[#23754b]"><CheckCircle2 size={25} /></div>
        <div className="mt-6 text-xs font-black uppercase tracking-[.14em] text-[#d95531]">Payment submitted</div>
        <h1 className="mt-3 text-4xl font-black leading-[.96] tracking-[-.05em] sm:text-5xl">Your build is reserved.</h1>
        <p className="mt-5 text-base font-semibold leading-7 text-[#61747a]">
          Stripe is confirming the $97 payment. Your next step is to send the real business details you want placed into the site.
        </p>
        <div className="mt-7 rounded-2xl bg-[#f6f8f6] p-5 text-sm font-bold leading-6 text-[#526a72]">
          The remaining $500 is not due until you review and approve the finished version.
        </div>
        <Link href="/" className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#e7613b] px-5 py-3.5 text-sm font-black text-white">Back to preview <ArrowRight size={15} /></Link>
      </section>
    </main>
  )
}
