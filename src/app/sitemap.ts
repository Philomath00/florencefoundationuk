import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";
import { projects } from "@/content/projects";
import { getSupabaseServer, isSupabaseConfigured } from "@/lib/supabase/server";

async function getBlogRoutes(base: string) {
  if (!isSupabaseConfigured()) return [];
  try {
    const supabase = getSupabaseServer();
    const { data } = await supabase
      .from("blog_posts")
      .select("slug, updated_at")
      .eq("status", "published")
      .lte("published_at", new Date().toISOString());
    return (data ?? []).map((post) => ({
      url: `${base}/blog/${post.slug}`,
      lastModified: new Date(post.updated_at),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }));
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const staticRoutes = ["", "/about", "/projects", "/gallery", "/support", "/contact", "/blog"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const projectRoutes = projects.map((p) => ({
    url: `${base}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const blogRoutes = await getBlogRoutes(base);

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
