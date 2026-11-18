import { notFound } from "next/navigation";
import { createRscSupabaseClient } from "@/lib/supabase/rsc";
import ProjectForm from "@/components/admin/ProjectForm";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createRscSupabaseClient();
  const { data: project } = await supabase.from("projects").select("*").eq("id", id).maybeSingle();

  if (!project) notFound();

  return (
    <div>
      <h1 className="mb-6 font-heading text-2xl font-extrabold text-ink-900">Edit Project</h1>
      <ProjectForm project={project} />
    </div>
  );
}
