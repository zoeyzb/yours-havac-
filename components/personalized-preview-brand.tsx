"use client"

import { useEffect } from "react"

type PersonalizedPreviewBrandProps = {
  businessName: string
}

export default function PersonalizedPreviewBrand({ businessName }: PersonalizedPreviewBrandProps) {
  const cleanName = businessName.trim()

  useEffect(() => {
    if (!cleanName) return

    const applyDesktopPersonalization = () => {
      const brandTitle = document.querySelector<HTMLElement>("header a[href='/'] > div:first-child")
      const ownerCopy = document.querySelector<HTMLElement>(".owner-preview-bar span")

      if (ownerCopy) ownerCopy.textContent = "We put in the work for you."
      if (!brandTitle) return false

      brandTitle.textContent = cleanName
      brandTitle.setAttribute("data-personalized-business-name", cleanName)
      brandTitle.style.fontSize = cleanName.length > 42 ? "15px" : cleanName.length > 30 ? "17px" : "20px"
      brandTitle.style.lineHeight = "1.08"
      brandTitle.style.fontWeight = "950"
      brandTitle.style.letterSpacing = "-0.035em"
      brandTitle.style.whiteSpace = "normal"
      brandTitle.style.overflow = "visible"
      brandTitle.style.textOverflow = "clip"
      brandTitle.style.maxWidth = "430px"

      const brandLink = brandTitle.parentElement
      if (brandLink) {
        brandLink.style.maxWidth = "470px"
        brandLink.style.flexShrink = "1"
      }

      return true
    }

    if (applyDesktopPersonalization()) return

    const observer = new MutationObserver(() => {
      if (applyDesktopPersonalization()) observer.disconnect()
    })

    observer.observe(document.documentElement, { childList: true, subtree: true })
    const timeout = window.setTimeout(() => observer.disconnect(), 5000)

    return () => {
      window.clearTimeout(timeout)
      observer.disconnect()
    }
  }, [cleanName])

  if (!cleanName) return null

  return (
    <>
      <style>{`
        .personalized-mobile-header { display: none; }

        @media (max-width: 767px) {
          .personalized-mobile-header {
            display: block;
            position: relative;
            z-index: 90;
            background: #f7f8f5;
            color: #102630;
            border-bottom: 1px solid #dfe7e4;
          }

          .personalized-mobile-header + .owner-preview-bar,
          .personalized-mobile-header + .owner-preview-bar + header {
            display: none !important;
          }

          .personalized-mobile-offer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
            min-height: 46px;
            padding: 8px 12px;
            border-bottom: 1px solid #eadfd7;
            background: #fff8f3;
          }

          .personalized-mobile-offer__text {
            min-width: 0;
            font-size: 13px;
            line-height: 1.15;
            font-weight: 950;
            letter-spacing: -0.015em;
          }

          .personalized-mobile-offer__price {
            flex: none;
            border-radius: 999px;
            background: #e7613b;
            padding: 8px 12px;
            color: white;
            font-size: 12px;
            line-height: 1;
            font-weight: 950;
            box-shadow: 0 8px 20px rgba(231,97,59,.18);
          }

          .personalized-mobile-brand {
            padding: 12px 14px 10px;
            text-align: center;
            border-bottom: 1px solid #e7ece9;
          }

          .personalized-mobile-brand__name {
            margin: 0 auto;
            max-width: 100%;
            font-size: clamp(20px, 5.6vw, 25px);
            line-height: 1.05;
            font-weight: 950;
            letter-spacing: -0.04em;
            overflow-wrap: anywhere;
          }

          .personalized-mobile-nav {
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            padding: 8px 6px;
            text-align: center;
            font-size: 11px;
            line-height: 1.1;
            font-weight: 900;
            color: #5f7279;
          }

          .personalized-mobile-nav a {
            display: block;
            padding: 5px 2px;
          }
        }
      `}</style>

      <div className="personalized-mobile-header" aria-label={`Website preview for ${cleanName}`}>
        <div className="personalized-mobile-offer">
          <div className="personalized-mobile-offer__text">We put in the work for you.</div>
          <a href="/checkout" className="personalized-mobile-offer__price">$597</a>
        </div>

        <div className="personalized-mobile-brand">
          <div className="personalized-mobile-brand__name">{cleanName}</div>
        </div>

        <nav className="personalized-mobile-nav" aria-label="Preview navigation">
          <a href="/">Home</a>
          <a href="/#reviews">Reviews</a>
          <a href="/services">Services</a>
          <a href="/quote">Contact</a>
        </nav>
      </div>
    </>
  )
}
