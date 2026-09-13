import Link from "next/link"
import { CheckCircle2, ArrowRight } from "lucide-react"

export const metadata = { title: "Payment received", robots: { index: false, follow: false } }

export default function PaymentSuccessPage() {
  return (
    <main className="grid min-h-[100svh] place-items-center bg-[#f5f2ed] px-4 py-8 text-[#102630] sm:py-12">
      <section className="mx-auto max-w-2xl rounded-[28px] border border-[#dfe5e2] bg-white p-8 shadow-[0_28px_70px_rgba(16,38,48,.10)] sm:p-12">
        <div className="grid h-12 w-12 place-items-center rounded-full bg-[#edf6f0] text-[#23754b]"><CheckCircle2 size={25} /></div>
        <div className="mt-6 text-xs font-black uppercase tracking-[.14em] text-[#d95531]">Payment received</div>
        <h1 className="mt-3 text-4xl font-black leading-[.96] tracking-[-.05em] sm:text-5xl">Your build is reserved.</h1>
        <p className="mt-5 text-base font-semibold leading-7 text-[#61747a]">
          We’ll contact you next to collect your business details, photos, services, and branding. Then we’ll add everything to your website and send the finished version for your review.
        </p>
        <div className="mt-7 rounded-2xl bg-[#f6f8f6] p-5 text-sm font-bold leading-6 text-[#526a72]">
          The remaining $500 is not due until you review and approve the finished version.
        </div>
        <Link href="/" className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#e7613b] px-5 py-3.5 text-sm font-black text-white">Back to preview <ArrowRight size={15} /></Link>
      </section>
    </main>
  )
}
