"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createRscSupabaseClient } from "@/lib/supabase/rsc";

export async function signIn(_prevState: unknown, formData: FormData) {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const next = String(formData.get("next") || "/admin");

  if (!email || !password) {
    return { error: "Please enter your email and password." };
  }

  const supabase = await createRscSupabaseClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: "Incorrect email or password." };
  }

  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function signOut() {
  const supabase = await createRscSupabaseClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function markSubmission(id: string, status: "read" | "resolved" | "unread") {
  const supabase = await createRscSupabaseClient();
  const { error } = await supabase.from("contact_submissions").update({ status }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/submissions");
}

export async function deleteSubmission(id: string) {
  const supabase = await createRscSupabaseClient();
  const { error } = await supabase.from("contact_submissions").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/submissions");
}

export async function updateSiteSettings(_prevState: unknown, formData: FormData) {
  const supabase = await createRscSupabaseClient();

  const bankUk = {
    region: "UNITED KINGDOM",
    country: "UK Account",
    currency: "GBP £",
    rows: [
      ["Account name", String(formData.get("bank_uk_account_name") || "")],
      ["Bank name", String(formData.get("bank_uk_bank_name") || "")],
      ["Sort code", String(formData.get("bank_uk_sort_code") || "")],
      ["Account number", String(formData.get("bank_uk_account_number") || "")],
      ["IBAN", String(formData.get("bank_uk_iban") || "")],
      ["SWIFT / BIC", String(formData.get("bank_uk_swift") || "")],
    ],
  };

  const bankNg = {
    region: "NIGERIA",
    country: "Nigeria Account",
    currency: "NGN ₦",
    rows: [
      ["Account name", String(formData.get("bank_ng_account_name") || "")],
      ["Bank name", String(formData.get("bank_ng_bank_name") || "")],
      ["Account number", String(formData.get("bank_ng_account_number") || "")],
      ["Account type", String(formData.get("bank_ng_account_type") || "")],
      ["SWIFT / BIC", String(formData.get("bank_ng_swift") || "")],
    ],
  };

  const { error } = await supabase
    .from("site_settings")
    .update({
      org_name: String(formData.get("org_name") || ""),
      tagline: String(formData.get("tagline") || ""),
      contact_email: String(formData.get("contact_email") || ""),
      phone: String(formData.get("phone") || ""),
      address: String(formData.get("address") || ""),
      instagram_url: String(formData.get("instagram_url") || ""),
      facebook_url: String(formData.get("facebook_url") || ""),
      twitter_url: String(formData.get("twitter_url") || ""),
      default_seo_title: String(formData.get("default_seo_title") || ""),
      default_seo_description: String(formData.get("default_seo_description") || ""),
      google_site_verification: String(formData.get("google_site_verification") || ""),
      bing_site_verification: String(formData.get("bing_site_verification") || ""),
      whatsapp_number: String(formData.get("whatsapp_number") || ""),
      whatsapp_message: String(formData.get("whatsapp_message") || ""),
      bank_uk: bankUk,
      bank_ng: bankNg,
      updated_at: new Date().toISOString(),
    })
    .eq("id", 1);

  if (error) return { error: error.message };

  revalidatePath("/admin/settings");
  revalidatePath("/");
  revalidatePath("/support");
  revalidatePath("/contact");
  return { success: true };
}

// ---------- Hero slides ----------

export async function createHeroSlide(formData: FormData) {
  const supabase = await createRscSupabaseClient();
  const { count } = await supabase.from("hero_slides").select("id", { count: "exact", head: true });
  const { error } = await supabase.from("hero_slides").insert({
    image_url: String(formData.get("image_url") || ""),
    alt: String(formData.get("alt") || ""),
    sort_order: count ?? 0,
    published: true,
  });
  if (error) throw new Error(error.message);
  revalidatePath("/admin/slider");
  revalidatePath("/");
}

export async function updateHeroSlide(id: string, formData: FormData) {
  const supabase = await createRscSupabaseClient();
  const { error } = await supabase
    .from("hero_slides")
    .update({
      image_url: String(formData.get("image_url") || ""),
      alt: String(formData.get("alt") || ""),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/slider");
  revalidatePath("/");
}

export async function toggleHeroSlidePublished(id: string, published: boolean) {
  const supabase = await createRscSupabaseClient();
  const { error } = await supabase.from("hero_slides").update({ published }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/slider");
  revalidatePath("/");
}

export async function deleteHeroSlide(id: string) {
  const supabase = await createRscSupabaseClient();
  const { error } = await supabase.from("hero_slides").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/slider");
  revalidatePath("/");
}

export async function reorderHeroSlide(id: string, direction: "up" | "down", slideIds: string[]) {
  const supabase = await createRscSupabaseClient();
  const index = slideIds.indexOf(id);
  const swapWith = direction === "up" ? index - 1 : index + 1;
  if (swapWith < 0 || swapWith >= slideIds.length) return;
  const otherId = slideIds[swapWith];

  await Promise.all([
    supabase.from("hero_slides").update({ sort_order: swapWith }).eq("id", id),
    supabase.from("hero_slides").update({ sort_order: index }).eq("id", otherId),
  ]);
  revalidatePath("/admin/slider");
  revalidatePath("/");
}

// ---------- Gallery ----------

export async function createGalleryAlbum(formData: FormData) {
  const supabase = await createRscSupabaseClient();
  const { count } = await supabase.from("gallery_albums").select("id", { count: "exact", head: true });
  const { error } = await supabase.from("gallery_albums").insert({
    year: String(formData.get("year") || ""),
    title: String(formData.get("title") || ""),
    sort_order: count ?? 0,
  });
  if (error) throw new Error(error.message);
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}

export async function deleteGalleryAlbum(id: string) {
  const supabase = await createRscSupabaseClient();
  const { error } = await supabase.from("gallery_albums").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}

export async function reorderGalleryAlbum(id: string, direction: "up" | "down", albumIds: string[]) {
  const supabase = await createRscSupabaseClient();
  const index = albumIds.indexOf(id);
  const swapWith = direction === "up" ? index - 1 : index + 1;
  if (swapWith < 0 || swapWith >= albumIds.length) return;
  const otherId = albumIds[swapWith];

  await Promise.all([
    supabase.from("gallery_albums").update({ sort_order: swapWith }).eq("id", id),
    supabase.from("gallery_albums").update({ sort_order: index }).eq("id", otherId),
  ]);
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}

export async function addGalleryImage(albumId: string, imageUrl: string, alt: string) {
  const supabase = await createRscSupabaseClient();
  const { count } = await supabase
    .from("gallery_images")
    .select("id", { count: "exact", head: true })
    .eq("album_id", albumId);
  const { error } = await supabase.from("gallery_images").insert({
    album_id: albumId,
    image_url: imageUrl,
    alt,
    sort_order: count ?? 0,
    published: true,
  });
  if (error) throw new Error(error.message);
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  revalidatePath("/");
}

export async function updateGalleryImageAlt(id: string, alt: string) {
  const supabase = await createRscSupabaseClient();
  const { error } = await supabase.from("gallery_images").update({ alt }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}

export async function toggleGalleryImagePublished(id: string, published: boolean) {
  const supabase = await createRscSupabaseClient();
  const { error } = await supabase.from("gallery_images").update({ published }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}

export async function deleteGalleryImage(id: string) {
  const supabase = await createRscSupabaseClient();
  const { error } = await supabase.from("gallery_images").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}

export async function reorderGalleryImage(id: string, direction: "up" | "down", imageIds: string[]) {
  const supabase = await createRscSupabaseClient();
  const index = imageIds.indexOf(id);
  const swapWith = direction === "up" ? index - 1 : index + 1;
  if (swapWith < 0 || swapWith >= imageIds.length) return;
  const otherId = imageIds[swapWith];

  await Promise.all([
    supabase.from("gallery_images").update({ sort_order: swapWith }).eq("id", id),
    supabase.from("gallery_images").update({ sort_order: index }).eq("id", otherId),
  ]);
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}

// ---------- Blog ----------

export async function createBlogPost(_prevState: unknown, formData: FormData) {
  const supabase = await createRscSupabaseClient();

  const slug = String(formData.get("slug") || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const status = String(formData.get("status") || "draft") as "draft" | "published" | "scheduled";
  const scheduledFor = String(formData.get("published_at") || "");

  const { data, error } = await supabase
    .from("blog_posts")
    .insert({
      slug,
      title: String(formData.get("title") || ""),
      excerpt: String(formData.get("excerpt") || ""),
      content: String(formData.get("content") || ""),
      featured_image: String(formData.get("featured_image") || ""),
      tags: String(formData.get("tags") || "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      status,
      seo_title: String(formData.get("seo_title") || ""),
      seo_description: String(formData.get("seo_description") || ""),
      author: String(formData.get("author") || ""),
      published_at: status === "draft" ? null : scheduledFor ? new Date(scheduledFor).toISOString() : new Date().toISOString(),
    })
    .select("id")
    .single();

  if (error) return { error: error.message };

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  redirect(`/admin/blog/${data.id}`);
}

export async function updateBlogPost(id: string, _prevState: unknown, formData: FormData) {
  const supabase = await createRscSupabaseClient();

  const slug = String(formData.get("slug") || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const status = String(formData.get("status") || "draft") as "draft" | "published" | "scheduled";
  const scheduledFor = String(formData.get("published_at") || "");

  const { error } = await supabase
    .from("blog_posts")
    .update({
      slug,
      title: String(formData.get("title") || ""),
      excerpt: String(formData.get("excerpt") || ""),
      content: String(formData.get("content") || ""),
      featured_image: String(formData.get("featured_image") || ""),
      tags: String(formData.get("tags") || "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      status,
      seo_title: String(formData.get("seo_title") || ""),
      seo_description: String(formData.get("seo_description") || ""),
      author: String(formData.get("author") || ""),
      published_at: status === "draft" ? null : scheduledFor ? new Date(scheduledFor).toISOString() : new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/blog");
  revalidatePath(`/admin/blog/${id}`);
  revalidatePath("/blog");
  return { success: true };
}

export async function deleteBlogPost(id: string) {
  const supabase = await createRscSupabaseClient();
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}

// ---------- Projects ----------

function parseLines(value: string): string[] {
  return value
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

function parseActivities(value: string): { t: string; d: string; s: string }[] {
  return parseLines(value)
    .map((line) => {
      const [t, d, s] = line.split("|").map((part) => part.trim());
      return t ? { t, d: d || "", s: s || "Planned" } : null;
    })
    .filter((a): a is { t: string; d: string; s: string } => a !== null);
}

function parsePhotos(value: string): { src: string; alt: string; pos: string }[] {
  return parseLines(value)
    .map((line) => {
      const [src, alt] = line.split("|").map((part) => part.trim());
      return src ? { src, alt: alt || "", pos: "50% 50%" } : null;
    })
    .filter((p): p is { src: string; alt: string; pos: string } => p !== null);
}

function buildProjectPayload(formData: FormData) {
  return {
    slug: String(formData.get("slug") || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, ""),
    cat: String(formData.get("cat") || ""),
    word: String(formData.get("word") || ""),
    title: String(formData.get("title") || ""),
    summary: String(formData.get("summary") || ""),
    img: String(formData.get("img") || ""),
    img_pos: String(formData.get("img_pos") || "50% 50%"),
    alt: String(formData.get("alt") || ""),
    hero: String(formData.get("hero") || ""),
    hero_pos: String(formData.get("hero_pos") || "50% 50%"),
    hero_alt: String(formData.get("hero_alt") || ""),
    tint: String(formData.get("tint") || "lav"),
    amount: String(formData.get("amount") || ""),
    amount_label: String(formData.get("amount_label") || ""),
    lead: String(formData.get("lead") || ""),
    overview: String(formData.get("overview") || ""),
    problem: String(formData.get("problem") || ""),
    objectives: parseLines(String(formData.get("objectives") || "")),
    activities: parseActivities(String(formData.get("activities") || "")),
    beneficiaries: String(formData.get("beneficiaries") || ""),
    quote: String(formData.get("quote") || ""),
    photos: parsePhotos(String(formData.get("photos") || "")),
    give: String(formData.get("give") || "donate"),
    published: formData.get("published") === "on",
  };
}

export async function createProject(_prevState: unknown, formData: FormData) {
  const supabase = await createRscSupabaseClient();
  const { count } = await supabase.from("projects").select("id", { count: "exact", head: true });
  const { error } = await supabase.from("projects").insert({ ...buildProjectPayload(formData), sort_order: count ?? 0 });
  if (error) return { error: error.message };
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  redirect("/admin/projects");
}

export async function updateProject(id: string, _prevState: unknown, formData: FormData) {
  const supabase = await createRscSupabaseClient();
  const { error } = await supabase
    .from("projects")
    .update({ ...buildProjectPayload(formData), updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath(`/projects/${String(formData.get("slug") || "")}`);
  return { success: true };
}

export async function deleteProject(id: string) {
  const supabase = await createRscSupabaseClient();
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
}
