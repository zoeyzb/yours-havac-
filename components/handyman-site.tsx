"use client"

import { useState } from "react"
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

function Header({ currentPage }: { currentPage: Page }) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4 md:px-8">
        <Link href="/" className="min-w-0">
          <div className="text-lg font-black tracking-[-0.035em] text-slate-950 md:text-xl">{siteConfig.brand.name}</div>
          <div className="mt-0.5 hidden text-xs font-semibold text-slate-500 sm:block">{siteConfig.brand.tagline}</div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-600 lg:flex">
          <Link href="/" className={currentPage === "home" ? "text-slate-950" : "transition hover:text-slate-950"}>Home</Link>
          <Link href="/services" className={currentPage === "services" ? "text-slate-950" : "transition hover:text-slate-950"}>Services</Link>
          <a href="#reviews" className="transition hover:text-slate-950">Reviews</a>
          <a href="#service-areas" className="transition hover:text-slate-950">Service Areas</a>
          <Link href="/quote" className={currentPage === "quote" ? "text-slate-950" : "transition hover:text-slate-950"}>Contact</Link>
        </nav>

        <div className="flex items-center gap-2">
          <a href={phoneHref} className="hidden rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-black text-slate-900 transition hover:border-slate-300 md:inline-flex md:items-center md:gap-2">
            <Phone size={15} /> {siteConfig.brand.phoneDisplay}
          </a>
          <Link href="/quote" className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-700">
            Schedule Service
          </Link>
        </div>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1480px] px-4 py-4 sm:px-5 md:py-5">
        <div className="relative min-h-[650px] overflow-hidden rounded-[2rem] bg-slate-900 lg:min-h-[690px]">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${siteConfig.hero.image})` }} />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/15" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />

          <div className="relative z-10 flex min-h-[650px] max-w-7xl items-center px-6 py-16 sm:px-10 lg:min-h-[690px] lg:px-20">
            <div className="max-w-3xl text-white">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[.16em] backdrop-blur-md">
                <ShieldCheck size={15} className="text-blue-300" /> {siteConfig.hero.eyebrow}
              </div>

              <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-[.98] tracking-[-.045em] sm:text-6xl lg:text-[5.2rem]">
                {siteConfig.hero.heading}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80 sm:text-xl">{siteConfig.hero.body}</p>

              <div className="mt-7 grid max-w-xl gap-3 text-sm font-semibold text-white/90 sm:grid-cols-2">
                {siteConfig.trust.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-blue-500/20 text-blue-200"><Check size={14} strokeWidth={3} /></span>
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="/quote" className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-4 text-sm font-black text-white shadow-lg shadow-blue-950/20 transition hover:-translate-y-0.5 hover:bg-blue-500">
                  Schedule Service <ArrowRight size={16} />
                </Link>
                <a href={phoneHref} className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-4 text-sm font-black text-white backdrop-blur-md transition hover:bg-white/20">
                  <Phone size={16} /> {siteConfig.brand.phoneDisplay}
                </a>
              </div>
            </div>
          </div>

          <div className="absolute bottom-6 right-6 hidden rounded-2xl border border-white/20 bg-black/35 p-5 text-white backdrop-blur-xl md:block">
            <div className="flex items-center gap-1 text-orange-400">{[0,1,2,3,4].map((star) => <Star key={star} size={17} fill="currentColor" />)}</div>
            <div className="mt-2 text-sm font-black">Trusted by local homeowners</div>
            <div className="mt-1 text-xs text-white/65">Fast response · clear communication · professional service</div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="border-y border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-slate-200 px-5 md:grid-cols-4 md:divide-y-0 md:px-8">
        {siteConfig.stats.map((stat) => (
          <div key={stat.label} className="px-4 py-8 text-center md:px-6 md:py-10">
            <div className="text-4xl font-semibold tracking-[-.045em] text-slate-950 md:text-5xl">{stat.value}</div>
            <div className="mt-2 text-sm font-semibold text-slate-500">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function ServicesPreview() {
  const featured = siteConfig.services.slice(0, 6)
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div>
            <div className="text-xs font-black uppercase tracking-[.2em] text-blue-600">Our services</div>
            <h2 className="mt-3 text-4xl font-semibold leading-[1.02] tracking-[-.045em] text-slate-950 md:text-6xl">Heating and cooling help for the problems homeowners actually call about.</h2>
          </div>
          <p className="max-w-xl text-lg leading-8 text-slate-600 lg:justify-self-end">From a no-cool call to a full system replacement, the master site is built to show the breadth of a real HVAC company without turning the page into a catalog.</p>
        </div>

        <div className="mt-12 divide-y divide-slate-200 border-y border-slate-200">
          {featured.map((service, index) => {
            const Icon = serviceIcons[service.key]
            return (
              <article key={service.title} className="group grid gap-6 py-8 md:grid-cols-[.75fr_1fr_320px] md:items-center md:py-10">
                <div className="flex items-center gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue-600"><Icon size={22} /></span>
                  <div>
                    <div className="text-[11px] font-black uppercase tracking-[.18em] text-slate-400">Service 0{index + 1}</div>
                    <h3 className="mt-1 text-2xl font-semibold tracking-[-.035em] text-slate-950">{service.title}</h3>
                  </div>
                </div>
                <p className="max-w-lg leading-7 text-slate-600">{service.copy}</p>
                <div className="relative h-48 overflow-hidden rounded-2xl bg-slate-100 md:h-44">
                  <div className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105" style={{ backgroundImage: `url(${service.image})` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
                </div>
              </article>
            )
          })}
        </div>

        <div className="mt-8">
          <Link href="/services" className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-black text-white transition hover:bg-blue-700">See All Services <ArrowRight size={16} /></Link>
        </div>
      </div>
    </section>
  )
}

function WhyChooseUs() {
  const items = [
    [ShieldCheck, "Licensed & Insured", "Qualified professionals working carefully in and around your home."],
    [Gauge, "Clear Recommendations", "Understand the problem and the options before work begins."],
    [Clock3, "Same-Day Availability", "A service experience designed to move quickly when the home cannot wait."],
    [Wrench, "Experienced Technicians", "Prepared for major HVAC brands, common failures, and real-world comfort problems."],
    [Check, "Quality Work", "Clean workmanship, proper testing, and a clear handoff when the job is complete."],
    [Phone, "Easy To Reach", "Call or request service online without hunting through the website."],
  ] as const

  return (
    <section className="bg-slate-50 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr]">
          <div>
            <div className="text-xs font-black uppercase tracking-[.2em] text-blue-600">Why homeowners choose us</div>
            <h2 className="mt-3 text-4xl font-semibold leading-[1.03] tracking-[-.045em] text-slate-950 md:text-6xl">A professional service experience without the hassle.</h2>
            <p className="mt-5 max-w-lg text-lg leading-8 text-slate-600">The page should make a homeowner feel that the company is established, reachable, and safe to invite into the house.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map(([Icon, title, copy]) => (
              <div key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-600"><Icon size={20} /></span>
                <h3 className="mt-6 text-xl font-semibold tracking-[-.025em] text-slate-950">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function BeforeAfterCard({ project }: { project: (typeof siteConfig.projects)[number] }) {
  const [position, setPosition] = useState(52)
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="relative h-[340px] overflow-hidden bg-slate-200 sm:h-[400px]">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${project.after})` }} />
        <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${position}%` }}>
          <div className="absolute inset-y-0 left-0 bg-cover bg-center" style={{ backgroundImage: `url(${project.before})`, width: `${10000 / Math.max(position, 1)}%` }} />
        </div>
        <div className="absolute inset-y-0 w-0.5 bg-white shadow-lg" style={{ left: `${position}%` }}>
          <span className="absolute left-1/2 top-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-4 border-white bg-blue-600 text-xs font-black text-white shadow-lg">↔</span>
        </div>
        <div className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">Before</div>
        <div className="absolute right-4 top-4 rounded-full bg-black/60 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">After</div>
        <input aria-label={`Compare before and after for ${project.title}`} className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0" type="range" min="10" max="90" value={position} onChange={(event) => setPosition(Number(event.target.value))} />
      </div>
      <div className="p-5">
        <div className="font-semibold text-slate-950">{project.title}</div>
        <div className="mt-1 text-sm text-slate-500">Drag across the photo to compare the work.</div>
      </div>
    </div>
  )
}

function Projects() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <div className="text-xs font-black uppercase tracking-[.2em] text-blue-600">Recent work</div>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-.045em] text-slate-950 md:text-6xl">Before & After</h2>
          </div>
          <p className="max-w-md text-lg leading-8 text-slate-600">Real project proof makes the site feel like a working local company instead of a template with stock claims.</p>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {siteConfig.projects.map((project) => <BeforeAfterCard key={project.title} project={project} />)}
        </div>
      </div>
    </section>
  )
}

function Process() {
  const steps = [
    ["01", "Tell us what’s wrong", "Call or request service online and tell us what is happening."],
    ["02", "We schedule your visit", "Choose an available time and know what to expect next."],
    ["03", "We diagnose & explain", "Get a clear explanation and sensible options before work begins."],
    ["04", "Get comfortable again", "The problem gets handled, the system gets tested, and you get your home back."],
  ]
  return (
    <section className="bg-slate-950 py-20 text-white md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="text-xs font-black uppercase tracking-[.2em] text-blue-300">How It Works</div>
        <h2 className="mt-3 max-w-3xl text-4xl font-semibold leading-[1.03] tracking-[-.045em] md:text-6xl">Getting HVAC help should feel simple.</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {steps.map(([number, title, copy]) => (
            <div key={number} className="rounded-2xl border border-white/10 bg-white/[.045] p-6">
              <div className="text-xs font-black tracking-[.18em] text-blue-300">{number}</div>
              <h3 className="mt-8 text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/60">{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Reviews() {
  return (
    <section id="reviews" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="text-xs font-black uppercase tracking-[.2em] text-blue-600">Customer feedback</div>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-.045em] text-slate-950 md:text-6xl">What Our Customers Say</h2>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
            <div className="flex gap-1 text-orange-500">{[0,1,2,3,4].map((star) => <Star key={star} size={16} fill="currentColor" />)}</div>
            <div className="mt-1 text-sm font-black text-slate-900">4.9 average rating</div>
          </div>
        </div>

        <div className="mt-10 flex snap-x gap-4 overflow-x-auto pb-4 lg:grid lg:grid-cols-3 lg:overflow-visible">
          {siteConfig.reviews.map((review) => (
            <article key={review.name} className="min-w-[86%] snap-start rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:min-w-[54%] lg:min-w-0">
              <div className="flex gap-1 text-orange-500">{[0,1,2,3,4].map((star) => <Star key={star} size={16} fill="currentColor" />)}</div>
              <p className="mt-5 text-lg font-semibold leading-8 text-slate-800">“{review.quote}”</p>
              <div className="mt-6 border-t border-slate-200 pt-5">
                <div className="font-black text-slate-950">{review.name}</div>
                <div className="mt-1 text-sm text-slate-500">{review.location}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <section className="bg-slate-50 py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[.8fr_1.2fr]">
        <div>
          <div className="text-xs font-black uppercase tracking-[.2em] text-blue-600">Helpful answers</div>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-.045em] text-slate-950 md:text-6xl">Frequently Asked Questions</h2>
          <p className="mt-5 max-w-md text-lg leading-8 text-slate-600">Keep the questions practical. This section should reduce hesitation, not bury the homeowner in HVAC jargon.</p>
        </div>
        <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white px-5 sm:px-7">
          {siteConfig.faqs.map((item, index) => (
            <button key={item.question} type="button" onClick={() => setOpen(open === index ? -1 : index)} className="w-full py-5 text-left">
              <div className="flex items-center justify-between gap-5">
                <span className="font-semibold text-slate-950">{item.question}</span>
                <ChevronDown size={19} className={`shrink-0 text-slate-400 transition ${open === index ? "rotate-180" : ""}`} />
              </div>
              {open === index ? <p className="max-w-2xl pt-3 text-sm leading-6 text-slate-600">{item.answer}</p> : null}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceAreas() {
  return (
    <section id="service-areas" className="bg-white py-20 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 md:px-8 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[.2em] text-blue-600"><MapPin size={15} /> Local service area</div>
          <h2 className="mt-3 text-4xl font-semibold leading-[1.04] tracking-[-.045em] text-slate-950 md:text-6xl">Close enough to show up when it matters.</h2>
          <p className="mt-5 max-w-lg text-lg leading-8 text-slate-600">Replace these placeholders with the company’s real service cities so the site feels local the moment a homeowner lands on it.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.serviceAreas.map((area) => (
            <div key={area} className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-5 font-semibold text-slate-800">{area}</div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FinalCTA() {
  return (
    <section className="bg-white px-4 pb-20 pt-6 sm:px-5 md:pb-24">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-16 text-white sm:px-10 md:py-20 lg:px-16">
        <div className="pointer-events-none absolute -right-14 -top-20 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="relative max-w-3xl">
          <div className="text-xs font-black uppercase tracking-[.2em] text-blue-300">One call from comfortable</div>
          <h2 className="mt-3 text-4xl font-semibold leading-[1.02] tracking-[-.045em] md:text-6xl">Your comfort problem can end today.</h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-white/65">Tell us what is happening. We’ll help you figure out the next best step.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/quote" className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-4 text-sm font-black text-white transition hover:bg-blue-500">Schedule Service <ArrowRight size={16} /></Link>
            <a href={phoneHref} className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-6 py-4 text-sm font-black text-white transition hover:bg-white/15"><Phone size={16} /> Call Now</a>
          </div>
        </div>
      </div>
    </section>
  )
}

function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <ServicesPreview />
      <WhyChooseUs />
      <Projects />
      <Process />
      <Reviews />
      <FAQ />
      <ServiceAreas />
      <FinalCTA />
    </>
  )
}

function ServicesPage() {
  return (
    <main className="bg-white">
      <section className="border-b border-slate-200 bg-slate-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="text-xs font-black uppercase tracking-[.2em] text-blue-600">Complete HVAC service</div>
          <h1 className="mt-3 max-w-4xl text-5xl font-semibold leading-[1.01] tracking-[-.05em] text-slate-950 md:text-7xl">Heating, cooling, air quality, repair, replacement, and maintenance.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">A complete master service page that can be trimmed to match what each actual business offers.</p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 md:grid-cols-2 md:px-8">
          {siteConfig.services.map((service) => {
            const Icon = serviceIcons[service.key]
            return (
              <article key={service.title} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="relative h-56 bg-slate-100">
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${service.image})` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                  <span className="absolute bottom-4 left-4 grid h-11 w-11 place-items-center rounded-xl bg-white text-blue-600 shadow"><Icon size={22} /></span>
                </div>
                <div className="p-6 md:p-7">
                  <h2 className="text-2xl font-semibold tracking-[-.035em] text-slate-950">{service.title}</h2>
                  <p className="mt-2 leading-7 text-slate-600">{service.copy}</p>
                  <Link href="/quote" className="mt-5 inline-flex items-center gap-2 text-sm font-black text-blue-600">Request Service <ArrowRight size={15} /></Link>
                </div>
              </article>
            )
          })}
        </div>
      </section>
      <FinalCTA />
    </main>
  )
}

