"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight, Check, ChevronDown, Landmark, LockKeyhole } from "lucide-react"

declare global {
  interface Window {
    Stripe?: (key: string) => any
    ApplePaySession?: { canMakePayments?: () => boolean }
  }
}

type IntentMethod = "card" | "cashapp"
type HostedMethod = "bank" | "affirm" | "klarna"
type IntentData = { clientSecret: string; publishableKey: string }

let stripeJsPromise: Promise<void> | null = null

function ensureStripeJs() {
  if (typeof window === "undefined") return Promise.reject(new Error("Stripe requires a browser."))
  if (window.Stripe) return Promise.resolve()
  if (stripeJsPromise) return stripeJsPromise
  stripeJsPromise = new Promise<void>((resolve, reject) => {
    const old = document.querySelector<HTMLScriptElement>('script[src="https://js.stripe.com/v3/"]')
    const s = old ?? document.createElement("script")
    const done = () => window.Stripe ? resolve() : reject(new Error("Stripe.js did not initialize."))
    s.addEventListener("load", done, { once: true })
    s.addEventListener("error", () => reject(new Error("Secure payment could not load.")), { once: true })
    if (!old) { s.src = "https://js.stripe.com/v3/"; s.async = true; document.head.appendChild(s) }
    if (window.Stripe) resolve()
  })
  return stripeJsPromise
}

async function createIntent(method: IntentMethod): Promise<IntentData> {
  const r = await fetch("/api/checkout/intent", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ method }) })
  const p = await r.json().catch(() => null)
  if (!r.ok || !p?.data?.clientSecret || !p?.data?.publishableKey) throw new Error(p?.error?.message || "Secure checkout could not be prepared.")
  return p.data
}

async function createHostedSession(method: HostedMethod) {
  const r = await fetch("/api/checkout/session", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ method }) })
  const p = await r.json().catch(() => null)
  if (!r.ok || !p?.data?.url) throw new Error(p?.error?.message || "That payment option is not available right now.")
  return p.data.url as string
}

