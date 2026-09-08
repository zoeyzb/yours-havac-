import Link from "next/link"
import { ArrowLeft, ArrowRight, Check, Clock3, ShieldCheck, Sparkles } from "lucide-react"

export const metadata = {
  title: "Claim Your HVAC Website",
  description: "Reserve your customized HVAC website for $97 and approve the finished version before the final $500 payment.",
}

const checkoutUrl = "https://buy.stripe.com/dRm00ia7agwLdrX6JzeEo00"

const included = [
  "Your business name, phone, email, and branding",
  "Your real services and service area",
  "Your reviews and trust details",
  "Mobile-ready call and service-request paths",
  "Domain connection and launch setup",
  "Final review and requested changes before launch",
]

export default function ClaimPage() {
  return (
    <main className="min-h-screen bg-[#f6f2ec] text-[#102630]">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-black text-[#536a72] transition hover:text-[#e7613b]">
            <ArrowLeft size={16} /> Back to your preview
          </Link>
          <div className="hidden items-center gap-2 rounded-full border border-[#dfe7e4] bg-white/80 px-3 py-2 text-xs font-black text-[#536a72] shadow-sm sm:inline-flex">
            <ShieldCheck size={14} className="text-[#e7613b]" /> Secure Stripe checkout
          </div>
        </div>

        <section className="grid gap-8 py-10 lg:grid-cols-[1.04fr_.76fr] lg:items-start lg:py-16">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#eadfd7] bg-[#fff8f3] px-3 py-2 text-[11px] font-black uppercase tracking-[.14em] text-[#d95531]">
              <Sparkles size={14} /> Your site is already built
            </div>

            <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[.92] tracking-[-.065em] sm:text-6xl lg:text-7xl">
              Take this site off preview and make it yours.
            </h1>

            <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-[#60727a]">
              We swap in your real business details, you review the finished version, and only then does the remaining balance become due.
            </p>

            <div className="mt-9 grid gap-3 sm:grid-cols-2">
              {included.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-[#dde5e2] bg-white/78 px-4 py-4 text-sm font-extrabold leading-6 text-[#29434d] shadow-[0_10px_30px_rgba(16,38,48,.04)]">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#e7613b] text-white">
                    <Check size={12} strokeWidth={3.5} />
                  </span>
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-4 rounded-[28px] bg-[#102630] p-6 text-white shadow-[0_22px_60px_rgba(16,38,48,.18)] sm:grid-cols-3">
              <div>
                <div className="text-[11px] font-black uppercase tracking-[.14em] text-white/52">Today</div>
                <div className="mt-2 text-3xl font-black">$97</div>
                <div className="mt-1 text-sm font-bold text-white/62">reserves the build</div>
              </div>
              <div>
                <div className="text-[11px] font-black uppercase tracking-[.14em] text-white/52">Then</div>
                <div className="mt-2 text-3xl font-black">Approve</div>
                <div className="mt-1 text-sm font-bold text-white/62">review the finished site</div>
              </div>
              <div>
                <div className="text-[11px] font-black uppercase tracking-[.14em] text-white/52">After approval</div>
                <div className="mt-2 text-3xl font-black">$500</div>
                <div className="mt-1 text-sm font-bold text-white/62">final payment</div>
              </div>
            </div>
          </div>

          <aside className="sticky top-6 overflow-hidden rounded-[32px] border border-[#eadfd7] bg-white p-6 shadow-[0_30px_90px_rgba(16,38,48,.12)] sm:p-8">
            <div className="text-[11px] font-black uppercase tracking-[.14em] text-[#d95531]">Claim this site</div>
            <div className="mt-4 flex items-end gap-3">
              <div className="text-6xl font-black tracking-[-.07em]">$97</div>
              <div className="pb-2 text-lg font-black">today</div>
            </div>
            <div className="mt-1 text-sm font-extrabold text-[#6a7b81]">$597 total · $500 after approval</div>

            <div className="my-6 h-px bg-[#e7ece9]" />

            <div className="space-y-4 text-sm font-extrabold leading-6 text-[#536a72]">
              <div className="flex gap-3"><Check size={17} className="mt-1 shrink-0 text-[#e7613b]" />We customize the preview with your real business information.</div>
              <div className="flex gap-3"><Check size={17} className="mt-1 shrink-0 text-[#e7613b]" />You see and approve the finished version before final payment.</div>
              <div className="flex gap-3"><Clock3 size={17} className="mt-1 shrink-0 text-[#e7613b]" />Target turnaround: 3 business days.</div>
            </div>

            <a
              href={checkoutUrl}
              className="group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#e7613b] px-5 py-4 text-base font-black text-white shadow-[0_15px_32px_rgba(231,97,59,.28)] transition hover:-translate-y-1 hover:bg-[#d95531]"
            >
              Start My Site — $97 <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
            </a>

            <div className="mt-4 text-center text-xs font-bold leading-5 text-[#7a8a8f]">
              One-time website project. Secure payment through Stripe.
            </div>
          </aside>
        </section>
      </div>
    </main>
  )
}
