import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { siteConfig } from "@/content/site";

export default function PageHero({
  image,
  imageAlt,
  imagePos = "50% 35%",
  watermark,
  crumbs,
  title,
  subtitle,
  gradient = "linear-gradient(90deg,rgba(36,34,44,0.82) 0%,rgba(36,34,44,0.45) 48%,rgba(106,98,214,0.5) 100%)",
  extra,
}: {
  image: string;
  imageAlt: string;
  imagePos?: string;
  watermark: string;
  crumbs: { label: string; href?: string }[];
  title: string;
  subtitle?: string;
  gradient?: string;
  extra?: ReactNode;
}) {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${siteConfig.url}${c.href}` } : {}),
    })),
  };

  return (
    <section
      aria-labelledby="page-hero-h"
      className="relative flex min-h-[clamp(380px,38vw,560px)] items-center overflow-hidden bg-ink-900"
    >
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        style={{ objectPosition: imagePos }}
        className="object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0" style={{ background: gradient }} />
      <span
        aria-hidden="true"
        className="absolute -right-[0.08em] -bottom-[0.06em] font-heading text-[clamp(80px,11vw,170px)] leading-[0.8] font-extrabold tracking-[-0.03em] text-white [writing-mode:vertical-rl]"
        style={{ transform: "rotate(180deg)" }}
      >
        {watermark}
      </span>
      <div className="relative w-full max-w-[1320px] mx-auto px-6 py-[72px]">
        <nav aria-label="Breadcrumb" className="mb-7">
          <ol className="flex flex-wrap items-center gap-2.5 text-sm text-ink-faint">
            {crumbs.map((c, i) => (
              <li key={c.label} className="flex items-center gap-2.5">
                {i > 0 && <span aria-hidden="true" className="text-accent-300">/</span>}
                {c.href ? (
                  <Link href={c.href} className="text-white hover:text-accent-200">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-accent-200">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <div className="flex items-start gap-5">
          <span aria-hidden="true" className="mt-2 flex flex-shrink-0 gap-[7px]">
            <span className="h-3.5 w-3.5 rounded-full bg-accent-300" />
            <span className="h-3.5 w-3.5 rounded-full bg-brand-300" />
          </span>
          <h1
            id="page-hero-h"
            className="m-0 max-w-[960px] font-heading text-[clamp(44px,6.4vw,96px)] font-extrabold leading-[1.02] tracking-[-0.03em] text-white"
          >
            {title}
          </h1>
        </div>
        {subtitle && (
          <p className="mt-6 pl-[55px] font-heading text-[clamp(18px,1.6vw,22px)] font-semibold text-white">
            {subtitle}
          </p>
        )}
        {extra}
      </div>
    </section>
  );
}
