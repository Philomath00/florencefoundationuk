import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import CtaBand from "@/components/ui/CtaBand";
import { getSupabaseServer, isSupabaseConfigured } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "News, stories and updates from Florence Foundation's humanitarian work across the United Kingdom, Nigeria and the wider African continent.",
  alternates: { canonical: "/blog" },
};

type PostSummary = {
  slug: string;
  title: string;
  excerpt: string | null;
  featured_image: string | null;
  published_at: string | null;
};

async function getPublishedPosts(): Promise<PostSummary[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const supabase = getSupabaseServer();
    const { data } = await supabase
      .from("blog_posts")
      .select("slug, title, excerpt, featured_image, published_at")
      .eq("status", "published")
      .lte("published_at", new Date().toISOString())
      .order("published_at", { ascending: false });
    return data ?? [];
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <>
      <PageHero
        image="/images/women-certificates.jpg"
        imageAlt="A group of women in purple sashes celebrate, holding up certificates"
        imagePos="38% 10%"
        watermark="Stories"
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
        title="News & Stories"
        subtitle="Updates from the Florence Foundation community."
      />

      <section aria-label="Blog posts" className="bg-white">
        <div className="mx-auto max-w-[1320px] px-6 py-[clamp(80px,9vw,128px)]">
          {posts.length === 0 ? (
            <p className="rounded-3xl bg-surface p-12 text-center text-lg text-ink-700">
              No articles published yet — check back soon.
            </p>
          ) : (
            <div className="grid gap-8 [grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr))]">
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-col">
                  <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-3xl bg-surface-alt">
                    {post.featured_image && (
                      <Image
                        src={post.featured_image}
                        alt=""
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>
                  {post.published_at && (
                    <p className="mb-2 text-sm font-semibold text-brand-500">
                      {new Date(post.published_at).toLocaleDateString("en-GB", { dateStyle: "long" })}
                    </p>
                  )}
                  <h2 className="mb-2 font-heading text-2xl font-extrabold leading-tight text-ink-900 group-hover:text-brand-600">
                    {post.title}
                  </h2>
                  {post.excerpt && <p className="text-base leading-relaxed text-ink-700">{post.excerpt}</p>}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <CtaBand heading="Be Part of Something That Changes Lives." ctaLabel="Support Our Mission" ctaHref="/support" />
    </>
  );
}
