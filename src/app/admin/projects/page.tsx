import Link from "next/link";
import { createRscSupabaseClient } from "@/lib/supabase/rsc";

export default async function AdminProjectsPage() {
  const supabase = await createRscSupabaseClient();
  const { data: projects } = await supabase.from("projects").select("id, slug, title, cat, published").order("sort_order");

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="mb-1 font-heading text-2xl font-extrabold text-ink-900">Projects</h1>
          <p className="text-sm text-ink-600">Manage the humanitarian programmes shown on /projects.</p>
        </div>
        <Link href="/admin/projects/new" className="rounded-full bg-brand-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-600">
          + New project
        </Link>
      </div>

      <ul className="overflow-hidden rounded-2xl border border-border bg-white">
        {(projects ?? []).map((p) => (
          <li key={p.id} className="border-b border-border-4 last:border-b-0">
            <Link href={`/admin/projects/${p.id}`} className="flex items-center gap-4 px-5 py-4 hover:bg-surface">
              <span
                className={`rounded-full px-2.5 py-1 font-heading text-xs font-bold ${
                  p.published ? "bg-brand-50 text-brand-700" : "bg-surface-alt text-ink-600"
                }`}
              >
                {p.published ? "Published" : "Hidden"}
              </span>
              <span className="font-heading text-sm font-bold text-ink-900">{p.title}</span>
              <span className="text-xs text-ink-600">{p.cat}</span>
              <span className="ml-auto font-mono text-xs text-ink-600">/projects/{p.slug}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
