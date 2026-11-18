import { createRscSupabaseClient } from "@/lib/supabase/rsc";
import GalleryManager from "@/components/admin/GalleryManager";

export default async function AdminGalleryPage() {
  const supabase = await createRscSupabaseClient();
  const [{ data: albums }, { data: images }] = await Promise.all([
    supabase.from("gallery_albums").select("*").order("sort_order", { ascending: true }),
    supabase.from("gallery_images").select("*").order("sort_order", { ascending: true }),
  ]);

  const merged = (albums ?? []).map((album) => ({
    ...album,
    images: (images ?? []).filter((img) => img.album_id === album.id),
  }));

  return (
    <div>
      <h1 className="mb-1 font-heading text-2xl font-extrabold text-ink-900">Gallery</h1>
      <p className="mb-6 text-sm text-ink-600">
        Manage photo albums shown on the public Gallery page and the homepage preview.
      </p>
      <GalleryManager albums={merged} />
    </div>
  );
}
