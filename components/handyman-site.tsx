"use client"

import Link from "next/link"
import {
  AirVent,
  ArrowRight,
  Building2,
  Check,
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
    <header className="sticky top-0 z-50 border-b border-[#e7ddd3] bg-[#fbf7f2]/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4 md:px-8">
        <Link href="/" className="min-w-0">
          <div className="text-lg font-black tracking-[-0.035em] text-[#241914] md:text-xl">{siteConfig.brand.name}</div>
          <div className="mt-0.5 hidden text-xs font-semibold text-[#76645b] sm:block">{siteConfig.brand.tagline}</div>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-semibold text-[#66544b] lg:flex">
          <Link href="/" className={currentPage === "home" ? "text-[#241914]" : "transition hover:text-[#a55332]"}>Home</Link>
          <Link href="/services" className={currentPage === "services" ? "text-[#241914]" : "transition hover:text-[#a55332]"}>Services</Link>
          <a href="#reviews" className="transition hover:text-[#a55332]">Reviews</a>
          <a href="#service-areas" className="transition hover:text-[#a55332]">Service Areas</a>
          <Link href="/quote" className={currentPage === "quote" ? "text-[#241914]" : "transition hover:text-[#a55332]"}>Contact</Link>
        </nav>
        <div className="flex items-center gap-2">
          <a href={phoneHref} className="hidden items-center gap-2 rounded-full border border-[#d8cbc0] bg-white px-4 py-2.5 text-sm font-black text-[#241914] transition hover:border-[#a55332] md:inline-flex">
            <Phone size={15} /> {siteConfig.brand.phoneDisplay}
          </a>
          <Link href="/quote" className="rounded-full bg-[#a55332] px-5 py-2.5 text-sm font-black text-white shadow-[0_10px_28px_rgba(165,83,50,.2)] transition hover:-translate-y-0.5 hover:bg-[#8f452a]">
            Schedule Service
          </Link>
        </div>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="overflow-hidden bg-[#f4ede4]">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:px-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:py-16">
        <div className="relative z-10 py-4 lg:py-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d8cbc0] bg-white/75 px-4 py-2 text-xs font-black uppercase tracking-[.14em] text-[#76564a] shadow-sm">
            <Star size={14} fill="currentColor" className="text-[#b45a34]" /> {siteConfig.hero.eyebrow}
          </div>
          <h1 className="mt-6 max-w-3xl text-5xl font-black leading-[.92] tracking-[-.055em] text-[#241914] sm:text-6xl lg:text-[5rem]">
            Comfort back.<br /><span className="text-[#a55332]">Without the runaround.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[#66544b]">{siteConfig.hero.body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/quote" className="inline-flex items-center gap-2 rounded-full bg-[#a55332] px-6 py-3.5 text-sm font-black text-white shadow-[0_16px_36px_rgba(165,83,50,.22)] transition hover:-translate-y-0.5 hover:bg-[#8f452a]">
              Schedule Service <ArrowRight size={16} />
            </Link>
            <a href={phoneHref} className="inline-flex items-center gap-2 rounded-full border border-[#d8cbc0] bg-white px-6 py-3.5 text-sm font-black text-[#241914] transition hover:border-[#a55332]">
              <Phone size={16} /> Call Now
            </a>
          </div>
          <div className="mt-8 grid max-w-2xl grid-cols-2 gap-x-5 gap-y-3 sm:grid-cols-4">
            {siteConfig.trust.map((item) => (
              <div key={item} className="flex items-start gap-2 text-xs font-semibold leading-5 text-[#6e5b51]">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#a55332]/10 text-[#a55332]"><Check size={12} strokeWidth={3} /></span>
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[520px] overflow-hidden rounded-[2.4rem] bg-[#2a1c17] shadow-[0_35px_90px_rgba(37,25,20,.2)] lg:min-h-[610px]">
          <div className="absolute inset-0 bg-cover bg-center transition duration-700 hover:scale-[1.025]" style={{ backgroundImage: `url(${siteConfig.hero.image})` }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#241914]/80 via-[#241914]/15 to-transparent" />
          <div className="absolute left-6 top-6 rounded-full border border-white/20 bg-black/25 px-4 py-2 text-xs font-black uppercase tracking-[.14em] text-white backdrop-blur-xl">Residential HVAC service</div>
          <div className="absolute inset-x-6 bottom-6 rounded-[1.8rem] border border-white/15 bg-[#241914]/75 p-6 text-white backdrop-blur-xl">
            <div className="flex items-end justify-between gap-5">
              <div>
                <div className="text-xs font-bold uppercase tracking-[.16em] text-white/55">Home comfort</div>
                <div className="mt-1 text-5xl font-black tracking-[-.05em]">72°</div>
              </div>
              <div className="max-w-[220px] text-right text-sm leading-6 text-white/75">Quiet. Even. Comfortable. Exactly how the house should feel.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="border-y border-[#e6dbd1] bg-[#fffdf9]">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-[#e6dbd1] px-5 md:grid-cols-4 md:divide-y-0 md:px-8">
        {siteConfig.stats.map((stat) => (
          <div key={stat.label} className="px-4 py-7 md:px-6 md:py-9">
            <div className="text-3xl font-black tracking-[-.04em] text-[#241914] md:text-4xl">{stat.value}</div>
            <div className="mt-2 text-sm font-semibold leading-5 text-[#78665c]">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function ServicesPreview({ all = false }: { all?: boolean }) {
  const services = all ? siteConfig.services : siteConfig.services.slice(0, 6)
  return (
    <section className="bg-[#fbf7f2] py-16 md:py-22">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <div className="text-xs font-black uppercase tracking-[.2em] text-[#a55332]">What we handle</div>
            <h2 className="mt-3 max-w-3xl text-4xl font-black leading-[1] tracking-[-.05em] text-[#241914] md:text-6xl">The HVAC problems homeowners actually call about.</h2>
          </div>
          <p className="max-w-md text-base leading-7 text-[#6d5b52]">Repair, replacement, maintenance, airflow, and indoor comfort — explained without a wall of jargon.</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = serviceIcons[service.key]
            return (
              <article key={`${service.title}-${index}`} className="group overflow-hidden rounded-[2rem] border border-[#e6dbd1] bg-white shadow-[0_14px_45px_rgba(52,35,27,.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(52,35,27,.1)]">
                <div className="relative h-48 overflow-hidden bg-[#eee4d9]">
                  <div className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-[1.04]" style={{ backgroundImage: `url(${service.image})` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                  <div className="absolute left-4 top-4 grid h-11 w-11 place-items-center rounded-2xl border border-white/30 bg-[#fbf7f2]/90 text-[#a55332] shadow-sm backdrop-blur"><Icon size={22} /></div>
                  <div className="absolute bottom-4 right-4 rounded-full bg-black/45 px-3 py-1.5 text-[11px] font-black uppercase tracking-[.14em] text-white backdrop-blur">Service 0{index + 1}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-black tracking-[-.035em] text-[#241914]">{service.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#6d5b52]">{service.copy}</p>
                  <Link href="/quote" className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#a55332]">Get help <ArrowRight size={15} className="transition group-hover:translate-x-1" /></Link>
                </div>
              </article>
            )
          })}
        </div>
        {!all && <div className="mt-8"><Link href="/services" className="inline-flex items-center gap-2 rounded-full border border-[#d7c8bc] bg-white px-5 py-3 text-sm font-black text-[#241914] transition hover:border-[#a55332]">See all services <ArrowRight size={15} /></Link></div>}
      </div>
    </section>
  )
}

function WhyChooseUs() {
  const items = [
    [ShieldCheck, "Professional in your home", "Prepared technicians, clean work, and respect for the space they are working in."],
    [Gauge, "Clear choices", "Understand what is wrong and what the options are before the work starts."],
    [Clock3, "Built for urgent calls", "A fast route from ‘something is wrong’ to getting service scheduled."],
    [Phone, "Easy to reach", "Call or request service without hunting around the site."],
  ] as const
  return (
    <section className="bg-[#281a15] py-16 text-white md:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
        <div>
          <div className="text-xs font-black uppercase tracking-[.2em] text-[#d28b68]">Why homeowners call</div>
          <h2 className="mt-3 text-4xl font-black leading-[1] tracking-[-.05em] md:text-6xl">Good HVAC service should feel straightforward.</h2>
          <p className="mt-5 max-w-lg text-base leading-7 text-white/65">No mystery, no endless phone tag, and no feeling like you have to understand the equipment before asking for help.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {items.map(([Icon, title, copy]) => (
            <div key={title} className="rounded-[1.7rem] border border-white/10 bg-white/[.055] p-6 transition hover:-translate-y-0.5 hover:bg-white/[.075]">
              <Icon size={22} className="text-[#d28b68]" />
              <h3 className="mt-5 text-xl font-black">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/60">{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceInAction() {
  return (
    <section className="bg-[#fffdf9] py-16 md:py-22">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <div className="text-xs font-black uppercase tracking-[.2em] text-[#a55332]">Service in Action</div>
            <h2 className="mt-3 text-4xl font-black tracking-[-.05em] text-[#241914] md:text-6xl">HVAC work that actually looks like HVAC work.</h2>
          </div>
          <p className="max-w-md text-base leading-7 text-[#6d5b52]">Real service context: outdoor equipment, furnace diagnostics, and in-home cooling work — not random real-estate or office stock photos.</p>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {siteConfig.projects.map((project) => (
            <article key={project.title} className="group overflow-hidden rounded-[2rem] border border-[#e6dbd1] bg-white shadow-[0_15px_45px_rgba(52,35,27,.07)]">
              <div className="relative h-[280px] overflow-hidden bg-[#ece1d7]">
                <div className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-[1.035]" style={{ backgroundImage: `url(${project.image})` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
              </div>
              <div className="p-6"><h3 className="text-xl font-black text-[#241914]">{project.title}</h3><p className="mt-2 text-sm leading-6 text-[#6d5b52]">{project.copy}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Process() {
  const steps = [
    ["01", "Tell us what’s wrong", "Call or request service and describe what the home is doing."],
    ["02", "Get a clear visit", "Confirm the appointment and know what happens next."],
    ["03", "Choose the right fix", "Get the problem explained clearly with repair or replacement options."],
  ] as const
  return (
    <section className="bg-[#f4ede4] py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="text-xs font-black uppercase tracking-[.2em] text-[#a55332]">How It Works</div>
        <h2 className="mt-3 max-w-3xl text-4xl font-black tracking-[-.05em] text-[#241914] md:text-6xl">From uncomfortable to handled in three steps.</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {steps.map(([number, title, copy]) => (
            <div key={number} className="rounded-[2rem] border border-[#dfd1c5] bg-[#fffdf9] p-7">
              <div className="text-xs font-black tracking-[.18em] text-[#a55332]">{number}</div>
              <h3 className="mt-8 text-2xl font-black tracking-[-.035em] text-[#241914]">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#6d5b52]">{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Reviews() {
  return (
    <section id="reviews" className="bg-[#fffdf9] py-16 md:py-22">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#dfd1c5] bg-[#fbf7f2] px-3 py-2 text-xs font-black uppercase tracking-[.14em] text-[#76564a]"><Star size={14} fill="currentColor" className="text-[#b45a34]" /> 4.9 average rating</div>
            <h2 className="mt-4 text-4xl font-black tracking-[-.05em] text-[#241914] md:text-6xl">Reviews that sound like real service.</h2>
          </div>
          <p className="max-w-md text-base leading-7 text-[#6d5b52]">Clear communication, fast response, clean work, and technicians people feel comfortable calling again.</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {siteConfig.reviews.slice(0, 6).map((review) => (
            <article key={review.name} className="rounded-[2rem] border border-[#e6dbd1] bg-white p-6 shadow-[0_12px_35px_rgba(52,35,27,.05)]">
              <div className="flex gap-1 text-[#b45a34]">{[0,1,2,3,4].map((star) => <Star key={star} size={16} fill="currentColor" />)}</div>
              <p className="mt-5 text-base font-semibold leading-7 text-[#3d2d26]">“{review.quote}”</p>
              <div className="mt-6 border-t border-[#eee4db] pt-4"><div className="font-black text-[#241914]">{review.name}</div><div className="mt-1 text-sm text-[#89766c]">{review.location}</div></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceAreas() {
  return (
    <section id="service-areas" className="border-y border-[#e6dbd1] bg-[#fbf7f2] py-16 md:py-20">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 md:px-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[.2em] text-[#a55332]"><MapPin size={15} /> Local service area</div>
          <h2 className="mt-4 text-4xl font-black tracking-[-.05em] text-[#241914] md:text-5xl">Close enough to show up when it matters.</h2>
          <p className="mt-4 max-w-lg leading-7 text-[#6d5b52]">Residential heating and cooling service throughout the local area and nearby communities.</p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">{siteConfig.serviceAreas.map((area) => <div key={area} className="rounded-2xl border border-[#dfd1c5] bg-white px-4 py-5 text-sm font-black text-[#3e3029]">{area}</div>)}</div>
      </div>
    </section>
  )
}

function FAQ() {
  return (
    <section className="bg-[#fffdf9] py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <div className="text-xs font-black uppercase tracking-[.2em] text-[#a55332]">Frequently Asked Questions</div>
        <h2 className="mt-3 text-4xl font-black tracking-[-.05em] text-[#241914] md:text-5xl">The questions homeowners ask before they book.</h2>
        <div className="mt-8 divide-y divide-[#e6dbd1] border-y border-[#e6dbd1]">
          {siteConfig.faqs.map((faq) => <details key={faq.question} className="group py-5"><summary className="cursor-pointer list-none pr-8 text-lg font-black text-[#241914]">{faq.question}</summary><p className="mt-3 max-w-3xl text-sm leading-6 text-[#6d5b52]">{faq.answer}</p></details>)}
        </div>
      </div>
    </section>
  )
}

function FinalCTA() {
  return (
    <section className="bg-[#fffdf9] px-5 pb-20 md:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-[#281a15] px-7 py-12 text-white shadow-[0_25px_70px_rgba(37,25,20,.16)] md:px-12 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div><div className="text-xs font-black uppercase tracking-[.2em] text-[#d28b68]">One call from comfortable</div><h2 className="mt-4 max-w-4xl text-4xl font-black leading-[.98] tracking-[-.05em] md:text-6xl">Your comfort problem can end today.</h2><p className="mt-5 max-w-xl text-base leading-7 text-white/65">Tell us what is happening. We’ll help you figure out the next best step.</p></div>
          <div className="flex flex-wrap gap-3"><Link href="/quote" className="inline-flex items-center gap-2 rounded-full bg-[#b65b35] px-6 py-3.5 text-sm font-black text-white transition hover:bg-[#c86940]">Schedule Service <ArrowRight size={16} /></Link><a href={phoneHref} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-black text-white"><Phone size={16} /> Call Now</a></div>
        </div>
      </div>
    </section>
  )
}

function HomePage() {
  return <><Hero /><Stats /><ServicesPreview /><WhyChooseUs /><ServiceInAction /><Process /><Reviews /><ServiceAreas /><FAQ /><FinalCTA /></>
}

function ServicesPage() {
  return (
    <main className="bg-[#fbf7f2]">
      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:px-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:py-16">
        <div><div className="text-xs font-black uppercase tracking-[.2em] text-[#a55332]">Our services</div><h1 className="mt-3 text-5xl font-black leading-[.95] tracking-[-.055em] text-[#241914] md:text-7xl">Heating and cooling help, without the catalog feel.</h1><p className="mt-6 max-w-xl text-lg leading-8 text-[#6d5b52]">The services homeowners need most, with clear language and real HVAC imagery instead of generic stock photos.</p></div>
        <div className="relative min-h-[420px] overflow-hidden rounded-[2.2rem] bg-[#281a15] shadow-[0_30px_75px_rgba(37,25,20,.18)]"><div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${siteConfig.services[0].image})` }} /><div className="absolute inset-0 bg-gradient-to-t from-[#241914]/70 to-transparent" /><div className="absolute bottom-5 left-5 rounded-full bg-white/90 px-4 py-2 text-xs font-black uppercase tracking-[.14em] text-[#6b4a3d]">Residential HVAC service</div></div>
      </section>
      <ServicesPreview all />
      <FinalCTA />
    </main>
  )
}

function QuotePage() {
  const fields = [["Full name", "text"], ["Phone", "tel"], ["Email", "email"], ["ZIP code", "text"]] as const
  return (
    <main className="bg-[#f4ede4] px-5 py-14 md:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-start">
        <div className="pt-5"><div className="text-xs font-black uppercase tracking-[.2em] text-[#a55332]">Get comfortable again</div><h1 className="mt-3 text-5xl font-black leading-[.95] tracking-[-.05em] text-[#241914] md:text-7xl">Tell us what’s going on.</h1><p className="mt-5 max-w-lg text-lg leading-8 text-[#6d5b52]">A simple service request. No giant form and no need to diagnose the equipment yourself.</p><div className="mt-8 rounded-[2rem] bg-[#281a15] p-6 text-white"><div className="flex gap-1 text-[#d28b68]">{[0,1,2,3,4].map((star) => <Star key={star} size={15} fill="currentColor" />)}</div><div className="mt-3 text-xl font-black">4.9 average rating</div><p className="mt-2 text-sm leading-6 text-white/60">Fast response, clear communication, and professional service.</p></div></div>
        <form className="grid gap-4 rounded-[2.2rem] border border-[#dfd1c5] bg-white p-6 shadow-[0_24px_65px_rgba(52,35,27,.08)] md:grid-cols-2 md:p-8">
          {fields.map(([label, type]) => <label key={label} className="text-xs font-black uppercase tracking-[.12em] text-[#745f55]">{label}<input type={type} className="mt-2 w-full rounded-2xl border border-[#e5d9cf] bg-[#fbf7f2] px-4 py-4 text-base font-medium normal-case tracking-normal text-[#241914] outline-none transition focus:border-[#a55332]" /></label>)}
          <label className="text-xs font-black uppercase tracking-[.12em] text-[#745f55] md:col-span-2">Service needed<select className="mt-2 w-full rounded-2xl border border-[#e5d9cf] bg-[#fbf7f2] px-4 py-4 text-base font-medium normal-case tracking-normal text-[#241914] outline-none focus:border-[#a55332]"><option>AC repair</option><option>Heating repair</option><option>Installation / replacement</option><option>Maintenance</option><option>Not sure</option></select></label>
          <label className="text-xs font-black uppercase tracking-[.12em] text-[#745f55] md:col-span-2">What’s happening?<textarea rows={5} className="mt-2 w-full resize-none rounded-2xl border border-[#e5d9cf] bg-[#fbf7f2] px-4 py-4 text-base font-medium normal-case tracking-normal text-[#241914] outline-none focus:border-[#a55332]" /></label>
          <button type="button" className="mt-2 rounded-full bg-[#a55332] px-5 py-4 text-sm font-black text-white md:col-span-2">Request Service</button>
        </form>
      </div>
    </main>
  )
}

function Footer() {
  return (
    <footer className="border-t border-[#e0d2c6] bg-[#eee3d7] pb-20 md:pb-0">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-11 md:grid-cols-[1.2fr_.8fr_.8fr] md:px-8"><div><div className="text-xs font-black uppercase tracking-[.22em] text-[#a55332]">{siteConfig.brand.shortName}</div><p className="mt-3 max-w-sm text-sm leading-6 text-[#6d5b52]">Heating, cooling, repair, replacement, maintenance, and indoor comfort for local homeowners.</p></div><div className="text-sm font-semibold leading-7 text-[#6d5b52]"><Link href="/">Home</Link><br /><Link href="/services">Services</Link><br /><a href="#reviews">Reviews</a><br /><Link href="/quote">Contact</Link></div><div className="text-sm font-semibold leading-7 text-[#6d5b52]"><a href={phoneHref}>{siteConfig.brand.phoneDisplay}</a><br /><a href={`mailto:${siteConfig.brand.email}`}>{siteConfig.brand.email}</a><br />{siteConfig.brand.city}</div></div>
    </footer>
  )
}

function MobileServiceBar() {
  return <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-2 border-t border-[#ddcfc3] bg-[#fbf7f2]/96 p-3 backdrop-blur-xl md:hidden"><a href={phoneHref} className="flex items-center justify-center gap-2 rounded-full bg-[#281a15] px-4 py-3 text-sm font-black text-white"><Phone size={16} /> Call Now</a><Link href="/quote" className="flex items-center justify-center gap-2 rounded-full bg-[#a55332] px-4 py-3 text-sm font-black text-white">Schedule Service <ArrowRight size={15} /></Link></div>
}

export default function HandymanPremiumSite({ currentPage }: { currentPage: Page }) {
  return <div className="min-h-screen bg-[#fbf7f2] text-[#241914]"><Header currentPage={currentPage} />{currentPage === "home" ? <HomePage /> : currentPage === "services" ? <ServicesPage /> : <QuotePage />}<Footer /><MobileServiceBar /></div>
}
