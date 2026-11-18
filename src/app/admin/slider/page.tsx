import { createRscSupabaseClient } from "@/lib/supabase/rsc";
import HeroSlideManager from "@/components/admin/HeroSlideManager";

export default async function AdminSliderPage() {
  const supabase = await createRscSupabaseClient();
  const { data: slides } = await supabase.from("hero_slides").select("*").order("sort_order", { ascending: true });

  return (
    <div>
      <h1 className="mb-1 font-heading text-2xl font-extrabold text-ink-900">Hero Slider</h1>
      <p className="mb-6 text-sm text-ink-600">
        Manage the homepage hero slides shown at the top of the site. Changes appear immediately.
      </p>
      <HeroSlideManager slides={slides ?? []} />
    </div>
  );
}
