export const siteConfig = {
  brand: {
    name: "Your HVAC Co.",
    shortName: "YOUR HVAC CO.",
    tagline: "Heating · Cooling · Air",
    city: "Your City",
    state: "USA",
    phoneDisplay: "(555) 555-0100",
    phoneHref: "+15555550100",
    email: "hello@yourhvac.com",
  },
  hero: {
    eyebrow: "4.9 rated local HVAC team",
    lineOne: "Perfect air.",
    lineTwo: "Without thinking about it.",
    body: "Heating and cooling service built around the thing that actually matters: getting your home comfortable again, quickly and cleanly.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=88",
  },
  trust: [
    "Same-day appointments",
    "Upfront recommendations",
    "Licensed & insured",
    "Financing available",
  ],
  stats: [
    { value: "4.9★", label: "Average rating" },
    { value: "24/7", label: "Emergency help" },
    { value: "100%", label: "Clear options" },
    { value: "1 call", label: "To get started" },
  ],
  services: [
    { key: "cooling", title: "AC Repair", copy: "Fast diagnostics and dependable cooling repair when your home stops feeling comfortable." },
    { key: "heating", title: "Heating", copy: "Furnace and heat-pump service designed around comfort, efficiency, and reliable winter performance." },
    { key: "installation", title: "Installation", copy: "Right-sized replacement systems with clear options, clean installation, and no confusing sales pitch." },
    { key: "maintenance", title: "Maintenance", copy: "Seasonal tune-ups that help prevent surprise breakdowns and keep equipment running efficiently." },
  ],
  reviews: [
    { quote: "They explained the problem clearly, showed up when they said they would, and had the house comfortable again the same day.", name: "Sarah M.", location: "Local homeowner" },
    { quote: "No pressure and no mystery pricing. The technician gave us options and the install was cleaner than I expected.", name: "James R.", location: "Local homeowner" },
    { quote: "This is the first HVAC company I have actually saved in my phone. Fast, professional, and easy to deal with.", name: "Nicole T.", location: "Local homeowner" },
  ],
  serviceAreas: ["Your City", "Northside", "West End", "Downtown", "Lakeside", "Surrounding areas"],
  financing: {
    eyebrow: "Comfort now. Pay over time.",
    heading: "A new system should not wreck your month.",
    body: "Flexible financing can make repair and replacement decisions easier. Replace this section with the real financing terms for each business.",
    badge: "Financing available",
  },
} as const
