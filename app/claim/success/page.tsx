import Link from "next/link"
import { ArrowRight, Check, Mail, ShieldCheck } from "lucide-react"

export const metadata = {
  title: "Site Reserved",
  description: "Your HVAC website deposit has been completed.",
}

export default function ClaimSuccessPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#f6f2ec] px-4 py-12 text-[#102630]">
      <section className="w-full max-w-3xl overflow-hidden rounded-[34px] border border-[#dfe7e4] bg-white shadow-[0_35px_100px_rgba(16,38,48,.13)]">
        <div className="bg-[#102630] px-6 py-8 text-white sm:px-10">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-[#e7613b] shadow-[0_12px_30px_rgba(231,97,59,.28)]">
            <Check size={28} strokeWidth={3} />
          </div>
          <h1 className="mt-6 text-4xl font-black tracking-[-.05em] sm:text-5xl">Payment received. Your site is reserved.</h1>
          <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-white/68">
            The $97 deposit starts the customization step. The remaining $500 is not due until you have reviewed and approved the finished site.
          </p>
        </div>

        <div className="p-6 sm:p-10">
          <div className="text-xs font-black uppercase tracking-[.14em] text-[#d95531]">What happens next</div>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {[
              ["01", "Send your details", "Reply to the email or text that sent you the preview with your number, service area, services, and any branding you want used."],
              ["02", "We finish it", "Your real details replace the preview details and the final version is prepared for review."],
              ["03", "Approve and launch", "Request changes if needed. The final $500 is due only after you approve the finished version."],
            ].map(([number, title, copy]) => (
              <article key={number} className="rounded-2xl border border-[#e1e8e5] bg-[#f8faf8] p-5">
                <div className="text-xs font-black tracking-[.14em] text-[#e7613b]">{number}</div>
                <h2 className="mt-3 text-lg font-black">{title}</h2>
                <p className="mt-2 text-sm font-semibold leading-6 text-[#667a80]">{copy}</p>
              </article>
            ))}
          </div>

          <div className="mt-7 flex flex-col gap-3 rounded-2xl border border-[#eadfd7] bg-[#fff8f3] p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <ShieldCheck size={19} className="mt-0.5 shrink-0 text-[#e7613b]" />
              <div>
                <div className="font-black">Keep the message thread.</div>
                <div className="mt-1 text-sm font-semibold text-[#687b81]">That gives us the cleanest place to collect the final business details.</div>
              </div>
            </div>
            <Link href="/" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#102630] px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5">
              Return to preview <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
