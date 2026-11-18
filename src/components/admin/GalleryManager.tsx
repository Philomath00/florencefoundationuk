"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import ImageUploader from "@/components/admin/ImageUploader";
import {
  createGalleryAlbum,
  deleteGalleryAlbum,
  addGalleryImage,
  updateGalleryImageAlt,
  toggleGalleryImagePublished,
  deleteGalleryImage,
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

function AlbumPanel({ album }: { album: Album }) {
  const [pending, startTransition] = useTransition();
  const [newAlt, setNewAlt] = useState("");

  return (
    <div className="rounded-2xl border border-border bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-heading text-lg font-extrabold text-ink-900">
            {album.year} · {album.title}
          </h3>
          <p className="text-xs text-ink-600">{album.images.length} photo{album.images.length === 1 ? "" : "s"}</p>
        </div>
        <button
          type="button"
          onClick={() => {
            if (confirm(`Delete the "${album.title}" album and all its photos?`)) {
              startTransition(() => deleteGalleryAlbum(album.id));
            }
          }}
          className="text-sm font-semibold text-ink-600 hover:text-accent-900"
        >
          Delete album
        </button>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {album.images.map((img) => (
          <div key={img.id} className="group relative overflow-hidden rounded-xl bg-surface-alt">
            <div className="relative aspect-square">
              <Image src={img.image_url} alt={img.alt} fill className="object-cover" unoptimized />
            </div>
            <div className="absolute inset-0 flex flex-col justify-between bg-ink-900/0 p-1.5 opacity-0 transition group-hover:bg-ink-900/60 group-hover:opacity-100">
              <div className="flex justify-end gap-1">
                <button
                  type="button"
                  onClick={() => startTransition(() => toggleGalleryImagePublished(img.id, !img.published))}
                  className="rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold text-ink-900"
                >
                  {img.published ? "Hide" : "Show"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm("Delete this photo?")) startTransition(() => deleteGalleryImage(img.id));
                  }}
                  className="rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold text-accent-900"
                >
                  ✕
                </button>
              </div>
              <input
                defaultValue={img.alt}
                onBlur={(e) => {
                  if (e.target.value !== img.alt) startTransition(() => updateGalleryImageAlt(img.id, e.target.value));
                }}
                placeholder="Alt text"
                className="w-full rounded bg-white/90 px-1.5 py-0.5 text-[10px]"
              />
            </div>
            {!img.published && (
              <span className="absolute top-1 left-1 rounded-full bg-ink-900/80 px-1.5 py-0.5 text-[9px] font-bold text-white">
                Hidden
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-end gap-3 border-t border-border-4 pt-4">
        <div className="flex-1">
          <ImageUploader
            pathPrefix={`gallery/${album.id}`}
            label="Uploading photo"
            onUploaded={(url) => startTransition(() => addGalleryImage(album.id, url, newAlt))}
          />
        </div>
        <input
          value={newAlt}
          onChange={(e) => setNewAlt(e.target.value)}
          placeholder="Alt text for next upload"
          className="h-9 rounded-lg border border-border-2 px-3 text-xs"
        />
      </div>
      {pending && <p className="mt-2 text-xs text-ink-600">Saving…</p>}
    </div>
  );
}

export default function GalleryManager({ albums }: { albums: Album[] }) {
  const [showNew, setShowNew] = useState(false);
  const [, startTransition] = useTransition();

  return (
    <div className="flex flex-col gap-5">
      {albums.map((album) => (
        <AlbumPanel key={album.id} album={album} />
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
