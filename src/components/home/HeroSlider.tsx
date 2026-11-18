"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export type Slide = {
  id: string;
  image_url: string;
  headline: string;
  description: string | null;
  cta_label: string | null;
  cta_href: string | null;
};

const AUTO_ADVANCE_MS = 7000;

export default function HeroSlider({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef(0);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (paused || reducedMotion.current || slides.length <= 1) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % slides.length), AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [paused, slides.length]);

  if (slides.length === 0) return null;

  const step = (d: 1 | -1) => setIndex((i) => (i + d + slides.length) % slides.length);
  const slide = slides[index];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured stories"
      className="relative overflow-hidden bg-surface"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="grid items-stretch [grid-template-columns:repeat(auto-fit,minmax(min(100%,540px),1fr))]"
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
        }}
      >
        <div className="relative z-10 flex flex-col justify-center px-6 py-[clamp(56px,7vw,112px)] lg:pl-[max(24px,calc((100vw-1320px)/2+24px))]">
          <div className="mb-7 flex items-center gap-3">
            <span aria-hidden="true" className="flex items-center gap-[5px]">
              <span className="h-[7px] w-[7px] rounded-full bg-accent-200" />
              <span className="h-[9px] w-[9px] rounded-full bg-accent-300" />
              <span className="h-3 w-3 rounded-full bg-accent-500" />
            </span>
            <span className="font-heading text-[13px] font-bold tracking-[0.16em] text-brand-500">
              FLORENCE FOUNDATION
            </span>
          </div>
          <h1
            aria-live="polite"
            className="m-0 font-heading text-[clamp(38px,5vw,72px)] font-extrabold leading-[1.05] tracking-[-0.025em] text-ink-900"
          >
            {slide.headline}
          </h1>
          {slide.description && (
            <p className="mt-7 max-w-[520px] text-[clamp(17px,1.3vw,19px)] leading-[1.65] text-ink-700">
              {slide.description}
            </p>
          )}
          {slide.cta_label && slide.cta_href && (
            <div className="mt-10">
              <Link
                href={slide.cta_href}
                className="inline-flex items-center gap-3 rounded-full bg-brand-500 px-[30px] py-[18px] font-heading text-base font-bold text-white transition hover:-translate-y-0.5 hover:bg-brand-600"
              >
                {slide.cta_label} <span aria-hidden="true">→</span>
              </Link>
            </div>
          )}

          {slides.length > 1 && (
            <div className="mt-10 flex items-center gap-4">
              <div className="flex gap-2" role="tablist" aria-label="Slides">
                {slides.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`Go to slide ${i + 1}`}
                    onClick={() => setIndex(i)}
                    className={`h-2.5 rounded-full transition-all ${i === index ? "w-7 bg-brand-500" : "w-2.5 bg-border-2"}`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? "Resume autoplay" : "Pause autoplay"}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border-2 text-ink-700 hover:bg-white"
              >
                {paused ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h4v14H6zM14 5h4v14h-4z" /></svg>
                )}
              </button>
            </div>
          )}
        </div>
        <div className="relative min-h-[clamp(360px,46vw,620px)]">
          {slides.map((s, i) => (
            <Image
              key={s.id}
              src={s.image_url}
              alt=""
              fill
              priority={i === 0}
              unoptimized
              className={`rounded-bl-[clamp(60px,10vw,180px)] object-cover transition-opacity duration-700 ${
                i === index ? "opacity-100" : "pointer-events-none absolute inset-0 opacity-0"
              }`}
            />
          ))}
          {slides.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous slide"
                className="absolute top-1/2 left-4 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-ink-900 hover:bg-white"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m15 18-6-6 6-6" /></svg>
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next slide"
                className="absolute top-1/2 right-4 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-ink-900 hover:bg-white"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m9 18 6-6-6-6" /></svg>
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
