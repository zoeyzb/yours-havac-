"use client"

import Script from "next/script"
import { useEffect, useRef, useState } from "react"
import { ArrowRight, Check, LockKeyhole } from "lucide-react"

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

async function createIntent(method: "card" | "cashapp") {
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

export function CheckoutForm() {
  const cardRef = useRef<HTMLDivElement>(null)
  const expressRef = useRef<HTMLDivElement>(null)
  const cashAppRef = useRef<HTMLDivElement>(null)

  const stripeRef = useRef<any>(null)
  const cardElementsRef = useRef<any>(null)
  const cashAppElementsRef = useRef<any>(null)
  const busyRef = useRef(false)

  const [scriptReady, setScriptReady] = useState(false)
  const [cardReady, setCardReady] = useState(false)
  const [applePayAvailable, setApplePayAvailable] = useState(false)
  const [cashAppOpen, setCashAppOpen] = useState(false)
  const [cashAppReady, setCashAppReady] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!scriptReady || !window.Stripe || !cardRef.current) return

    let cancelled = false
    let cardElement: any = null
    let expressElement: any = null

    void (async () => {
      try {
        setError("")
        const { clientSecret, publishableKey } = await createIntent("card")
        const stripe = window.Stripe?.(publishableKey)
        if (!stripe || cancelled) return

        stripeRef.current = stripe

        const elements = stripe.elements({
          clientSecret,
          appearance: {
            theme: "stripe",
            variables: {
              colorPrimary: "#ef6238",
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
                boxShadow: "0 8px 24px rgba(16,38,48,.035)",
              },
              ".Input:focus": {
                border: "1px solid #ef6238",
                boxShadow: "0 0 0 3px rgba(239,98,56,.10)",
              },
              ".Label": {
                fontWeight: "800",
                color: "#38535d",
              },
            },
          },
        })

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
          defaultValues: {
            billingDetails: {
              address: { country: "US" },
            },
          },
        })

        cardElement.on("ready", () => {
          if (!cancelled) setCardReady(true)
        })
        cardElement.mount(cardRef.current)

        if (expressRef.current) {
          try {
            expressElement = elements.create("expressCheckout", {
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
              buttonType: { applePay: "buy" },
              billingAddressRequired: false,
              emailRequired: false,
              phoneNumberRequired: false,
            })

            expressElement.on("ready", (event: any) => {
              if (cancelled) return
              const methods = event?.availablePaymentMethods || event?.available_payment_methods
              setApplePayAvailable(Boolean(methods?.applePay || methods?.apple_pay))
            })

            expressElement.on("availablepaymentmethodschange", (event: any) => {
              if (cancelled) return
              const methods = event?.availablePaymentMethods || event?.available_payment_methods
              setApplePayAvailable(Boolean(methods?.applePay || methods?.apple_pay))
            })

            expressElement.on("confirm", async () => {
              await confirmCardPayment()
            })

            expressElement.mount(expressRef.current)
          } catch {
            // Fast-pay wallets are optional. Never let a wallet-rendering issue block card checkout.
            setApplePayAvailable(false)
          }
        }
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Secure checkout could not load.")
      }
    })()

    async function confirmCardPayment() {
      const stripe = stripeRef.current
      const elements = cardElementsRef.current
      if (!stripe || !elements || busyRef.current) return

      busyRef.current = true
      setBusy(true)
      setError("")

      try {
        const submitResult = await elements.submit?.()
        if (submitResult?.error) {
          setError(submitResult.error.message || "Check your payment details.")
          busyRef.current = false
          setBusy(false)
          return
        }

        const result = await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: `${window.location.origin}/payment/success`,
            payment_method_data: {
              billing_details: {
                address: { country: "US" },
              },
            },
          },
          redirect: "if_required",
        })

        if (result?.error) {
          setError(result.error.message || "Payment could not be completed.")
          busyRef.current = false
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

    ;(window as any).__websiteConfirmCard = confirmCardPayment

    return () => {
      cancelled = true
      try { cardElement?.unmount?.() } catch {}
      try { expressElement?.unmount?.() } catch {}
      delete (window as any).__websiteConfirmCard
    }
  }, [scriptReady])

  async function openCashApp() {
    if (cashAppOpen) return
    setCashAppOpen(true)
    setError("")

    try {
      const stripe = stripeRef.current
      if (!stripe) throw new Error("Secure checkout is still loading.")
      const { clientSecret } = await createIntent("cashapp")

      const elements = stripe.elements({
        clientSecret,
        appearance: {
          theme: "stripe",
          variables: {
            colorPrimary: "#00d64f",
            colorBackground: "#ffffff",
            colorText: "#102630",
            colorDanger: "#b42318",
            fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
            borderRadius: "14px",
          },
        },
      })

      cashAppElementsRef.current = elements

      const paymentElement = elements.create("payment", {
        fields: { billingDetails: "never" },
        wallets: { link: "never" },
        layout: {
          type: "accordion",
          defaultCollapsed: false,
          radios: false,
          spacedAccordionItems: false,
        },
        paymentMethodOrder: ["cashapp"],
        defaultValues: {
          billingDetails: {
            address: { country: "US" },
          },
        },
      })

      paymentElement.on("ready", () => setCashAppReady(true))
      paymentElement.mount(cashAppRef.current!)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Cash App Pay could not load.")
      setCashAppOpen(false)
    }
  }

  async function confirmCashAppPayment() {
    const stripe = stripeRef.current
    const elements = cashAppElementsRef.current
    if (!stripe || !elements || !cashAppReady || busyRef.current) return

    busyRef.current = true
    setBusy(true)
    setError("")

    try {
      const submitResult = await elements.submit?.()
      if (submitResult?.error) {
        setError(submitResult.error.message || "Check your Cash App Pay details.")
        busyRef.current = false
        setBusy(false)
        return
      }

      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment/success`,
          payment_method_data: {
            billing_details: {
              address: { country: "US" },
            },
          },
        },
        redirect: "if_required",
      })

      if (result?.error) {
        setError(result.error.message || "Cash App Pay could not be completed.")
        busyRef.current = false
        setBusy(false)
        return
      }

      const intent = result?.paymentIntent
      if (intent?.status === "succeeded" || intent?.status === "processing" || intent?.status === "requires_action") {
        if (intent?.status !== "requires_action") {
          window.location.assign(`/payment/success?payment_intent=${encodeURIComponent(intent.id)}`)
        }
        return
      }

      busyRef.current = false
      setBusy(false)
    } catch {
      setError("Cash App Pay could not be completed. Please try again.")
      busyRef.current = false
      setBusy(false)
    }
  }

  async function submitCard(event: React.FormEvent) {
    event.preventDefault()
    const fn = (window as any).__websiteConfirmCard
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

      <div className="fast-pay-block">
        <div className="fast-pay-label">FAST PAY</div>
        <div className={applePayAvailable ? "fast-pay-grid" : "fast-pay-grid fast-pay-grid--single"}>
          <div className={applePayAvailable ? "fast-pay-apple fast-pay-wallet" : "fast-pay-apple fast-pay-wallet fast-pay-apple--hidden"}>
            <div ref={expressRef} />
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
              onClick={confirmCashAppPayment}
            >
              {busy ? "Processing…" : "Continue with Cash App Pay"}
            </button>
          </div>
        ) : null}
      </div>

      <div className="site-or"><span>or pay by card</span></div>

      <form className="site-payment-form" onSubmit={submitCard}>
        <div className="card-payment-heading">
          <div>
            <span>CARD</span>
            <strong>Enter card details</strong>
          </div>
        </div>

        <div className="site-payment-element-wrap">
          {!cardReady && !error ? <div className="site-payment-loading">Preparing secure card payment…</div> : null}
          <div ref={cardRef} />
        </div>

        {error ? <p className="site-payment-error" role="alert">{error}</p> : null}

        <button type="submit" disabled={!cardReady || busy} className="site-payment-submit">
          <span>{busy ? "Processing…" : "Pay $97"}</span>
          {!busy ? <ArrowRight size={17} /> : null}
        </button>

        <div className="site-payment-security">
          <LockKeyhole size={14} />
          <span>Secure payment powered by Stripe</span>
        </div>
      </form>
    </>
  )
}
