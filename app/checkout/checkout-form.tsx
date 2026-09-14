"use client"

import { useEffect, useRef, useState } from "react"
import {
  ArrowRight,
  Check,
  ChevronDown,
  Landmark,
  LockKeyhole,
} from "lucide-react"

declare global {
  interface Window {
    Stripe?: (key: string) => any
  }
}

type CheckoutPayload = {
  data?: { clientSecret?: string; publishableKey?: string }
  error?: { message?: string }
}

type IntentMethod = "card" | "cashapp"
type HostedMethod = "bank" | "affirm" | "klarna"

let stripeJsPromise: Promise<void> | null = null

function ensureStripeJs() {
  if (typeof window === "undefined") return Promise.reject(new Error("Stripe requires a browser."))
  if (window.Stripe) return Promise.resolve()
  if (stripeJsPromise) return stripeJsPromise

  stripeJsPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[src="https://js.stripe.com/v3/"]')
    const script = existing ?? document.createElement("script")

    const done = () => {
      if (window.Stripe) resolve()
      else reject(new Error("Stripe.js loaded but Stripe was not available."))
    }

    script.addEventListener("load", done, { once: true })
    script.addEventListener("error", () => reject(new Error("Secure payment could not load.")), { once: true })

    if (!existing) {
      script.src = "https://js.stripe.com/v3/"
      script.async = true
      document.head.appendChild(script)
    }

    if (window.Stripe) resolve()
  })

  return stripeJsPromise
}

async function createIntent(method: IntentMethod) {
  const response = await fetch("/api/checkout/intent", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ method }),
  })
  const payload = (await response.json().catch(() => null)) as CheckoutPayload | null

  if (!response.ok || !payload?.data?.clientSecret || !payload?.data?.publishableKey) {
    throw new Error(payload?.error?.message || "Secure checkout could not be prepared.")
  }

  return payload.data as { clientSecret: string; publishableKey: string }
}

async function createHostedSession(method: HostedMethod) {
  const response = await fetch("/api/checkout/session", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ method }),
  })
  const payload = await response.json().catch(() => null) as {
    data?: { url?: string }
    error?: { message?: string }
  } | null

  if (!response.ok || !payload?.data?.url) {
    throw new Error(payload?.error?.message || "That payment option is not available right now.")
  }

  return payload.data.url
}

const appearance = {
  theme: "stripe" as const,
  variables: {
    colorPrimary: "#ef6238",
    colorBackground: "#fffdfa",
    colorText: "#102630",
    colorDanger: "#b42318",
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
    borderRadius: "13px",
    spacingUnit: "5px",
  },
  rules: {
    ".Input": {
      border: "1px solid #d9e0dc",
      boxShadow: "0 7px 22px rgba(16,38,48,.03)",
    },
    ".Input:focus": {
      border: "1px solid #ef6238",
      boxShadow: "0 0 0 3px rgba(239,98,56,.10)",
    },
    ".Label": { fontWeight: "800", color: "#314d57" },
  },
}

