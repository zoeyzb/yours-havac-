"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowRight, Check, ChevronDown, Clock3, MapPin, Phone, ShieldCheck, Star, Wrench } from "lucide-react"
import { siteConfig } from "../lib/site-config"

type Page = "home" | "services" | "quote"
const phoneHref = `tel:${siteConfig.brand.phoneHref}`

function Photo({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return <img src={src} alt={alt} loading="lazy" className={`h-full w-full object-cover ${className}`} />
}

function Header({ currentPage }: { currentPage: Page }) {
  return <header className="sticky top-0 z-50 border-b border-[#e5ddd5] bg-[#fffdf9]/95 backdrop-blur-xl">
    <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
      <Link href="/" className="min-w-0">
        <div className="truncate text-[17px] font-extrabold tracking-[-.035em] text-[#201714] sm:text-xl">{siteConfig.brand.name}</div>
        <div className="mt-0.5 hidden text-[11px] font-medium text-[#75665f] sm:block">{siteConfig.brand.tagline}</div>
      </Link>
      <nav className="hidden items-center gap-6 text-sm font-semibold text-[#65564f] lg:flex">
        <Link href="/" className={currentPage === "home" ? "text-[#201714]" : "hover:text-[#ad512f]"}>Home</Link>
        <Link href="/services" className={currentPage === "services" ? "text-[#201714]" : "hover:text-[#ad512f]"}>Services</Link>
        <a href="/#reviews" className="hover:text-[#ad512f]">Reviews</a>
        <a href="/#service-areas" className="hover:text-[#ad512f]">Service Areas</a>
        <Link href="/quote" className="hover:text-[#ad512f]">Contact</Link>
      </nav>
      <div className="flex items-center gap-2">
        <a href={phoneHref} className="hidden items-center gap-2 rounded-full border border-[#d9ccc1] bg-white px-4 py-2.5 text-sm font-bold text-[#201714] md:inline-flex"><Phone size={15}/>{siteConfig.brand.phoneDisplay}</a>
        <Link href="/quote" className="rounded-full bg-[#ad512f] px-4 py-2.5 text-xs font-extrabold text-white shadow-[0_10px_25px_rgba(173,81,47,.18)] sm:px-5 sm:text-sm">Schedule Service</Link>
      </div>
    </div>
  </header>
}

function Hero() {
  return <section className="bg-[radial-gradient(circle_at_80%_10%,#fff9f3_0,#f3e9df_42%,#efe3d8_100%)]">
    <div className="mx-auto grid max-w-7xl gap-7 px-4 py-8 sm:px-6 md:py-11 lg:grid-cols-[.88fr_1.12fr] lg:items-center lg:px-8">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-[#ddcfc3] bg-white/90 px-3.5 py-2 text-[11px] font-extrabold uppercase tracking-[.11em] text-[#72584d] shadow-sm"><Star size={13} fill="currentColor" className="text-[#c26039]"/>{siteConfig.hero.eyebrow}</div>
        <h1 className="mt-5 max-w-xl text-[2.9rem] font-black leading-[.98] tracking-[-.05em] text-[#211814] sm:text-[3.8rem] lg:text-[4.25rem]">Comfort back.<br/><span className="text-[#ad512f]">Without the runaround.</span></h1>
        <p className="mt-5 max-w-xl text-base font-medium leading-7 text-[#66564f] sm:text-lg">{siteConfig.hero.body}</p>
        <div className="mt-5 grid max-w-xl gap-2 sm:grid-cols-2">
          {siteConfig.trust.map((item)=><div key={item} className="flex items-center gap-2 rounded-xl border border-[#dfd3c9] bg-white/70 px-3 py-2.5 text-sm font-semibold text-[#50433d]"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#f4e5dc] text-[#ad512f]"><Check size={13} strokeWidth={3}/></span>{item}</div>)}
        </div>
        <div className="mt-7 flex flex-wrap gap-3"><Link href="/quote" className="inline-flex items-center gap-2 rounded-full bg-[#ad512f] px-6 py-3.5 text-sm font-extrabold text-white shadow-[0_14px_30px_rgba(173,81,47,.22)] transition hover:-translate-y-0.5">Schedule Service <ArrowRight size={16}/></Link><a href={phoneHref} className="inline-flex items-center gap-2 rounded-full border border-[#d7c8bc] bg-white px-6 py-3.5 text-sm font-extrabold text-[#211814]"><Phone size={16}/>Call Now</a></div>
      </div>
      <div className="relative min-h-[390px] overflow-hidden rounded-[1.8rem] bg-[#2a1c17] shadow-[0_28px_65px_rgba(48,30,22,.18)] sm:min-h-[500px] lg:min-h-[555px]">
        <Photo src={siteConfig.hero.image} alt={siteConfig.hero.imageAlt} className="absolute inset-0"/>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1e1410]/70 via-transparent to-transparent"/>
        <div className="absolute left-4 top-4 rounded-full border border-white/25 bg-black/30 px-3.5 py-2 text-[10px] font-extrabold uppercase tracking-[.12em] text-white backdrop-blur-lg sm:left-5 sm:top-5">Residential HVAC service</div>
        <div className="absolute inset-x-4 bottom-4 rounded-[1.35rem] border border-white/15 bg-[#211915]/80 p-4 text-white backdrop-blur-xl sm:inset-x-5 sm:bottom-5 sm:p-5">
          <div className="flex items-end justify-between gap-4"><div><div className="text-[10px] font-bold uppercase tracking-[.14em] text-white/55">Home comfort</div><div className="mt-1 text-4xl font-black">72°</div></div><div className="max-w-[210px] text-right text-xs font-medium leading-5 text-white/80 sm:text-sm">Quiet. Even. Comfortable.<br/>Exactly how home should feel.</div></div>
        </div>
      </div>
    </div>
  </section>
}

function ProofStrip() {
  return <section className="border-y border-[#e4dad1] bg-[#fffdf9]"><div className="mx-auto grid max-w-7xl grid-cols-2 px-4 sm:px-6 md:grid-cols-4 lg:px-8">{siteConfig.stats.map((s,i)=><div key={s.label} className={`px-3 py-5 sm:px-5 ${i%2===1?"border-l border-[#e4dad1]":""} ${i>1?"border-t md:border-t-0":""} md:border-l md:first:border-l-0`}><div className="text-xl font-black tracking-[-.03em] text-[#211814] sm:text-2xl">{s.value}</div><div className="mt-1 text-xs font-semibold leading-5 text-[#77675f] sm:text-sm">{s.label}</div></div>)}</div></section>
}

function Services({ all=false }: { all?: boolean }) {
  const services=all?siteConfig.services:siteConfig.services.slice(0,8)
  return <section className="bg-[#f8f3ed] py-14 md:py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="max-w-3xl"><div className="text-xs font-extrabold uppercase tracking-[.18em] text-[#ad512f]">Our Services</div><h2 className="mt-3 text-3xl font-black leading-[1.03] tracking-[-.04em] text-[#211814] sm:text-4xl md:text-5xl">The HVAC help homeowners call for most.</h2><p className="mt-3 max-w-2xl text-base leading-7 text-[#6a5b54]">Repair, maintenance, airflow, controls, replacement, and urgent service — with clear answers before the work starts.</p></div>
    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{services.map((s)=><article key={s.key} className="group overflow-hidden rounded-[1.45rem] border border-[#e0d5cb] bg-white shadow-[0_10px_28px_rgba(45,28,20,.055)] transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(45,28,20,.1)]"><div className="h-44 overflow-hidden bg-[#e5ddd5]"><Photo src={s.image} alt={s.imageAlt} className="transition duration-500 group-hover:scale-[1.03]"/></div><div className="p-4.5 p-5"><h3 className="text-[17px] font-extrabold tracking-[-.02em] text-[#211814]">{s.title}</h3><p className="mt-2 text-sm leading-6 text-[#6a5a53]">{s.copy}</p><Link href="/quote" className="mt-4 inline-flex items-center gap-1.5 text-sm font-extrabold text-[#ad512f]">Request service <ArrowRight size={14}/></Link></div></article>)}</div>
    {!all&&<div className="mt-7"><Link href="/services" className="inline-flex items-center gap-2 rounded-full border border-[#d7c9bd] bg-white px-5 py-3 text-sm font-extrabold text-[#211814]">See all services <ArrowRight size={15}/></Link></div>}
  </div></section>
}

function WhyChooseUs() {
  const items=[
    [ShieldCheck,"Licensed & Insured","Professional service with the basics homeowners expect."],
    [Wrench,"Experienced Technicians","Careful diagnosis before parts or repairs are recommended."],
    [Check,"Quality Workmanship","Clean work, proper testing, and attention to the details."],
    [Clock3,"Reliable Service","Clear scheduling and a team that stays reachable."],
    [ShieldCheck,"Warranty Support","Workmanship and equipment coverage explained clearly."],
    [Check,"Straight Answers","Know what is wrong and what your options are first."],
  ] as const
  return <section className="bg-[#251915] py-14 text-white md:py-18"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="max-w-3xl"><div className="text-xs font-extrabold uppercase tracking-[.18em] text-[#dd936f]">Why Choose Us</div><h2 className="mt-3 text-3xl font-black tracking-[-.04em] sm:text-4xl md:text-5xl">Good HVAC service should feel straightforward.</h2><p className="mt-3 max-w-2xl text-base leading-7 text-white/65">Qualified people, reliable work, and clear communication from the first call through the final test.</p></div><div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{items.map(([Icon,t,c])=><div key={t} className="rounded-[1.3rem] border border-white/10 bg-white/[.055] p-5 transition hover:bg-white/[.085]"><div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-[#e69a76]"><Icon size={18}/></span><h3 className="font-extrabold">{t}</h3></div><p className="mt-3 text-sm leading-6 text-white/62">{c}</p></div>)}</div></div></section>
}

function Work() {
  return <section className="bg-[#fffdf9] py-14 md:py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="max-w-3xl"><div className="text-xs font-extrabold uppercase tracking-[.18em] text-[#ad512f]">Work in action</div><h2 className="mt-3 text-3xl font-black tracking-[-.04em] text-[#211814] sm:text-4xl md:text-5xl">Real equipment. Real service visits.</h2><p className="mt-3 text-base leading-7 text-[#6a5a53]">A few examples of the hands-on work behind a comfortable home.</p></div><div className="mt-8 grid gap-4 lg:grid-cols-3">{siteConfig.projects.map(p=><article key={p.title} className="overflow-hidden rounded-[1.5rem] border border-[#e0d5cb] bg-white shadow-sm"><div className="h-56 overflow-hidden"><Photo src={p.image} alt={p.imageAlt}/></div><div className="p-5"><h3 className="text-lg font-extrabold text-[#211814]">{p.title}</h3><p className="mt-2 text-sm leading-6 text-[#6a5a53]">{p.copy}</p></div></article>)}</div></div></section>
}

function HowItWorks() {
  const steps=[["01","Tell us what’s wrong","Call or send a quick service request."],["02","Get a clear diagnosis","We inspect the system and explain the options."],["03","Get comfortable again","We complete the work and test the system."]]
  return <section className="bg-[#f2e9e0] py-14 md:py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="text-center"><div className="text-xs font-extrabold uppercase tracking-[.18em] text-[#ad512f]">How It Works</div><h2 className="mt-3 text-3xl font-black tracking-[-.04em] text-[#211814] sm:text-4xl">Three simple steps.</h2></div><div className="mx-auto mt-7 grid max-w-5xl gap-3 md:grid-cols-3">{steps.map(([n,t,c])=><div key={n} className="rounded-[1.35rem] border border-[#dacbc0] bg-[#fffdf9] p-5 shadow-sm"><div className="flex items-start gap-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#ad512f] text-xs font-black text-white">{n}</span><div><div className="font-extrabold text-[#211814]">{t}</div><div className="mt-1 text-sm leading-5 text-[#6a5a53]">{c}</div></div></div></div>)}</div></div></section>
}

function Reviews() {
  return <section id="reviews" className="bg-[#fffdf9] py-14 md:py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><div><div className="text-xs font-extrabold uppercase tracking-[.18em] text-[#ad512f]">Homeowner Reviews</div><h2 className="mt-3 text-3xl font-black tracking-[-.04em] text-[#211814] sm:text-4xl md:text-5xl">Trusted by homeowners.</h2></div><div className="w-fit rounded-2xl border border-[#e0d5cb] bg-white px-4 py-3 shadow-sm"><div className="flex gap-1 text-[#d66835]">{[1,2,3,4,5].map(n=><Star key={n} size={14} fill="currentColor"/>)}</div><div className="mt-1 text-sm font-extrabold text-[#211814]">4.9 average rating</div></div></div><div className="mt-7 flex snap-x gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-3 lg:overflow-visible">{siteConfig.reviews.map(r=><article key={`${r.name}-${r.quote}`} className="min-w-[88%] snap-start rounded-[1.4rem] border border-[#e1d6cc] bg-white p-5 shadow-sm sm:min-w-[55%] lg:min-w-0"><div className="flex gap-1 text-[#d66835]">{[1,2,3,4,5].map(n=><Star key={n} size={14} fill="currentColor"/>)}</div><p className="mt-4 text-base font-semibold leading-7 text-[#30241f]">“{r.quote}”</p><div className="mt-5 border-t border-[#eee5dd] pt-4"><div className="font-extrabold text-[#211814]">{r.name}</div><div className="mt-0.5 text-xs font-medium text-[#86736a]">Homeowner</div></div></article>)}</div></div></section>
}

function LocalService() {
  return <section id="service-areas" className="bg-[#f2e9e0] py-14 md:py-20"><div className="mx-auto grid max-w-7xl gap-7 px-4 sm:px-6 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:px-8"><div className="overflow-hidden rounded-[1.6rem] border border-[#daccc1] bg-white shadow-[0_16px_45px_rgba(48,31,24,.08)]"><Photo src={siteConfig.local.image} alt={siteConfig.local.imageAlt} className="aspect-[4/3]"/></div><div><div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.18em] text-[#ad512f]"><MapPin size={14}/>Local HVAC service</div><h2 className="mt-3 text-3xl font-black leading-[1.02] tracking-[-.04em] text-[#211814] sm:text-4xl md:text-5xl">A local team homeowners can actually reach.</h2><p className="mt-4 max-w-xl text-base leading-7 text-[#6a5a53]">Serving homes throughout the service area and nearby communities. Call to confirm your address and the earliest appointment.</p><div className="mt-5 grid gap-2 sm:grid-cols-2">{siteConfig.local.badges.map(b=><div key={b} className="flex items-center gap-2 rounded-xl border border-[#d9cabd] bg-[#fffdf9] px-4 py-3 text-sm font-semibold text-[#4f413b]"><Check size={14} className="text-[#ad512f]" strokeWidth={3}/>{b}</div>)}</div></div></div></section>
}

function FAQ() {
  const [open,setOpen]=useState(0)
  return <section className="bg-[#fffdf9] py-14 md:py-20"><div className="mx-auto grid max-w-7xl gap-7 px-4 sm:px-6 lg:grid-cols-[.72fr_1.28fr] lg:px-8"><div><div className="text-xs font-extrabold uppercase tracking-[.18em] text-[#ad512f]">Helpful answers</div><h2 className="mt-3 text-3xl font-black tracking-[-.04em] text-[#211814] sm:text-4xl md:text-5xl">Common HVAC questions.</h2></div><div className="divide-y divide-[#e8ddd4] rounded-[1.4rem] border border-[#e0d5cb] bg-white px-5 sm:px-6">{siteConfig.faqs.map((f,i)=><button key={f.question} type="button" onClick={()=>setOpen(open===i?-1:i)} className="w-full py-4 text-left"><div className="flex items-center justify-between gap-4"><span className="font-extrabold text-[#211814]">{f.question}</span><ChevronDown size={18} className={`shrink-0 text-[#8a766c] transition ${open===i?"rotate-180":""}`}/></div>{open===i&&<p className="max-w-2xl pt-3 text-sm leading-6 text-[#6a5a53]">{f.answer}</p>}</button>)}</div></div></section>
}

function FinalCta() {
  return <section className="bg-[#fffdf9] px-4 pb-20 pt-3 sm:px-6 md:pb-24 lg:px-8"><div className="mx-auto max-w-7xl overflow-hidden rounded-[1.7rem] bg-[#251915] px-6 py-11 text-white shadow-[0_22px_55px_rgba(40,25,19,.14)] sm:px-9 md:px-12"><div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end"><div><div className="text-xs font-extrabold uppercase tracking-[.18em] text-[#e49a75]">Need HVAC help?</div><h2 className="mt-3 max-w-3xl text-3xl font-black leading-[1.03] tracking-[-.04em] sm:text-4xl md:text-5xl">Tell us the problem. We’ll help with the next step.</h2><p className="mt-3 max-w-xl text-base leading-7 text-white/65">Call for service or send a quick request online.</p></div><div className="flex flex-wrap gap-3"><a href={phoneHref} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3.5 text-sm font-extrabold text-[#211814]"><Phone size={15}/>Call Now</a><Link href="/quote" className="inline-flex items-center gap-2 rounded-full bg-[#ad512f] px-5 py-3.5 text-sm font-extrabold text-white">Schedule Service <ArrowRight size={15}/></Link></div></div></div></section>
}

function Footer(){return <footer className="border-t border-[#e4d9cf] bg-[#f5eee7] pb-20 md:pb-0"><div className="mx-auto grid max-w-7xl gap-7 px-4 py-9 sm:px-6 md:grid-cols-3 lg:px-8"><div><div className="text-lg font-extrabold text-[#211814]">{siteConfig.brand.name}</div><p className="mt-2 max-w-sm text-sm leading-6 text-[#74635b]">Heating, cooling, maintenance, repair, replacement, and indoor comfort service.</p></div><div className="text-sm font-semibold text-[#66554d]"><Link className="block py-1" href="/">Home</Link><Link className="block py-1" href="/services">Services</Link><Link className="block py-1" href="/quote">Schedule Service</Link></div><div className="text-sm text-[#74635b] md:text-right"><a href={phoneHref} className="block py-1 font-extrabold text-[#211814]">{siteConfig.brand.phoneDisplay}</a><a href={`mailto:${siteConfig.brand.email}`} className="block py-1">{siteConfig.brand.email}</a><div className="py-1">Local service area</div></div></div></footer>}

function MobileBar(){return <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-2 border-t border-[#dfd3c9] bg-[#fffdf9]/96 p-2.5 shadow-[0_-8px_25px_rgba(31,22,18,.08)] backdrop-blur-xl md:hidden"><a href={phoneHref} className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#d9c9bd] bg-white px-3 py-3 text-sm font-extrabold text-[#211814]"><Phone size={15}/>Call Now</a><Link href="/quote" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#ad512f] px-3 py-3 text-sm font-extrabold text-white">Schedule <ArrowRight size={15}/></Link></div>}

function HomePage(){return <><Header currentPage="home"/><Hero/><ProofStrip/><Services/><WhyChooseUs/><Work/><HowItWorks/><Reviews/><LocalService/><FAQ/><FinalCta/><Footer/><MobileBar/></>}
function ServicesPage(){return <><Header currentPage="services"/><section className="bg-[#f1e8df] py-12 md:py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="text-xs font-extrabold uppercase tracking-[.18em] text-[#ad512f]">Heating · Cooling · Indoor Comfort</div><h1 className="mt-3 max-w-4xl text-4xl font-black leading-[1] tracking-[-.045em] text-[#211814] sm:text-5xl md:text-6xl">HVAC service for the problems homeowners actually deal with.</h1><p className="mt-4 max-w-2xl text-base leading-7 text-[#66564f] sm:text-lg">Choose the closest service below. If you are not sure, call and describe what the system is doing.</p></div></section><Services all/><FinalCta/><Footer/><MobileBar/></>}
function QuotePage(){return <><Header currentPage="quote"/><section className="bg-[#f1e8df] py-10 md:py-14"><div className="mx-auto grid max-w-7xl gap-7 px-4 sm:px-6 lg:grid-cols-[.85fr_1.15fr] lg:px-8"><div className="lg:py-7"><div className="text-xs font-extrabold uppercase tracking-[.18em] text-[#ad512f]">Request Service</div><h1 className="mt-3 text-4xl font-black leading-[1] tracking-[-.045em] text-[#211814] sm:text-5xl md:text-6xl">Tell us what’s going on.</h1><p className="mt-4 max-w-lg text-base leading-7 text-[#66564f] sm:text-lg">A short request is enough. We can sort out the details with you.</p><div className="mt-6 space-y-2.5 text-sm font-semibold text-[#55463f]"><div className="flex items-center gap-2"><Check size={15} className="text-[#ad512f]"/>No long questionnaire</div><div className="flex items-center gap-2"><Check size={15} className="text-[#ad512f]"/>Tell us the main problem</div><div className="flex items-center gap-2"><Check size={15} className="text-[#ad512f]"/>Or call {siteConfig.brand.phoneDisplay}</div></div></div><form className="rounded-[1.6rem] border border-[#ded1c6] bg-[#fffdf9] p-5 shadow-[0_18px_45px_rgba(48,31,24,.08)] sm:p-7"><div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-bold text-[#4e4039]">Name<input className="mt-2 w-full rounded-xl border border-[#d9c9bd] bg-white px-4 py-3 font-normal outline-none focus:border-[#ad512f]" placeholder="Your name"/></label><label className="text-sm font-bold text-[#4e4039]">Phone<input className="mt-2 w-full rounded-xl border border-[#d9c9bd] bg-white px-4 py-3 font-normal outline-none focus:border-[#ad512f]" placeholder="Best number"/></label><label className="text-sm font-bold text-[#4e4039] sm:col-span-2">Email<input className="mt-2 w-full rounded-xl border border-[#d9c9bd] bg-white px-4 py-3 font-normal outline-none focus:border-[#ad512f]" placeholder="you@example.com"/></label><label className="text-sm font-bold text-[#4e4039] sm:col-span-2">What do you need help with?<textarea className="mt-2 min-h-28 w-full resize-y rounded-xl border border-[#d9c9bd] bg-white px-4 py-3 font-normal outline-none focus:border-[#ad512f]" placeholder="AC not cooling, furnace issue, maintenance, replacement..."/></label></div><button type="submit" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#ad512f] px-5 py-3.5 text-sm font-extrabold text-white">Request Service <ArrowRight size={15}/></button></form></div></section><Footer/><MobileBar/></>}

export default function HVACSite({ currentPage="home" }: { currentPage?: Page }){if(currentPage==="services")return <ServicesPage/>;if(currentPage==="quote")return <QuotePage/>;return <HomePage/>}
