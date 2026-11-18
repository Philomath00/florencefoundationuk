import Link from "next/link";
import { createRscSupabaseClient } from "@/lib/supabase/rsc";

function StatCard({ label, value, href }: { label: string; value: number | string; href?: string }) {
  const content = (
    <div className="rounded-2xl border border-border bg-white p-6">
      <p className="mb-2 text-sm font-semibold text-ink-600">{label}</p>
      <p className="font-heading text-3xl font-extrabold text-ink-900">{value}</p>
    </div>
  );
  return href ? (
    <Link href={href} className="transition hover:-translate-y-0.5">
      {content}
    </Link>
  ) : (
    content
  );
}

export default async function AdminOverviewPage() {
  const supabase = await createRscSupabaseClient();

  const [unread, submissions, slides, images, posts] = await Promise.all([
    supabase.from("contact_submissions").select("id", { count: "exact", head: true }).eq("status", "unread"),
    supabase.from("contact_submissions").select("id", { count: "exact", head: true }),
    supabase.from("hero_slides").select("id", { count: "exact", head: true }),
    supabase.from("gallery_images").select("id", { count: "exact", head: true }),
    supabase.from("blog_posts").select("id", { count: "exact", head: true }),
  ]);

  return (
    <div>
      <h1 className="mb-1 font-heading text-2xl font-extrabold text-ink-900">Overview</h1>
      <p className="mb-8 text-sm text-ink-600">A snapshot of your site&apos;s content and enquiries.</p>

      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Unread enquiries" value={unread.count ?? 0} href="/admin/submissions" />
        <StatCard label="Total enquiries" value={submissions.count ?? 0} href="/admin/submissions" />
        <StatCard label="Hero slides" value={slides.count ?? 0} href="/admin/slider" />
        <StatCard label="Gallery images" value={images.count ?? 0} href="/admin/gallery" />
        <StatCard label="Blog posts" value={posts.count ?? 0} href="/admin/blog" />
      </div>

      <div className="rounded-2xl border border-border-2 bg-warn-bg p-6 text-sm leading-relaxed text-warn-text">
        <strong>Visitor analytics aren&apos;t connected yet.</strong> Once Vercel Web Analytics is
        enabled on this project, real pageview and traffic-source numbers will appear here — this
        dashboard never shows made-up statistics.
      </div>
    </div>
  );
}
