"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { signIn } from "@/app/admin/actions";

export default function AdminLoginPage() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/admin";
  const [state, formAction, pending] = useActionState(signIn, null);

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-6">
      <div className="w-full max-w-[400px]">
        <div className="mb-8 flex justify-center">
          <Image src="/images/logo-color.png" alt="Florence Foundation" width={180} height={48} className="h-11 w-auto" />
        </div>
        <div className="rounded-[28px] bg-white p-8 shadow-lg">
          <h1 className="mb-2 font-heading text-2xl font-extrabold text-ink-900">Admin sign in</h1>
          <p className="mb-6 text-sm text-ink-600">Sign in to manage site content.</p>
          <form action={formAction} className="flex flex-col gap-4">
            <input type="hidden" name="next" value={next} />
            {state?.error && (
              <div role="alert" className="rounded-xl border-[1.5px] border-accent-500 bg-accent-50 px-4 py-3 text-sm text-accent-900">
                {state.error}
              </div>
            )}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-heading text-sm font-bold text-ink-900">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="h-12 rounded-xl border-[1.5px] border-border-2 px-4 text-base outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-50"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="font-heading text-sm font-bold text-ink-900">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="h-12 rounded-xl border-[1.5px] border-border-2 px-4 text-base outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-50"
              />
            </div>
            <button
              type="submit"
              disabled={pending}
              className="mt-2 h-12 rounded-full bg-brand-500 font-heading text-base font-bold text-white transition hover:bg-brand-600 disabled:opacity-60"
            >
              {pending ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
