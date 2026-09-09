"use client"

import Script from "next/script"
import { useEffect, useRef, useState } from "react"
import { ArrowRight, Check, ChevronDown, LockKeyhole } from "lucide-react"

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

type IntentMethod = "card" | "cashapp" | "bnpl"

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
  const bnplRef = useRef<HTMLDivElement>(null)

  const stripeRef = useRef<any>(null)
  const cardElementsRef = useRef<any>(null)
  const cashAppElementsRef = useRef<any>(null)
  const moreElementsRef = useRef<any>(null)
  const bnplElementsRef = useRef<any>(null)
  const busyRef = useRef(false)

  const [scriptReady, setScriptReady] = useState(false)
  const [cardReady, setCardReady] = useState(false)
  const [applePayAvailable, setApplePayAvailable] = useState(false)
  const [cashAppOpen, setCashAppOpen] = useState(false)
  const [cashAppReady, setCashAppReady] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [moreLoading, setMoreLoading] = useState(false)
  const [bnplReady, setBnplReady] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!scriptReady || !window.Stripe || !cardRef.current) return

    let cancelled = false
    let cardElement: any = null
    let applePayElement: any = null

    void (async () => {
      try {
        setError("")
        const { clientSecret, publishableKey } = await createIntent("card")
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
            applePayElement.on("confirm", async () => confirmPayment(cardElementsRef.current, "card"))
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

  async function confirmPayment(elements: any, kind: IntentMethod) {
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
          ...(kind !== "bnpl" ? {
            payment_method_data: {
              billing_details: { address: { country: "US" } },
            },
          } : {}),
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

  async function toggleMoreOptions() {
    const nextOpen = !moreOpen
    setMoreOpen(nextOpen)
    setError("")

    if (!nextOpen || moreLoading || bnplElementsRef.current) return

    setMoreLoading(true)
    try {
      const stripe = stripeRef.current
      if (!stripe) throw new Error("Secure checkout is still loading.")

      const [{ clientSecret: cardClientSecret }, { clientSecret: bnplClientSecret }] = await Promise.all([
        createIntent("card"),
        createIntent("bnpl"),
      ])

      const moreElements = stripe.elements({ clientSecret: cardClientSecret, appearance })
      moreElementsRef.current = moreElements

      if (googlePayRef.current) {
        try {
          const googlePayElement = moreElements.create("expressCheckout", {
            paymentMethods: {
              applePay: "never",
              googlePay: "always",
              link: "never",
              amazonPay: "never",
              paypal: "never",
              klarna: "never",
            },
            layout: { maxColumns: 1, maxRows: 1, overflow: "never" },
            buttonHeight: 48,
            buttonTheme: { googlePay: "black" },
            billingAddressRequired: false,
            emailRequired: false,
            phoneNumberRequired: false,
          })
          googlePayElement.on("confirm", async () => confirmPayment(moreElementsRef.current, "card"))
          googlePayElement.mount(googlePayRef.current)
        } catch {
          // Google Pay only appears when Stripe and the browser support it.
        }
      }

      const bnplElements = stripe.elements({ clientSecret: bnplClientSecret, appearance })
      bnplElementsRef.current = bnplElements

      const bnplElement = bnplElements.create("payment", {
        layout: {
          type: "accordion",
          defaultCollapsed: true,
          radios: false,
          spacedAccordionItems: false,
        },
        paymentMethodOrder: ["affirm", "klarna"],
      })

      bnplElement.on("ready", () => setBnplReady(true))
      bnplElement.mount(bnplRef.current!)
    } catch (err) {
      setError(err instanceof Error ? err.message : "More payment options are not available right now.")
    } finally {
      setMoreLoading(false)
    }
  }

  async function submitCard(event: React.FormEvent) {
    event.preventDefault()
    await confirmPayment(cardElementsRef.current, "card")
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
              onClick={() => confirmPayment(cashAppElementsRef.current, "cashapp")}
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
          <div className="more-payment-panel more-payment-panel--direct">
            {moreLoading ? <div className="more-payment-loading">Loading payment options…</div> : null}
            <div className="more-google-pay" ref={googlePayRef} />
            <div className="bnpl-direct" ref={bnplRef} />
            {bnplReady ? (
              <button
                type="button"
                disabled={busy}
                className="bnpl-confirm bnpl-confirm--direct"
                onClick={() => confirmPayment(bnplElementsRef.current, "bnpl")}
              >
                {busy ? "Processing…" : "Continue"}
                {!busy ? <ArrowRight size={16} /> : null}
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
    </>
  )
}
