"use client"

import Link from "next/link"
import {
  AirVent,
  ArrowRight,
  Building2,
  Check,
  ChevronDown,
  Clock3,
  Flame,
  Gauge,
  MapPin,
  Phone,
  ShieldCheck,
  Snowflake,
  Star,
  ThermometerSun,
  Wrench,
  Wind,
} from "lucide-react"
import { useState } from "react"
import { siteConfig } from "../lib/site-config"

type Page = "home" | "services" | "quote"
type ServiceKey = (typeof siteConfig.services)[number]["key"]

const serviceIcons: Record<ServiceKey, typeof Snowflake> = {
  cooling: Snowflake,
  installation: Wrench,
  heating: Flame,
  maintenance: ShieldCheck,
  air: Wind,
  duct: AirVent,
  emergency: Clock3,
  thermostat: ThermometerSun,
  commercial: Building2,
}

const phoneHref = `tel:${siteConfig.brand.phoneHref}`

function Photo({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={`h-full w-full object-cover ${className}`}
      onError={(event) => { event.currentTarget.style.opacity = "0" }}
    />
  )
}

function Header({ currentPage }: { currentPage: Page }) {
  return (
    <header className="sticky top-0 z-50 border-b border-[#e4d9cf] bg-[#fbf8f4]/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-5 md:px-8">
        <Link href="/" className="min-w-0">
          <div className="truncate text-[17px] font-black tracking-[-.04em] text-[#211915] sm:text-lg md:text-xl">{siteConfig.brand.name}</div>
          <div className="mt-0.5 hidden text-[11px] font-semibold text-[#75655d] sm:block">{siteConfig.brand.tagline}</div>
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-bold text-[#68574f] lg:flex">
          <Link href="/" className={currentPage === "home" ? "text-[#211915]" : "hover:text-[#a84f2d]"}>Home</Link>
          <Link href="/services" className={currentPage === "services" ? "text-[#211915]" : "hover:text-[#a84f2d]"}>Services</Link>
          <a href="/#reviews" className="hover:text-[#a84f2d]">Reviews</a>
          <a href="/#service-areas" className="hover:text-[#a84f2d]">Service Areas</a>
          <Link href="/quote" className={currentPage === "quote" ? "text-[#211915]" : "hover:text-[#a84f2d]"}>Contact</Link>
        </nav>
        <div className="flex items-center gap-2">
          <a href={phoneHref} className="hidden items-center gap-2 rounded-full border border-[#d8c9bd] bg-white px-4 py-2.5 text-sm font-black text-[#211915] md:inline-flex"><Phone size={15} /> {siteConfig.brand.phoneDisplay}</a>
          <Link href="/quote" className="rounded-full bg-[#ad512f] px-4 py-2.5 text-xs font-black text-white shadow-[0_10px_28px_rgba(173,81,47,.18)] sm:px-5 sm:text-sm">Schedule Service</Link>
        </div>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="bg-[#f1e8df]">
      <div className="mx-auto grid max-w-7xl gap-7 px-4 py-7 sm:px-5 md:px-8 md:py-10 lg:grid-cols-[.9fr_1.1fr] lg:items-stretch">
        <div className="flex flex-col justify-center py-3 lg:py-7">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#d9c9bd] bg-white/85 px-3.5 py-2 text-[11px] font-black uppercase tracking-[.13em] text-[#745548] shadow-sm">
            <Star size={13} fill="currentColor" className="text-[#b85a35]" /> {siteConfig.hero.eyebrow}
          </div>
          <h1 className="mt-5 max-w-2xl text-[3.25rem] font-black leading-[.97] tracking-[-.052em] text-[#211915] sm:text-[3.9rem] lg:text-[4.4rem]">
            Comfort back.<br /><span className="text-[#ad512f]">Without the runaround.</span>
          </h1>
          <p className="mt-5 text-lg font-semibold leading-7 text-[#66564f]">{siteConfig.hero.body}</p>
          <div className="mt-5 grid max-w-xl gap-2.5 sm:grid-cols-2">
            {siteConfig.trust.map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm font-bold text-[#55463f]">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white text-[#ad512f] shadow-sm"><Check size={13} strokeWidth={3} /></span>{item}
              </div>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/quote" className="inline-flex items-center gap-2 rounded-full bg-[#ad512f] px-6 py-3.5 text-sm font-black text-white shadow-[0_14px_32px_rgba(173,81,47,.2)] transition hover:-translate-y-0.5 hover:bg-[#914126]">Schedule Service <ArrowRight size={16} /></Link>
            <a href={phoneHref} className="inline-flex items-center gap-2 rounded-full border border-[#d4c4b8] bg-white px-6 py-3.5 text-sm font-black text-[#211915] transition hover:border-[#ad512f]"><Phone size={16} /> Call Now</a>
          </div>
        </div>
        <div className="relative min-h-[420px] overflow-hidden rounded-[2rem] bg-[#281a15] shadow-[0_32px_80px_rgba(43,28,22,.18)] sm:min-h-[500px] lg:min-h-[560px]">
          <Photo src={siteConfig.hero.image} alt={siteConfig.hero.imageAlt} className="absolute inset-0" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1e1410]/75 via-transparent to-transparent" />
          <div className="absolute left-5 top-5 rounded-full border border-white/25 bg-black/25 px-4 py-2 text-[11px] font-black uppercase tracking-[.14em] text-white backdrop-blur-xl">Residential comfort, handled</div>
          <div className="absolute inset-x-5 bottom-5 rounded-[1.6rem] border border-white/15 bg-[#211915]/80 p-5 text-white backdrop-blur-xl sm:p-6">
            <div className="flex items-end justify-between gap-4">
              <div><div className="text-[11px] font-black uppercase tracking-[.16em] text-white/55">Home comfort</div><div className="mt-1 text-5xl font-black tracking-[-.05em]">72°</div></div>
              <div className="max-w-[215px] text-right text-sm font-semibold leading-6 text-white/80">Quiet. Even. Comfortable.<br />Exactly how home should feel.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TrustStrip() {
  return (
    <section className="border-y border-[#e3d8ce] bg-[#fffdf9]">
      <div className="mx-auto grid max-w-7xl grid-cols-2 px-4 sm:px-5 md:grid-cols-4 md:px-8">
        {siteConfig.stats.map((stat, index) => (
          <div key={stat.label} className={`px-3 py-6 md:px-5 ${index > 0 ? "border-l border-[#e3d8ce]" : ""} ${index > 1 ? "border-t md:border-t-0" : ""}`}>
            <div className="text-2xl font-black tracking-[-.04em] text-[#211915] md:text-3xl">{stat.value}</div>
            <div className="mt-1.5 text-xs font-bold leading-5 text-[#77675f] md:text-sm">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function ServicesPreview({ all = false }: { all?: boolean }) {
  const services = all ? siteConfig.services : siteConfig.services.slice(0, 8)
  return (
    <section className="bg-[#f8f3ed] py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
        <div className="max-w-3xl">
          <div className="text-xs font-black uppercase tracking-[.2em] text-[#ad512f]">HVAC Services</div>
          <h2 className="mt-3 text-4xl font-black leading-[1.02] tracking-[-.045em] text-[#211915] md:text-5xl">Complete heating & cooling service.</h2>
          <p className="mt-4 max-w-2xl text-base font-medium leading-7 text-[#6c5b53]">Repair, replacement, airflow, maintenance, controls, and urgent service — explained simply.</p>
        </div>
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = serviceIcons[service.key]
            return (
              <article key={`${service.title}-${index}`} className="group overflow-hidden rounded-[1.6rem] border border-[#e2d7cd] bg-white shadow-[0_12px_35px_rgba(48,31,24,.055)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(48,31,24,.1)]">
                <div className="h-44 overflow-hidden bg-[#e5ddd5]"><Photo src={service.image} alt={service.imageAlt} className="transition duration-500 group-hover:scale-[1.035]" /></div>
                <div className="p-5">
                  <div className="flex items-center gap-2.5"><span className="grid h-9 w-9 place-items-center rounded-xl bg-[#f4e8df] text-[#ad512f]"><Icon size={18} /></span><h3 className="text-lg font-black tracking-[-.025em] text-[#211915]">{service.title}</h3></div>
                  <p className="mt-3 text-sm leading-6 text-[#6c5b53]">{service.copy}</p>
                  <Link href="/quote" className="mt-4 inline-flex items-center gap-2 text-sm font-black text-[#ad512f]">Get service <ArrowRight size={14} /></Link>
                </div>
              </article>
            )
          })}
        </div>
        {!all && <div className="mt-7"><Link href="/services" className="inline-flex items-center gap-2 rounded-full border border-[#d5c6ba] bg-white px-5 py-3 text-sm font-black text-[#211915]">See all services <ArrowRight size={15} /></Link></div>}
      </div>
    </section>
  )
}

function WhyChooseUs() {
  const items = [
    [ShieldCheck, "Licensed & Insured", "Qualified professionals working carefully in and around the home."],
    [Wrench, "Skilled Technicians", "Experienced people who diagnose first and explain what they find."],
    [Check, "Quality Workmanship", "Clean work, proper testing, and attention to the details that matter."],
    [MapPin, "Local & Reliable", "Responsive local service built around showing up and staying reachable."],
    [Gauge, "Clear Recommendations", "Know the problem and your options before the work starts."],
    [ShieldCheck, "Warranty Support", "Ask about workmanship and equipment warranty coverage for your service."],
  ] as const
  return (
    <section className="bg-[#241915] py-16 text-white md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
        <div className="grid gap-7 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div><div className="text-xs font-black uppercase tracking-[.2em] text-[#d78e6b]">Why Choose Us</div><h2 className="mt-3 text-4xl font-black leading-[1.02] tracking-[-.045em] md:text-5xl">Qualified people. Clear work. Reliable service.</h2></div>
          <p className="max-w-xl text-base leading-7 text-white/65 lg:justify-self-end">The things homeowners want to know before they invite a technician into the house.</p>
        </div>
        <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(([Icon, title, copy]) => (
            <div key={title} className="rounded-[1.5rem] border border-white/10 bg-white/[.055] p-5 transition hover:-translate-y-0.5 hover:bg-white/[.08]">
              <div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-[#e49a75]"><Icon size={18} /></span><h3 className="text-base font-black">{title}</h3></div>
              <p className="mt-3 text-sm leading-6 text-white/60">{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function WorkInAction() {
  return (
    <section className="bg-[#fffdf9] py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
        <div className="max-w-3xl"><div className="text-xs font-black uppercase tracking-[.2em] text-[#ad512f]">Real HVAC work</div><h2 className="mt-3 text-4xl font-black tracking-[-.045em] text-[#211915] md:text-5xl">See the kind of work that keeps a home comfortable.</h2></div>
        <div className="mt-9 grid gap-4 lg:grid-cols-3">
          {siteConfig.projects.map((project) => (
            <article key={project.title} className="overflow-hidden rounded-[1.6rem] border border-[#e1d6cc] bg-white shadow-sm">
              <div className="h-56 overflow-hidden bg-[#e5ddd5]"><Photo src={project.image} alt={project.imageAlt} /></div>
              <div className="p-5"><h3 className="text-lg font-black text-[#211915]">{project.title}</h3><p className="mt-2 text-sm leading-6 text-[#6b5a52]">{project.copy}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  const steps = [["01", "Schedule", "Call or request service online."], ["02", "We Diagnose", "We find the issue and explain your options."], ["03", "You’re Comfortable", "We handle the fix and test the system."]]
  return (
    <section className="bg-[#f2e9e0] py-14 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
        <div className="text-center"><div className="text-xs font-black uppercase tracking-[.2em] text-[#ad512f]">How It Works</div><h2 className="mt-3 text-3xl font-black tracking-[-.04em] text-[#211915] md:text-4xl">Three simple steps. No mystery.</h2></div>
        <div className="mx-auto mt-8 grid max-w-5xl gap-3 md:grid-cols-3">
          {steps.map(([number, title, copy]) => (
            <div key={number} className="rounded-[1.5rem] border border-[#dccdc1] bg-[#fffdf9] p-5 shadow-sm">
              <div className="flex items-center gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#ad512f] text-sm font-black text-white">{number}</span><div><div className="font-black text-[#211915]">{title}</div><div className="mt-1 text-sm leading-5 text-[#6c5b53]">{copy}</div></div></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Reviews() {
  return (
    <section id="reviews" className="bg-[#fffdf9] py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div><div className="text-xs font-black uppercase tracking-[.2em] text-[#ad512f]">Reviews</div><h2 className="mt-3 text-4xl font-black tracking-[-.045em] text-[#211915] md:text-5xl">Trusted by homeowners.</h2></div>
          <div className="rounded-2xl border border-[#e2d7cd] bg-white px-5 py-3 shadow-sm"><div className="flex gap-1 text-[#d66835]">{[1,2,3,4,5].map((n) => <Star key={n} size={15} fill="currentColor" />)}</div><div className="mt-1 text-sm font-black text-[#211915]">4.9 average rating</div></div>
        </div>
        <div className="mt-8 flex snap-x gap-4 overflow-x-auto pb-3 lg:grid lg:grid-cols-3 lg:overflow-visible">
          {siteConfig.reviews.map((review) => (
            <article key={`${review.name}-${review.quote}`} className="min-w-[86%] snap-start rounded-[1.5rem] border border-[#e2d7cd] bg-white p-5 shadow-sm sm:min-w-[54%] lg:min-w-0">
              <div className="flex gap-1 text-[#d66835]">{[1,2,3,4,5].map((n) => <Star key={n} size={15} fill="currentColor" />)}</div>
              <p className="mt-4 text-base font-bold leading-7 text-[#30241f]">“{review.quote}”</p>
              <div className="mt-5 border-t border-[#eee5dd] pt-4"><div className="font-black text-[#211915]">{review.name}</div><div className="mt-0.5 text-xs font-semibold text-[#87736a]">{review.location}</div></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceAreas() {
  return (
    <section id="service-areas" className="bg-[#f2e9e0] py-16 md:py-20">
      <div className="mx-auto grid max-w-7xl gap-7 px-4 sm:px-5 md:px-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <div className="overflow-hidden rounded-[1.8rem] border border-[#ddcec1] bg-white shadow-[0_18px_50px_rgba(48,31,24,.08)]"><Photo src={siteConfig.local.image} alt={siteConfig.local.imageAlt} className="aspect-[4/3] object-cover" /></div>
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[.2em] text-[#ad512f]"><MapPin size={14} /> Local service</div>
          <h2 className="mt-3 text-4xl font-black leading-[1.02] tracking-[-.045em] text-[#211915] md:text-5xl">Local HVAC help, close to home.</h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-[#6b5a52]">Serving homeowners across the local area and nearby communities, with a fast way to confirm service in your neighborhood.</p>
          <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
            {siteConfig.local.badges.map((area) => <div key={area} className="flex items-center gap-2 rounded-xl border border-[#dbcdbf] bg-[#fffdf9] px-4 py-3 text-sm font-black text-[#4e4039]"><Check size={14} className="text-[#ad512f]" strokeWidth={3} /> {area}</div>)}
          </div>
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <section className="bg-[#fffdf9] py-16 md:py-20">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-5 md:px-8 lg:grid-cols-[.72fr_1.28fr]">
        <div><div className="text-xs font-black uppercase tracking-[.2em] text-[#ad512f]">Helpful answers</div><h2 className="mt-3 text-4xl font-black tracking-[-.045em] text-[#211915] md:text-5xl">Frequently Asked Questions</h2></div>
        <div className="divide-y divide-[#e7ddd4] rounded-[1.5rem] border border-[#e2d7cd] bg-white px-5 sm:px-6">
          {siteConfig.faqs.map((item, index) => (
            <button key={item.question} type="button" onClick={() => setOpen(open === index ? -1 : index)} className="w-full py-4 text-left">
              <div className="flex items-center justify-between gap-4"><span className="font-black text-[#211915]">{item.question}</span><ChevronDown size={18} className={`shrink-0 text-[#8b766c] transition ${open === index ? "rotate-180" : ""}`} /></div>
              {open === index && <p className="max-w-2xl pt-3 text-sm leading-6 text-[#6b5a52]">{item.answer}</p>}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

function FinalCta() {
  return (
    <section className="bg-[#fffdf9] px-4 pb-20 pt-4 sm:px-5 md:pb-24">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#241915] px-6 py-14 text-white sm:px-9 md:px-14 md:py-16">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#ad512f]/20 blur-3xl" />
        <div className="relative grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div><div className="text-xs font-black uppercase tracking-[.2em] text-[#e49a75]">One call from comfortable</div><h2 className="mt-3 max-w-3xl text-4xl font-black leading-[1.02] tracking-[-.045em] md:text-5xl">Call today. Get a clear next step.</h2><p className="mt-4 max-w-xl text-base leading-7 text-white/65">Tell us what’s going on. We’ll make the next step simple.</p></div>
          <div className="flex flex-wrap gap-3"><a href={phoneHref} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3.5 text-sm font-black text-[#211915]"><Phone size={15} /> Call Now</a><Link href="/quote" className="inline-flex items-center gap-2 rounded-full bg-[#ad512f] px-5 py-3.5 text-sm font-black text-white">Schedule Service <ArrowRight size={15} /></Link></div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-[#e4d9cf] bg-[#f5eee7] pb-20 md:pb-0">
      <div className="mx-auto grid max-w-7xl gap-7 px-4 py-10 sm:px-5 md:grid-cols-3 md:px-8">
        <div><div className="text-lg font-black tracking-[-.03em] text-[#211915]">{siteConfig.brand.name}</div><p className="mt-2 max-w-sm text-sm leading-6 text-[#74635b]">Heating, cooling, repair, replacement, maintenance, and indoor comfort service.</p></div>
        <div className="text-sm font-bold text-[#66554d]"><Link className="block py-1" href="/">Home</Link><Link className="block py-1" href="/services">Services</Link><Link className="block py-1" href="/quote">Schedule Service</Link></div>
        <div className="text-sm text-[#74635b] md:text-right"><a href={phoneHref} className="block py-1 font-black text-[#211915]">{siteConfig.brand.phoneDisplay}</a><a href={`mailto:${siteConfig.brand.email}`} className="block py-1">{siteConfig.brand.email}</a><div className="py-1">Local service area</div></div>
      </div>
    </footer>
  )
}

function MobileServiceBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-2 border-t border-[#e0d4ca] bg-[#fffdf9]/95 p-3 shadow-[0_-10px_30px_rgba(31,22,18,.08)] backdrop-blur-xl md:hidden">
      <a href={phoneHref} className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#d9c9bd] bg-white px-3 py-3 text-sm font-black text-[#211915]"><Phone size={15} /> Call Now</a>
      <Link href="/quote" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#ad512f] px-3 py-3 text-sm font-black text-white">Schedule <ArrowRight size={15} /></Link>
    </div>
  )
}

function HomePage() {
  return <><Header currentPage="home" /><Hero /><TrustStrip /><ServicesPreview /><WhyChooseUs /><WorkInAction /><HowItWorks /><Reviews /><ServiceAreas /><FAQ /><FinalCta /><Footer /><MobileServiceBar /></>
}

function ServicesPage() {
  return (
    <><Header currentPage="services" /><section className="bg-[#f1e8df] py-14 md:py-20"><div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8"><div className="text-xs font-black uppercase tracking-[.2em] text-[#ad512f]">Heating · Cooling · Airflow</div><h1 className="mt-3 max-w-4xl text-5xl font-black leading-[.98] tracking-[-.05em] text-[#211915] md:text-7xl">HVAC service for the problems homeowners actually deal with.</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-[#66564f]">Choose the service that sounds closest to the problem. If you’re not sure, call and describe what the system is doing.</p></div></section><ServicesPreview all /><FinalCta /><Footer /><MobileServiceBar /></>
  )
}

function QuotePage() {
  return (
    <><Header currentPage="quote" /><section className="bg-[#f1e8df] py-12 md:py-16"><div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-5 md:px-8 lg:grid-cols-[.85fr_1.15fr]"><div className="lg:py-8"><div className="text-xs font-black uppercase tracking-[.2em] text-[#ad512f]">Request service</div><h1 className="mt-3 text-5xl font-black leading-[.98] tracking-[-.05em] text-[#211915] md:text-6xl">Tell us what’s going on.</h1><p className="mt-5 max-w-lg text-lg leading-8 text-[#66564f]">A short request is enough to get the conversation started.</p><div className="mt-7 space-y-3 text-sm font-bold text-[#55463f]"><div className="flex items-center gap-2"><Check size={16} className="text-[#ad512f]" /> No long questionnaire</div><div className="flex items-center gap-2"><Check size={16} className="text-[#ad512f]" /> Tell us the main problem</div><div className="flex items-center gap-2"><Check size={16} className="text-[#ad512f]" /> Or call {siteConfig.brand.phoneDisplay}</div></div></div><form className="rounded-[1.8rem] border border-[#dfd2c7] bg-[#fffdf9] p-5 shadow-[0_22px_60px_rgba(44,28,21,.08)] sm:p-7" onSubmit={(event) => event.preventDefault()}><div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-black text-[#392c26]">Name<input className="mt-2 w-full rounded-xl border border-[#d9cbbf] bg-white px-4 py-3 font-medium outline-none focus:border-[#ad512f]" placeholder="Your name" /></label><label className="text-sm font-black text-[#392c26]">Phone<input className="mt-2 w-full rounded-xl border border-[#d9cbbf] bg-white px-4 py-3 font-medium outline-none focus:border-[#ad512f]" placeholder="(555) 555-0100" /></label><label className="text-sm font-black text-[#392c26]">ZIP code<input className="mt-2 w-full rounded-xl border border-[#d9cbbf] bg-white px-4 py-3 font-medium outline-none focus:border-[#ad512f]" placeholder="ZIP" /></label><label className="text-sm font-black text-[#392c26]">Service<select className="mt-2 w-full rounded-xl border border-[#d9cbbf] bg-white px-4 py-3 font-medium outline-none focus:border-[#ad512f]" defaultValue=""><option value="" disabled>Select service</option>{siteConfig.services.map((service) => <option key={service.title}>{service.title}</option>)}</select></label></div><label className="mt-4 block text-sm font-black text-[#392c26]">What’s happening?<textarea className="mt-2 min-h-28 w-full resize-none rounded-xl border border-[#d9cbbf] bg-white px-4 py-3 font-medium outline-none focus:border-[#ad512f]" placeholder="AC not cooling, furnace making noise, need an estimate..." /></label><button type="submit" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#ad512f] px-5 py-3.5 text-sm font-black text-white">Request Service <ArrowRight size={15} /></button></form></div></section><Footer /><MobileServiceBar /></>
  )
}

export default function HandymanPremiumSite({ currentPage = "home" }: { currentPage?: Page }) {
  if (currentPage === "services") return <ServicesPage />
  if (currentPage === "quote") return <QuotePage />
  return <HomePage />
}
