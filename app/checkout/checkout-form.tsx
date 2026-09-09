"use client"

import Script from "next/script"
import { useEffect, useRef, useState } from "react"
import { ArrowRight, LockKeyhole } from "lucide-react"

declare global {
  interface Window {
    Stripe?: (key: string) => any
  }
}

type CheckoutPayload = {
  data?: {
    clientSecret?: string
    publishableKey?: string
  }
  error?: { message?: string }
}

export function CheckoutForm() {
  const paymentRef = useRef<HTMLDivElement>(null)
  const expressRef = useRef<HTMLDivElement>(null)
  const stripeRef = useRef<any>(null)
  const elementsRef = useRef<any>(null)
  const emailRef = useRef("")
  const busyRef = useRef(false)
  const [scriptReady, setScriptReady] = useState(false)
  const [ready, setReady] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState("")
  const [email, setEmail] = useState("")

  useEffect(() => {
    if (!scriptReady || !window.Stripe || !paymentRef.current) return

    let cancelled = false
    let paymentElement: any = null
    let expressElement: any = null

    void (async () => {
      try {
        setError("")
        const response = await fetch("/api/checkout/intent", { method: "POST" })
        const payload = (await response.json().catch(() => null)) as CheckoutPayload | null
        const clientSecret = payload?.data?.clientSecret
        const publishableKey = payload?.data?.publishableKey
        if (!response.ok || !clientSecret || !publishableKey) {
          throw new Error(payload?.error?.message || "Secure checkout could not be prepared.")
        }

        const stripe = window.Stripe?.(publishableKey)
        if (!stripe || cancelled) return

        const elements = stripe.elements({
          clientSecret,
          appearance: {
            theme: "stripe",
            variables: {
              colorPrimary: "#e7613b",
              colorBackground: "#ffffff",
              colorText: "#102630",
              colorDanger: "#b42318",
              fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
              borderRadius: "14px",
              spacingUnit: "5px",
            },
            rules: {
              ".Input": {
                border: "1px solid #dfe5e2",
                boxShadow: "0 8px 24px rgba(16,38,48,.04)",
              },
              ".Input:focus": {
                border: "1px solid #e7613b",
                boxShadow: "0 0 0 3px rgba(231,97,59,.10)",
              },
              ".Label": {
                fontWeight: "700",
                color: "#3d565f",
              },
            },
          },
        })

        stripeRef.current = stripe
        elementsRef.current = elements

        if (expressRef.current) {
          try {
            expressElement = elements.create("expressCheckout", {
              paymentMethods: {
                applePay: "auto",
                googlePay: "never",
                link: "never",
                amazonPay: "never",
                paypal: "never",
                klarna: "never",
              },
              layout: { maxColumns: 1, maxRows: 1, overflow: "never" },
              buttonHeight: 52,
            })
            expressElement.on("confirm", async () => {
              await confirmPayment()
            })
            expressElement.mount(expressRef.current)
          } catch {
            expressElement = null
          }
        }

        paymentElement = elements.create("payment", {
          layout: {
            type: "accordion",
            defaultCollapsed: false,
            radios: true,
            spacedAccordionItems: false,
          },
          paymentMethodOrder: ["card", "cashapp"],
        })
        paymentElement.on("ready", () => {
          if (!cancelled) setReady(true)
        })
        paymentElement.mount(paymentRef.current)
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Secure checkout could not load.")
      }
    })()

    async function confirmPayment() {
      const stripe = stripeRef.current
      const elements = elementsRef.current
      if (!stripe || !elements || busyRef.current) return

      const currentEmail = emailRef.current.trim()
      if (!currentEmail || !/^\S+@\S+\.\S+$/.test(currentEmail)) {
        setError("Enter the email where you want the finished site sent.")
        return
      }

      busyRef.current = true
      setBusy(true)
      setError("")
      try {
        const submitResult = await elements.submit?.()
        if (submitResult?.error) {
          setError(submitResult.error.message || "Check your payment details.")
          busyRef.current = false
          busyRef.current = false
          setBusy(false)
          return
        }

        const result = await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: `${window.location.origin}/payment/success`,
            payment_method_data: {
              billing_details: { email: currentEmail },
            },
          },
          redirect: "if_required",
        })

        if (result?.error) {
          setError(result.error.message || "Payment could not be completed.")
          setBusy(false)
          return
        }

        const intent = result?.paymentIntent
        if (intent?.status === "succeeded" || intent?.status === "processing") {
          window.location.assign(`/payment/success?payment_intent=${encodeURIComponent(intent.id)}`)
          return
        }
        busyRef.current = false
        setBusy(false)
      } catch {
        setError("Payment could not be completed. Please try again.")
        busyRef.current = false
        setBusy(false)
      }
    }

    ;(window as any).__websiteConfirmPayment = confirmPayment

    return () => {
      cancelled = true
      try { paymentElement?.unmount?.() } catch {}
      try { expressElement?.unmount?.() } catch {}
      delete (window as any).__websiteConfirmPayment
    }
  }, [scriptReady])

  async function submit(event: React.FormEvent) {
    event.preventDefault()
    const fn = (window as any).__websiteConfirmPayment
    if (typeof fn === "function") await fn()
  }

  return (
    <>
      <Script
        src="https://js.stripe.com/v3/"
        strategy="afterInteractive"
        onReady={() => setScriptReady(true)}
        onError={() => setError("Secure payment could not load.")}
      />

      <form className="site-payment-form" onSubmit={submit}>
        <label className="site-payment-email">
          <span>Where should we send the finished site?</span>
          <input
            type="email"
            value={email}
            onChange={(event) => { emailRef.current = event.target.value; setEmail(event.target.value) }}
            placeholder="you@business.com"
            autoComplete="email"
            required
          />
        </label>

        <div className="site-express-wrap">
          <div ref={expressRef} />
        </div>

        <div className="site-or"><span>or pay by card / Cash App</span></div>

        <div className="site-payment-element-wrap">
          {!ready && !error ? <div className="site-payment-loading">Preparing secure payment…</div> : null}
          <div ref={paymentRef} />
        </div>

        {error ? <p className="site-payment-error" role="alert">{error}</p> : null}

        <button type="submit" disabled={!ready || busy} className="site-payment-submit">
          <span>{busy ? "Processing…" : "Pay $97 securely"}</span>
          {!busy ? <ArrowRight size={17} /> : null}
        </button>

        <div className="site-payment-security">
          <LockKeyhole size={14} />
          <span>Card details stay with Stripe. We never see or store them.</span>
        </div>
      </form>
    </>
  )
}
