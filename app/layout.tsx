import type { Metadata } from "next"
import { getSiteUrl } from "../lib/site-url"
import { siteConfig } from "../lib/site-config"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: `${siteConfig.brand.name} | Heating & Cooling`,
  description: `Heating, cooling, maintenance, repair, replacement, and indoor comfort service from ${siteConfig.brand.name}. Clear answers and dependable HVAC help for local homeowners.`,
  keywords: [
    "HVAC service",
    "AC repair",
    "heating repair",
    "HVAC replacement",
    "HVAC maintenance",
    "indoor air quality",
  ],
  openGraph: {
    title: `${siteConfig.brand.name} | Heating & Cooling`,
    description: "Clear, dependable heating and cooling service for local homeowners.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `${siteConfig.brand.name} | Heating & Cooling`,
    description: "Clear, dependable heating and cooling service for local homeowners.",
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
