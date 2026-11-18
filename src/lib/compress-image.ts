/**
 * Resizes and compresses an image in the browser before upload, so nothing
 * heavy ever reaches Supabase Storage. Converts to WebP (supports
 * transparency, compresses better than JPEG at the same visual quality).
 * Animated GIFs are left untouched — a canvas capture would only keep the
 * first frame.
 */
export async function compressImage(file: File, maxDimension = 2000, quality = 0.82): Promise<File> {
  if (!file.type.startsWith("image/") || file.type === "image/gif" || file.type === "image/svg+xml") {
    return file;
  }

  try {
    const bitmap = await createImageBitmap(file);
    let { width, height } = bitmap;

    if (width > maxDimension || height > maxDimension) {
      const scale = maxDimension / Math.max(width, height);
      width = Math.round(width * scale);
      height = Math.round(height * scale);
    }

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, width, height);

    const blob: Blob | null = await new Promise((resolve) => canvas.toBlob(resolve, "image/webp", quality));
    if (!blob || blob.size >= file.size) return file;

    const newName = file.name.replace(/\.[^/.]+$/, "") + ".webp";
    return new File([blob], newName, { type: "image/webp" });
  } catch {
    // If compression fails for any reason, fall back to the original file
    // rather than blocking the upload.
    return file;
  }
}
