import Image from "next/image";
import { notFound } from "next/navigation";
import { marked } from "marked";
import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import CtaBand from "@/components/ui/CtaBand";
import { getSupabaseServer, isSupabaseConfigured } from "@/lib/supabase/server";
import { siteConfig } from "@/content/site";

type Post = {
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  featured_image: string | null;
  tags: string[] | null;
  seo_title: string | null;
  seo_description: string | null;
  author: string | null;
  published_at: string | null;
  status: string;
};

async function getPost(slug: string): Promise<Post | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const supabase = getSupabaseServer();
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .lte("published_at", new Date().toISOString())
      .maybeSingle<Post>();
    return data;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.seo_title || post.title,
    description: post.seo_description || post.excerpt || undefined,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: post.featured_image
      ? { title: post.title, description: post.excerpt ?? undefined, images: [post.featured_image] }
      : undefined,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const html = await marked.parse(post.content);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt ?? undefined,
    image: post.featured_image ?? undefined,
    author: { "@type": "Person", name: post.author || siteConfig.name },
    datePublished: post.published_at ?? undefined,
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        image={post.featured_image || "/images/women-certificates.jpg"}
        imageAlt=""
        watermark="Story"
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: post.title }]}
        title={post.title}
        subtitle={
          post.published_at
            ? new Date(post.published_at).toLocaleDateString("en-GB", { dateStyle: "long" })
            : undefined
        }
      />

      <article className="bg-white">
        <div className="mx-auto max-w-[760px] px-6 py-[clamp(64px,7vw,104px)]">
          {post.featured_image && (
            <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-3xl bg-surface-alt">
              <Image src={post.featured_image} alt="" fill unoptimized className="object-cover" />
            </div>
          )}
          <div
            className="prose-ff"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: html }}
          />
          {post.tags && post.tags.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2 border-t border-border-4 pt-6">
              {post.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>

      <CtaBand heading="Be Part of Something That Changes Lives." ctaLabel="Support Our Mission" ctaHref="/support" />
    </>
  );
}
