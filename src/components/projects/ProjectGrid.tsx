"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";

const tintGradient: Record<string, string> = {
  lav: "linear-gradient(180deg,rgba(106,98,214,0) 35%,rgba(106,98,214,0.55) 65%,rgba(58,52,140,0.95) 100%)",
  coral: "linear-gradient(180deg,rgba(242,132,143,0) 35%,rgba(242,132,143,0.55) 65%,rgba(150,52,72,0.95) 100%)",
};

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  const [hover, setHover] = useState(-1);

  return (
    <ul className="grid list-none overflow-hidden rounded-[28px] bg-ink-900 p-0 [grid-template-columns:repeat(auto-fit,minmax(min(100%,max(290px,calc(100%/3))),1fr))]">
      {projects.map((p, i) => {
        const open = hover === i;
        return (
          <li key={p.slug} className="relative h-[clamp(440px,40vw,580px)] min-w-0 overflow-hidden">
            <Link
              href={`/projects/${p.slug}`}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(-1)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(-1)}
              aria-label={`${p.title} — view project`}
              className="absolute inset-0 block text-white"
            >
              <Image
                src={p.img}
                alt={p.alt}
                fill
                style={{ objectPosition: p.pos, transform: open ? "scale(1.06)" : "scale(1)" }}
                className="object-cover transition-transform duration-[800ms] ease-out"
              />
              <div aria-hidden="true" className="absolute inset-0 transition-opacity duration-300" style={{ background: tintGradient[p.tint] }} />
              <span
                aria-hidden="true"
                className="absolute -right-[0.07em] -bottom-[0.05em] font-heading text-[clamp(64px,6.6vw,104px)] leading-[0.8] font-extrabold tracking-[-0.03em] text-white [writing-mode:vertical-rl]"
                style={{ transform: "rotate(180deg)" }}
              >
                {p.word}
              </span>
              <div className="absolute bottom-0 left-0 right-[clamp(72px,7vw,110px)] p-[clamp(24px,2.4vw,36px)]">
                <span className="mb-3.5 inline-block rounded-full bg-white px-3.5 py-1.5 font-heading text-xs font-bold tracking-[0.06em] text-brand-700 uppercase">
                  {p.cat}
                </span>
                <h3 className="m-0 font-heading text-[clamp(22px,1.9vw,27px)] font-extrabold leading-tight tracking-[-0.015em] text-white">
                  {p.title}
                </h3>
                {open && (
                  <div className="animate-ff-fade">
                    <p className="mt-3 text-[15.5px] leading-relaxed text-white">{p.summary}</p>
                    {p.amountLabel && (
                      <p className="mt-3 font-heading text-[15px] font-bold text-white">{p.amountLabel}</p>
                    )}
                    <span className="mt-[18px] inline-flex items-center gap-2.5 rounded-full border-2 border-accent-300 bg-white px-[22px] py-3 font-heading text-[15px] font-bold text-ink-900">
                      View Project <span aria-hidden="true">↗</span>
                    </span>
                  </div>
                )}
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
