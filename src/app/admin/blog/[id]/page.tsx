import { notFound } from "next/navigation";
import { createRscSupabaseClient } from "@/lib/supabase/rsc";
import BlogPostForm from "@/components/admin/BlogPostForm";

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createRscSupabaseClient();
  const { data: post } = await supabase.from("blog_posts").select("*").eq("id", id).maybeSingle();

  if (!post) notFound();

  return (
    <div>
      <h1 className="mb-6 font-heading text-2xl font-extrabold text-ink-900">Edit Post</h1>
      <BlogPostForm post={post} />
    </div>
  );
}