const appearance = {
  theme: "stripe" as const,
  variables: { colorPrimary: "#ef6238", colorBackground: "#fffdfa", colorText: "#102630", colorDanger: "#b42318", fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif", borderRadius: "13px", spacingUnit: "5px" },
  rules: { ".Input": { border: "1px solid #d9e0dc" }, ".Input:focus": { border: "1px solid #ef6238", boxShadow: "0 0 0 3px rgba(239,98,56,.10)" }, ".Label": { fontWeight: "800", color: "#314d57" } },
}

export function CheckoutForm() {
  const cardRef = useRef<HTMLDivElement>(null)
  const appleRef = useRef<HTMLDivElement>(null)
  const cashRef = useRef<HTMLDivElement>(null)
  const googleRef = useRef<HTMLDivElement>(null)
  const stripeRef = useRef<any>(null)
  const cardElementsRef = useRef<any>(null)
  const cashElementsRef = useRef<any>(null)
  const googleElementsRef = useRef<any>(null)
  const googleStarted = useRef(false)
  const busyRef = useRef(false)

  const [cardReady, setCardReady] = useState(false)
  const [appleAvailable, setAppleAvailable] = useState<boolean | null>(null)
  const [googleAvailable, setGoogleAvailable] = useState<boolean | null>(null)
  const [cashOpen, setCashOpen] = useState(false)
  const [cashReady, setCashReady] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [moreLoading, setMoreLoading] = useState(false)
  const [hostedBusy, setHostedBusy] = useState<HostedMethod | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    let dead = false
    let card: any = null
    let apple: any = null

    void (async () => {
      try {
        const [, cardIntent] = await Promise.all([
          ensureStripeJs(),
          createIntent("card"),
        ])
        if (dead || !window.Stripe || !cardRef.current) return

        const stripe = window.Stripe(cardIntent.publishableKey)
        stripeRef.current = stripe

        const cardElements = stripe.elements({ clientSecret: cardIntent.clientSecret, appearance })
        cardElementsRef.current = cardElements
        card = cardElements.create("payment", {
          fields: { billingDetails: { address: "never" } },
          wallets: { applePay: "never", googlePay: "never", link: "never" },
          layout: { type: "accordion", defaultCollapsed: false, radios: "never", spacedAccordionItems: false },
          paymentMethodOrder: ["card"],
        })
        card.on("ready", () => !dead && setCardReady(true))
        card.mount(cardRef.current)

        if (!appleRef.current) return

        apple = cardElements.create("expressCheckout", {
          paymentMethods: { applePay: "always", googlePay: "never", link: "never", amazonPay: "never", paypal: "never", klarna: "never" },
          layout: { maxColumns: 1, maxRows: 1, overflow: "never" },
          buttonHeight: 55,
          buttonTheme: { applePay: "black" },
          buttonType: { applePay: "plain" },
          billingAddressRequired: false,
          emailRequired: false,
          phoneNumberRequired: false,
        })

        const syncAppleAvailability = (event: any) => {
          if (dead) return
          const available =
            event?.availablePaymentMethods?.applePay === true ||
            event?.paymentMethods?.applePay?.available === true
          setAppleAvailable(available)
        }
        apple.on("ready", syncAppleAvailability)
        apple.on("availablepaymentmethodschange", syncAppleAvailability)
        apple.on("loaderror", () => !dead && setAppleAvailable(false))
        apple.on("confirm", () => confirm(cardElementsRef.current))
        apple.mount(appleRef.current)
      } catch (e) {
        if (!dead) {
          setAppleAvailable(false)
          setError(e instanceof Error ? e.message : "Secure checkout could not load.")
        }
      }
    })()

    return () => {
      dead = true
      try { card?.unmount?.() } catch {}
      try { apple?.unmount?.() } catch {}
    }
  }, [])

  async function confirm(elements: any) {
    const stripe = stripeRef.current
    if (!stripe || !elements || busyRef.current) return
    busyRef.current = true
    setBusy(true)
    setError("")
    try {
      const s = await elements.submit?.()
      if (s?.error) { setError(s.error.message || "Check your payment details."); return }
      const r = await stripe.confirmPayment({ elements, confirmParams: { return_url: `${window.location.origin}/payment/success` }, redirect: "if_required" })
      if (r?.error) { setError(r.error.message || "Payment could not be completed."); return }
      const pi = r?.paymentIntent
      if (pi?.status === "succeeded" || pi?.status === "processing") window.location.assign(`/payment/success?payment_intent=${encodeURIComponent(pi.id)}`)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Payment could not be completed. Please try again.")
    } finally {
      busyRef.current = false
      setBusy(false)
    }
  }

  async function toggleCash() {
    if (cashOpen) { setCashOpen(false); return }
    setCashOpen(true)
    setError("")
    if (cashElementsRef.current) return
    try {
      await ensureStripeJs()
      const stripe = stripeRef.current
      if (!stripe) throw new Error("Secure checkout is still loading.")
      const { clientSecret } = await createIntent("cashapp")
      const elements = stripe.elements({ clientSecret, appearance: { ...appearance, variables: { ...appearance.variables, colorPrimary: "#00c94a" } } })
      cashElementsRef.current = elements
      const el = elements.create("payment", { wallets: { link: "never" }, layout: { type: "accordion", defaultCollapsed: false, radios: "never", spacedAccordionItems: false }, paymentMethodOrder: ["cashapp"] })
      el.on("ready", () => setCashReady(true))
      el.mount(cashRef.current!)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Cash App Pay could not load.")
      setCashOpen(false)
    }
  }

  async function initGoogle() {
    if (googleStarted.current || !googleRef.current) return
    googleStarted.current = true
    try {
      await ensureStripeJs()
      const stripe = stripeRef.current
      if (!stripe) throw new Error("Secure checkout is still loading.")
      const { clientSecret } = await createIntent("card")
      const elements = stripe.elements({ clientSecret, appearance })
      googleElementsRef.current = elements
      const el = elements.create("expressCheckout", {
        paymentMethods: { applePay: "never", googlePay: "always", link: "never", amazonPay: "never", paypal: "never", klarna: "never" },
        layout: { maxColumns: 1, maxRows: 1, overflow: "never" },
        buttonHeight: 46,
        buttonTheme: { googlePay: "black" },
        buttonType: { googlePay: "pay" },
        billingAddressRequired: false,
        emailRequired: false,
        phoneNumberRequired: false,
      })
      el.on("ready", (event: any) => setGoogleAvailable(event?.availablePaymentMethods?.googlePay === true))
      el.on("availablepaymentmethodschange", (event: any) => setGoogleAvailable(event?.paymentMethods?.googlePay?.available === true))
      el.on("confirm", () => confirm(googleElementsRef.current))
      el.mount(googleRef.current)
    } catch {
      setGoogleAvailable(false)
    }
  }

  async function toggleMore() {
    const next = !moreOpen
    setMoreOpen(next)
    setError("")
    if (next && !googleStarted.current) {
      setMoreLoading(true)
      await initGoogle()
      setMoreLoading(false)
    }
  }

  async function hosted(method: HostedMethod) {
    if (hostedBusy) return
    setHostedBusy(method)
    setError("")
    try { window.location.assign(await createHostedSession(method)) }
    catch (e) {
      setError(e instanceof Error ? e.message : "That payment option is not available right now.")
      setHostedBusy(null)
    }
  }

  return <div className="checkout-payment-card">
    <div className="fast-pay-grid">
      <div className={`fast-pay-apple fast-pay-wallet${appleAvailable === true ? " fast-pay-wallet--available" : ""}`}>
        <div className="native-wallet-mount native-wallet-mount--visible" ref={appleRef} />
        {appleAvailable === false ? (
          <div className="apple-pay-unavailable" aria-live="polite">
            <span className="apple-pay-brand"><b></b> Pay</span>
            <small>Apple Pay unavailable</small>
          </div>
        ) : null}
        {appleAvailable === null ? (
          <div className="apple-pay-unavailable" aria-live="polite">
            <span className="apple-pay-brand"><b></b> Pay</span>
            <small>Loading Apple Pay…</small>
          </div>
        ) : null}
      </div>

      <button type="button" className={cashOpen ? "cashapp-fast-button cashapp-fast-button--active" : "cashapp-fast-button"} onClick={toggleCash} aria-expanded={cashOpen}>
        <span className="cashapp-mark">$</span><span>Cash App Pay</span>{cashOpen ? <Check size={16} /> : <ArrowRight size={16} />}
      </button>
    </div>

    {cashOpen ? <div className="cashapp-panel"><div ref={cashRef} /><button type="button" disabled={!cashReady || busy} className="cashapp-confirm" onClick={() => confirm(cashElementsRef.current)}>{busy ? "Processing…" : "Continue with Cash App Pay"}</button></div> : null}

    <form className="selected-payment-form selected-payment-form--card" onSubmit={e => { e.preventDefault(); void confirm(cardElementsRef.current) }}>
      <div className="card-payment-heading"><span>CARD</span><strong>Enter card details</strong></div>
      <div className="site-payment-element-wrap">{!cardReady && !error ? <div className="site-payment-loading">Preparing secure card payment…</div> : null}<div ref={cardRef} /></div>
      {error ? <p className="site-payment-error" role="alert">{error}</p> : null}
      <button type="submit" disabled={busy || !cardReady} className="site-payment-submit"><LockKeyhole size={16} /><span>{busy ? "Processing…" : "Pay $97"}</span>{!busy ? <ArrowRight size={17} /> : null}</button>
      <div className="site-payment-security"><LockKeyhole size={14} /><span>Secure payment powered by Stripe</span></div>
    </form>

    <button type="button" className={moreOpen ? "more-payment-toggle more-payment-toggle--open" : "more-payment-toggle"} onClick={toggleMore} aria-expanded={moreOpen}><span>More payment options</span><ChevronDown size={16} /></button>

    {moreOpen ? <div className="more-payment-panel more-payment-panel--strips">
      {moreLoading ? <div className="more-payment-loading">Checking Google Pay…</div> : null}
      <div className="payment-strip-list">
        <button type="button" className="payment-strip" disabled={hostedBusy !== null} onClick={() => hosted("bank")}><Landmark size={17} /><strong>{hostedBusy === "bank" ? "Opening…" : "Bank transfer"}</strong><ArrowRight size={15} /></button>
        <button type="button" className="payment-strip" disabled={hostedBusy !== null} onClick={() => hosted("affirm")}><span className="payment-brand-mark payment-brand-mark--affirm">a</span><strong>{hostedBusy === "affirm" ? "Opening…" : "Affirm"}</strong><ArrowRight size={15} /></button>
        <button type="button" className="payment-strip" disabled={hostedBusy !== null} onClick={() => hosted("klarna")}><span className="payment-brand-mark payment-brand-mark--klarna">K</span><strong>{hostedBusy === "klarna" ? "Opening…" : "Klarna"}</strong><ArrowRight size={15} /></button>
        <div className={googleAvailable ? "payment-strip payment-strip--google" : "payment-strip payment-strip--google payment-strip--unavailable"}>
          <div className="google-pay-native google-pay-native--visible" ref={googleRef} />
          {googleAvailable === false ? <><span className="payment-brand-mark payment-brand-mark--google">G</span><strong>Google Pay</strong><small>Unavailable on this device</small></> : null}
          {googleAvailable === null && !moreLoading ? <><span className="payment-brand-mark payment-brand-mark--google">G</span><strong>Google Pay</strong><small>Checking availability…</small></> : null}
        </div>
      </div>
    </div> : null}
  </div>
}
