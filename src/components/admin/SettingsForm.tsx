"use client";

import { useActionState } from "react";
import { updateSiteSettings } from "@/app/admin/actions";

type BankInfo = { rows: [string, string][] };

type Settings = {
  org_name: string;
  tagline: string;
  contact_email: string;
  phone: string | null;
  address: string | null;
  instagram_url: string | null;
  facebook_url: string | null;
  twitter_url: string | null;
  default_seo_title: string | null;
  default_seo_description: string | null;
  google_site_verification: string | null;
  bing_site_verification: string | null;
  whatsapp_number: string | null;
  whatsapp_message: string | null;
  bank_uk: BankInfo | null;
  bank_ng: BankInfo | null;
};

function Field({
  label,
  name,
  defaultValue,
  type = "text",
}: {
  label: string;
  name: string;
  defaultValue?: string;
  type?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-semibold text-ink-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue ?? ""}
        className="h-11 rounded-xl border-[1.5px] border-border-2 px-3.5 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-50"
      />
    </div>
  );
}

function bankRow(bank: BankInfo | null, key: string, fallbackIndex: number) {
  const row = bank?.rows.find(([k]) => k.toLowerCase() === key.toLowerCase());
  return row?.[1] ?? bank?.rows[fallbackIndex]?.[1] ?? "";
}

export default function SettingsForm({ settings }: { settings: Settings }) {
  const [state, formAction, pending] = useActionState(updateSiteSettings, null);

  return (
    <form action={formAction} className="flex flex-col gap-8">
      {state?.error && (
        <div role="alert" className="rounded-xl border-[1.5px] border-accent-500 bg-accent-50 px-4 py-3 text-sm text-accent-900">
          {state.error}
        </div>
      )}
      {state?.success && (
        <div role="status" className="rounded-xl border-[1.5px] border-brand-300 bg-brand-50 px-4 py-3 text-sm text-brand-700">
          Settings saved.
        </div>
      )}

      <section className="rounded-2xl border border-border bg-white p-6">
        <h2 className="mb-4 font-heading text-lg font-extrabold text-ink-900">Organization</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Organization name" name="org_name" defaultValue={settings.org_name} />
          <Field label="Tagline" name="tagline" defaultValue={settings.tagline} />
          <Field label="Contact email" name="contact_email" defaultValue={settings.contact_email} type="email" />
          <Field label="Phone" name="phone" defaultValue={settings.phone ?? ""} />
          <Field label="Address" name="address" defaultValue={settings.address ?? ""} />
          <Field label="Instagram URL" name="instagram_url" defaultValue={settings.instagram_url ?? ""} />
          <Field label="Facebook URL" name="facebook_url" defaultValue={settings.facebook_url ?? ""} />
          <Field label="Twitter / X URL" name="twitter_url" defaultValue={settings.twitter_url ?? ""} />
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-white p-6">
        <h2 className="mb-4 font-heading text-lg font-extrabold text-ink-900">Default SEO</h2>
        <div className="flex flex-col gap-4">
          <Field label="Default SEO title" name="default_seo_title" defaultValue={settings.default_seo_title ?? ""} />
          <div className="flex flex-col gap-1.5">
            <label htmlFor="default_seo_description" className="text-sm font-semibold text-ink-700">
              Default SEO description
            </label>
            <textarea
              id="default_seo_description"
              name="default_seo_description"
              defaultValue={settings.default_seo_description ?? ""}
              rows={3}
              className="rounded-xl border-[1.5px] border-border-2 px-3.5 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-50"
            />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-white p-6">
        <h2 className="mb-1 font-heading text-lg font-extrabold text-ink-900">Search engine verification</h2>
        <p className="mb-4 text-sm text-ink-600">
          Paste the verification code Google Search Console / Bing Webmaster Tools gives you when
          you add this site there — no redeploy needed, it takes effect immediately.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field
            label="Google Search Console verification code"
            name="google_site_verification"
            defaultValue={settings.google_site_verification ?? ""}
          />
          <Field
            label="Bing Webmaster Tools verification code"
            name="bing_site_verification"
            defaultValue={settings.bing_site_verification ?? ""}
          />
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-white p-6">
        <h2 className="mb-1 font-heading text-lg font-extrabold text-ink-900">WhatsApp button</h2>
        <p className="mb-4 text-sm text-ink-600">
          Shows a floating WhatsApp button on every page. Leave the number blank to hide it.
        </p>
        <div className="flex flex-col gap-4">
          <Field
            label="WhatsApp number (with country code, e.g. 447700900000 — no + or spaces)"
            name="whatsapp_number"
            defaultValue={settings.whatsapp_number ?? ""}
          />
          <div className="flex flex-col gap-1.5">
            <label htmlFor="whatsapp_message" className="text-sm font-semibold text-ink-700">
              Default message
            </label>
            <textarea
              id="whatsapp_message"
              name="whatsapp_message"
              defaultValue={settings.whatsapp_message ?? ""}
              rows={2}
              className="rounded-xl border-[1.5px] border-border-2 px-3.5 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-50"
            />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-white p-6">
        <h2 className="mb-1 font-heading text-lg font-extrabold text-ink-900">UK bank account</h2>
        <p className="mb-4 text-sm text-ink-600">Shown on /support for bank transfer donations.</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Account name" name="bank_uk_account_name" defaultValue={bankRow(settings.bank_uk, "Account name", 0)} />
          <Field label="Bank name" name="bank_uk_bank_name" defaultValue={bankRow(settings.bank_uk, "Bank name", 1)} />
          <Field label="Sort code" name="bank_uk_sort_code" defaultValue={bankRow(settings.bank_uk, "Sort code", 2)} />
          <Field label="Account number" name="bank_uk_account_number" defaultValue={bankRow(settings.bank_uk, "Account number", 3)} />
          <Field label="IBAN" name="bank_uk_iban" defaultValue={bankRow(settings.bank_uk, "IBAN", 4)} />
          <Field label="SWIFT / BIC" name="bank_uk_swift" defaultValue={bankRow(settings.bank_uk, "SWIFT / BIC", 5)} />
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-white p-6">
        <h2 className="mb-1 font-heading text-lg font-extrabold text-ink-900">Nigeria bank account</h2>
        <p className="mb-4 text-sm text-ink-600">Shown on /support for bank transfer donations.</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Account name" name="bank_ng_account_name" defaultValue={bankRow(settings.bank_ng, "Account name", 0)} />
          <Field label="Bank name" name="bank_ng_bank_name" defaultValue={bankRow(settings.bank_ng, "Bank name", 1)} />
          <Field label="Account number" name="bank_ng_account_number" defaultValue={bankRow(settings.bank_ng, "Account number", 2)} />
          <Field label="Account type" name="bank_ng_account_type" defaultValue={bankRow(settings.bank_ng, "Account type", 3)} />
          <Field label="SWIFT / BIC" name="bank_ng_swift" defaultValue={bankRow(settings.bank_ng, "SWIFT / BIC", 4)} />
        </div>
      </section>

      <div>
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-brand-500 px-8 py-3.5 font-heading text-base font-bold text-white transition hover:bg-brand-600 disabled:opacity-60"
        >
          {pending ? "Saving…" : "Save settings"}
        </button>
      </div>
    </form>
  );
}
