// Site-wide configuration and fallback content.
// Fields marked PLACEHOLDER were sample data in the design export and must be
// confirmed with Florence Foundation and/or moved into Website Settings in /admin
// before launch.

export const siteConfig = {
  name: "Florence Foundation",
  tagline: "We Empower People, We Feed People, We Give Hope to People.",
  url: "https://www.florencefoundation.co.uk",
  defaultTitle: "Florence Foundation — We Empower People, We Feed People, We Give Hope to People",
  defaultDescription:
    "Florence Foundation is a UK and Nigeria based charity providing food aid, clean water, healthcare, education, child sponsorship and women's empowerment programmes across Africa.",
  keywords: [
    "Florence Foundation",
    "humanitarian aid charity UK",
    "poverty alleviation Nigeria",
    "food aid charity",
    "clean water charity Africa",
    "child sponsorship charity",
    "women's empowerment charity",
    "education charity Nigeria",
    "healthcare charity Africa",
    "charitable giving UK",
  ],
  ogImage: "/images/og-image.jpg",
  email: "info@florencefoundation.co.uk",
  // PLACEHOLDER — sample data from the design export, not yet confirmed.
  phone: "+44 (0)20 0000 0000",
  // PLACEHOLDER — sample address from the design export, not yet confirmed.
  address: "20 Long Acre, Covent Garden, London WC2E 9LY, United Kingdom",
  social: {
    instagram: "https://instagram.com/florencefoundationuk",
  },
} as const;

// PLACEHOLDER — sample bank details from the design export. Must be replaced
// with Florence Foundation's verified banking information before launch.
// This will move into Website Settings (/admin) once Supabase is connected.
export const bankAccounts = [
  {
    key: "uk",
    region: "UNITED KINGDOM",
    country: "UK Account",
    currency: "GBP £",
    rows: [
      ["Account name", "Florence Foundation"],
      ["Bank name", "Barclays Bank UK PLC"],
      ["Sort code", "20-45-77"],
      ["Account number", "43218765"],
      ["IBAN", "GB82 BARC 2045 7743 2187 65"],
      ["SWIFT / BIC", "BARCGB22"],
    ],
  },
  {
    key: "ng",
    region: "NIGERIA",
    country: "Nigeria Account",
    currency: "NGN ₦",
    rows: [
      ["Account name", "Florence Foundation"],
      ["Bank name", "Zenith Bank Plc"],
      ["Account number", "1013579246"],
      ["Account type", "Current"],
      ["SWIFT / BIC", "ZEIBNGLA"],
    ],
  },
] as const;

// "Blog" is intentionally not in the public nav (matches the approved
// design, which has no Blog item) — the /blog pages and admin CMS still
// work, just not linked from the header/footer until you want it live.
export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Gallery", href: "/gallery" },
  { label: "Support Us", href: "/support" },
  { label: "Contact Us", href: "/contact" },
] as const;
