"use client";

import { useState, useTransition } from "react";
import { markSubmission, deleteSubmission } from "@/app/admin/actions";

type Submission = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  enquiry_type: string;
  message: string;
  status: "unread" | "read" | "resolved";
  created_at: string;
};

const statusStyle: Record<Submission["status"], string> = {
  unread: "bg-brand-500 text-white",
  read: "bg-brand-50 text-brand-700",
  resolved: "bg-accent-50 text-accent-800",
};

export default function SubmissionRow({ submission }: { submission: Submission }) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const [deleted, setDeleted] = useState(false);

  if (deleted) return null;

  return (
    <li className="border-b border-border-4 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full flex-wrap items-center gap-4 px-5 py-4 text-left hover:bg-surface"
      >
        <span className={`rounded-full px-2.5 py-1 font-heading text-xs font-bold ${statusStyle[submission.status]}`}>
          {submission.status}
        </span>
        <span className="font-heading text-sm font-bold text-ink-900">{submission.name}</span>
        <span className="text-sm text-ink-600">{submission.email}</span>
        <span className="rounded-full bg-surface-alt px-2.5 py-1 text-xs font-semibold text-ink-700">
          {submission.enquiry_type}
        </span>
        <span className="ml-auto text-xs text-ink-600">
          {new Date(submission.created_at).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}
        </span>
      </button>

      {open && (
        <div className="border-t border-border-4 bg-surface px-5 py-4">
          <p className="mb-4 whitespace-pre-wrap text-sm leading-relaxed text-ink-900">{submission.message}</p>
          {submission.phone && <p className="mb-4 text-sm text-ink-600">Phone: {submission.phone}</p>}
          <div className="flex flex-wrap gap-2.5">
            <a
              href={`mailto:${submission.email}`}
              className="rounded-full border-[1.5px] border-border-2 bg-white px-4 py-2 text-sm font-semibold text-ink-900 hover:border-brand-300"
            >
              Reply by email
            </a>
            {submission.status !== "read" && (
              <button
                type="button"
                disabled={pending}
                onClick={() => startTransition(() => markSubmission(submission.id, "read"))}
                className="rounded-full border-[1.5px] border-border-2 bg-white px-4 py-2 text-sm font-semibold text-ink-900 hover:border-brand-300 disabled:opacity-50"
              >
                Mark as read
              </button>
            )}
            {submission.status !== "resolved" && (
              <button
                type="button"
                disabled={pending}
                onClick={() => startTransition(() => markSubmission(submission.id, "resolved"))}
                className="rounded-full border-[1.5px] border-accent-300 bg-accent-50 px-4 py-2 text-sm font-semibold text-accent-900 hover:bg-accent-200 disabled:opacity-50"
              >
                Mark as resolved
              </button>
            )}
            <button
              type="button"
              disabled={pending}
              onClick={() => {
                if (!confirm("Delete this submission permanently?")) return;
                setDeleted(true);
                startTransition(() => deleteSubmission(submission.id));
              }}
              className="ml-auto rounded-full px-4 py-2 text-sm font-semibold text-ink-600 hover:text-accent-900 disabled:opacity-50"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </li>
  );
}
