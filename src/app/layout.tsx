import type { Metadata } from "next";
import { DM_Sans, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { siteConfig } from "@/content/site";
import { getSiteSettings } from "@/lib/site-settings";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return {
    metadataBase: new URL(settings.url),
    title: {
      default: settings.defaultTitle,
      template: `%s — ${settings.name}`,
    },
    description: settings.defaultDescription,
    keywords: [...siteConfig.keywords],
    openGraph: {
      type: "website",
      locale: "en_GB",
      url: settings.url,
      siteName: settings.name,
      title: settings.defaultTitle,
      description: settings.defaultDescription,
      images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: settings.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: settings.defaultTitle,
      description: settings.defaultDescription,
      images: [siteConfig.ogImage],
    },
    icons: {
      icon: "/images/symbol.png",
    },
    // Only the production deployment should ever be indexed — preview and
    // local builds get noindex so they never compete with the real domain.
    robots:
      process.env.VERCEL_ENV === "production"
        ? { index: true, follow: true }
        : { index: false, follow: false },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: settings.name,
    url: settings.url,
    logo: `${settings.url}/images/logo-color.png`,
    description: settings.defaultDescription,
    email: settings.email,
    sameAs: [settings.social.instagram],
    areaServed: ["United Kingdom", "Nigeria"],
    slogan: settings.tagline,
  };

  return (
    <html lang="en" className={`${plusJakarta.variable} ${dmSans.variable}`}>
      <body className="flex min-h-screen flex-col bg-white font-body text-ink-900 antialiased">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-brand-500 focus:px-6 focus:py-3 focus:text-white"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer settings={settings} />
      </body>
    </html>
  );
}
