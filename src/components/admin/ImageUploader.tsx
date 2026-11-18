"use client";

import { useRef, useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { compressImage } from "@/lib/compress-image";

export default function ImageUploader({
  pathPrefix,
  onUploaded,
  label = "Upload image",
}: {
  pathPrefix: string;
  onUploaded: (publicUrl: string) => void;
  label?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setError("");
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("Images must be under 10MB.");
      return;
    }

    setUploading(true);
    try {
      const optimized = await compressImage(file);
      const supabase = createBrowserSupabaseClient();
      const ext = optimized.name.split(".").pop() || "jpg";
      const path = `${pathPrefix}/${crypto.randomUUID()}.${ext}`;
      const { error: uploadError } = await supabase.storage.from("site-media").upload(path, optimized, {
        cacheControl: "3600",
        upsert: false,
      });
      if (uploadError) throw uploadError;
      const { data } = supabase.storage.from("site-media").getPublicUrl(path);
      onUploaded(data.publicUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        disabled={uploading}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
        className="block w-full text-sm text-ink-700 file:mr-3 file:rounded-full file:border-0 file:bg-brand-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-brand-700 hover:file:bg-brand-200"
      />
      {uploading && <p className="mt-1.5 text-xs text-ink-600">{label}…</p>}
      {error && <p className="mt-1.5 text-xs text-accent-900">{error}</p>}
    </div>
  );
}
