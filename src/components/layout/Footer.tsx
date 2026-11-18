import Image from "next/image";
import Link from "next/link";
import type { ResolvedSiteSettings } from "@/lib/site-settings";

export default function Footer({ settings }: { settings: ResolvedSiteSettings }) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-ink-900 font-body text-ink-light">
      <Image
        src="/images/symbol.png"
        alt=""
        aria-hidden="true"
        width={420}
        height={420}
        className="pointer-events-none absolute -right-[90px] -bottom-[110px] h-auto w-[420px] opacity-[0.07]"
      />
      <div className="relative mx-auto max-w-[1320px] px-6 pt-24">
        <div className="grid gap-12 pb-[72px] sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div className="max-w-[340px]">
            <Image
              src="/images/logo-white.png"
              alt="Florence Foundation"
              width={220}
              height={64}
              className="mb-6 h-16 w-auto"
            />
            <p className="text-base leading-relaxed text-ink-light">
              Empowering people, feeding hope, and supporting communities through compassionate
              humanitarian action.
            </p>
          </div>

          <nav aria-label="Explore" className="flex flex-col gap-3.5">
            <h2 className="mb-2 font-heading text-[13px] font-bold tracking-[0.12em] text-accent-300 uppercase">
              Explore
            </h2>
            <Link href="/" className="text-base text-white hover:text-brand-200">Home</Link>
            <Link href="/about" className="text-base text-white hover:text-brand-200">About Us</Link>
            <Link href="/projects" className="text-base text-white hover:text-brand-200">Projects</Link>
            <Link href="/gallery" className="text-base text-white hover:text-brand-200">Gallery</Link>
            <Link href="/blog" className="text-base text-white hover:text-brand-200">Blog</Link>
          </nav>

          <nav aria-label="Get involved" className="flex flex-col gap-3.5">
            <h2 className="mb-2 font-heading text-[13px] font-bold tracking-[0.12em] text-accent-300 uppercase">
              Get Involved
            </h2>
            <Link href="/support" className="text-base text-white hover:text-brand-200">Support Us</Link>
            <Link href="/support#donate" className="text-base text-white hover:text-brand-200">Donate</Link>
            <Link href="/support#sponsor" className="text-base text-white hover:text-brand-200">Sponsor a Child</Link>
            <Link href="/contact" className="text-base text-white hover:text-brand-200">Contact Us</Link>
          </nav>

          <div className="flex flex-col gap-3.5">
            <h2 className="mb-2 font-heading text-[13px] font-bold tracking-[0.12em] text-accent-300 uppercase">
              Contact
            </h2>
            <a href={`mailto:${settings.email}`} className="text-base text-white break-words hover:text-brand-200">
              {settings.email}
            </a>
            <span className="text-[15px] text-ink-muted">{settings.phone}</span>
            <a
              href={settings.social.instagram}
              target="_blank"
              rel="noopener"
              aria-label="Florence Foundation on Instagram"
              className="mt-1.5 inline-flex items-center gap-2.5 text-base text-white hover:text-brand-200"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-divider">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <path d="M17.5 6.5h.01" />
                </svg>
              </span>
              @florencefoundationuk
            </a>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-3 border-t border-ink-divider py-8 text-sm text-ink-muted">
          <span>© {year} {settings.name}. All rights reserved.</span>
          <span>{settings.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
