import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/checkout",
        has: [{ type: "host", value: "yours-havac.vercel.app" }],
        destination: "https://ready.recoverrevenue.company/checkout",
        permanent: false,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
}

export default nextConfig
