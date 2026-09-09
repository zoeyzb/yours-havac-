import { NextResponse } from "next/server"

export function GET() {
  return NextResponse.json({
    secret: Boolean(process.env.STRIPE_SECRET_KEY),
    publishable: Boolean(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY),
  })
}
