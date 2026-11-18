"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export type LightboxImage = { src: string; alt: string };

export default function Lightbox({
  images,
  index,
  onClose,
  onStep,
  caption,
}: {
  images: LightboxImage[];
  index: number;
  onClose: () => void;
  onStep: (direction: 1 | -1) => void;
  caption?: string;
}) {
  const [zoom, setZoom] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef(0);
  const current = images[index];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => closeRef.current?.focus(), 30);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onStep]);

  useEffect(() => setZoom(false), [index]);

  if (!current) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) onStep(dx < 0 ? 1 : -1);
      }}
      className="animate-ff-fade fixed inset-0 z-[200] flex items-center justify-center bg-ink-900/[0.94] px-4 py-[72px] sm:px-16"
    >
      <button
        type="button"
        ref={closeRef}
        onClick={onClose}
        aria-label="Close image viewer"
        className="absolute top-4 right-4 flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white text-ink-900"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
      <div className="relative max-h-full max-w-full">
        <Image
          src={current.src}
          alt={current.alt}
          width={1200}
          height={900}
          onClick={() => setZoom((z) => !z)}
          className={`animate-ff-zoom max-h-[80vh] w-auto max-w-full rounded-xl object-contain transition-transform duration-300 ${
            zoom ? "scale-[1.6] cursor-zoom-out" : "cursor-zoom-in"
          }`}
        />
      </div>
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => onStep(-1)}
            aria-label="Previous image"
            className="absolute top-1/2 left-4 flex h-[52px] w-[52px] -translate-y-1/2 items-center justify-center rounded-full bg-white/[0.14] text-white hover:bg-white/[0.28]"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => onStep(1)}
            aria-label="Next image"
            className="absolute top-1/2 right-4 flex h-[52px] w-[52px] -translate-y-1/2 items-center justify-center rounded-full bg-white/[0.14] text-white hover:bg-white/[0.28]"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </>
      )}
      <p aria-live="polite" className="absolute bottom-6 left-0 right-0 px-6 text-center text-sm text-ink-light">
        {caption ?? `${index + 1} / ${images.length} — ${current.alt}`}
      </p>
    </div>
  );
}
