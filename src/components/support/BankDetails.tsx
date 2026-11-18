"use client";

import { useState } from "react";
import type { BankAccount } from "@/lib/site-settings";

export default function BankDetails({ bankAccounts }: { bankAccounts: BankAccount[] }) {
  const [copied, setCopied] = useState("");
  const [msg, setMsg] = useState("");

  const copy = async (id: string, label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      /* clipboard unavailable */
    }
    setCopied(id);
    setMsg(`${label} copied to clipboard.`);
    window.setTimeout(() => {
      setCopied("");
      setMsg("");
    }, 2200);
  };

  return (
    <>
      <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr))]">
        {bankAccounts.map((b) => (
          <article key={b.key} aria-label={`${b.country} bank details`} className="overflow-hidden rounded-[28px] border-[1.5px] border-border bg-white">
            <header
              className={`flex items-center justify-between gap-4 px-7 py-6 ${
                b.key === "uk" ? "bg-brand-500 text-white" : "bg-accent-300 text-ink-900"
              }`}
            >
              <div>
                <p className="mb-1 font-heading text-xs font-bold tracking-[0.16em] opacity-85">{b.region}</p>
                <h3 className="m-0 font-heading text-2xl font-extrabold">{b.country}</h3>
              </div>
              <span className="rounded-full bg-white/[0.22] px-3.5 py-2 font-heading text-[15px] font-extrabold">
                {b.currency}
              </span>
            </header>
            <dl className="m-0 px-7 pt-2 pb-5">
              {b.rows.map(([k, v], i) => {
                const id = b.key + i;
                return (
                  <div key={k} className="grid grid-cols-[minmax(110px,0.8fr)_minmax(0,1.4fr)_auto] items-center gap-3 border-b border-border-4 py-3.5">
                    <dt className="text-sm text-ink-600">{k}</dt>
                    <dd className="m-0 overflow-hidden font-heading text-base font-bold break-words text-ink-900">{v}</dd>
                    <button
                      type="button"
                      onClick={() => copy(id, k, v)}
                      aria-label={`Copy ${k}`}
                      className="h-[38px] min-w-[76px] rounded-full border-[1.5px] border-border-2 bg-white px-3 font-heading text-[13px] font-bold text-brand-700 hover:border-brand-300 hover:bg-brand-50"
                    >
                      {copied === id ? "Copied" : "Copy"}
                    </button>
                  </div>
                );
              })}
            </dl>
          </article>
        ))}
      </div>
      <p aria-live="polite" className="mt-4 min-h-[22px] text-sm text-brand-700">
        {msg}
      </p>
    </>
  );
}
