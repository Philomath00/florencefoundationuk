"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import MultiImageUploader from "@/components/admin/MultiImageUploader";
import {
  createGalleryAlbum,
  deleteGalleryAlbum,
  addGalleryImage,
  updateGalleryImageAlt,
  toggleGalleryImagePublished,
  deleteGalleryImage,
  reorderGalleryImage,
  reorderGalleryAlbum,
} from "@/app/admin/actions";

type GalleryImage = {
  id: string;
  image_url: string;
  alt: string;
  published: boolean;
};

type Album = {
  id: string;
  year: string;
  title: string;
  images: GalleryImage[];
};

function AlbumPanel({
  album,
  isFirst,
  isLast,
  albumIds,
  collapsed,
  onToggleCollapsed,
}: {
  album: Album;
  isFirst: boolean;
  isLast: boolean;
  albumIds: string[];
  collapsed: boolean;
  onToggleCollapsed: () => void;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="rounded-2xl border border-border bg-white p-5">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onToggleCollapsed}
          aria-expanded={!collapsed}
          className="flex min-w-0 flex-1 items-center gap-3 text-left"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`flex-shrink-0 text-ink-600 transition-transform ${collapsed ? "-rotate-90" : ""}`}
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
          <span className="min-w-0">
            <h3 className="truncate font-heading text-lg font-extrabold text-ink-900">
              {album.year} · {album.title}
            </h3>
            <p className="text-xs text-ink-600">{album.images.length} photo{album.images.length === 1 ? "" : "s"}</p>
          </span>
        </button>
        <div className="flex flex-shrink-0 items-center gap-1.5">
          <button
            type="button"
            disabled={isFirst}
            aria-label="Move album up"
            onClick={() => startTransition(() => reorderGalleryAlbum(album.id, "up", albumIds))}
            className="h-8 w-8 rounded-full border border-border-2 text-ink-700 hover:bg-surface disabled:opacity-30"
          >
            ↑
          </button>
          <button
            type="button"
            disabled={isLast}
            aria-label="Move album down"
            onClick={() => startTransition(() => reorderGalleryAlbum(album.id, "down", albumIds))}
            className="h-8 w-8 rounded-full border border-border-2 text-ink-700 hover:bg-surface disabled:opacity-30"
          >
            ↓
          </button>
          <button
            type="button"
            onClick={() => {
              if (confirm(`Delete the "${album.title}" album and all its photos?`)) {
                startTransition(() => deleteGalleryAlbum(album.id));
              }
            }}
            className="ml-1 text-sm font-semibold text-ink-600 hover:text-accent-900"
          >
            Delete album
          </button>
        </div>
      </div>

      {collapsed ? null : (
        <>
      <p className="mt-4 mb-2 text-xs text-ink-600">
        Use the arrows on a photo to move it earlier/later — handy when photos weren&apos;t
        uploaded in the order you want them shown.
      </p>
      <div className="mb-4 grid grid-cols-3 gap-2 sm:grid-cols-6">
        {album.images.map((img, i) => {
          const imageIds = album.images.map((im) => im.id);
          return (
            <div key={img.id} className="group relative overflow-hidden rounded-lg bg-surface-alt">
              <div className="relative aspect-square">
                <Image src={img.image_url} alt={img.alt} fill className="object-cover" unoptimized />
              </div>
              <div className="absolute inset-0 flex flex-col justify-between bg-ink-900/0 p-1 opacity-0 transition group-hover:bg-ink-900/60 group-hover:opacity-100">
                <div className="flex justify-end gap-1">
                  <button
                    type="button"
                    onClick={() => startTransition(() => toggleGalleryImagePublished(img.id, !img.published))}
                    className="rounded-full bg-white/90 px-1.5 py-0.5 text-[9px] font-bold text-ink-900"
                  >
                    {img.published ? "Hide" : "Show"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm("Delete this photo?")) startTransition(() => deleteGalleryImage(img.id));
                    }}
                    className="rounded-full bg-white/90 px-1.5 py-0.5 text-[9px] font-bold text-accent-900"
                  >
                    ✕
                  </button>
                </div>
                <div className="flex justify-center gap-1">
                  <button
                    type="button"
                    disabled={i === 0}
                    aria-label="Move earlier"
                    onClick={() => startTransition(() => reorderGalleryImage(img.id, "up", imageIds))}
                    className="flex h-5 w-5 items-center justify-center rounded-full bg-white/90 text-[10px] font-bold text-ink-900 disabled:opacity-30"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    disabled={i === album.images.length - 1}
                    aria-label="Move later"
                    onClick={() => startTransition(() => reorderGalleryImage(img.id, "down", imageIds))}
                    className="flex h-5 w-5 items-center justify-center rounded-full bg-white/90 text-[10px] font-bold text-ink-900 disabled:opacity-30"
                  >
                    ›
                  </button>
                </div>
                <input
                  defaultValue={img.alt}
                  onBlur={(e) => {
                    if (e.target.value !== img.alt) startTransition(() => updateGalleryImageAlt(img.id, e.target.value));
                  }}
                  placeholder="Alt text"
                  className="w-full rounded bg-white/90 px-1 py-0.5 text-[9px]"
                />
              </div>
              {!img.published && (
                <span className="absolute top-1 left-1 rounded-full bg-ink-900/80 px-1.5 py-0.5 text-[9px] font-bold text-white">
                  Hidden
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div className="border-t border-border-4 pt-4">
        <MultiImageUploader
          pathPrefix={`gallery/${album.id}`}
          label="Uploading photos"
          onUploaded={({ url, alt }) => addGalleryImage(album.id, url, alt)}
        />
        <p className="mt-1 text-xs text-ink-600">
          Alt text is filled in from each file name — edit any photo&apos;s alt text above after
          uploading.
        </p>
      </div>
      {pending && <p className="mt-2 text-xs text-ink-600">Saving…</p>}
        </>
      )}
    </div>
  );
}

export default function GalleryManager({ albums }: { albums: Album[] }) {
  const [showNew, setShowNew] = useState(false);
  const [, startTransition] = useTransition();
  // Collapsed by default so a long list of albums doesn't dump every photo
  // on screen at once; expand the ones you're working on.
  const [collapsed, setCollapsed] = useState<Set<string>>(() => new Set(albums.map((a) => a.id)));
  const albumIds = albums.map((a) => a.id);

  return (
    <div className="flex flex-col gap-5">
      {albums.map((album, i) => (
        <AlbumPanel
          key={album.id}
          album={album}
          isFirst={i === 0}
          isLast={i === albums.length - 1}
          albumIds={albumIds}
          collapsed={collapsed.has(album.id)}
          onToggleCollapsed={() =>
            setCollapsed((prev) => {
              const next = new Set(prev);
              if (next.has(album.id)) next.delete(album.id);
              else next.add(album.id);
              return next;
            })
          }
        />
      ))}

      {showNew ? (
        <form
          action={(fd) => {
            startTransition(() => createGalleryAlbum(fd));
            setShowNew(false);
          }}
          className="flex flex-wrap items-end gap-3 rounded-2xl border border-border bg-white p-5"
        >
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-ink-700">Year</label>
            <input name="year" required placeholder="2026" className="h-10 w-28 rounded-lg border border-border-2 px-3 text-sm" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-ink-700">Album title</label>
            <input name="title" required placeholder="Community Outreach" className="h-10 w-64 rounded-lg border border-border-2 px-3 text-sm" />
          </div>
          <button type="submit" className="h-10 rounded-full bg-brand-500 px-5 text-sm font-bold text-white hover:bg-brand-600">
            Create album
          </button>
        </form>
      ) : (
        <button
          type="button"
          onClick={() => setShowNew(true)}
          className="self-start rounded-full border-2 border-brand-300 px-5 py-2.5 text-sm font-bold text-brand-700 hover:bg-brand-50"
        >
          + New album
        </button>
      )}
    </div>
  );
}
