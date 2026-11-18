"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export type HeroImage = { id: string; image_url: string; alt: string };

const AUTO_ADVANCE_MS = 6000;
const DEFAULT_IMAGE: HeroImage = {
  id: "default",
  image_url: "/images/hero-beads.png",
  alt: "An older woman wearing layered, colourful beaded necklaces looks towards the camera",
};

/**
 * Right-hand image panel of the homepage hero. Purely a rotating image —
 * the left-side heading, copy and buttons are static design content and
 * never change per slide.
 */
export default function HeroImageSlider({ images }: { images: HeroImage[] }) {
  const slides = images.length > 0 ? images : [DEFAULT_IMAGE];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % slides.length), AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative min-h-[clamp(440px,52vw,780px)]">
      {slides.map((slide, i) => (
        <Image
          key={slide.id}
          src={slide.image_url}
          alt={slide.alt}
          fill
          priority={i === 0}
          unoptimized={slide.image_url.startsWith("http")}
          style={i === index ? { objectPosition: "46% 25%" } : undefined}
          className={`rounded-bl-[clamp(80px,12vw,220px)] object-cover transition-opacity duration-700 ${
            i === index ? "opacity-100" : "pointer-events-none absolute inset-0 opacity-0"
          }`}
        />
      ))}
      {slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2" role="tablist" aria-label="Hero images">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show image ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-white" : "w-2 bg-white/50"}`}
            />
          ))}
        </div>
      )}
      <div className="absolute bottom-4 left-4 flex max-w-[320px] items-start gap-3.5 rounded-2xl bg-white p-5 shadow-xl sm:bottom-10 sm:left-10">
        <Image src="/images/symbol.png" alt="" aria-hidden="true" width={40} height={40} className="h-10 w-10 flex-shrink-0" />
        <p className="m-0 text-sm leading-relaxed text-ink-700">
          Working with communities across the <strong className="text-ink-900">United Kingdom, Nigeria</strong> and
          the wider <strong className="text-ink-900">African continent</strong>.
        </p>
      </div>
    </div>
  );
}