export function CheckoutForm() {
  const cardRef = useRef<HTMLDivElement>(null)
  const applePayRef = useRef<HTMLDivElement>(null)
  const cashAppRef = useRef<HTMLDivElement>(null)
  const googlePayRef = useRef<HTMLDivElement>(null)

  const stripeRef = useRef<any>(null)
  const cardElementsRef = useRef<any>(null)
  const cashAppElementsRef = useRef<any>(null)
  const googlePayElementsRef = useRef<any>(null)
  const initialCardIntentRef = useRef<Promise<{ clientSecret: string; publishableKey: string }> | null>(null)
  const googlePayStartedRef = useRef(false)
  const busyRef = useRef(false)

  const [cardReady, setCardReady] = useState(false)
  const [applePayAvailable, setApplePayAvailable] = useState<boolean | null>(null)
  const [googlePayAvailable, setGooglePayAvailable] = useState<boolean | null>(null)
  const [cashAppOpen, setCashAppOpen] = useState(false)
  const [cashAppReady, setCashAppReady] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [moreLoading, setMoreLoading] = useState(false)
  const [hostedBusy, setHostedBusy] = useState<HostedMethod | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    initialCardIntentRef.current = createIntent("card")

    let cancelled = false
    let cardElement: any = null
    let applePayElement: any = null

    void (async () => {
      try {
        setError("")
        const [, intent] = await Promise.all([
          ensureStripeJs(),
          initialCardIntentRef.current,
        ])

        if (cancelled || !window.Stripe || !cardRef.current) return

        const stripe = window.Stripe(intent.publishableKey)
        stripeRef.current = stripe

        const elements = stripe.elements({ clientSecret: intent.clientSecret, appearance })
        cardElementsRef.current = elements

        cardElement = elements.create("payment", {
          wallets: { applePay: "never", googlePay: "never", link: "never" },
          layout: {
            type: "accordion",
            defaultCollapsed: false,
            radios: false,
            spacedAccordionItems: false,
          },
          paymentMethodOrder: ["card"],
        })
        cardElement.on("ready", () => {
          if (!cancelled) setCardReady(true)
        })
        cardElement.mount(cardRef.current)

        if (!applePayRef.current) return

        applePayElement = elements.create("expressCheckout", {
          paymentMethods: {
            applePay: "always",
            googlePay: "never",
            link: "never",
            amazonPay: "never",
            paypal: "never",
            klarna: "never",
          },
          layout: { maxColumns: 1, maxRows: 1, overflow: "never" },
          buttonHeight: 55,
          buttonTheme: { applePay: "black" },
          buttonType: { applePay: "plain" },
          billingAddressRequired: false,
          emailRequired: false,
          phoneNumberRequired: false,
        })

        applePayElement.on("availablepaymentmethodschange", (event: any) => {
          if (!cancelled) setApplePayAvailable(Boolean(event?.paymentMethods))
        })
        applePayElement.on("confirm", async () => confirmElementsPayment(cardElementsRef.current))
        applePayElement.mount(applePayRef.current)
      } catch (err) {
        if (!cancelled) {
          setApplePayAvailable(false)
          setError(err instanceof Error ? err.message : "Secure checkout could not load.")
        }
      }
    })()

    return () => {
      cancelled = true
      try { cardElement?.unmount?.() } catch {}
      try { applePayElement?.unmount?.() } catch {}
    }
  }, [])

  async function confirmElementsPayment(elements: any) {
    const stripe = stripeRef.current
    if (!stripe || !elements || busyRef.current) return

    busyRef.current = true
    setBusy(true)
    setError("")

    try {
      const submitResult = await elements.submit?.()
      if (submitResult?.error) {
        setError(submitResult.error.message || "Check your payment details.")
        return
      }

      const result = await stripe.confirmPayment({
        elements,
        confirmParams: { return_url: `${window.location.origin}/payment/success` },
        redirect: "if_required",
      })

      if (result?.error) {
        setError(result.error.message || "Payment could not be completed.")
        return
      }

      const intent = result?.paymentIntent
      if (intent?.status === "succeeded" || intent?.status === "processing") {
        window.location.assign(`/payment/success?payment_intent=${encodeURIComponent(intent.id)}`)
      }
    } catch (err) {
      console.error("Stripe confirmation failed", err)
      setError(err instanceof Error ? err.message : "Payment could not be completed. Please try again.")
    } finally {
      busyRef.current = false
      setBusy(false)
    }
  }

  async function openCashApp() {
    if (cashAppOpen) {
      setCashAppOpen(false)
      return
    }

    setCashAppOpen(true)
    setError("")

    if (cashAppElementsRef.current) return

    try {
      await ensureStripeJs()
      const stripe = stripeRef.current
      if (!stripe) throw new Error("Secure checkout is still loading.")
      const { clientSecret } = await createIntent("cashapp")

      const elements = stripe.elements({
        clientSecret,
        appearance: {
          ...appearance,
          variables: { ...appearance.variables, colorPrimary: "#00c94a" },
        },
      })
      cashAppElementsRef.current = elements

      const paymentElement = elements.create("payment", {
        wallets: { link: "never" },
        layout: {
          type: "accordion",
          defaultCollapsed: false,
          radios: false,
          spacedAccordionItems: false,
        },
        paymentMethodOrder: ["cashapp"],
      })
      paymentElement.on("ready", () => setCashAppReady(true))
      paymentElement.mount(cashAppRef.current!)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Cash App Pay could not load.")
      setCashAppOpen(false)
    }
  }

  async function initGooglePay() {
    if (googlePayStartedRef.current || !googlePayRef.current) return
    googlePayStartedRef.current = true

    try {
      await ensureStripeJs()
      const stripe = stripeRef.current
      if (!stripe) throw new Error("Secure checkout is still loading.")

      const { clientSecret } = await createIntent("card")
      const elements = stripe.elements({ clientSecret, appearance })
      googlePayElementsRef.current = elements

      const googlePayElement = elements.create("expressCheckout", {
        paymentMethods: {
          applePay: "never",
          googlePay: "always",
          link: "never",
          amazonPay: "never",
          paypal: "never",
          klarna: "never",
        },
        layout: { maxColumns: 1, maxRows: 1, overflow: "never" },
        buttonHeight: 46,
        buttonTheme: { googlePay: "black" },
        buttonType: { googlePay: "pay" },
        billingAddressRequired: false,
        emailRequired: false,
        phoneNumberRequired: false,
      })

      googlePayElement.on("availablepaymentmethodschange", (event: any) => {
        setGooglePayAvailable(Boolean(event?.paymentMethods))
      })
      googlePayElement.on("confirm", async () => confirmElementsPayment(googlePayElementsRef.current))
      googlePayElement.mount(googlePayRef.current)
    } catch {
      setGooglePayAvailable(false)
    }
  }

  async function toggleMoreOptions() {
    const nextOpen = !moreOpen
    setMoreOpen(nextOpen)
    setError("")

    if (nextOpen && !googlePayStartedRef.current) {
      setMoreLoading(true)
      await initGooglePay()
      setMoreLoading(false)
    }
  }

  async function openHosted(method: HostedMethod) {
    if (hostedBusy) return
    setHostedBusy(method)
    setError("")

    try {
      const url = await createHostedSession(method)
      window.location.assign(url)
    } catch (err) {
      setError(err instanceof Error ? err.message : "That payment option is not available right now.")
      setHostedBusy(null)
    }
  }

  async function submitCard(event: React.FormEvent) {
    event.preventDefault()
    await confirmElementsPayment(cardElementsRef.current)
  }

  return (
    <div className="checkout-payment-card">
      <div className={applePayAvailable === false ? "fast-pay-grid fast-pay-grid--apple-unavailable" : "fast-pay-grid"}>
        <div className={applePayAvailable === false ? "fast-pay-apple fast-pay-wallet fast-pay-wallet--unavailable" : "fast-pay-apple fast-pay-wallet"}>
          <div className="native-wallet-mount native-wallet-mount--visible" ref={applePayRef} />
          {applePayAvailable === false ? (
            <div className="apple-pay-unavailable" aria-label="Apple Pay is unavailable on this device">
              <span className="apple-pay-brand"><b></b> Pay</span>
              <small>Not available on this device</small>
            </div>
          ) : null}
          {applePayAvailable === null ? (
            <div className="wallet-checking" aria-hidden="true">
              <span className="apple-pay-brand"><b></b> Pay</span>
              <small>Checking…</small>
            </div>
          ) : null}
        </div>

        <button
          type="button"
          className={cashAppOpen ? "cashapp-fast-button cashapp-fast-button--active" : "cashapp-fast-button"}
          onClick={openCashApp}
          aria-expanded={cashAppOpen}
        >
          <span className="cashapp-mark">$</span>
          <span>Cash App Pay</span>
          {cashAppOpen ? <Check size={16} /> : <ArrowRight size={16} />}
        </button>
      </div>

      {cashAppOpen ? (
        <div className="cashapp-panel">
          <div ref={cashAppRef} />
          <button
            type="button"
            disabled={!cashAppReady || busy}
            className="cashapp-confirm"
            onClick={() => confirmElementsPayment(cashAppElementsRef.current)}
          >
            {busy ? "Processing…" : "Continue with Cash App Pay"}
          </button>
        </div>
      ) : null}

      <form className="selected-payment-form selected-payment-form--card" onSubmit={submitCard}>
        <div className="card-payment-heading">
          <span>CARD</span>
          <strong>Enter card details</strong>
        </div>

        <div className="site-payment-element-wrap">
          {!cardReady && !error ? <div className="site-payment-loading">Preparing secure card payment…</div> : null}
          <div ref={cardRef} />
        </div>

        {error ? <p className="site-payment-error" role="alert">{error}</p> : null}

        <button type="submit" disabled={busy || !cardReady} className="site-payment-submit">
          <LockKeyhole size={16} />
          <span>{busy ? "Processing…" : "Pay $97"}</span>
          {!busy ? <ArrowRight size={17} /> : null}
        </button>

        <div className="site-payment-security">
          <LockKeyhole size={14} />
          <span>Secure payment powered by Stripe</span>
        </div>
      </form>

      <button
        type="button"
        className={moreOpen ? "more-payment-toggle more-payment-toggle--open" : "more-payment-toggle"}
        onClick={toggleMoreOptions}
        aria-expanded={moreOpen}
      >
        <span>More payment options</span>
        <ChevronDown size={16} />
      </button>

      {moreOpen ? (
        <div className="more-payment-panel more-payment-panel--strips">
          {moreLoading ? <div className="more-payment-loading">Checking Google Pay…</div> : null}
          <div className="payment-strip-list">
            <button type="button" className="payment-strip" disabled={hostedBusy !== null} onClick={() => openHosted("bank")}>
              <Landmark size={17} />
              <strong>{hostedBusy === "bank" ? "Opening…" : "Bank transfer"}</strong>
              <ArrowRight size={15} />
            </button>

            <button type="button" className="payment-strip" disabled={hostedBusy !== null} onClick={() => openHosted("affirm")}>
              <span className="payment-brand-mark payment-brand-mark--affirm">a</span>
              <strong>{hostedBusy === "affirm" ? "Opening…" : "Affirm"}</strong>
              <ArrowRight size={15} />
            </button>

            <button type="button" className="payment-strip" disabled={hostedBusy !== null} onClick={() => openHosted("klarna")}>
              <span className="payment-brand-mark payment-brand-mark--klarna">K</span>
              <strong>{hostedBusy === "klarna" ? "Opening…" : "Klarna"}</strong>
              <ArrowRight size={15} />
            </button>

            <div className={googlePayAvailable ? "payment-strip payment-strip--google" : "payment-strip payment-strip--google payment-strip--unavailable"}>
              <div className="google-pay-native google-pay-native--visible" ref={googlePayRef} />
              {googlePayAvailable === false ? (
                <>
                  <span className="payment-brand-mark payment-brand-mark--google">G</span>
                  <strong>Google Pay</strong>
                  <small>Unavailable on this device</small>
                </>
              ) : null}
              {googlePayAvailable === null && !moreLoading ? (
                <>
                  <span className="payment-brand-mark payment-brand-mark--google">G</span>
                  <strong>Google Pay</strong>
                  <small>Checking availability…</small>
                </>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
