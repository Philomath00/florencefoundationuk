import { getSupabaseServer, isSupabaseConfigured } from "@/lib/supabase/server";
import { siteConfig as staticSiteConfig, bankAccounts as staticBankAccounts } from "@/content/site";

export type BankAccount = {
  key: string;
  region: string;
  country: string;
  currency: string;
  rows: [string, string][];
};

export type ResolvedSiteSettings = {
  name: string;
  tagline: string;
  url: string;
  email: string;
  phone: string;
  address: string;
  social: { instagram: string; instagramHandle: string };
  defaultTitle: string;
  defaultDescription: string;
  bankAccounts: BankAccount[];
  googleSiteVerification: string;
  bingSiteVerification: string;
  whatsappNumber: string;
  whatsappMessage: string;
};

/** Pulls "handle" out of an https://instagram.com/handle URL, trailing slash and all. */
function instagramHandleFromUrl(url: string): string {
  const match = url.match(/instagram\.com\/([^/?#]+)/i);
  return match ? `@${match[1]}` : "";
}

function fallbackSettings(): ResolvedSiteSettings {
  return {
    name: staticSiteConfig.name,
    tagline: staticSiteConfig.tagline,
    url: staticSiteConfig.url,
    email: staticSiteConfig.email,
    phone: staticSiteConfig.phone,
    address: staticSiteConfig.address,
    social: {
      instagram: staticSiteConfig.social.instagram,
      instagramHandle: instagramHandleFromUrl(staticSiteConfig.social.instagram),
    },
    defaultTitle: staticSiteConfig.defaultTitle,
    defaultDescription: staticSiteConfig.defaultDescription,
    bankAccounts: staticBankAccounts.map((b) => ({ ...b, rows: b.rows.map(([k, v]) => [k, v]) })),
    googleSiteVerification: "",
    bingSiteVerification: "",
    whatsappNumber: "",
    whatsappMessage: "Thank you for reaching out to Florence Foundation. We welcome your Support",
  };
}

type SiteSettingsRow = {
  org_name: string;
  tagline: string;
  contact_email: string;
  phone: string | null;
  address: string | null;
  instagram_url: string | null;
  default_seo_title: string | null;
  default_seo_description: string | null;
  bank_uk: { region: string; country: string; currency: string; rows: [string, string][] } | null;
  bank_ng: { region: string; country: string; currency: string; rows: [string, string][] } | null;
  google_site_verification: string | null;
  bing_site_verification: string | null;
  whatsapp_number: string | null;
  whatsapp_message: string | null;
};

/**
 * Site-wide settings, editable from /admin/settings. Falls back to the
 * static defaults in src/content/site.ts if Supabase isn't configured or
 * the query fails, so the public site never breaks because of this.
 */
export async function getSiteSettings(): Promise<ResolvedSiteSettings> {
  if (!isSupabaseConfigured()) return fallbackSettings();

  try {
    const supabase = getSupabaseServer();
    const { data, error } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle<SiteSettingsRow>();
    if (error || !data) return fallbackSettings();

    const fallback = fallbackSettings();
    const bankAccounts: BankAccount[] = [];
    if (data.bank_uk) bankAccounts.push({ key: "uk", ...data.bank_uk });
    if (data.bank_ng) bankAccounts.push({ key: "ng", ...data.bank_ng });

    return {
      name: data.org_name || fallback.name,
      tagline: data.tagline || fallback.tagline,
      url: fallback.url,
      email: data.contact_email || fallback.email,
      phone: data.phone || fallback.phone,
      address: data.address || fallback.address,
      social: {
        instagram: data.instagram_url || fallback.social.instagram,
        instagramHandle: instagramHandleFromUrl(data.instagram_url || fallback.social.instagram),
      },
      defaultTitle: data.default_seo_title || fallback.defaultTitle,
      defaultDescription: data.default_seo_description || fallback.defaultDescription,
      bankAccounts: bankAccounts.length ? bankAccounts : fallback.bankAccounts,
      googleSiteVerification: data.google_site_verification || "",
      bingSiteVerification: data.bing_site_verification || "",
      whatsappNumber: data.whatsapp_number || "",
      whatsappMessage: data.whatsapp_message || fallback.whatsappMessage,
    };
  } catch {
    return fallbackSettings();
  }
}
