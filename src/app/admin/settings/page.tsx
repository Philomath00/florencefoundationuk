import { createRscSupabaseClient } from "@/lib/supabase/rsc";
import SettingsForm from "@/components/admin/SettingsForm";

export default async function AdminSettingsPage() {
  const supabase = await createRscSupabaseClient();
  const { data: settings, error } = await supabase.from("site_settings").select("*").eq("id", 1).single();

  return (
    <div>
      <h1 className="mb-1 font-heading text-2xl font-extrabold text-ink-900">Website Settings</h1>
      <p className="mb-6 text-sm text-ink-600">
        Organization info, contact details, social links, default SEO and bank details. Changes
        here update the live site.
      </p>
      {error && <p className="text-sm text-accent-900">Failed to load settings: {error.message}</p>}
      {settings && <SettingsForm settings={settings} />}
    </div>
  );
}
