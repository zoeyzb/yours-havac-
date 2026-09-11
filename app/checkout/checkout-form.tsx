"use client"

import Script from "next/script"
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
  data?: {
    clientSecret?: string
    publishableKey?: string
  }
  error?: { message?: string }
}

type IntentMethod = "card" | "cashapp"
type HostedMethod = "bank" | "affirm" | "klarna"

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
    ".Label": {
      fontWeight: "800",
      color: "#314d57",
    },
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

  const [scriptReady, setScriptReady] = useState(false)
  const [cardReady, setCardReady] = useState(false)
  const [applePayAvailable, setApplePayAvailable] = useState(false)
  const [googlePayAvailable, setGooglePayAvailable] = useState(false)
  const [cashAppOpen, setCashAppOpen] = useState(false)
  const [cashAppReady, setCashAppReady] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [moreLoading, setMoreLoading] = useState(false)
  const [hostedBusy, setHostedBusy] = useState<HostedMethod | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    initialCardIntentRef.current = createIntent("card")
  }, [])

  useEffect(() => {
    if (!scriptReady || !window.Stripe || !cardRef.current) return

    let cancelled = false
    let cardElement: any = null
    let applePayElement: any = null

    void (async () => {
      try {
        setError("")
        const { clientSecret, publishableKey } = await (initialCardIntentRef.current ?? createIntent("card"))
        const stripe = window.Stripe?.(publishableKey)
        if (!stripe || cancelled) return

        stripeRef.current = stripe

        const elements = stripe.elements({ clientSecret, appearance })
        cardElementsRef.current = elements

        cardElement = elements.create("payment", {
          fields: { billingDetails: "never" },
          wallets: { link: "never" },
          layout: {
            type: "accordion",
            defaultCollapsed: false,
            radios: false,
            spacedAccordionItems: false,
          },
          paymentMethodOrder: ["card"],
          defaultValues: { billingDetails: { address: { country: "US" } } },
        })

        cardElement.on("ready", () => {
          if (!cancelled) setCardReady(true)
        })
        cardElement.mount(cardRef.current)

        if (applePayRef.current) {
          try {
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

            const syncAvailability = (event: any) => {
              if (cancelled) return
              const methods = event?.availablePaymentMethods || event?.available_payment_methods
              setApplePayAvailable(Boolean(methods?.applePay || methods?.apple_pay))
            }

            applePayElement.on("ready", syncAvailability)
            applePayElement.on("availablepaymentmethodschange", syncAvailability)
            applePayElement.on("confirm", async () => confirmElementsPayment(cardElementsRef.current))
            applePayElement.mount(applePayRef.current)
          } catch {
            setApplePayAvailable(false)
          }
        }
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Secure checkout could not load.")
      }
    })()

    return () => {
      cancelled = true
      try { cardElement?.unmount?.() } catch {}
      try { applePayElement?.unmount?.() } catch {}
    }
  }, [scriptReady])

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
        confirmParams: {
          return_url: `${window.location.origin}/payment/success`,
          payment_method_data: {
            billing_details: { address: { country: "US" } },
          },
        },
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
    } catch {
      setError("Payment could not be completed. Please try again.")
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
        fields: { billingDetails: "never" },
        wallets: { link: "never" },
        layout: { type: "accordion", defaultCollapsed: false, radios: false, spacedAccordionItems: false },
        paymentMethodOrder: ["cashapp"],
        defaultValues: { billingDetails: { address: { country: "US" } } },
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
      const stripe = stripeRef.current
      if (!stripe) return

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
        billingAddressRequired: false,
        emailRequired: false,
        phoneNumberRequired: false,
      })

      const syncAvailability = (event: any) => {
        const methods = event?.availablePaymentMethods || event?.available_payment_methods
        setGooglePayAvailable(Boolean(methods?.googlePay || methods?.google_pay))
      }

      googlePayElement.on("ready", syncAvailability)
      googlePayElement.on("availablepaymentmethodschange", syncAvailability)
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

    if (nextOpen) {
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
    <>
      <Script
        src="https://js.stripe.com/v3/"
        strategy="afterInteractive"
        onReady={() => setScriptReady(true)}
        onError={() => setError("Secure payment could not load.")}
      />

      <div className="checkout-payment-card">
        <div className="fast-pay-grid">
          <div className="fast-pay-apple fast-pay-wallet">
            <div ref={applePayRef} />
            {!applePayAvailable ? (
              <div className="apple-pay-unavailable" aria-label="Apple Pay is available in Safari on eligible Apple devices">
                <span className="apple-pay-brand"><b></b>Pay</span>
                <small>Available in Safari</small>
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

          <button
            type="submit"
            disabled={busy || !cardReady}
            className="site-payment-submit"
          >
            <LockKeyhole size={16} />
            <span>{busy ? "Processing…" : "Pay $1"}</span>
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
            {moreLoading ? <div className="more-payment-loading">Checking payment options…</div> : null}

            <div className="payment-strip-list">
              <button
                type="button"
                className="payment-strip"
                disabled={hostedBusy !== null}
                onClick={() => openHosted("bank")}
              >
                <Landmark size={17} />
                <strong>{hostedBusy === "bank" ? "Opening…" : "Bank transfer"}</strong>
                <ArrowRight size={15} />
              </button>

              <button
                type="button"
                className="payment-strip"
                disabled={hostedBusy !== null}
                onClick={() => openHosted("affirm")}
              >
                <span className="payment-brand-mark payment-brand-mark--affirm">a</span>
                <strong>{hostedBusy === "affirm" ? "Opening…" : "Affirm"}</strong>
                <ArrowRight size={15} />
              </button>

              <button
                type="button"
                className="payment-strip"
                disabled={hostedBusy !== null}
                onClick={() => openHosted("klarna")}
              >
                <span className="payment-brand-mark payment-brand-mark--klarna">K</span>
                <strong>{hostedBusy === "klarna" ? "Opening…" : "Klarna"}</strong>
                <ArrowRight size={15} />
              </button>

              <div className={googlePayAvailable ? "payment-strip payment-strip--google" : "payment-strip payment-strip--google payment-strip--unavailable"}>
                <div className="google-pay-native" ref={googlePayRef} />
                {!googlePayAvailable ? (
                  <>
                    <span className="payment-brand-mark payment-brand-mark--google">G</span>
                    <strong>Google Pay</strong>
                    <small>Supported devices</small>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  )
}
