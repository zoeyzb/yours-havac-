"use client"

import { useEffect } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Check,
  Clock3,
  Flame,
  MapPin,
  Phone,
  ShieldCheck,
  Snowflake,
  Sparkles,
  Star,
  WalletCards,
  Wind,
  Wrench,
} from "lucide-react"
import { siteConfig } from "../lib/site-config"

type Page = "home" | "services" | "quote"

const serviceIcons = {
  cooling: Snowflake,
  heating: Flame,
  installation: Wrench,
  maintenance: ShieldCheck,
}

const phoneHref = `tel:${siteConfig.brand.phoneHref}`

function RevealObserver() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"))
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("is-visible"))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  return null
}

function Header({ currentPage }: { currentPage: Page }) {
  const links = [
    { label: "Home", href: "/", page: "home" as const },
    { label: "Services", href: "/services", page: "services" as const },
    { label: "Get a Quote", href: "/quote", page: "quote" as const },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-[#f4ede4]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4 md:px-8">
        <Link href="/" className="leading-none">
          <div className="text-[11px] font-black uppercase tracking-[0.26em] text-[#a55332]">{siteConfig.brand.shortName}</div>
          <div className="mt-1 text-sm font-medium text-[#3f332d]">{siteConfig.brand.tagline}</div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-semibold text-[#67564d] md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={currentPage === link.page ? "text-[#251914]" : "transition hover:text-[#251914]"}>
              {link.label}
            </Link>
          ))}
        </nav>

        <Link href="/quote" className="inline-flex items-center gap-2 rounded-full bg-[#251914] px-5 py-2.5 text-sm font-black text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#a55332]">
          Get Service <ArrowRight size={15} />
        </Link>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-black/10 bg-[#f4ede4]">
      <div className="pointer-events-none absolute -right-16 top-8 text-[20vw] font-black leading-none tracking-[-0.08em] text-black/[0.03]">72°</div>
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 md:px-8 lg:grid-cols-[1fr_.92fr] lg:py-16">
        <div className="relative z-10 animate-rise">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-2 text-xs font-black uppercase tracking-[.14em] text-[#765c50] shadow-sm">
            <Star size={14} fill="currentColor" className="text-[#a55332]" /> {siteConfig.hero.eyebrow}
          </div>
          <h1 className="mt-6 max-w-3xl text-5xl font-black leading-[.9] tracking-[-.055em] text-[#251914] sm:text-6xl lg:text-[5.7rem]">
            {siteConfig.hero.lineOne}<br />
            <span className="text-[#a55332]">{siteConfig.hero.lineTwo}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[#67564d]">{siteConfig.hero.body}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/quote" className="group inline-flex items-center gap-2 rounded-full bg-[#a55332] px-6 py-3.5 text-sm font-black text-white shadow-[0_16px_30px_rgba(165,83,50,.2)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_38px_rgba(165,83,50,.28)]">
              Book Service <ArrowRight size={16} className="transition group-hover:translate-x-1" />
            </Link>
            <a href={phoneHref} className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white/80 px-6 py-3.5 text-sm font-black text-[#251914] transition duration-300 hover:-translate-y-1 hover:bg-white">
              <Phone size={16} /> Call Now
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3">
            {siteConfig.trust.map((item) => (
              <div key={item} className="flex items-center gap-2 text-xs font-bold text-[#67564d]">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-[#a55332]/10 text-[#a55332]"><Check size={12} strokeWidth={3} /></span>
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="hero-visual animate-soft-in relative min-h-[510px] overflow-hidden rounded-[2.5rem] bg-[#251914] shadow-[0_30px_80px_rgba(37,25,20,.22)] lg:min-h-[590px]">
          <div className="hero-image absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${siteConfig.hero.image})` }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#160f0c] via-black/15 to-black/0" />
          <div className="float-chip absolute left-6 top-6 rounded-full border border-white/20 bg-black/25 px-4 py-2 text-xs font-bold uppercase tracking-[.14em] text-white backdrop-blur-xl">
            Comfort status · ideal
          </div>
          <div className="float-card absolute inset-x-6 bottom-6 rounded-[1.8rem] border border-white/15 bg-black/28 p-5 text-white backdrop-blur-xl md:p-6">
            <div className="flex items-end justify-between gap-6">
              <div>
                <div className="text-[10px] font-black uppercase tracking-[.18em] text-white/55">Inside your home</div>
                <div className="mt-1 text-6xl font-black tracking-[-.06em]">72°</div>
              </div>
              <div className="pb-1 text-right text-sm leading-6 text-white/75">Quiet. Even. Comfortable.<br />Exactly how it should feel.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TrustStrip() {
  const items = [
    [Clock3, "Fast appointments", "Help when the house cannot wait."],
    [ShieldCheck, "Trusted technicians", "Professional, respectful, prepared."],
    [WalletCards, "Clear options", "Repair or replace without the runaround."],
    [Wind, "Whole-home comfort", "Heating, cooling, and indoor air."],
  ] as const

  return (
    <section className="border-y border-black/10 bg-white/60">
      <div className="mx-auto grid max-w-7xl divide-y divide-black/10 px-5 md:grid-cols-4 md:divide-x md:divide-y-0 md:px-8">
        {items.map(([Icon, title, copy]) => (
          <div key={title} className="group py-6 md:px-6 first:md:pl-0 last:md:pr-0">
            <Icon size={21} className="text-[#a55332] transition duration-300 group-hover:-translate-y-1 group-hover:scale-110" />
            <div className="mt-3 text-base font-black text-[#251914]">{title}</div>
            <div className="mt-1 text-sm leading-6 text-[#75645b]">{copy}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function ServicesGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {siteConfig.services.map((service, index) => {
        const Icon = serviceIcons[service.key]
        return (
          <article key={service.title} data-reveal className="reveal-card group relative overflow-hidden rounded-[2rem] border border-black/10 bg-white p-7 shadow-[0_18px_50px_rgba(37,25,20,.055)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_28px_60px_rgba(37,25,20,.1)]">
            <div className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-[#a55332] transition duration-500 group-hover:scale-x-100" />
            <div className="flex items-start justify-between">
              <div className="rounded-2xl bg-[#f4ede4] p-3 text-[#a55332] transition duration-300 group-hover:rotate-3 group-hover:bg-[#a55332] group-hover:text-white"><Icon size={26} /></div>
              <span className="text-xs font-black text-black/25">0{index + 1}</span>
            </div>
            <h3 className="mt-7 text-2xl font-black tracking-[-.035em] text-[#251914]">{service.title}</h3>
            <p className="mt-2 max-w-xl leading-7 text-[#67564d]">{service.copy}</p>
            <div className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#a55332] opacity-70 transition group-hover:gap-3 group-hover:opacity-100">See service <ArrowRight size={15} /></div>
          </article>
        )
      })}
    </div>
  )
}

function ProcessSection() {
  const steps = [
    ["01", "Tell us what’s wrong", "A quick call or request gets things moving."],
    ["02", "Get clear options", "Know what makes sense before the work starts."],
    ["03", "Get comfortable again", "Straightforward service. No extra drama."],
  ]

  return (
    <section className="bg-[#251914] text-white">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div data-reveal className="reveal-card flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="text-xs font-black uppercase tracking-[.2em] text-[#d59473]">Good service should feel simple</div>
            <h2 className="mt-3 max-w-3xl text-4xl font-black leading-[.96] tracking-[-.045em] md:text-6xl">No mystery. No chasing. No runaround.</h2>
          </div>
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-black text-white/85">
            <Star size={16} fill="currentColor" className="text-[#d59473]" /> 4.9 local rating
          </div>
        </div>

        <div className="mt-10 grid gap-3 md:grid-cols-3">
          {steps.map(([number, title, copy], index) => (
            <div key={number} data-reveal style={{ transitionDelay: `${index * 90}ms` }} className="reveal-card group rounded-[1.75rem] border border-white/10 bg-white/[.045] p-6 transition duration-300 hover:-translate-y-1 hover:bg-white/[.075]">
              <div className="text-xs font-black tracking-[.14em] text-[#d59473]">{number}</div>
              <div className="mt-8 text-2xl font-black tracking-[-.03em]">{title}</div>
              <div className="mt-2 text-sm leading-6 text-white/55">{copy}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Reviews() {
  return (
    <section className="bg-[#eee3d7]">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div data-reveal className="reveal-card flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <div className="text-xs font-black uppercase tracking-[.2em] text-[#a55332]">Real trust beats sales copy</div>
            <h2 className="mt-3 text-4xl font-black tracking-[-.045em] text-[#251914] md:text-6xl">The kind of service people tell their neighbors about.</h2>
          </div>
          <div className="rounded-2xl border border-black/10 bg-white/70 px-5 py-4 shadow-sm">
            <div className="flex items-center gap-1 text-[#a55332]">{[0,1,2,3,4].map((star) => <Star key={star} size={16} fill="currentColor" />)}</div>
            <div className="mt-1 text-sm font-black text-[#251914]">4.9 average local rating</div>
          </div>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {siteConfig.reviews.map((review, index) => (
            <article key={review.name} data-reveal style={{ transitionDelay: `${index * 90}ms` }} className="reveal-card group rounded-[2rem] border border-black/10 bg-white p-7 shadow-[0_18px_40px_rgba(37,25,20,.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(37,25,20,.09)]">
              <div className="flex gap-1 text-[#a55332]">{[0,1,2,3,4].map((star) => <Star key={star} size={16} fill="currentColor" />)}</div>
              <p className="mt-5 text-lg font-semibold leading-8 text-[#3f332d]">“{review.quote}”</p>
              <div className="mt-6 border-t border-black/10 pt-5">
                <div className="font-black text-[#251914]">{review.name}</div>
                <div className="mt-1 text-sm text-[#7a6960]">{review.location}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Financing() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
      <div data-reveal className="reveal-card relative overflow-hidden rounded-[2.5rem] bg-[#a55332] px-7 py-9 text-white md:px-10 lg:grid lg:grid-cols-[1.25fr_.75fr] lg:items-center lg:gap-12">
        <div className="money-mark pointer-events-none absolute -right-4 -top-20 text-[16rem] font-black leading-none text-white/[0.06]">$</div>
        <div className="relative">
          <div className="text-xs font-black uppercase tracking-[.2em] text-white/65">{siteConfig.financing.eyebrow}</div>
          <h2 className="mt-3 max-w-3xl text-3xl font-black leading-[.98] tracking-[-.045em] md:text-5xl">{siteConfig.financing.heading}</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/75">{siteConfig.financing.body}</p>
        </div>
        <div className="relative mt-7 flex flex-wrap items-center gap-3 lg:mt-0 lg:justify-end">
          <div className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[.14em] backdrop-blur">{siteConfig.financing.badge}</div>
          <Link href="/quote" className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-[#a55332] transition hover:-translate-y-1">View options <ArrowRight size={16} className="transition group-hover:translate-x-1" /></Link>
        </div>
      </div>
    </section>
  )
}

function ServiceAreas() {
  return (
    <section className="border-t border-black/10 bg-white/65">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 md:px-8 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
        <div data-reveal className="reveal-card">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[.2em] text-[#a55332]"><MapPin size={15} /> Local service area</div>
          <h2 className="mt-3 text-4xl font-black tracking-[-.045em] text-[#251914] md:text-5xl">Close enough to show up when it matters.</h2>
          <p className="mt-4 max-w-lg leading-7 text-[#67564d]">Local heating and cooling help for homeowners nearby — without making the page depend on a specific city or company name.</p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {siteConfig.serviceAreas.map((area, index) => <div key={area} data-reveal style={{ transitionDelay: `${index * 55}ms` }} className="reveal-card rounded-2xl border border-black/10 bg-[#f4ede4] px-4 py-4 text-sm font-black text-[#3f332d] transition duration-300 hover:-translate-y-1 hover:bg-white">{area}</div>)}
        </div>
      </div>
    </section>
  )
}

function FinalCTA() {
  return (
    <section className="bg-[#f4ede4] px-5 py-20 md:px-8">
      <div data-reveal className="reveal-card mx-auto max-w-5xl text-center">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-2 text-xs font-black uppercase tracking-[.16em] text-[#a55332]"><Sparkles size={14} /> One call from comfortable</div>
        <h2 className="mt-5 text-5xl font-black leading-[.92] tracking-[-.055em] text-[#251914] md:text-7xl">Your comfort problem can end today.</h2>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-[#67564d]">Tell us what is happening. We’ll help you figure out the next best step.</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href="/quote" className="group inline-flex items-center gap-2 rounded-full bg-[#a55332] px-6 py-3.5 text-sm font-black text-white transition duration-300 hover:-translate-y-1">Book Service <ArrowRight size={16} className="transition group-hover:translate-x-1" /></Link>
          <a href={phoneHref} className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-6 py-3.5 text-sm font-black text-[#251914] transition duration-300 hover:-translate-y-1"><Phone size={16} /> Call Now</a>
        </div>
      </div>
    </section>
  )
}

function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div data-reveal className="reveal-card flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <div className="text-xs font-black uppercase tracking-[.2em] text-[#a55332]">What we handle</div>
            <h2 className="mt-3 max-w-3xl text-4xl font-black tracking-[-.045em] text-[#251914] md:text-6xl">Whatever your home needs. Handled.</h2>
          </div>
          <p className="max-w-sm text-base leading-7 text-[#67564d]">The services homeowners call for most — clear, quick, and easy to understand.</p>
        </div>
        <div className="mt-10"><ServicesGrid /></div>
      </section>
      <ProcessSection />
      <Reviews />
      <Financing />
      <ServiceAreas />
      <FinalCTA />
    </>
  )
}

function ServicesPage() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
      <div className="text-xs font-black uppercase tracking-[.2em] text-[#a55332]">Services</div>
      <h1 className="mt-3 max-w-5xl text-5xl font-black tracking-[-.05em] text-[#251914] md:text-7xl">Heating & cooling without the runaround.</h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-[#67564d]">Clear service options without making homeowners decode a wall of HVAC jargon.</p>
      <div className="mt-12"><ServicesGrid /></div>
      <div className="mt-16 rounded-[2.5rem] bg-[#251914] p-8 text-white md:p-12">
        <div className="text-xs font-black uppercase tracking-[.2em] text-[#d59473]">Not sure what you need?</div>
        <div className="mt-4 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <h2 className="max-w-3xl text-4xl font-black tracking-[-.045em] md:text-5xl">Describe the problem. We’ll take it from there.</h2>
          <Link href="/quote" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-[#251914]">Get a quote <ArrowRight size={16} /></Link>
        </div>
      </div>
    </section>
  )
}

function QuotePage() {
  const fields = [["Full name", "text"], ["Phone", "tel"], ["Email", "email"], ["ZIP code", "text"]] as const
  return (
    <section className="mx-auto max-w-5xl px-5 py-20 md:px-8">
      <div className="text-center">
        <div className="text-xs font-black uppercase tracking-[.2em] text-[#a55332]">Get comfortable again</div>
        <h1 className="mt-3 text-5xl font-black tracking-[-.05em] text-[#251914] md:text-7xl">Tell us what’s going on.</h1>
        <p className="mx-auto mt-5 max-w-xl leading-7 text-[#67564d]">Send a quick service request and get the next step without the back-and-forth.</p>
      </div>
      <form className="mt-10 grid gap-4 rounded-[2.5rem] border border-black/10 bg-white p-6 shadow-xl md:grid-cols-2 md:p-8">
        {fields.map(([label, type]) => (
          <label key={label} className="text-xs font-black uppercase tracking-[.12em] text-[#6d5a50]">{label}
            <input type={type} className="mt-2 w-full rounded-2xl border border-black/10 bg-[#faf7f2] px-4 py-4 text-base font-medium normal-case tracking-normal text-[#251914] outline-none transition focus:border-[#a55332]" />
          </label>
        ))}
        <label className="text-xs font-black uppercase tracking-[.12em] text-[#6d5a50] md:col-span-2">Service needed
          <select className="mt-2 w-full rounded-2xl border border-black/10 bg-[#faf7f2] px-4 py-4 text-base font-medium normal-case tracking-normal text-[#251914] outline-none transition focus:border-[#a55332]">
            <option>AC repair</option><option>Heating</option><option>Installation / replacement</option><option>Maintenance</option><option>Not sure</option>
          </select>
        </label>
        <label className="text-xs font-black uppercase tracking-[.12em] text-[#6d5a50] md:col-span-2">What’s happening?
          <textarea rows={5} className="mt-2 w-full resize-none rounded-2xl border border-black/10 bg-[#faf7f2] px-4 py-4 text-base font-medium normal-case tracking-normal text-[#251914] outline-none transition focus:border-[#a55332]" />
        </label>
        <button type="button" className="mt-2 rounded-full bg-[#a55332] px-5 py-4 text-center text-sm font-black text-white md:col-span-2">Request Service</button>
      </form>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-black/10 bg-[#eee3d7] pb-20 md:pb-0">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-[1.2fr_.8fr_.8fr] md:px-8">
        <div>
          <div className="text-xs font-black uppercase tracking-[.24em] text-[#a55332]">{siteConfig.brand.shortName}</div>
          <p className="mt-3 max-w-sm text-sm leading-6 text-[#67564d]">Heating, cooling, replacement, and maintenance for homeowners who want clear answers and dependable service.</p>
        </div>
        <div className="text-sm font-semibold leading-7 text-[#67564d]"><Link href="/">Home</Link><br /><Link href="/services">Services</Link><br /><Link href="/quote">Get a Quote</Link></div>
        <div className="text-sm font-semibold leading-7 text-[#67564d]"><a href={phoneHref}>Call for service</a><br /><a href={`mailto:${siteConfig.brand.email}`}>Email service</a><br />Local service area</div>
      </div>
    </footer>
  )
}

function MobileActions() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-2 border-t border-black/10 bg-[#f4ede4]/95 p-3 backdrop-blur-xl md:hidden">
      <a href={phoneHref} className="flex items-center justify-center gap-2 rounded-full bg-[#251914] px-4 py-3 text-sm font-black text-white"><Phone size={16} /> Call Now</a>
      <Link href="/quote" className="flex items-center justify-center gap-2 rounded-full bg-[#a55332] px-4 py-3 text-sm font-black text-white">Book Service <ArrowRight size={15} /></Link>
    </div>
  )
}

export default function HandymanPremiumSite({ currentPage }: { currentPage: Page }) {
  return (
    <div className="min-h-screen bg-[#f4ede4] text-[#251914]">
      <RevealObserver />
      <Header currentPage={currentPage} />
      {currentPage === "home" ? <HomePage /> : currentPage === "services" ? <ServicesPage /> : <QuotePage />}
      <Footer />
      <MobileActions />
    </div>
  )
}
