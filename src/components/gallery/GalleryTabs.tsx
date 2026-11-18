"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { GalleryAlbum } from "@/content/gallery";

export default function GalleryTabs({ albums }: { albums: GalleryAlbum[] }) {
  const [tab, setTab] = useState(0);
  const [lb, setLb] = useState(-1);
  const [zoom, setZoom] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef(0);

  const album = albums[tab] ?? albums[0];
  const items = album?.items ?? [];
  const n = items.length;

  useEffect(() => {
    try {
      const year = new URLSearchParams(window.location.search).get("year");
      const i = albums.findIndex((a) => a.year === year);
      if (i > -1) setTab(i);
    } catch {
      /* noop */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (lb < 0) return;
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => closeRef.current?.focus(), 30);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLb();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lb]);

  const openLb = (i: number) => {
    setZoom(false);
    setLb(i);
  };
  const closeLb = () => setLb(-1);
  const step = (d: 1 | -1) => setLb((i) => (i + d + n) % n);

  const onTabKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = e.key === "ArrowRight" ? (i + 1) % albums.length : (i - 1 + albums.length) % albums.length;
    setTab(next);
    document.getElementById(`tab-${albums[next].year}`)?.focus();
  };

  return (
    <>
      <div role="tablist" aria-label="Gallery years" className="mb-8 flex flex-wrap gap-2.5 border-b-2 border-ink-900 pb-6">
        {albums.map((a, i) => {
          const active = i === tab;
          return (
            <button
              key={a.year}
              type="button"
              role="tab"
              aria-selected={active}
              tabIndex={active ? 0 : -1}
              id={`tab-${a.year}`}
              onClick={() => setTab(i)}
              onKeyDown={(e) => onTabKey(e, i)}
              className={`flex min-h-[52px] items-center gap-3 rounded-full border-2 px-6 font-heading text-lg font-extrabold transition-colors ${
                active
                  ? "border-brand-500 bg-brand-500 text-white"
                  : "border-border-2 bg-white text-ink-900 hover:border-brand-300 hover:bg-brand-50"
              }`}
            >
              {a.year}
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${active ? "bg-white text-brand-700" : "bg-brand-50 text-brand-700"}`}>
                {a.items.length}
              </span>
            </button>
          );
        })}
      </div>

      <div role="tabpanel" aria-labelledby={`tab-${album?.year}`}>
        <div className="mb-7 flex flex-wrap items-baseline justify-between gap-2 sm:gap-6">
          <h3 className="m-0 font-heading text-[clamp(24px,2.2vw,32px)] font-extrabold tracking-[-0.015em] text-ink-900">
            {album?.year} · {album?.title}
          </h3>
          <span className="text-[15px] text-ink-600">
            {n} {n === 1 ? "photo" : "photos"}
          </span>
        </div>
        <div className="[column-gap:18px] [columns:1_300px] sm:[columns:2_300px] lg:[columns:3_300px]">
          {items.map((g, i) => (
            <button
              key={g.src}
              type="button"
              onClick={() => openLb(i)}
              aria-label={`Open photo ${i + 1} of ${n}: ${g.alt}`}
              className="mb-[18px] block w-full [break-inside:avoid] overflow-hidden rounded-[20px] border-0 bg-surface-alt p-0 transition hover:-translate-y-1 hover:shadow-lg"
              style={{ cursor: "zoom-in" }}
            >
              <Image
                src={g.src}
                alt={g.alt}
                width={600}
                height={450}
                loading="lazy"
                style={{ aspectRatio: g.ratio.replace("/", " / ") }}
                className="block w-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {lb >= 0 && items[lb] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onTouchStart={(e) => {
            touchX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
          }}
          className="animate-ff-fade fixed inset-0 z-[200] flex flex-col bg-ink-900/[0.96]"
        >
          <div className="flex items-center justify-between gap-4 px-5 py-4 text-white">
            <span className="font-heading text-[15px] font-bold">
              {album.year} · {lb + 1} / {n}
            </span>
            <button
              type="button"
              ref={closeRef}
              onClick={closeLb}
              aria-label="Close image viewer"
              className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white text-ink-900"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-6 sm:px-[72px]">
            <Image
              src={items[lb].src}
              alt={items[lb].alt}
              width={1200}
              height={900}
              onClick={() => setZoom((z) => !z)}
              className={`animate-ff-zoom max-h-full max-w-full rounded-[10px] object-contain transition-transform duration-300 ${
                zoom ? "scale-[1.6] cursor-zoom-out" : "cursor-zoom-in"
              }`}
            />
            {n > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous image"
                  className="absolute top-1/2 left-3 flex h-[52px] w-[52px] -translate-y-1/2 items-center justify-center rounded-full bg-white/[0.16] text-white hover:bg-white/[0.3]"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next image"
                  className="absolute top-1/2 right-3 flex h-[52px] w-[52px] -translate-y-1/2 items-center justify-center rounded-full bg-white/[0.16] text-white hover:bg-white/[0.3]"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              </>
            )}
          </div>
          <p aria-live="polite" className="mt-3 px-6 text-center text-sm text-ink-light">
            {items[lb].alt}
          </p>
          <div className="flex justify-center gap-2.5 overflow-x-auto px-5 py-5">
            {items.map((t, i) => (
              <button
                key={t.src}
                type="button"
                onClick={() => openLb(i)}
                aria-label={`Show photo ${i + 1}`}
                aria-current={i === lb}
                className="h-[60px] w-[84px] flex-shrink-0 overflow-hidden rounded-[10px] border-[3px] bg-ink-900 p-0"
                style={{ borderColor: i === lb ? "#F79AA7" : "transparent", opacity: i === lb ? 1 : 0.55 }}
              >
                <Image src={t.src} alt="" width={84} height={60} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
