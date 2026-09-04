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
  const quickActions = [
    ["AC not cooling", "Cooling problem"],
    ["No heat", "Heating problem"],
    ["Urgent service", "Urgent HVAC"],
  ] as const

  return (
    <section className="hero-industrial">
      <div className="mx-auto max-w-[1500px]">
        <div className="hero-industrial__grid">
          <motion.div
            initial={{ opacity: 0, x: -26 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="hero-industrial__copy"
          >
            <div className="hero-industrial__eyebrow"><Star size={13} fill="currentColor" /> {siteConfig.hero.eyebrow}</div>
            <h1>Comfort back.<br /><span>Without the runaround.</span></h1>
            <p>{siteConfig.hero.body}</p>

            <div className="hero-quick-actions" aria-label="Common HVAC problems">
              {quickActions.map(([label, aria]) => (
                <Link key={label} href="/quote" className="hero-quick-action" aria-label={aria}>
                  <span>{label}</span><ArrowRight size={14} />
                </Link>
              ))}
            </div>

            <div className="hero-industrial__actions">
              <Link href="/quote" className="btn-primary">Schedule Service <ArrowRight size={16} /></Link>
              <PhoneAction className="hero-industrial__phone" />
            </div>

            <div className="hero-industrial__promise">
              <ShieldCheck size={16} />
              <span>Clear options before work starts. Work checked before the job is finished.</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.08 }}
            whileHover={reduceMotion ? undefined : { scale: 1.01 }}
            className="hero-industrial__media"
          >
            <Photo src={siteConfig.hero.image} alt={siteConfig.hero.imageAlt} className="hero-industrial__image" />
            <div className="hero-industrial__overlay" />
            <div className="hero-industrial__service-label"><Wrench size={15} /> Residential HVAC service</div>
            <div className="hero-industrial__result">
              <div><span>HOME COMFORT</span><strong>72°</strong></div>
              <p>Quiet. Even. Comfortable.<br />Exactly how home should feel.</p>
            </div>
          </motion.div>
        </div>

        <div className="hero-industrial__trust">
          {siteConfig.trust.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              <Check size={14} strokeWidth={3} /> {item}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProofStrip() {
  const icons = [Star, Clock3, Wrench, MapPin]
  return (
    <section className="proof-ribbon">
      <div className="mx-auto grid max-w-7xl lg:grid-cols-[1.15fr_1.85fr]">
        <div className="proof-ribbon__intro">
          <div className="section-kicker">Before the work starts</div>
          <h2>Know what happens next.</h2>
          <p>Fast response. Clear options. Local service. No guessing.</p>
        </div>
        <div className="proof-ribbon__metrics">
          {siteConfig.stats.map((stat, index) => {
            const Icon = icons[index]
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="proof-ribbon__metric"
              >
                <Icon size={19} />
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Services({ all = false }: { all?: boolean }) {
  const reduceMotion = useReducedMotion()
  const services = all ? siteConfig.services : siteConfig.services.slice(0, 8)
  const servicePaths: Record<string, [string, string, string]> = {
    cooling: ["Not cooling", "Diagnose", "Repair & test"],
    heating: ["No heat", "Diagnose", "Repair & test"],
    air: ["Air feels off", "Check air", "Improve comfort"],
    duct: ["Weak airflow", "Inspect ducts", "Restore airflow"],
    thermostat: ["Control issue", "Test controls", "Set it right"],
    maintenance: ["Prevent breakdowns", "Inspect system", "Tune & verify"],
    installation: ["Old system", "Compare options", "Install & test"],
    emergency: ["Urgent issue", "Find the cause", "Restore comfort"],
    commercial: ["Business comfort", "Inspect equipment", "Repair & verify"],
  }

  return (
    <section className="section-shell services-industrial-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionIntro
          eyebrow="Our Services"
          title="HVAC help for the problems homeowners actually notice."
          body="Start with the symptom. We diagnose the cause, explain the options, then test the work before we leave."
        />
        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const path = servicePaths[service.key] ?? ["Tell us the issue", "Diagnose", "Fix & test"]
            return (
              <Link key={service.key} href="/quote" className="service-card-link group" aria-label={`Request ${service.title}`}>
                <motion.article
                  initial={{ opacity: 0, y: 24, scale: 0.99 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: Math.min(index * 0.04, 0.2), duration: 0.45 }}
                  whileHover={reduceMotion ? undefined : { y: -6 }}
                  className="service-card service-card--outcome service-card--industrial"
                >
                  <div className="relative h-52 overflow-hidden bg-[#dce5e2]">
                    <Photo src={service.image} alt={service.imageAlt} className="transition duration-700 group-hover:scale-[1.045]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#09202a]/30 via-transparent to-transparent" />
                    <div className="service-outcome">Common call</div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-[17px] font-black tracking-[-.025em] text-[#102630]">{service.title}</h3>
                    <p className="mt-2 text-sm font-medium leading-6 text-[#64767c]">{service.copy}</p>
                    <div className="service-path" aria-label={`${service.title} service path`}>
                      {path.map((step, stepIndex) => (
                        <span key={step}>
                          {step}
                          {stepIndex < path.length - 1 && <ArrowRight size={11} aria-hidden="true" />}
                        </span>
                      ))}
                    </div>
                    <div className="service-card__action">Request service <ArrowRight size={14} /></div>
                  </div>
                </motion.article>
              </Link>
            )
          })}
        </div>
        {!all && <div className="mt-8"><Link href="/services" className="btn-secondary">See all services <ArrowRight size={15} /></Link></div>}
      </div>
    </section>
  )
}

function WhyChooseUs() {
  const standards = [
    [ShieldCheck, "Licensed & insured", "Covered before the visit starts."],
    [Wrench, "Diagnosis first", "Find the cause before recommending work."],
    [Check, "Work tested", "Check the system before calling it complete."],
    [Clock3, "Clear scheduling", "Know what happens next and when."],
  ] as const

  return (
    <section className="standards-section">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[.82fr_1.18fr] lg:px-8 lg:py-20">
        <div className="standards-section__intro">
          <div className="section-kicker section-kicker--dark">Why homeowners choose us</div>
          <h2>Simple standards.<br />Serious service.</h2>
          <p>Clear communication, practical recommendations, and work that gets checked before the job is finished.</p>
          <Link href="/quote" className="standards-section__cta">Request service <ArrowRight size={15} /></Link>
        </div>

        <div className="standards-rail">
          {standards.map(([Icon, title, copy], index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: index * 0.06, duration: 0.35 }}
              className="standards-rail__row"
            >
              <div className="standards-rail__number">0{index + 1}</div>
              <div className="standards-rail__icon"><Icon size={19} /></div>
              <div className="standards-rail__copy">
                <strong>{title}</strong>
                <span>{copy}</span>
              </div>
              <ArrowRight size={18} className="standards-rail__arrow" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Work() {
  return (
    <section className="work-strip">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="work-strip__header">
          <div>
            <div className="section-kicker">Work in action</div>
            <h2>Real equipment. Real service visits.</h2>
          </div>
          <p>Hands-on diagnosis, equipment checks, and clear explanations before decisions get made.</p>
        </div>
        <div className="work-strip__grid">
          {siteConfig.projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: index * 0.07, duration: 0.4 }}
              className="work-strip__item group"
            >
              <Photo src={project.image} alt={project.imageAlt} className="transition duration-700 group-hover:scale-[1.045]" />
              <div className="work-strip__shade" />
              <div className="work-strip__content">
                <span>0{index + 1}</span>
                <h3>{project.title}</h3>
                <p>{project.copy}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    ["01", Phone, "Tell us what’s wrong", "Call or send a quick service request."],
    ["02", Wrench, "Get a clear diagnosis", "We inspect the system and explain the options."],
    ["03", Check, "Get comfortable again", "We complete the work and test the system."],
  ] as const

  return (
    <section className="workflow-compact bg-[#eef3f0] py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="workflow-compact__header">
          <div>
            <div className="section-kicker">How It Works</div>
            <h2>From first call to system running.</h2>
          </div>
          <p>Three clear steps. No wasted motion. No guessing what happens next.</p>
        </div>

        <div className="workflow-compact__line" aria-hidden="true">
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        <div className="workflow-compact__steps">
          {steps.map(([number, Icon, title, copy], index) => (
            <motion.article
              key={number}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              className="workflow-compact__step"
            >
              <div className="workflow-compact__node"><Icon size={20} /></div>
              <div className="workflow-compact__number">{number}</div>
              <h3>{title}</h3>
              <p>{copy}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function ReviewCard({ quote, name, meta }: { quote: string; name: string; meta: string }) {
  return (
    <article className="review-card">
      <div className="flex gap-1 text-[#ef7046]">{[1, 2, 3, 4, 5].map((n) => <Star key={n} size={14} fill="currentColor" />)}</div>
      <p className="mt-4 text-base font-bold leading-7 text-[#203944]">“{quote}”</p>
      <div className="review-meta mt-5 border-t border-[#e7ece9] pt-4">
        <div className="font-black text-[#102630]">{name}</div>
        <div className="mt-0.5 text-xs font-bold text-[#7a8a8f]">{meta}</div>
      </div>
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
          {repeated.map((review, index) => <ReviewCard key={`${review.name}-${index}`} quote={review.quote} name={review.name} meta={review.location} />)}
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
          <p className="section-copy max-w-xl">Serving homes throughout the local service area and nearby communities. Call or request service to confirm availability for your address.</p>
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
    <section className="section-shell faq-panel--dark">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[.82fr_1.18fr] lg:px-8">
        <div>
          <SectionIntro eyebrow="Helpful answers" title="Common HVAC questions." body="Quick answers for the questions homeowners usually ask before booking." dark />
          <div className="faq-help-panel">
            <div className="faq-help-panel__icon"><Phone size={19} /></div>
            <div>
              <div className="faq-help-panel__eyebrow">Still need help?</div>
              <h3>Tell us what the system is doing.</h3>
              <p>You do not need to diagnose it yourself. Describe the problem and we’ll take it from there.</p>
            </div>
            <div className="faq-help-actions">
              <PhoneAction className="btn-secondary" />
              <Link href="/quote" className="btn-primary">Request service <ArrowRight size={14} /></Link>
            </div>
          </div>
        </div>
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
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} className="final-cta cta-outcome cta-panel--orange mx-auto max-w-7xl">
        <div className="final-cta__grid" />
        <div className="relative z-10 grid gap-7 md:grid-cols-[1fr_auto] md:items-end">
          <div><div className="section-kicker section-kicker--dark">Need HVAC help?</div><h2 className="mt-3 max-w-3xl text-3xl font-black leading-[1.02] tracking-[-.045em] text-white sm:text-4xl md:text-5xl">Heating or AC problem? Get the next step.</h2><p className="mt-4 max-w-xl text-base font-medium leading-7 text-white/65">Tell us what’s happening. We’ll confirm availability and explain what happens next.</p></div>
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
    <><Header currentPage="quote" /><section id="contact-details" className="relative isolate overflow-hidden bg-[#edf2ef] py-12 md:py-18"><div className="atmosphere-grid absolute inset-0 -z-10" /><div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[.82fr_1.18fr] lg:px-8"><div className="lg:py-7"><div className="section-kicker">Request Service</div><h1 className="mt-4 text-4xl font-black leading-[.98] tracking-[-.05em] text-[#102630] sm:text-5xl md:text-6xl">Tell us what’s going on.</h1><p className="mt-5 max-w-lg text-base font-medium leading-7 text-[#61747a] sm:text-lg">A short request is enough. Tell us the main problem and the best way to reach you.</p><div className="mt-7 space-y-3 text-sm font-bold text-[#536a72]"><div className="flex items-center gap-2"><Check size={15} className="text-[#e7613b]" />No long questionnaire</div><div className="flex items-center gap-2"><Check size={15} className="text-[#e7613b]" />Tell us the main problem</div><div className="flex items-center gap-2"><Phone size={15} className="text-[#e7613b]" />{siteConfig.brand.phoneDisplay}</div><div className="flex items-center gap-2"><Mail size={15} className="text-[#e7613b]" />Add Your Email</div></div></div><motion.form initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="quote-form" onSubmit={(event) => event.preventDefault()}><div className="grid gap-4 sm:grid-cols-2"><label className="form-label">Name<input className="form-input" placeholder="Your name" autoComplete="name" /></label><label className="form-label">Phone<input className="form-input" placeholder="Best number" inputMode="tel" autoComplete="tel" /></label><label className="form-label sm:col-span-2">Email<input className="form-input" placeholder="you@example.com" type="email" autoComplete="email" /></label><label className="form-label sm:col-span-2">What do you need help with?<textarea className="form-input min-h-28 resize-y" placeholder="AC not cooling, furnace issue, maintenance, replacement..." /></label></div><button type="submit" className="btn-primary mt-5 w-full justify-center">Request Service <ArrowRight size={15} /></button></motion.form></div></section><Footer /><MobileServiceBar /></>
  )
}

export default function HVACSite({ currentPage = "home" }: { currentPage?: Page }) {
  return (
    <MotionConfig reducedMotion="user">
      {currentPage === "services" ? <ServicesPage /> : currentPage === "quote" ? <QuotePage /> : <HomePage />}
    </MotionConfig>
  )
}
