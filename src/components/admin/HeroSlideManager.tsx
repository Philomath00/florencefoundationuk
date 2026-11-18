"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import ImageUploader from "@/components/admin/ImageUploader";
import {
  createHeroSlide,
  updateHeroSlide,
  toggleHeroSlidePublished,
  deleteHeroSlide,
  reorderHeroSlide,
} from "@/app/admin/actions";

type Slide = {
  id: string;
  image_url: string;
  alt: string;
  published: boolean;
};

function SlideForm({
  slide,
  onSubmit,
  submitLabel,
}: {
  slide?: Partial<Slide>;
  onSubmit: (formData: FormData) => void;
  submitLabel: string;
}) {
  const [imageUrl, setImageUrl] = useState(slide?.image_url || "");
  const [pending, startTransition] = useTransition();

  return (
    <form
      action={(formData) => {
        formData.set("image_url", imageUrl);
        startTransition(() => onSubmit(formData));
      }}
      className="flex flex-col gap-3"
    >
      {imageUrl && (
        <div className="relative h-32 w-full overflow-hidden rounded-xl bg-surface-alt">
          <Image src={imageUrl} alt="" fill className="object-cover" unoptimized />
        </div>
      )}
      <ImageUploader pathPrefix="hero-slides" onUploaded={setImageUrl} label="Uploading image" />
      <input
        name="alt"
        placeholder="Alt text (describe the image for screen readers)"
        defaultValue={slide?.alt}
        required
        className="h-11 rounded-xl border-[1.5px] border-border-2 px-3.5 text-sm outline-none focus:border-brand-500"
      />
      <button
        type="submit"
        disabled={pending || !imageUrl}
        className="self-start rounded-full bg-brand-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-600 disabled:opacity-50"
      >
        {pending ? "Saving…" : submitLabel}
      </button>
    </form>
  );
}

export default function HeroSlideManager({ slides }: { slides: Slide[] }) {
  const [showNew, setShowNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [, startTransition] = useTransition();
  const slideIds = slides.map((s) => s.id);

  return (
    <div className="flex flex-col gap-4">
      <p className="rounded-xl bg-brand-50 px-4 py-3 text-sm text-brand-700">
        These images rotate on the right side of the homepage hero. The heading, copy and buttons
        on the left are fixed design content and aren&apos;t edited here.
      </p>
      <ul className="flex flex-col gap-3">
        {slides.map((slide, i) => (
          <li key={slide.id} className="rounded-2xl border border-border bg-white p-4">
            {editingId === slide.id ? (
              <SlideForm
                slide={slide}
                submitLabel="Save changes"
                onSubmit={(fd) => {
                  startTransition(() => updateHeroSlide(slide.id, fd));
                  setEditingId(null);
                }}
              />
            ) : (
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-28 flex-shrink-0 overflow-hidden rounded-lg bg-surface-alt">
                  <Image src={slide.image_url} alt="" fill className="object-cover" unoptimized />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-ink-700">{slide.alt}</p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                    slide.published ? "bg-brand-50 text-brand-700" : "bg-surface-alt text-ink-600"
                  }`}
                >
                  {slide.published ? "Published" : "Hidden"}
                </span>
                <div className="flex flex-shrink-0 gap-1.5">
                  <button
                    type="button"
                    disabled={i === 0}
                    onClick={() => startTransition(() => reorderHeroSlide(slide.id, "up", slideIds))}
                    className="h-8 w-8 rounded-full border border-border-2 text-ink-700 hover:bg-surface disabled:opacity-30"
                    aria-label="Move up"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    disabled={i === slides.length - 1}
                    onClick={() => startTransition(() => reorderHeroSlide(slide.id, "down", slideIds))}
                    className="h-8 w-8 rounded-full border border-border-2 text-ink-700 hover:bg-surface disabled:opacity-30"
                    aria-label="Move down"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingId(slide.id)}
                    className="rounded-full border border-border-2 px-3 text-xs font-semibold text-ink-700 hover:bg-surface"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => startTransition(() => toggleHeroSlidePublished(slide.id, !slide.published))}
                    className="rounded-full border border-border-2 px-3 text-xs font-semibold text-ink-700 hover:bg-surface"
                  >
                    {slide.published ? "Hide" : "Publish"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm("Delete this slide?")) startTransition(() => deleteHeroSlide(slide.id));
                    }}
                    className="rounded-full px-3 text-xs font-semibold text-ink-600 hover:text-accent-900"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>

      {showNew ? (
        <div className="rounded-2xl border border-border bg-white p-4">
          <SlideForm
            submitLabel="Add slide"
            onSubmit={(fd) => {
              startTransition(() => createHeroSlide(fd));
              setShowNew(false);
            }}
          />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setShowNew(true)}
          className="self-start rounded-full border-2 border-brand-300 px-5 py-2.5 text-sm font-bold text-brand-700 hover:bg-brand-50"
        >
          + Add slide
        </button>
      )}
    </div>
  );
}
