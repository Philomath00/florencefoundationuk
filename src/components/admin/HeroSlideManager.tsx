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
  headline: string;
  description: string | null;
  cta_label: string | null;
  cta_href: string | null;
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
      <ImageUploader pathPrefix="hero-slides" onUploaded={setImageUrl} label="Uploading slide image" />
      <input
        name="headline"
        placeholder="Headline"
        defaultValue={slide?.headline}
        required
        className="h-11 rounded-xl border-[1.5px] border-border-2 px-3.5 text-sm outline-none focus:border-brand-500"
      />
      <textarea
        name="description"
        placeholder="Description"
        defaultValue={slide?.description ?? ""}
        rows={2}
        className="rounded-xl border-[1.5px] border-border-2 px-3.5 py-2.5 text-sm outline-none focus:border-brand-500"
      />
      <div className="grid grid-cols-2 gap-3">
        <input
          name="cta_label"
          placeholder="Button label"
          defaultValue={slide?.cta_label ?? ""}
          className="h-11 rounded-xl border-[1.5px] border-border-2 px-3.5 text-sm outline-none focus:border-brand-500"
        />
        <input
          name="cta_href"
          placeholder="Button link (e.g. /support)"
          defaultValue={slide?.cta_href ?? ""}
          className="h-11 rounded-xl border-[1.5px] border-border-2 px-3.5 text-sm outline-none focus:border-brand-500"
        />
      </div>
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
                  <p className="truncate font-heading text-sm font-bold text-ink-900">{slide.headline}</p>
                  <p className="truncate text-xs text-ink-600">{slide.description}</p>
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
