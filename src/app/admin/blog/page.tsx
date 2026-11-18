import Link from "next/link";
import { createRscSupabaseClient } from "@/lib/supabase/rsc";

const statusStyle: Record<string, string> = {
  draft: "bg-surface-alt text-ink-600",
  published: "bg-brand-50 text-brand-700",
  scheduled: "bg-accent-50 text-accent-800",
};

export default async function AdminBlogPage() {
  const supabase = await createRscSupabaseClient();
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("id, title, status, published_at, updated_at")
    .order("updated_at", { ascending: false });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="mb-1 font-heading text-2xl font-extrabold text-ink-900">Blog</h1>
          <p className="text-sm text-ink-600">Write and publish articles for the public /blog section.</p>
        </div>
        <Link href="/admin/blog/new" className="rounded-full bg-brand-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-600">
          + New post
        </Link>
      </div>

      {(!posts || posts.length === 0) && (
        <p className="rounded-2xl border border-border bg-white p-8 text-center text-sm text-ink-600">
          No posts yet.{" "}
          <Link href="/admin/blog/new" className="font-semibold text-brand-700 underline">
            Write your first one
          </Link>
          .
        </p>
      )}

      {posts && posts.length > 0 && (
        <ul className="overflow-hidden rounded-2xl border border-border bg-white">
          {posts.map((post) => (
            <li key={post.id} className="border-b border-border-4 last:border-b-0">
              <Link href={`/admin/blog/${post.id}`} className="flex items-center gap-4 px-5 py-4 hover:bg-surface">
                <span className={`rounded-full px-2.5 py-1 font-heading text-xs font-bold ${statusStyle[post.status]}`}>
                  {post.status}
                </span>
                <span className="font-heading text-sm font-bold text-ink-900">{post.title}</span>
                <span className="ml-auto text-xs text-ink-600">
                  Updated {new Date(post.updated_at).toLocaleDateString("en-GB")}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
