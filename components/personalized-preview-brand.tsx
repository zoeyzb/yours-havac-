"use client"

import { useEffect } from "react"

type PersonalizedPreviewBrandProps = {
  businessName: string
}

export default function PersonalizedPreviewBrand({ businessName }: PersonalizedPreviewBrandProps) {
  useEffect(() => {
    const cleanName = businessName.trim()
    if (!cleanName) return

    document.documentElement.classList.add("personalized-preview")

    let styleTag = document.getElementById("personalized-preview-mobile-style") as HTMLStyleElement | null
    if (!styleTag) {
      styleTag = document.createElement("style")
      styleTag.id = "personalized-preview-mobile-style"
      styleTag.textContent = `
        @media (max-width: 767px) {
          .personalized-preview .owner-preview-bar > div {
            min-height: 48px;
            gap: 8px !important;
            padding: 8px 12px !important;
          }

          .personalized-preview .owner-preview-bar span {
            overflow: visible !important;
            white-space: nowrap !important;
            text-overflow: clip !important;
            font-size: 12px !important;
            line-height: 1.15 !important;
          }

          .personalized-preview .owner-preview-bar a {
            padding: 8px 11px !important;
            font-size: 11px !important;
            line-height: 1 !important;
          }

          .personalized-preview header > div:first-child {
            display: grid !important;
            grid-template-columns: minmax(0, 1fr) !important;
            gap: 7px !important;
            padding: 10px 14px 7px !important;
          }

          .personalized-preview header > div:first-child > a:first-child {
            display: block !important;
            width: 100% !important;
            max-width: none !important;
            padding: 3px 2px 2px !important;
            text-align: center !important;
          }

          .personalized-preview header > div:first-child > a:first-child > div:first-child {
            width: 100% !important;
            max-width: none !important;
            overflow: visible !important;
            white-space: normal !important;
            text-overflow: clip !important;
            font-size: clamp(18px, 5.2vw, 23px) !important;
            line-height: 1.08 !important;
            font-weight: 950 !important;
            letter-spacing: -0.035em !important;
          }

          .personalized-preview header > div:first-child > div:last-child {
            display: none !important;
          }

          .personalized-preview header nav[aria-label="Mobile navigation"] {
            display: grid !important;
            grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
            gap: 0 !important;
            width: 100% !important;
            padding: 8px 6px !important;
            font-size: 11px !important;
            text-align: center !important;
          }

          .personalized-preview header nav[aria-label="Mobile navigation"] a {
            display: block !important;
            padding: 3px 2px !important;
          }
        }
      `
      document.head.appendChild(styleTag)
    }

    const applyPersonalization = () => {
      const brandTitle = document.querySelector<HTMLElement>("header a[href='/'] > div:first-child")
      const ownerCopy = document.querySelector<HTMLElement>(".owner-preview-bar span")
      const ownerCta = document.querySelector<HTMLAnchorElement>(".owner-preview-bar a")

      if (ownerCopy) ownerCopy.textContent = "We put in the work for you."
      if (ownerCta) {
        ownerCta.textContent = "Website $597 →"
        ownerCta.setAttribute("aria-label", "Get this website for $597")
      }

      if (!brandTitle) return false

      brandTitle.textContent = cleanName
      brandTitle.setAttribute("data-personalized-business-name", cleanName)

      // Keep the full business name visible and prominent on desktop while fitting long names.
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

    if (!applyPersonalization()) {
      const observer = new MutationObserver(() => {
        if (applyPersonalization()) observer.disconnect()
      })

      observer.observe(document.documentElement, { childList: true, subtree: true })
      const timeout = window.setTimeout(() => observer.disconnect(), 5000)

      return () => {
        window.clearTimeout(timeout)
        observer.disconnect()
        document.documentElement.classList.remove("personalized-preview")
      }
    }

    return () => {
      document.documentElement.classList.remove("personalized-preview")
    }
  }, [businessName])

  return null
}
