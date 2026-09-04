"use client"

import Link from "next/link"
import * as Accordion from "@radix-ui/react-accordion"
import { motion, MotionConfig, useReducedMotion } from "motion/react"
import {
  ArrowRight,
  Check,
  ChevronDown,
  Clock3,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Wind,
  Wrench,
  Zap,
} from "lucide-react"
import { siteConfig } from "../lib/site-config"

type Page = "home" | "services" | "quote"

const hasPhone = Boolean(siteConfig.brand.phoneHref.trim())
const hasEmail = siteConfig.brand.email.includes("@")

function Photo({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={`h-full w-full object-cover ${className}`}
      onError={(event) => {
        event.currentTarget.style.opacity = "0"
      }}
    />
  )
}

function PhoneAction({ className = "", compact = false }: { className?: string; compact?: boolean }) {
  const label = hasPhone ? siteConfig.brand.phoneDisplay : compact ? "Add number" : "Add Your Number"
  if (hasPhone) {
    return (
      <a href={`tel:${siteConfig.brand.phoneHref}`} className={className} aria-label={`Call ${siteConfig.brand.name}`}>
        <Phone size={16} />{label}
      </a>
    )
  }
  return (
    <Link href="/quote#contact-details" className={className} aria-label="Add or confirm the business phone number">
      <Phone size={16} />{label}
    </Link>
  )
}

function EmailAction({ className = "" }: { className?: string }) {
  if (hasEmail) {
    return <a href={`mailto:${siteConfig.brand.email}`} className={className}><Mail size={15} />{siteConfig.brand.email}</a>
  }
  return <Link href="/quote#contact-details" className={className}><Mail size={15} />Add Your Email</Link>
}

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <span className="brand-mark__ring" />
      <Wind size={19} strokeWidth={2.3} />
    </span>
  )
}

function SectionIntro({ eyebrow, title, body, dark = false }: { eyebrow: string; title: string; body?: string; dark?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-3xl"
    >
      <div className={dark ? "section-kicker section-kicker--dark" : "section-kicker"}>{eyebrow}</div>
      <h2 className={dark ? "section-title text-white" : "section-title text-[#102630]"}>{title}</h2>
      {body && <p className={dark ? "section-copy text-white/68" : "section-copy"}>{body}</p>}
    </motion.div>
  )
}

function Header({ currentPage }: { currentPage: Page }) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/50 bg-[#f7f8f5]/82 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ef7046]">
          <BrandMark />
          <div className="min-w-0">
            <div className="truncate text-[16px] font-black tracking-[-.035em] text-[#102630] sm:text-xl">{siteConfig.brand.name}</div>
            <div className="mt-0.5 hidden text-[10px] font-bold uppercase tracking-[.15em] text-[#60727a] sm:block">{siteConfig.brand.tagline}</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-bold text-[#546970] lg:flex" aria-label="Primary navigation">
          <Link href="/" className={currentPage === "home" ? "text-[#102630]" : "transition hover:text-[#e55e37]"}>Home</Link>
          <Link href="/services" className={currentPage === "services" ? "text-[#102630]" : "transition hover:text-[#e55e37]"}>Services</Link>
          <a href="/#reviews" className="transition hover:text-[#e55e37]">Reviews</a>
          <a href="/#service-areas" className="transition hover:text-[#e55e37]">Service Areas</a>
          <Link href="/quote" className="transition hover:text-[#e55e37]">Contact</Link>
        </nav>
        <div className="flex items-center gap-2">
          <PhoneAction className="hidden items-center gap-2 rounded-full border border-[#dce3e2] bg-white/85 px-4 py-2.5 text-sm font-extrabold text-[#17323c] shadow-[0_8px_24px_rgba(16,38,48,.06)] transition hover:-translate-y-0.5 hover:border-[#f1b29d] md:inline-flex" />
          <Link href="/quote" className="btn-primary text-xs sm:text-sm">Schedule Service <ArrowRight size={15} /></Link>
        </div>
      </div>
    </header>
  )
}

