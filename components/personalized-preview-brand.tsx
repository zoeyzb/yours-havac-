"use client"

import { useEffect } from "react"

type PersonalizedPreviewBrandProps = {
  businessName: string
}

export default function PersonalizedPreviewBrand({ businessName }: PersonalizedPreviewBrandProps) {
  useEffect(() => {
    const cleanName = businessName.trim()
    if (!cleanName) return

    const applyBusinessName = () => {
      const brandTitle = document.querySelector<HTMLElement>("header a[href='/'] > div:first-child")
      if (!brandTitle) return false

      brandTitle.textContent = cleanName
      brandTitle.setAttribute("data-personalized-business-name", cleanName)

      // Make the business name feel intentionally branded while still fitting long names.
      brandTitle.style.fontSize = cleanName.length > 42 ? "15px" : cleanName.length > 30 ? "17px" : "20px"
      brandTitle.style.lineHeight = "1.08"
      brandTitle.style.fontWeight = "900"
      brandTitle.style.letterSpacing = "-0.035em"
      brandTitle.style.whiteSpace = "normal"
      brandTitle.style.overflow = "visible"
      brandTitle.style.textOverflow = "clip"
      brandTitle.style.maxWidth = "390px"

      const brandLink = brandTitle.parentElement
      if (brandLink) {
        brandLink.style.maxWidth = "430px"
        brandLink.style.flexShrink = "1"
      }

      return true
    }

    if (applyBusinessName()) return

    const observer = new MutationObserver(() => {
      if (applyBusinessName()) observer.disconnect()
    })

    observer.observe(document.documentElement, { childList: true, subtree: true })
    const timeout = window.setTimeout(() => observer.disconnect(), 5000)

    return () => {
      window.clearTimeout(timeout)
      observer.disconnect()
    }
  }, [businessName])

  return null
}
