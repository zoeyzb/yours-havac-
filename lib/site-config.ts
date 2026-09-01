export const siteConfig = {
  brand: {
    name: "Local Heating & Cooling",
    shortName: "LOCAL HEATING & COOLING",
    tagline: "Heating · Cooling · Comfort",
    city: "Local Service Area",
    state: "",
    phoneDisplay: "Call for service",
    phoneHref: "+15555550100",
    email: "service@localhvac.com",
  },
  hero: {
    eyebrow: "4.9★ rated local HVAC service",
    lineOne: "Comfort back.",
    lineTwo: "Without the runaround.",
    body: "Fast heating and cooling help, clear options, and service that treats your home properly.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=88",
  },
  trust: [
    "Fast appointments",
    "Clear options",
    "Trusted technicians",
    "Financing available",
  ],
  stats: [
    { value: "4.9★", label: "Local rating" },
    { value: "5-star", label: "Homeowner reviews" },
    { value: "Fast", label: "Local response" },
    { value: "1 call", label: "To get started" },
  ],
  services: [
    { key: "cooling", title: "AC Repair", copy: "Fast diagnostics and dependable cooling repair when your home stops feeling comfortable." },
    { key: "heating", title: "Heating", copy: "Reliable furnace and heat-pump service for the days you need heat to simply work." },
    { key: "installation", title: "Replacement", copy: "Right-sized system options, clean installation, and no confusing sales pitch." },
    { key: "maintenance", title: "Maintenance", copy: "Seasonal tune-ups that help prevent surprise breakdowns and keep equipment running well." },
  ],
  reviews: [
    { quote: "They explained the problem clearly, showed up when they said they would, and had the house comfortable again the same day.", name: "Sarah M.", location: "Local homeowner" },
    { quote: "No pressure and no mystery pricing. The technician gave us options and the install was cleaner than I expected.", name: "James R.", location: "Local homeowner" },
    { quote: "This is the first HVAC company I have actually saved in my phone. Fast, professional, and easy to deal with.", name: "Nicole T.", location: "Local homeowner" },
  ],
  serviceAreas: ["Fast local response", "Nearby technicians", "Residential HVAC", "Heating & cooling", "Repair & replacement", "Surrounding areas"],
  financing: {
    eyebrow: "Comfort now. Pay over time.",
    heading: "Need a new system? Keep the options simple.",
    body: "Flexible payment options can make a repair or replacement easier to handle.",
    badge: "Financing available",
  },
} as const