function Hero() {
  const reduceMotion = useReducedMotion()
  return (
    <section className="relative isolate overflow-hidden bg-[#edf2ef]">
      <div className="atmosphere-grid absolute inset-0 -z-20" />
      <div className="atmosphere-orb atmosphere-orb--one -z-10" />
      <div className="atmosphere-orb atmosphere-orb--two -z-10" />
      <div className="mx-auto grid max-w-7xl gap-9 px-4 py-10 sm:px-6 md:py-14 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:px-8 lg:py-16">
        <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
          <div className="eyebrow-pill"><Star size={13} fill="currentColor" />{siteConfig.hero.eyebrow}</div>
          <h1 className="mt-6 max-w-2xl text-[3rem] font-black leading-[.93] tracking-[-.058em] text-[#102630] sm:text-[4rem] lg:text-[4.8rem]">
            Comfort back.<br /><span className="text-gradient">Without the runaround.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base font-semibold leading-7 text-[#536a72] sm:text-lg">{siteConfig.hero.body}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/quote" className="btn-primary">Schedule Service <ArrowRight size={16} /></Link>
            <PhoneAction className="btn-secondary" />
          </div>
          <p className="mt-3 text-xs font-semibold text-[#6b7e84]">Template contact details stay inactive until the business number or email is added.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.965, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          whileHover={reduceMotion ? undefined : { y: -7, rotateX: 1.5, rotateY: -1.5 }}
          className="hero-stage"
        >
          <div className="hero-stage__glow" />
          <div className="hero-trust-orbit" aria-label="Service promises">
            {siteConfig.trust.map((item, index) => (
              <motion.div
                key={item}
                className={`hero-orbit-badge hero-orbit-badge--${index + 1}`}
                initial={{ opacity: 0, scale: 0.86 }}
                animate={reduceMotion ? { opacity: 1, scale: 1 } : {
                  opacity: 1,
                  scale: 1,
                  y: [0, index % 2 ? 8 : -8, 0],
                }}
                transition={{
                  opacity: { delay: 0.22 + index * 0.08, duration: 0.45 },
                  scale: { delay: 0.22 + index * 0.08, duration: 0.45 },
                  y: { duration: 5.5 + index * 0.8, repeat: Infinity, ease: "easeInOut", delay: index * 0.45 },
                }}
                whileHover={reduceMotion ? undefined : { scale: 1.07, rotate: index % 2 ? -2 : 2 }}
              >
                <span><Check size={11} strokeWidth={3.2} /></span>{item}
              </motion.div>
            ))}
          </div>
          <div className="hero-stage__frame">
            <Photo src={siteConfig.hero.image} alt={siteConfig.hero.imageAlt} className="hero-stage__image" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#081a22]/82 via-[#0a1d24]/5 to-transparent" />
            <motion.div animate={reduceMotion ? undefined : { y: [0, -6, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }} className="hero-chip left-4 top-4 sm:left-6 sm:top-6">
              <ShieldCheck size={14} /> Residential HVAC service
            </motion.div>
            <motion.div animate={reduceMotion ? undefined : { y: [0, 5, 0] }} transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }} className="hero-status bottom-5 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-7">
              <div>
                <div className="text-[10px] font-black uppercase tracking-[.15em] text-white/55">Home comfort</div>
                <div className="mt-1 text-4xl font-black tracking-[-.05em]">72°</div>
              </div>
              <div className="max-w-[220px] text-right text-xs font-semibold leading-5 text-white/76 sm:text-sm">Quiet. Even. Comfortable.<br />Exactly how home should feel.</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function ProofStrip() {
  const reduceMotion = useReducedMotion()
  const icons = [Star, Zap, Sparkles, MapPin]
  return (
    <section className="proof-section relative isolate overflow-hidden bg-[#edf2ef] px-4 pb-24 pt-8 sm:px-6 lg:px-8">
      <div className="proof-depth-grid absolute inset-0 -z-10" aria-hidden="true" />
      <div className="proof-constellation mx-auto max-w-7xl">
        <motion.div
          className="proof-core"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="proof-core__pulse" aria-hidden="true" />
          <div className="proof-core__eyebrow">Homeowner-first service</div>
          <h2>Clear enough to trust.</h2>
          <p>Fast response, understandable choices, and local accountability.</p>
        </motion.div>

        {siteConfig.stats.map((stat, index) => {
          const Icon = icons[index]
          return (
            <motion.div
              key={stat.label}
              className={`proof-satellite proof-satellite--${index + 1}`}
              initial={{ opacity: 0, scale: 0.82 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ delay: 0.12 + index * 0.09, duration: 0.5 }}
              animate={reduceMotion ? undefined : { y: [0, index % 2 ? 9 : -9, 0] }}
              whileHover={reduceMotion ? undefined : { scale: 1.08, rotate: index % 2 ? -2 : 2 }}
            >
              <span className="proof-satellite__icon"><Icon size={17} /></span>
              <div>
                <div className="proof-satellite__value">{stat.value}</div>
                <div className="proof-satellite__label">{stat.label}</div>
              </div>
            </motion.div>
          )
        })}

        <motion.div
          className="proof-orbit-line"
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          aria-hidden="true"
        />
      </div>
    </section>
  )
}

function Services({ all = false }: { all?: boolean }) {
  const reduceMotion = useReducedMotion()
  const services = all ? siteConfig.services : siteConfig.services.slice(0, 8)
  return (
    <section className="section-shell bg-[#f8f9f6]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionIntro eyebrow="Our Services" title="The HVAC help homeowners call for most." body="Repair, maintenance, airflow, controls, replacement, and urgent service — with clear answers before the work starts." />
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <motion.article
              key={service.key}
              initial={{ opacity: 0, y: 28, scale: 0.985 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: Math.min(index * 0.04, 0.2), duration: 0.5 }}
              whileHover={reduceMotion ? undefined : { y: -8, rotateX: 1.2 }}
              className="service-card group"
            >
              <div className="relative h-44 overflow-hidden bg-[#dce5e2]">
                <Photo src={service.image} alt={service.imageAlt} className="transition duration-700 group-hover:scale-[1.055]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09202a]/24 via-transparent to-transparent" />
              </div>
              <div className="p-5">
                <h3 className="text-[17px] font-black tracking-[-.025em] text-[#102630]">{service.title}</h3>
                <p className="mt-2 text-sm font-medium leading-6 text-[#64767c]">{service.copy}</p>
                <Link href="/quote" className="mt-4 inline-flex items-center gap-1.5 text-sm font-black text-[#d95531] transition group-hover:gap-2.5">Request service <ArrowRight size={14} /></Link>
              </div>
            </motion.article>
          ))}
        </div>
        {!all && <div className="mt-8"><Link href="/services" className="btn-secondary">See all services <ArrowRight size={15} /></Link></div>}
      </div>
    </section>
  )
}