function QuotePage() {
  return (
    <main className="bg-slate-50 py-12 md:py-20">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 md:px-8 lg:grid-cols-[.85fr_1.15fr]">
        <div className="rounded-3xl bg-slate-950 p-8 text-white md:p-10">
          <div className="text-xs font-black uppercase tracking-[.2em] text-blue-300">Need service?</div>
          <h1 className="mt-3 text-4xl font-semibold leading-[1.03] tracking-[-.045em] md:text-5xl">Tell us what’s going on.</h1>
          <p className="mt-5 text-lg leading-8 text-white/65">Keep the form short enough that a homeowner can finish it in under a minute.</p>
          <a href={phoneHref} className="mt-8 inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-5 py-3.5 text-sm font-black text-white"><Phone size={16} /> {siteConfig.brand.phoneDisplay}</a>
        </div>

        <form className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8" onSubmit={(event) => event.preventDefault()}>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold text-slate-700">Name<input className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3.5 outline-none transition focus:border-blue-500" placeholder="Your name" /></label>
            <label className="text-sm font-semibold text-slate-700">Phone<input className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3.5 outline-none transition focus:border-blue-500" placeholder="Best number to reach you" /></label>
            <label className="text-sm font-semibold text-slate-700">Email<input className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3.5 outline-none transition focus:border-blue-500" placeholder="you@example.com" /></label>
            <label className="text-sm font-semibold text-slate-700">ZIP code<input className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3.5 outline-none transition focus:border-blue-500" placeholder="Your ZIP" /></label>
          </div>
          <label className="mt-4 block text-sm font-semibold text-slate-700">What do you need help with?<select className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 outline-none transition focus:border-blue-500"><option>Choose a service</option>{siteConfig.services.map((service) => <option key={service.title}>{service.title}</option>)}</select></label>
          <label className="mt-4 block text-sm font-semibold text-slate-700">What’s happening?<textarea rows={5} className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-4 py-3.5 outline-none transition focus:border-blue-500" placeholder="Tell us what you’re noticing" /></label>
          <button type="submit" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-4 text-sm font-black text-white transition hover:bg-blue-700">Request Service <ArrowRight size={16} /></button>
          <p className="mt-3 text-center text-xs leading-5 text-slate-400">Connect this form to the business’s real scheduling or lead system before launch.</p>
        </form>
      </div>
    </main>
  )
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white pb-20 md:pb-0">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:grid-cols-3 md:px-8">
        <div>
          <div className="text-lg font-black tracking-[-.03em] text-slate-950">{siteConfig.brand.name}</div>
          <p className="mt-3 max-w-sm text-sm leading-6 text-slate-500">Heating, cooling, replacement, maintenance, and indoor comfort for homeowners who want dependable service.</p>
        </div>
        <div className="text-sm font-semibold text-slate-600">
          <Link href="/" className="block py-1">Home</Link>
          <Link href="/services" className="block py-1">Services</Link>
          <Link href="/quote" className="block py-1">Schedule Service</Link>
        </div>
        <div className="text-sm text-slate-500 md:text-right">
          <a href={phoneHref} className="block py-1 font-black text-slate-900">{siteConfig.brand.phoneDisplay}</a>
          <a href={`mailto:${siteConfig.brand.email}`} className="block py-1">{siteConfig.brand.email}</a>
          <div className="py-1">{siteConfig.brand.city}</div>
        </div>
      </div>
    </footer>
  )
}

function MobileServiceBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-2 border-t border-slate-200 bg-white/95 p-3 shadow-[0_-10px_30px_rgba(15,23,42,.08)] backdrop-blur-xl md:hidden">
      <a href={phoneHref} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-black text-slate-900"><Phone size={16} /> Call Now</a>
      <Link href="/quote" className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-black text-white">Schedule Service <ArrowRight size={15} /></Link>
    </div>
  )
}

export default function HandymanPremiumSite({ currentPage }: { currentPage: Page }) {
  return (
    <div className="min-h-screen bg-white text-slate-950">
      <Header currentPage={currentPage} />
      {currentPage === "home" ? <HomePage /> : null}
      {currentPage === "services" ? <ServicesPage /> : null}
      {currentPage === "quote" ? <QuotePage /> : null}
      <Footer />
      <MobileServiceBar />
    </div>
  )
}
