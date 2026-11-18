import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseServer, isSupabaseConfigured } from "@/lib/supabase/server";
import { getResend, isResendConfigured } from "@/lib/resend";
import { rateLimit } from "@/lib/rate-limit";
import { siteConfig } from "@/content/site";

export const runtime = "nodejs";

const enquiryTypes = [
  "General Enquiry",
  "Donation Enquiry",
  "Sponsorship",
  "Partnership",
  "Donate Goods",
  "Other",
] as const;

const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your full name.").max(200),
  email: z.string().trim().min(1, "Please enter your email address.").email("Please enter a valid email address."),
  phone: z.string().trim().max(50).optional().default(""),
  type: z.enum(enquiryTypes).default("General Enquiry"),
  message: z.string().trim().min(1, "Please enter a message.").max(5000),
  consent: z.literal(true, { message: "Please confirm you agree before sending." }),
  // Honeypot — real users never fill this; bots that autofill every field will.
  company: z.string().max(0, "Spam detected.").optional().default(""),
});

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const { ok } = rateLimit(`contact:${ip}`, 5, 10 * 60 * 1000);
  if (!ok) {
    return NextResponse.json(
      { success: false, message: "Too many requests. Please try again in a few minutes." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return NextResponse.json(
      { success: false, message: firstIssue?.message ?? "Please check the form and try again.", field: firstIssue?.path[0] },
      { status: 400 },
    );
  }

  const { name, email, phone, type, message } = parsed.data;

  // The message is saved to the database and/or emailed, independently —
  // a real enquiry should never be lost just because one channel isn't
  // configured yet. Overall success requires at least one to work.
  let saved = false;
  let emailed = false;

  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseServer();
      const { error } = await supabase.from("contact_submissions").insert({
        name,
        email,
        phone: phone || null,
        enquiry_type: type,
        message,
        status: "unread",
      });
      if (error) console.error("[contact] Supabase insert failed:", error.message);
      else saved = true;
    } catch (err) {
      console.error("[contact] Supabase insert threw:", err);
    }
  } else {
    console.warn("[contact] Supabase is not configured — submission was not saved to the database.");
  }

  if (isResendConfigured()) {
    try {
      const resend = getResend();
      const toAddress = process.env.CONTACT_RECIPIENT_EMAIL || siteConfig.email;
      await resend.emails.send({
        from: process.env.CONTACT_FROM_EMAIL || "Florence Foundation Website <onboarding@resend.dev>",
        to: toAddress,
        replyTo: email,
        subject: `Website enquiry: ${type} — ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "—"}\nEnquiry type: ${type}\n\n${message}`,
      });
      emailed = true;
    } catch (err) {
      console.error("[contact] Resend send failed:", err);
    }
  } else {
    console.warn("[contact] Resend is not configured — no notification email was sent.");
  }

  if (!saved && !emailed) {
    return NextResponse.json(
      {
        success: false,
        message: "Sorry, your message could not be sent. Please try again or email us directly.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true });
}
