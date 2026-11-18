import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";

// Vercel sets VERCEL_ENV to "production" | "preview" | "development".
// Preview and local builds must never be indexed, to avoid duplicate-content
// penalties against the real production domain.
const isProduction = process.env.VERCEL_ENV === "production";

export default function robots(): MetadataRoute.Robots {
  if (!isProduction) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/admin", "/api"] },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