function WhyChooseUs() {
  const reduceMotion = useReducedMotion()
  const items = [
    [ShieldCheck, "Licensed & insured", "Professional service with the fundamentals already covered."],
    [Wrench, "Diagnose before recommending", "We find the issue first, then explain the repair or replacement path."],
    [Check, "Work that gets tested", "The job is not done until the system is checked and running the way it should."],
    [Clock3, "Clear scheduling", "You know what happens next instead of wondering whether anyone is showing up."],
  ] as const

  return (
    <section className="credibility-section relative isolate overflow-hidden py-20 text-white md:py-28">
      <div className="credibility-aurora" aria-hidden="true" />
      <div className="airflow-field" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((lane) => (
          <motion.span
            key={lane}
            className={`airflow-stream airflow-stream--${lane + 1}`}
            animate={reduceMotion ? undefined : { x: ["-18%", "118%"], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 5.5 + lane * 0.8, repeat: Infinity, ease: "linear", delay: lane * 0.72 }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="credibility-kicker">Why homeowners choose us</div>
          <h2 className="credibility-heading">
            No guessing.<br /><span>No vague answers.</span>
          </h2>
          <p className="credibility-copy mx-auto">
            HVAC service should feel calm, clear, and professional — from the first call to the final system check.
          </p>
        </div>

        <div className="credibility-stage">
          <motion.div
            className="credibility-core"
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.65 }}
          >
            <div className="credibility-core__ring" />
            <div className="credibility-core__inner">
              <Wind size={34} />
              <span>Clear service</span>
              <strong>Every step</strong>
            </div>
          </motion.div>

          {items.map(([Icon, title, copy], index) => (
            <motion.div
              key={title}
              className={`credibility-callout credibility-callout--${index + 1}`}
              initial={{ opacity: 0, y: 22, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: 0.1 + index * 0.09, duration: 0.5 }}
              animate={reduceMotion ? undefined : { y: [0, index % 2 ? 7 : -7, 0] }}
            >
              <Link href="/quote" className="credibility-callout__link">
                <span className="credibility-callout__icon"><Icon size={19} /></span>
                <span className="credibility-callout__copy">
                  <strong>{title}</strong>
                  <small>{copy}</small>
                </span>
                <ArrowRight size={18} className="credibility-callout__arrow" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Work() {
  return (
    <section className="section-shell bg-[#f8f9f6]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionIntro eyebrow="Work in action" title="Real equipment. Real service visits." body="A few examples of the hands-on work behind a comfortable home." />
        <div className="mt-9 grid gap-4 lg:grid-cols-3">
          {siteConfig.projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="project-card group"
            >
              <div className="h-60 overflow-hidden"><Photo src={project.image} alt={project.imageAlt} className="transition duration-700 group-hover:scale-[1.045]" /></div>
              <div className="p-5"><h3 className="text-lg font-black text-[#102630]">{project.title}</h3><p className="mt-2 text-sm font-medium leading-6 text-[#65787e]">{project.copy}</p></div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  const reduceMotion = useReducedMotion()
  const steps = [
    ["01", Phone, "Tell us what’s wrong", "Call or send a quick service request."],
    ["02", Wrench, "Get a clear diagnosis", "We inspect the system and explain the options."],
    ["03", Check, "Get comfortable again", "We complete the work and test the system."],
  ] as const

  return (
    <section className="workflow-section relative isolate overflow-hidden py-20 md:py-28">
      <div className="workflow-background" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="section-kicker">How It Works</div>
          <h2 className="section-title">One clear path from problem to comfort.</h2>
          <p className="section-copy mx-auto">No boxes. No mystery steps. Just a visible journey from first contact to comfort restored.</p>
        </div>

        <div className="workflow-curve mx-auto mt-14 max-w-6xl">
          <svg className="workflow-curve__svg" viewBox="0 0 1400 420" preserveAspectRatio="none" aria-hidden="true">
            <path className="workflow-path workflow-path--base" d="M80 215 C300 55 440 360 700 210 S1060 70 1320 215" />
            <motion.path
              className="workflow-path workflow-path--active"
              d="M80 215 C300 55 440 360 700 210 S1060 70 1320 215"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </svg>

          <motion.div
            className="workflow-traveler"
            animate={reduceMotion ? undefined : {
              left: ["5.7%", "18%", "32%", "50%", "66%", "82%", "94.3%"],
              top: ["51%", "30%", "68%", "50%", "31%", "28%", "51%"],
            }}
            transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.5 }}
            aria-hidden="true"
          />

          {steps.map(([number, Icon, title, copy], index) => (
            <motion.article
              key={number}
              className={`workflow-stop workflow-stop--${index + 1}`}
              initial={{ opacity: 0, scale: 0.82, y: 28 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ delay: 0.2 + index * 0.16, duration: 0.55 }}
            >
              <motion.div
                className="workflow-stop__node"
                animate={reduceMotion ? undefined : { scale: [1, 1.08, 1] }}
                transition={{ duration: 2.8, repeat: Infinity, delay: index * 0.8 }}
              >
                <Icon size={22} />
              </motion.div>
              <div className="workflow-stop__number">{number}</div>
              <h3>{title}</h3>
              <p>{copy}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function ReviewCard({ quote, name }: { quote: string; name: string }) {
  return (
    <article className="review-card">
      <div className="flex gap-1 text-[#ef7046]">{[1, 2, 3, 4, 5].map((n) => <Star key={n} size={14} fill="currentColor" />)}</div>
      <p className="mt-4 text-base font-bold leading-7 text-[#203944]">“{quote}”</p>
      <div className="mt-5 border-t border-[#e7ece9] pt-4"><div className="font-black text-[#102630]">{name}</div><div className="mt-0.5 text-xs font-bold text-[#7a8a8f]">Homeowner</div></div>
    </article>
  )
}

function Reviews() {
  const repeated = [...siteConfig.reviews, ...siteConfig.reviews]
  return (
    <section id="reviews" className="section-shell overflow-hidden bg-[#f8f9f6]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <SectionIntro eyebrow="Homeowner Reviews" title="Trusted when comfort matters." />
          <motion.div whileHover={{ y: -4 }} className="rating-card"><div className="flex gap-1 text-[#ef7046]">{[1, 2, 3, 4, 5].map((n) => <Star key={n} size={14} fill="currentColor" />)}</div><div className="mt-1 text-sm font-black text-[#102630]">4.9 average rating</div></motion.div>
        </div>
      </div>
      <div className="review-fade mt-9">
        <div className="review-marquee" aria-label="Homeowner reviews">
          {repeated.map((review, index) => <ReviewCard key={`${review.name}-${index}`} quote={review.quote} name={review.name} />)}
        </div>
      </div>
    </section>
  )
}

function LocalService() {
  return (
    <section id="service-areas" className="section-shell bg-[#edf2ef]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[.92fr_1.08fr] lg:items-center lg:px-8">
        <motion.div initial={{ opacity: 0, x: -28, rotateY: -3 }} whileInView={{ opacity: 1, x: 0, rotateY: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.65 }} className="local-photo"><Photo src={siteConfig.local.image} alt={siteConfig.local.imageAlt} className="aspect-[4/3]" /><div className="absolute inset-0 bg-gradient-to-t from-[#09202a]/30 via-transparent to-transparent" /></motion.div>
        <div>
          <div className="section-kicker flex items-center gap-2"><MapPin size={14} />Local HVAC service</div>
          <h2 className="section-title">A local team homeowners can actually reach.</h2>
          <p className="section-copy max-w-xl">Serving homes throughout the service area and nearby communities. Add the actual service area before sending this page to a customer.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {siteConfig.local.badges.map((badge, index) => <motion.div key={badge} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="local-badge"><Check size={14} strokeWidth={3} />{badge}</motion.div>)}
          </div>
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  return (
    <section className="section-shell bg-[#f8f9f6]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[.72fr_1.28fr] lg:px-8">
        <SectionIntro eyebrow="Helpful answers" title="Common HVAC questions." body="Clear answers without turning the page into a wall of text." />
        <Accordion.Root type="single" collapsible defaultValue="faq-0" className="faq-shell">
          {siteConfig.faqs.map((faq, index) => (
            <Accordion.Item key={faq.question} value={`faq-${index}`} className="faq-item">
              <Accordion.Header asChild><h3>
                <Accordion.Trigger className="faq-trigger"><span>{faq.question}</span><ChevronDown size={18} className="faq-chevron" /></Accordion.Trigger>
              </h3></Accordion.Header>
              <Accordion.Content className="faq-content"><div className="pb-5 pr-8 text-sm font-medium leading-6 text-[#61747a]">{faq.answer}</div></Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  )
}

function FinalCta() {
  return (
    <section className="bg-[#f8f9f6] px-4 pb-20 pt-3 sm:px-6 md:pb-24 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} className="final-cta mx-auto max-w-7xl">
        <div className="final-cta__grid" />
        <div className="relative z-10 grid gap-7 md:grid-cols-[1fr_auto] md:items-end">
          <div><div className="section-kicker section-kicker--dark">Need HVAC help?</div><h2 className="mt-3 max-w-3xl text-3xl font-black leading-[1.02] tracking-[-.045em] text-white sm:text-4xl md:text-5xl">Tell us the problem. We’ll help you find the next step.</h2><p className="mt-4 max-w-xl text-base font-medium leading-7 text-white/65">Add the business contact details, then let homeowners call or send a quick service request.</p></div>
          <div className="flex flex-wrap gap-3"><PhoneAction className="btn-light" /><Link href="/quote" className="btn-primary">Schedule Service <ArrowRight size={15} /></Link></div>
        </div>
      </motion.div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-[#dfe7e4] bg-[#eef2ef] pb-20 md:pb-0">
      <div className="mx-auto grid max-w-7xl gap-7 px-4 py-10 sm:px-6 md:grid-cols-3 lg:px-8">
        <div><div className="flex items-center gap-3"><BrandMark /><div className="text-lg font-black text-[#102630]">{siteConfig.brand.name}</div></div><p className="mt-3 max-w-sm text-sm font-medium leading-6 text-[#687b81]">Heating, cooling, maintenance, repair, replacement, and indoor comfort service.</p></div>
        <div className="text-sm font-bold text-[#5c7077]"><Link className="block py-1.5 hover:text-[#d95531]" href="/">Home</Link><Link className="block py-1.5 hover:text-[#d95531]" href="/services">Services</Link><Link className="block py-1.5 hover:text-[#d95531]" href="/quote">Schedule Service</Link></div>
        <div className="flex flex-col items-start gap-2 text-sm font-bold text-[#65787e] md:items-end"><PhoneAction className="inline-flex items-center gap-2 hover:text-[#d95531]" /><EmailAction className="inline-flex items-center gap-2 hover:text-[#d95531]" /><div>Local service area</div></div>
      </div>
    </footer>
  )
}

function MobileServiceBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-2 border-t border-white/60 bg-[#f7f8f5]/92 p-2.5 shadow-[0_-12px_35px_rgba(16,38,48,.1)] backdrop-blur-2xl md:hidden">
      <PhoneAction compact className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#d7e0dd] bg-white px-3 py-3 text-sm font-black text-[#15303a]" />
      <Link href="/quote" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#e7613b] px-3 py-3 text-sm font-black text-white shadow-[0_10px_24px_rgba(231,97,59,.24)]">Schedule <ArrowRight size={15} /></Link>
    </div>
  )
}

function HomePage() {
  return <><Header currentPage="home" /><Hero /><ProofStrip /><Services /><WhyChooseUs /><Work /><HowItWorks /><Reviews /><LocalService /><FAQ /><FinalCta /><Footer /><MobileServiceBar /></>
}

function ServicesPage() {
  return <><Header currentPage="services" /><section className="relative isolate overflow-hidden bg-[#edf2ef] py-14 md:py-20"><div className="atmosphere-grid absolute inset-0 -z-10" /><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="section-kicker">Heating · Cooling · Indoor Comfort</div><h1 className="mt-4 max-w-4xl text-4xl font-black leading-[.98] tracking-[-.05em] text-[#102630] sm:text-5xl md:text-6xl">HVAC service for the problems homeowners actually deal with.</h1><p className="mt-5 max-w-2xl text-base font-medium leading-7 text-[#61747a] sm:text-lg">Choose the closest service below. If you are not sure, send a request and describe what the system is doing.</p></div></section><Services all /><FinalCta /><Footer /><MobileServiceBar /></>
}

function QuotePage() {
  return (
    <><Header currentPage="quote" /><section id="contact-details" className="relative isolate overflow-hidden bg-[#edf2ef] py-12 md:py-18"><div className="atmosphere-grid absolute inset-0 -z-10" /><div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[.82fr_1.18fr] lg:px-8"><div className="lg:py-7"><div className="section-kicker">Request Service</div><h1 className="mt-4 text-4xl font-black leading-[.98] tracking-[-.05em] text-[#102630] sm:text-5xl md:text-6xl">Tell us what’s going on.</h1><p className="mt-5 max-w-lg text-base font-medium leading-7 text-[#61747a] sm:text-lg">A short request is enough. Before sharing this template, replace the phone and email placeholders with the business’s real contact details.</p><div className="mt-7 space-y-3 text-sm font-bold text-[#536a72]"><div className="flex items-center gap-2"><Check size={15} className="text-[#e7613b]" />No long questionnaire</div><div className="flex items-center gap-2"><Check size={15} className="text-[#e7613b]" />Tell us the main problem</div><div className="flex items-center gap-2"><Phone size={15} className="text-[#e7613b]" />{siteConfig.brand.phoneDisplay}</div><div className="flex items-center gap-2"><Mail size={15} className="text-[#e7613b]" />Add Your Email</div></div></div><motion.form initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="quote-form" onSubmit={(event) => event.preventDefault()}><div className="grid gap-4 sm:grid-cols-2"><label className="form-label">Name<input className="form-input" placeholder="Your name" autoComplete="name" /></label><label className="form-label">Phone<input className="form-input" placeholder="Best number" inputMode="tel" autoComplete="tel" /></label><label className="form-label sm:col-span-2">Email<input className="form-input" placeholder="you@example.com" type="email" autoComplete="email" /></label><label className="form-label sm:col-span-2">What do you need help with?<textarea className="form-input min-h-28 resize-y" placeholder="AC not cooling, furnace issue, maintenance, replacement..." /></label></div><button type="submit" className="btn-primary mt-5 w-full justify-center">Request Service <ArrowRight size={15} /></button></motion.form></div></section><Footer /><MobileServiceBar /></>
  )
}

export default function HVACSite({ currentPage = "home" }: { currentPage?: Page }) {
  return (
    <MotionConfig reducedMotion="user">
      {currentPage === "services" ? <ServicesPage /> : currentPage === "quote" ? <QuotePage /> : <HomePage />}
    </MotionConfig>
  )
}
