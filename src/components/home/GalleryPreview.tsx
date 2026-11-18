"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "@/components/ui/Lightbox";
import type { GalleryItem } from "@/content/gallery";

export default function GalleryPreview({ items }: { items: GalleryItem[] }) {
  const [open, setOpen] = useState(-1);

  return (
    <>
      <div className="[column-gap:20px] [columns:1_300px] sm:[columns:2_300px] lg:[columns:3_300px]">
        {items.map((g, i) => (
          <button
            key={g.src}
            type="button"
            onClick={() => setOpen(i)}
            aria-label={`Open image ${i + 1} of ${items.length}: ${g.alt}`}
            className="mb-5 block w-full [break-inside:avoid] overflow-hidden rounded-[22px] border-0 bg-surface-alt p-0 transition hover:scale-[0.985]"
            style={{ cursor: "zoom-in" }}
          >
            <Image
              src={g.src}
              alt={g.alt}
              width={600}
              height={450}
              style={{ aspectRatio: g.ratio.replace("/", " / ") }}
              className="block w-full object-cover"
            />
          </button>
        ))}
      </div>
      {open >= 0 && (
        <Lightbox
          images={items}
          index={open}
          onClose={() => setOpen(-1)}
          onStep={(d) => setOpen((i) => (i + d + items.length) % items.length)}
        />
      )}
    </>
  );
}
