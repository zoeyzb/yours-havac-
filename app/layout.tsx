import type { Metadata } from "next"
import { getSiteUrl } from "../lib/site-url"
import { siteConfig } from "../lib/site-config"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: `${siteConfig.brand.name} | Heating & Cooling in ${siteConfig.brand.city}`,
  description: `Heating, cooling, installation, and maintenance from ${siteConfig.brand.name}. Clear options, dependable service, and comfort-first HVAC help in ${siteConfig.brand.city}.`,
  keywords: [
    "HVAC service",
    "AC repair",
    "heating repair",
    "HVAC installation",
    "HVAC maintenance",
    `${siteConfig.brand.city} HVAC`,
  ],
  openGraph: {
    title: `${siteConfig.brand.name} | Heating & Cooling`,
    description: `Comfort-first HVAC service in ${siteConfig.brand.city}. Heating, cooling, installation, and maintenance.`,
    type: "website",
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
