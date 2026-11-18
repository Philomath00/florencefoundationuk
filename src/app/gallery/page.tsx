import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Kicker from "@/components/ui/Kicker";
import CtaBand from "@/components/ui/CtaBand";
import GalleryTabs from "@/components/gallery/GalleryTabs";
import { galleryAlbums as staticAlbums } from "@/content/gallery";
import { getSupabaseServer, isSupabaseConfigured } from "@/lib/supabase/server";

async function getGalleryAlbums() {
  if (!isSupabaseConfigured()) return staticAlbums;
  try {
    const supabase = getSupabaseServer();
    const [{ data: albums }, { data: images }] = await Promise.all([
      supabase.from("gallery_albums").select("*").order("sort_order", { ascending: true }),
      supabase
        .from("gallery_images")
        .select("*")
        .eq("published", true)
        .order("sort_order", { ascending: true }),
    ]);
    if (!albums || albums.length === 0) return staticAlbums;

    return albums.map((album) => ({
      year: album.year,
      title: album.title,
      items: (images ?? [])
        .filter((img) => img.album_id === album.id)
        .map((img) => ({ src: img.image_url, alt: img.alt, ratio: img.ratio })),
    }));
  } catch {
    return staticAlbums;
  }
}

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photos from Florence Foundation's community outreach, Grace & Mercy Project (GAMP) ceremonies, and humanitarian work across Nigeria and the wider African continent.",
  alternates: { canonical: "/gallery" },
};

export default async function GalleryPage() {
  const galleryAlbums = await getGalleryAlbums();

  return (
    <>
      <PageHero
        image="/images/gallery/2009-5.jpg"
        imageAlt="Children laughing and posing together outdoors"
        imagePos="50% 35%"
        watermark="Moments"
        crumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
        title="Our Gallery"
        subtitle="Faces of Hope. Moments of Compassion."
      />

      <section aria-labelledby="g-intro-h" className="bg-white">
        <div className="mx-auto max-w-[1320px] px-6 py-[clamp(80px,9vw,128px)]">
          <div className="mb-12 grid items-end gap-6 [grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr))] lg:gap-24">
            <div>
              <Kicker>OUR ALBUMS</Kicker>
              <h2 id="g-intro-h" className="m-0 font-heading text-[clamp(34px,3.8vw,54px)] font-extrabold leading-[1.08] tracking-[-0.02em] text-ink-900">
                Every Image Tells a Human Story.
              </h2>
            </div>
            <p className="max-w-[560px] text-lg leading-[1.7] text-ink-700">
              Explore moments that reflect the people, communities, and causes at the heart of
              Florence Foundation&apos;s mission.
            </p>
          </div>

          <GalleryTabs albums={galleryAlbums} />
        </div>
      </section>

      <CtaBand heading="Help Us Create More Moments of Hope." ctaLabel="Support Our Mission" ctaHref="/support" />
    </>
  );
}
