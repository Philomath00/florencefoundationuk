import "server-only";
import { Resend } from "resend";

let client: Resend | null = null;

export function getResend(): Resend {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    throw new Error("RESEND_API_KEY is not set. See .env.example.");
  }
  if (!client) client = new Resend(key);
  return client;
}

export function isResendConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}
