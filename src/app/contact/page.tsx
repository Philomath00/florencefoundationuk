import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import { getSiteSettings } from "@/lib/site-settings";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Florence Foundation to support our initiatives, explore a partnership, donate essential goods, or learn more about our humanitarian work.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <>
      {/* MAP HERO */}
      <section aria-labelledby="c-hero-h" className="relative h-[clamp(460px,44vw,600px)] overflow-hidden bg-brand-50">
        <iframe
          title="Map showing Florence Foundation's sample address in London"
          src="https://www.openstreetmap.org/export/embed.html?bbox=-0.1395%2C51.5075%2C-0.1085%2C51.5195&layer=mapnik&marker=51.5131%2C-0.1257"
          className="absolute inset-0 h-full w-full border-0 [filter:saturate(0.6)_hue-rotate(10deg)]"
          loading="lazy"
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-r from-surface/96 via-surface/75 to-transparent" />
        <div className="relative flex h-full items-center">
          <div className="mx-auto w-full max-w-[1320px] px-6">
            <div className="pointer-events-auto max-w-[560px]">
              <nav aria-label="Breadcrumb" className="mb-6">
                <ol className="flex list-none gap-2.5 p-0 text-sm text-ink-600">
                  <li><Link href="/" className="text-ink-900 hover:text-brand-500">Home</Link></li>
                  <li aria-hidden="true" className="text-accent-500">/</li>
                  <li aria-current="page" className="text-brand-500">Contact Us</li>
                </ol>
              </nav>
              <div className="flex items-center gap-[18px]">
                <span aria-hidden="true" className="flex flex-shrink-0 gap-[7px]">
                  <span className="h-3.5 w-3.5 rounded-full bg-accent-300" />
                  <span className="h-3.5 w-3.5 rounded-full bg-brand-300" />
                </span>
                <h1 id="c-hero-h" className="m-0 font-heading text-[clamp(44px,6vw,88px)] font-extrabold leading-none tracking-[-0.03em] text-ink-900">
                  Contact Us
                </h1>
              </div>
              <p className="mt-5 mb-7 pl-[53px] font-heading text-[clamp(18px,1.6vw,22px)] font-semibold text-ink-900">
                Let&apos;s Work Together to Make a Difference.
              </p>
              <div className="ml-[53px] inline-flex items-start gap-3.5 rounded-2xl bg-white px-5 py-4 shadow-xl">
                <Image src="/images/symbol.png" alt="" aria-hidden="true" width={36} height={36} className="h-9 w-9" />
                <div>
                  <p className="m-0 mb-0.5 font-heading text-[15px] font-extrabold text-ink-900">Florence Foundation</p>
                  <p className="m-0 text-sm leading-snug text-ink-700">{settings.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FORM */}
      <section id="contact-form" aria-labelledby="c-form-h" className="bg-white">
        <div className="mx-auto flex max-w-[1320px] flex-wrap items-start gap-12 px-6 py-[clamp(72px,8vw,112px)] lg:gap-[72px]">
          <div className="min-w-0 flex-[999_1_560px]">
            <p className="mb-4 font-heading text-[13px] font-bold tracking-[0.16em] text-brand-500">GET IN TOUCH</p>
            <h2 id="c-form-h" className="mb-5 font-heading text-[clamp(34px,3.8vw,54px)] font-extrabold leading-[1.08] tracking-[-0.02em] text-ink-900">
              We&apos;d Love to Hear From You.
            </h2>
            <p className="mb-10 max-w-[620px] text-lg leading-[1.7] text-ink-700">
              Whether you would like to support our initiatives, explore a partnership, donate
              essential goods, or learn more about Florence Foundation, we welcome your enquiry.
            </p>
            <Suspense fallback={null}>
              <ContactForm />
            </Suspense>
          </div>

          <aside aria-label="Contact information" className="flex max-w-[440px] flex-1 flex-col gap-4 [flex-basis:320px]">
            <div className="relative overflow-hidden rounded-[28px] bg-ink-900 p-8 text-white">
              <Image src="/images/symbol.png" alt="" aria-hidden="true" width={180} height={180} className="pointer-events-none absolute -right-10 -bottom-10 w-[180px] opacity-[0.08]" />
              <h2 className="relative mb-6 font-heading text-2xl font-extrabold text-white">Contact information</h2>
              <ul className="relative m-0 flex list-none flex-col gap-[22px] p-0">
                <li className="flex items-start gap-4">
                  <span aria-hidden="true" className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-ink-800 text-accent-300">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-10 6L2 7" />
                    </svg>
                  </span>
                  <div>
                    <p className="m-0 mb-0.5 text-[13px] text-ink-muted">Email</p>
                    <a href={`mailto:${settings.email}`} className="font-semibold text-white break-words hover:text-accent-200">{settings.email}</a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span aria-hidden="true" className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-ink-800 text-accent-300">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </span>
                  <div>
                    <p className="m-0 mb-0.5 text-[13px] text-ink-muted">Telephone (sample)</p>
                    <a href={`tel:${settings.phone.replace(/[^+\d]/g, "")}`} className="font-semibold text-white hover:text-accent-200">{settings.phone}</a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span aria-hidden="true" className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-ink-800 text-accent-300">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </span>
                  <div>
                    <p className="m-0 mb-0.5 text-[13px] text-ink-muted">Address (sample)</p>
                    <p className="m-0 font-semibold leading-snug text-white">{settings.address}</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="rounded-[28px] bg-accent-50 px-8 py-7">
              <h2 className="mb-2 font-heading text-xl font-extrabold text-ink-900">Stay Connected with Our Mission.</h2>
              <p className="mb-5 text-[15px] leading-relaxed text-ink-700">Follow our work and community updates.</p>
              <a
                href={settings.social.instagram}
                target="_blank"
                rel="noopener"
                className="flex items-center gap-3.5 rounded-2xl bg-white px-[18px] py-3.5 font-bold text-ink-900 transition hover:-translate-y-0.5 hover:text-brand-500"
              >
                <span aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500 text-white">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <path d="M17.5 6.5h.01" />
                  </svg>
                </span>
                <span className="flex flex-col">
                  <span className="text-[13px] font-medium text-ink-600">Instagram</span>{settings.social.instagramHandle}
                </span>
                <span aria-hidden="true" className="ml-auto">↗</span>
              </a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
