"use client"

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
          <div className="text-[11px] font-black uppercase tracking-[0.28em] text-[#a55332]">{siteConfig.brand.shortName}</div>
          <div className="mt-1 text-sm font-medium text-[#3f332d]">{siteConfig.brand.tagline}</div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-semibold text-[#67564d] md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={currentPage === link.page ? "text-[#251914]" : "transition hover:text-[#251914]"}>
              {link.label}
            </Link>
          ))}
        </nav>

        <a href={phoneHref} className="inline-flex items-center gap-2 rounded-full bg-[#251914] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#a55332]">
          <Phone size={15} />
          <span className="hidden sm:inline">{siteConfig.brand.phoneDisplay}</span>
          <span className="sm:hidden">Call</span>
        </a>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-black/10 bg-[#f4ede4]">
      <div className="pointer-events-none absolute -right-20 top-10 text-[22vw] font-black leading-none tracking-[-0.08em] text-black/[0.035]">72°</div>
      <div className="mx-auto grid min-h-[82vh] max-w-7xl items-center gap-10 px-5 py-14 md:px-8 lg:grid-cols-[1.08fr_.92fr] lg:py-20">
        <div className="relative z-10 animate-rise">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/65 px-3 py-2 text-xs font-bold uppercase tracking-[.14em] text-[#765c50]">
            <Star size={14} fill="currentColor" /> {siteConfig.hero.eyebrow}
          </div>
          <h1 className="mt-7 max-w-4xl text-6xl font-black leading-[.88] tracking-[-.06em] text-[#251914] sm:text-7xl lg:text-[6.6rem]">
            {siteConfig.hero.lineOne}<br />
            <span className="text-[#a55332]">{siteConfig.hero.lineTwo}</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-[#67564d]">{siteConfig.hero.body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/quote" className="inline-flex items-center gap-2 rounded-full bg-[#a55332] px-6 py-3.5 text-sm font-black text-white shadow-[0_16px_30px_rgba(165,83,50,.22)] transition hover:-translate-y-0.5">
              Book Service <ArrowRight size={16} />
            </Link>
            <a href={phoneHref} className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white/75 px-6 py-3.5 text-sm font-black text-[#251914] transition hover:bg-white">
              <Phone size={16} /> Call Now
            </a>
          </div>
          <div className="mt-10 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
            {siteConfig.trust.map((item) => (
              <div key={item} className="flex gap-2 text-xs font-semibold leading-5 text-[#67564d]">
                <Check size={15} className="mt-0.5 shrink-0 text-[#a55332]" /> {item}
              </div>
            ))}
          </div>
        </div>

        <div className="animate-soft-in relative min-h-[570px] overflow-hidden rounded-[2.75rem] bg-[#251914] shadow-[0_30px_80px_rgba(37,25,20,.22)] lg:min-h-[650px]">
          <div className="absolute inset-0 bg-cover bg-center transition duration-700 hover:scale-[1.02]" style={{ backgroundImage: `url(${siteConfig.hero.image})` }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#160f0c] via-black/20 to-black/5" />
          <div className="absolute left-7 top-7 rounded-full border border-white/20 bg-black/20 px-4 py-2 text-xs font-bold uppercase tracking-[.14em] text-white backdrop-blur-xl">
            Comfort status · ideal
          </div>
          <div className="absolute inset-x-6 bottom-6 rounded-[2rem] border border-white/15 bg-black/25 p-6 text-white backdrop-blur-xl md:inset-x-8 md:bottom-8 md:p-7">
            <div className="text-xs font-bold uppercase tracking-[.18em] text-white/60">Inside your home</div>
            <div className="mt-2 flex items-end justify-between gap-6">
              <div className="text-7xl font-black tracking-[-.06em]">72°</div>
              <div className="pb-2 text-right text-sm leading-6 text-white/75">Quiet. Even. Comfortable.<br />Exactly how it should feel.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ServicesGrid() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {siteConfig.services.map((service, index) => {
        const Icon = serviceIcons[service.key]
        return (
          <article key={service.title} className="group rounded-[2.25rem] border border-black/10 bg-white p-8 shadow-[0_18px_50px_rgba(37,25,20,.06)] transition duration-300 hover:-translate-y-1">
            <div className="flex items-start justify-between">
              <div className="rounded-2xl bg-[#f4ede4] p-3 text-[#a55332] transition group-hover:bg-[#a55332] group-hover:text-white"><Icon size={28} /></div>
              <span className="text-xs font-black text-black/30">0{index + 1}</span>
            </div>
            <h3 className="mt-10 text-3xl font-black tracking-[-.035em] text-[#251914]">{service.title}</h3>
            <p className="mt-3 max-w-xl leading-7 text-[#67564d]">{service.copy}</p>
          </article>
        )
      })}
    </div>
  )
}

function TrustStrip() {
  const items = [
    [Clock3, "Same-day help", "For the problems that cannot wait."],
    [ShieldCheck, "Trusted technicians", "Professional, respectful, prepared."],
    [WalletCards, "Flexible options", "Repair, replace, or finance clearly."],
    [Wind, "Whole-home comfort", "Heating, cooling, and indoor air."],
  ] as const

  return (
    <section className="border-y border-black/10 bg-white/60">
      <div className="mx-auto grid max-w-7xl divide-y divide-black/10 px-5 md:grid-cols-4 md:divide-x md:divide-y-0 md:px-8">
        {items.map(([Icon, title, copy]) => (
          <div key={title} className="py-7 md:px-6 first:md:pl-0 last:md:pr-0">
            <Icon size={22} className="text-[#a55332]" />
            <div className="mt-4 text-lg font-black text-[#251914]">{title}</div>
            <div className="mt-1 text-sm leading-6 text-[#75645b]">{copy}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function StatsSection() {
  return (
    <section className="bg-[#251914] text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:px-8 lg:grid-cols-2 lg:items-center">
        <div>
          <div className="text-xs font-black uppercase tracking-[.2em] text-[#d59473]">Why homeowners call us first</div>
          <h2 className="mt-4 text-5xl font-black leading-[.95] tracking-[-.05em] md:text-7xl">The service should feel as good as the result.</h2>
        </div>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[2rem] bg-white/15">
          {siteConfig.stats.map((stat) => (
            <div key={stat.label} className="bg-[#2d211c] p-7">
              <div className="text-4xl font-black">{stat.value}</div>
              <div className="mt-2 text-xs font-bold uppercase tracking-[.12em] text-white/50">{stat.label}</div>
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
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <div className="max-w-3xl">
          <div className="text-xs font-black uppercase tracking-[.2em] text-[#a55332]">Real trust beats sales copy</div>
          <h2 className="mt-3 text-4xl font-black tracking-[-.045em] text-[#251914] md:text-6xl">The kind of service people tell their neighbors about.</h2>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {siteConfig.reviews.map((review) => (
            <article key={review.name} className="rounded-[2rem] border border-black/10 bg-white p-7 shadow-[0_18px_40px_rgba(37,25,20,.05)]">
              <div className="flex gap-1 text-[#a55332]">{[0,1,2,3,4].map((star) => <Star key={star} size={16} fill="currentColor" />)}</div>
              <p className="mt-6 text-lg font-semibold leading-8 text-[#3f332d]">“{review.quote}”</p>
              <div className="mt-7 border-t border-black/10 pt-5">
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
    <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
      <div className="relative overflow-hidden rounded-[2.75rem] bg-[#a55332] px-7 py-10 text-white md:px-12 md:py-14 lg:grid lg:grid-cols-[1.2fr_.8fr] lg:items-end lg:gap-12">
        <div className="pointer-events-none absolute -right-8 -top-20 text-[18rem] font-black leading-none text-white/[0.06]">$</div>
        <div className="relative">
          <div className="text-xs font-black uppercase tracking-[.2em] text-white/65">{siteConfig.financing.eyebrow}</div>
          <h2 className="mt-4 max-w-3xl text-4xl font-black leading-[.95] tracking-[-.045em] md:text-6xl">{siteConfig.financing.heading}</h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/75">{siteConfig.financing.body}</p>
        </div>
        <div className="relative mt-8 flex flex-col items-start gap-4 lg:mt-0 lg:items-end">
          <div className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[.14em] backdrop-blur">{siteConfig.financing.badge}</div>
          <Link href="/quote" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-black text-[#a55332]">See your options <ArrowRight size={16} /></Link>
        </div>
      </div>
    </section>
  )
}

function ServiceAreas() {
  return (
    <section className="border-t border-black/10 bg-white/65">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:px-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[.2em] text-[#a55332]"><MapPin size={15} /> Local service area</div>
          <h2 className="mt-4 text-4xl font-black tracking-[-.045em] text-[#251914] md:text-5xl">Close enough to show up when it matters.</h2>
          <p className="mt-5 max-w-lg leading-7 text-[#67564d]">Replace these neighborhoods with the business’s real coverage area so every prospect site instantly feels local.</p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {siteConfig.serviceAreas.map((area) => <div key={area} className="rounded-2xl border border-black/10 bg-[#f4ede4] px-4 py-5 text-sm font-black text-[#3f332d]">{area}</div>)}
        </div>
      </div>
    </section>
  )
}

function FinalCTA() {
  return (
    <section className="bg-[#f4ede4] px-5 py-24 md:px-8">
      <div className="mx-auto max-w-5xl text-center">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-2 text-xs font-black uppercase tracking-[.16em] text-[#a55332]"><Sparkles size={14} /> One call from comfortable</div>
        <h2 className="mt-6 text-5xl font-black leading-[.92] tracking-[-.055em] text-[#251914] md:text-7xl">Your comfort problem can end today.</h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-[#67564d]">Tell us what is happening and we’ll help you figure out the next best step.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/quote" className="inline-flex items-center gap-2 rounded-full bg-[#a55332] px-6 py-3.5 text-sm font-black text-white">Book Service <ArrowRight size={16} /></Link>
          <a href={phoneHref} className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-6 py-3.5 text-sm font-black text-[#251914]"><Phone size={16} /> {siteConfig.brand.phoneDisplay}</a>
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
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="text-xs font-black uppercase tracking-[.2em] text-[#a55332]">What we handle</div>
            <h2 className="mt-3 max-w-3xl text-4xl font-black tracking-[-.045em] text-[#251914] md:text-6xl">Comfort problems, handled properly.</h2>
          </div>
          <p className="max-w-md text-base leading-7 text-[#67564d]">No giant wall of service jargon. Just the work homeowners call for most, presented clearly.</p>
        </div>
        <div className="mt-12"><ServicesGrid /></div>
      </section>
      <StatsSection />
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
      <p className="mt-6 max-w-2xl text-lg leading-8 text-[#67564d]">Clear service categories, strong homeowner language, and enough detail to feel credible without turning the page into an HVAC textbook.</p>
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
        <p className="mx-auto mt-5 max-w-xl leading-7 text-[#67564d]">A clean service-request flow that can later connect to the business’s real form, CRM, or booking tool.</p>
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
          <p className="mt-3 max-w-sm text-sm leading-6 text-[#67564d]">Heating, cooling, installation, and maintenance for homeowners who want clear answers and dependable service.</p>
        </div>
        <div className="text-sm font-semibold leading-7 text-[#67564d]"><Link href="/">Home</Link><br /><Link href="/services">Services</Link><br /><Link href="/quote">Get a Quote</Link></div>
        <div className="text-sm font-semibold leading-7 text-[#67564d]"><a href={phoneHref}>{siteConfig.brand.phoneDisplay}</a><br /><a href={`mailto:${siteConfig.brand.email}`}>{siteConfig.brand.email}</a><br />{siteConfig.brand.city}, {siteConfig.brand.state}</div>
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
      <Header currentPage={currentPage} />
      {currentPage === "home" ? <HomePage /> : currentPage === "services" ? <ServicesPage /> : <QuotePage />}
      <Footer />
      <MobileActions />
    </div>
  )
}
