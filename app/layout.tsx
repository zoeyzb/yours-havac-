import type { Metadata } from "next"
import { getSiteUrl } from "../lib/site-url"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: "Oakwell House Care | Handyman Services",
  description:
    "Premium handyman website template for residential maintenance, polished local trust, and higher-quality home-service presentation.",
  keywords: ["premium handyman website", "residential handyman template", "home maintenance website", "polished local service template", "handyman website design"],
  openGraph: {
    title: "Oakwell House Care | Handyman Services",
    description:
      "Premium handyman website template for residential maintenance, polished local trust, and higher-quality home-service presentation.",
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
