import Image from "next/image"
import Link from "next/link"

type Page = "home" | "services" | "quote"

const services = [
  { title: "Decorating & Finishing", copy: "Residential finishing work, touch-ups, patching, and detail-led in-home maintenance." },
  { title: "Installations", copy: "Shelving, fittings, blinds, furniture assembly, and other practical home upgrades." },
  { title: "Home Maintenance", copy: "Reliable support for small repairs and ongoing upkeep across the home." },
  { title: "Property Refreshes", copy: "Ideal for homeowners preparing spaces for guests, sale, or simply a cleaner finish." },
]

function Header({ currentPage }: { currentPage: Page }) {
  const items = [
    { label: "Home", href: "/", page: "home" as const },
    { label: "Services", href: "/services", page: "services" as const },
    { label: "Quote", href: "/quote", page: "quote" as const },
  ]

  return (
    <header className="border-b border-black/10 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9e5d3d]">Oakwell House Care</div>
          <div className="mt-1 text-sm font-sans text-[#6d5a50]">Premium handyman & home maintenance</div>
        </div>
        <nav className="hidden items-center gap-8 font-sans text-sm text-[#6d5a50] md:flex">
          {items.map((item) => (
            <Link key={item.href} href={item.href} className={currentPage === item.page ? "text-[#241813]" : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>
        <a href="tel:+441313330101" className="rounded-full bg-[#9e5d3d] px-4 py-2 font-sans text-sm font-semibold text-white">
          0131 333 0101
        </a>
      </div>
    </header>
  )
}

function HomePage() {
  return (
    <>
      <section className="mx-auto max-w-5xl px-6 pb-8 pt-14 text-center">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9e5d3d]">Premium residential template</div>
        <h1 className="mx-auto mt-5 max-w-4xl text-5xl font-semibold leading-[0.96] tracking-tight text-[#241813] md:text-7xl">
          A softer handyman brand for homeowners who care about trust, finish, and presentation.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl font-sans text-lg leading-relaxed text-[#6d5a50]">
          This version is quieter and more editorial. It feels less like an emergency trade site and more like a refined local service business that works inside lived-in homes.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/quote" className="rounded-full bg-[#9e5d3d] px-5 py-3 font-sans text-sm font-semibold text-white">
            Request A Quote
          </Link>
          <Link href="/services" className="rounded-full border border-black/10 bg-white px-5 py-3 font-sans text-sm font-semibold text-black">
            Explore Services
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="relative min-h-[560px] overflow-hidden rounded-[2.5rem]">
          <Image
            src="https://unsplash.com/photos/tFH-rMw7nPQ/download?force=true&w=1600"
            alt="Craftsperson working carefully with wood"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 max-w-2xl p-8 text-white md:p-10">
            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">Editorial residential direction</div>
            <div className="mt-3 text-3xl font-semibold leading-tight md:text-4xl">
              Larger image-led storytelling, calmer spacing, and a more elevated domestic feel.
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function ServicesPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mx-auto max-w-4xl text-center">
        <div className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9e5d3d]">Premium services page</div>
        <h1 className="mt-3 text-5xl font-semibold leading-tight text-[#241813]">Services presented with a quieter, more residential rhythm.</h1>
      </div>
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {services.map((service, index) => (
          <div key={service.title} className="rounded-[2rem] border border-black/10 bg-white p-8">
            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9e5d3d]">Service 0{index + 1}</div>
            <h2 className="mt-3 text-3xl font-semibold text-[#241813]">{service.title}</h2>
            <p className="mt-4 font-sans text-base leading-relaxed text-[#6d5a50]">{service.copy}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function QuotePage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <div className="text-center">
        <div className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9e5d3d]">Premium enquiry page</div>
        <h1 className="mt-3 text-5xl font-semibold leading-tight text-[#241813]">A calmer quote flow for home-focused service businesses.</h1>
      </div>
      <div className="mt-10 rounded-[2.5rem] border border-black/10 bg-white p-8 shadow-[0_20px_50px_rgba(31,27,23,0.1)]">
        <div className="grid gap-4 md:grid-cols-2">
          {["Full name", "Phone number", "Email address", "Property type", "Service needed", "Project details"].map((field) => (
            <div key={field} className="rounded-xl border border-black/10 px-4 py-4 font-sans text-sm text-gray-500">
              {field}
            </div>
          ))}
        </div>
        <div className="mt-8 flex items-center justify-between gap-4">
          <div className="max-w-md font-sans text-sm leading-relaxed text-[#6d5a50]">Designed for homeowners who want a polished experience and a more reassuring contact path.</div>
          <div className="rounded-full bg-[#9e5d3d] px-5 py-3 font-sans text-sm font-semibold text-white">Request A Quote</div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-black/10 bg-white/70">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9e5d3d]">Oakwell House Care</div>
            <p className="mt-4 font-sans text-sm leading-relaxed text-[#6d5a50]">
              A footer that keeps the premium residential tone intact and gives the site a complete, trustworthy close.
            </p>
          </div>
          <div className="font-sans text-sm text-[#6d5a50]">
            <div>Home</div>
            <div className="mt-2">Services</div>
            <div className="mt-2">Quote</div>
          </div>
          <div className="font-sans text-sm text-[#6d5a50]">
            <div>0131 333 0101</div>
            <div className="mt-2">hello@templatepreview.co</div>
            <div className="mt-2">Residential home services</div>
          </div>
        </div>
        <div className="mt-10 border-t border-black/10 pt-6 font-sans text-sm text-[#6d5a50]">
          <a href="https://twosquares.co.uk" target="_blank" rel="noopener noreferrer">
            Website Developed by TwoSquares
          </a>
        </div>
      </div>
    </footer>
  )
}

export default function HandymanPremiumSite({ currentPage }: { currentPage: Page }) {
  return (
    <div className="min-h-screen bg-[#f4ede4] text-[#241813]">
      <Header currentPage={currentPage} />
      {currentPage === "home" ? <HomePage /> : null}
      {currentPage === "services" ? <ServicesPage /> : null}
      {currentPage === "quote" ? <QuotePage /> : null}
      <Footer />
    </div>
  )
}

