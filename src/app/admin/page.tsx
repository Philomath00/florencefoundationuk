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

  const [unread, submissions, slides, images, posts, projects] = await Promise.all([
    supabase.from("contact_submissions").select("id", { count: "exact", head: true }).eq("status", "unread"),
    supabase.from("contact_submissions").select("id", { count: "exact", head: true }),
    supabase.from("hero_slides").select("id", { count: "exact", head: true }),
    supabase.from("gallery_images").select("id", { count: "exact", head: true }),
    supabase.from("blog_posts").select("id", { count: "exact", head: true }),
    supabase.from("projects").select("id", { count: "exact", head: true }),
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
        <StatCard label="Projects" value={projects.count ?? 0} href="/admin/projects" />
      </div>

      <div className="rounded-2xl border border-border-2 bg-brand-50 p-6 text-sm leading-relaxed text-ink-700">
        <strong className="text-ink-900">Vercel Web Analytics and Speed Insights are now collecting data</strong> on
        every page view, along with the <code className="rounded bg-white px-1.5 py-0.5 text-xs">donate_cta_click</code> and{" "}
        <code className="rounded bg-white px-1.5 py-0.5 text-xs">contact_form_submitted</code> events. Pulling that
        into a chart here would need a Vercel API token wired up — for now, see the full real-time
        breakdown (visitors, pageviews, top pages, traffic sources, countries) in your{" "}
        <a
          href="https://vercel.com/heydanehq-9182s-projects/florence-foundation-website/analytics"
          target="_blank"
          rel="noopener"
          className="font-semibold text-brand-700 underline"
        >
          Vercel dashboard
        </a>
        . This page will never show a made-up number in its place.
      </div>
    </div>
  );
}
