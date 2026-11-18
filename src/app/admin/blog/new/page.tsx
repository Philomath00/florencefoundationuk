import BlogPostForm from "@/components/admin/BlogPostForm";

export default function NewBlogPostPage() {
  return (
    <div>
      <h1 className="mb-6 font-heading text-2xl font-extrabold text-ink-900">New Post</h1>
      <BlogPostForm />
    </div>
  );
}
