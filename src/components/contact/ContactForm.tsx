"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { track } from "@vercel/analytics";

const enquiryTypes = [
  "General Enquiry",
  "Donation Enquiry",
  "Sponsorship",
  "Partnership",
  "Donate Goods",
  "Other",
] as const;

const enquiryParamMap: Record<string, (typeof enquiryTypes)[number]> = {
  "donate-goods": "Donate Goods",
  sponsorship: "Sponsorship",
  partnership: "Partnership",
  donation: "Donation Enquiry",
};

type FormState = {
  name: string;
  email: string;
  phone: string;
  type: (typeof enquiryTypes)[number];
  message: string;
  consent: boolean;
  company: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  type: "General Enquiry",
  message: "",
  consent: false,
  company: "",
};

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const searchParams = useSearchParams();
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const enquiry = searchParams.get("enquiry");
    if (enquiry && enquiryParamMap[enquiry]) {
      setForm((f) => ({ ...f, type: enquiryParamMap[enquiry] }));
    }
  }, [searchParams]);

  const set = <K extends keyof FormState>(key: K) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const value = key === "consent" ? (e.target as HTMLInputElement).checked : e.target.value;
    setForm((f) => ({ ...f, [key]: value }) as FormState);
    setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const validate = (f: FormState) => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!f.name.trim()) e.name = "Please enter your full name.";
    if (!f.email.trim()) e.email = "Please enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = "Please enter a valid email address.";
    if (!f.message.trim()) e.message = "Please enter a message.";
    if (!f.consent) e.consent = "Please confirm you agree before sending.";
    return e;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const fieldErrors = validate(form);
    if (Object.keys(fieldErrors).length) {
      setErrors(fieldErrors);
      setStatus("error");
      setErrorMsg("Please check the highlighted fields.");
      const firstKey = Object.keys(fieldErrors)[0];
      document.getElementById(`f-${firstKey === "message" ? "msg" : firstKey}`)?.focus();
      return;
    }

    setStatus("sending");
    setErrors({});
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Sorry, your message could not be sent.");
      }
      setStatus("success");
      track("contact_form_submitted", { enquiry_type: form.type });
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Sorry, your message could not be sent. Please try again or email info@florencefoundation.co.uk.",
      );
    }
  };

  const reset = () => {
    setForm(initialForm);
    setErrors({});
    setStatus("idle");
  };

  const fieldBorder = (key: keyof FormState) => (errors[key] ? "border-accent-700" : "border-border-2");

  if (status === "success") {
    return (
      <div role="status" className="rounded-[28px] bg-brand-50 p-10">
        <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-brand-500 text-white">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <h3 className="mb-2.5 font-heading text-2xl font-extrabold text-ink-900">Thank you, your message has been sent.</h3>
        <p className="mb-6 text-base leading-relaxed text-ink-700">A member of the Florence Foundation team will reply to you by email.</p>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-2.5 rounded-full border-2 border-accent-300 bg-white px-6 py-3.5 font-heading text-[15px] font-bold text-ink-900 hover:bg-accent-50"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate aria-describedby="req-note" className="grid gap-5 rounded-[28px] bg-surface p-[clamp(24px,3vw,40px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))]">
      <p id="req-note" className="col-span-full m-0 text-sm text-ink-600">
        Fields marked <span className="font-bold text-accent-800">*</span> are required.
      </p>

      {/* Honeypot field, hidden from sighted users and most bots that read styles */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor="f-company">Company</label>
        <input id="f-company" name="company" type="text" tabIndex={-1} autoComplete="off" value={form.company} onChange={set("company")} />
      </div>

      {status === "error" && (
        <div role="alert" className="col-span-full flex items-start gap-3 rounded-2xl border-[1.5px] border-accent-500 bg-accent-50 px-[18px] py-3.5 text-[15px] leading-snug text-accent-900">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" className="mt-0.5 flex-shrink-0">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4M12 16h.01" />
          </svg>
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <label htmlFor="f-name" className="font-heading text-sm font-bold text-ink-900">
          Full name <span className="text-accent-800">*</span>
        </label>
        <input
          id="f-name"
          name="name"
          type="text"
          autoComplete="name"
          value={form.name}
          onChange={set("name")}
          aria-invalid={Boolean(errors.name)}
          aria-describedby="f-name-err"
          className={`h-[54px] rounded-2xl border-[1.5px] bg-white px-[18px] text-base text-ink-900 outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-50 ${fieldBorder("name")}`}
        />
        <span id="f-name-err" className="min-h-[1em] text-[13px] text-accent-800">{errors.name}</span>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="f-email" className="font-heading text-sm font-bold text-ink-900">
          Email address <span className="text-accent-800">*</span>
        </label>
        <input
          id="f-email"
          name="email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={set("email")}
          aria-invalid={Boolean(errors.email)}
          aria-describedby="f-email-err"
          className={`h-[54px] rounded-2xl border-[1.5px] bg-white px-[18px] text-base text-ink-900 outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-50 ${fieldBorder("email")}`}
        />
        <span id="f-email-err" className="text-[13px] text-accent-800">{errors.email}</span>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="f-phone" className="font-heading text-sm font-bold text-ink-900">
          Telephone <span className="font-medium text-ink-600">(optional)</span>
        </label>
        <input
          id="f-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          value={form.phone}
          onChange={set("phone")}
          className="h-[54px] rounded-2xl border-[1.5px] border-border-2 bg-white px-[18px] text-base text-ink-900 outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-50"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="f-type" className="font-heading text-sm font-bold text-ink-900">
          Enquiry type <span className="text-accent-800">*</span>
        </label>
        <select
          id="f-type"
          name="type"
          value={form.type}
          onChange={set("type")}
          className="h-[54px] cursor-pointer rounded-2xl border-[1.5px] border-border-2 bg-white px-[18px] text-base text-ink-900 outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-50"
        >
          {enquiryTypes.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div className="col-span-full flex flex-col gap-2">
        <label htmlFor="f-msg" className="font-heading text-sm font-bold text-ink-900">
          Message <span className="text-accent-800">*</span>
        </label>
        <textarea
          id="f-msg"
          name="message"
          rows={6}
          value={form.message}
          onChange={set("message")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby="f-msg-err"
          className={`rounded-2xl border-[1.5px] bg-white px-[18px] py-4 text-base leading-relaxed text-ink-900 outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-50 ${fieldBorder("message")}`}
        />
        <span id="f-msg-err" className="text-[13px] text-accent-800">{errors.message}</span>
      </div>

      <div className="col-span-full flex flex-col gap-2">
        <label className="flex cursor-pointer items-start gap-3 text-[15px] leading-snug text-ink-700">
          <input
            type="checkbox"
            checked={form.consent}
            onChange={set("consent")}
            aria-invalid={Boolean(errors.consent)}
            className="mt-0.5 h-[22px] w-[22px] flex-shrink-0 accent-brand-500"
          />
          <span>I agree that Florence Foundation may use these details to respond to my enquiry. <span className="text-accent-800">*</span></span>
        </label>
        <span className="text-[13px] text-accent-800">{errors.consent}</span>
      </div>

      <div className="col-span-full flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex min-h-14 items-center gap-3 rounded-full bg-brand-500 px-8 font-heading text-base font-bold text-white transition hover:bg-brand-600 disabled:opacity-60"
        >
          {status === "sending" && (
            <span aria-hidden="true" className="h-[18px] w-[18px] animate-spin rounded-full border-[2.5px] border-white/40 border-t-white" />
          )}
          {status === "sending" ? "Sending…" : "Send Message"}
        </button>
      </div>
    </form>
  );
}
