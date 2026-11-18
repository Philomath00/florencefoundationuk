import { createRscSupabaseClient } from "@/lib/supabase/rsc";
import SubmissionRow from "@/components/admin/SubmissionRow";

export default async function AdminSubmissionsPage() {
  const supabase = await createRscSupabaseClient();
  const { data: submissions, error } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="mb-1 font-heading text-2xl font-extrabold text-ink-900">Contact Submissions</h1>
      <p className="mb-6 text-sm text-ink-600">Messages sent through the public contact form.</p>

      {error && <p className="text-sm text-accent-900">Failed to load submissions: {error.message}</p>}

      {!error && (!submissions || submissions.length === 0) && (
        <p className="rounded-2xl border border-border bg-white p-8 text-center text-sm text-ink-600">
          No submissions yet.
        </p>
      )}

      {submissions && submissions.length > 0 && (
        <ul className="overflow-hidden rounded-2xl border border-border bg-white">
          {submissions.map((s) => (
            <SubmissionRow key={s.id} submission={s} />
          ))}
        </ul>
      )}
    </div>
  );
}
