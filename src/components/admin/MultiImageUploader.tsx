"use client";

import { useRef, useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

function filenameToAlt(filename: string): string {
  return filename
    .replace(/\.[^/.]+$/, "")
    .replace(/[-_]+/g, " ")
    .trim();
}

export default function MultiImageUploader({
  pathPrefix,
  onUploaded,
  label = "Upload photos",
}: {
  pathPrefix: string;
  onUploaded: (image: { url: string; alt: string }) => void | Promise<void>;
  label?: string;
}) {
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList) => {
    setError("");
    const valid = Array.from(files).filter((f) => f.type.startsWith("image/"));
    const tooBig = valid.filter((f) => f.size > 10 * 1024 * 1024);
    if (tooBig.length > 0) {
      setError(`${tooBig.length} file(s) are over 10MB and were skipped.`);
    }
    const toUpload = valid.filter((f) => f.size <= 10 * 1024 * 1024);
    if (toUpload.length === 0) return;

    setProgress({ done: 0, total: toUpload.length });
    const supabase = createBrowserSupabaseClient();

    for (const file of toUpload) {
      try {
        const ext = file.name.split(".").pop() || "jpg";
        const path = `${pathPrefix}/${crypto.randomUUID()}.${ext}`;
        const { error: uploadError } = await supabase.storage.from("site-media").upload(path, file, {
          cacheControl: "3600",
          upsert: false,
        });
        if (uploadError) throw uploadError;
        const { data } = supabase.storage.from("site-media").getPublicUrl(path);
        await onUploaded({ url: data.publicUrl, alt: filenameToAlt(file.name) });
      } catch (err) {
        setError((prev) => (prev ? `${prev} ` : "") + (err instanceof Error ? err.message : "One upload failed."));
      }
      setProgress((p) => (p ? { done: p.done + 1, total: p.total } : p));
    }

    setProgress(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        disabled={Boolean(progress)}
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) handleFiles(e.target.files);
        }}
        className="block w-full text-sm text-ink-700 file:mr-3 file:rounded-full file:border-0 file:bg-brand-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-brand-700 hover:file:bg-brand-200"
      />
      <p className="mt-1.5 text-xs text-ink-600">
        {progress ? `${label}… ${progress.done}/${progress.total}` : "Select multiple photos at once to upload them all."}
      </p>
      {error && <p className="mt-1 text-xs text-accent-900">{error}</p>}
    </div>
  );
}
