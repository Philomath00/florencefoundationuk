"use client";

import { useActionState, useState } from "react";
import ImageUploader from "@/components/admin/ImageUploader";
import { createBlogPost, updateBlogPost, deleteBlogPost } from "@/app/admin/actions";

type Post = {
  id?: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  featured_image: string | null;
  tags: string[] | null;
  status: "draft" | "published" | "scheduled";
  seo_title: string | null;
  seo_description: string | null;
  author: string | null;
  published_at: string | null;
};

export default function BlogPostForm({ post }: { post?: Post }) {
  const isEdit = Boolean(post?.id);
  const action = isEdit ? updateBlogPost.bind(null, post!.id!) : createBlogPost;
  const [state, formAction, pending] = useActionState(action, null);
  const [featuredImage, setFeaturedImage] = useState(post?.featured_image || "");
  const [status, setStatus] = useState(post?.status || "draft");

  return (
    <form action={formAction} className="flex flex-col gap-6">
      {state?.error && (
        <div role="alert" className="rounded-xl border-[1.5px] border-accent-500 bg-accent-50 px-4 py-3 text-sm text-accent-900">
          {state.error}
        </div>
      )}
      {state?.success && (
        <div role="status" className="rounded-xl border-[1.5px] border-brand-300 bg-brand-50 px-4 py-3 text-sm text-brand-700">
          Saved.
        </div>
      )}

      <input type="hidden" name="featured_image" value={featuredImage} />

      <section className="rounded-2xl border border-border bg-white p-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-ink-700">Title</label>
            <input name="title" required defaultValue={post?.title} className="h-11 rounded-xl border-[1.5px] border-border-2 px-3.5 text-base outline-none focus:border-brand-500" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-ink-700">Slug (URL)</label>
            <input name="slug" required defaultValue={post?.slug} placeholder="my-first-post" className="h-11 rounded-xl border-[1.5px] border-border-2 px-3.5 text-sm font-mono outline-none focus:border-brand-500" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-ink-700">Excerpt</label>
            <textarea name="excerpt" rows={2} defaultValue={post?.excerpt ?? ""} className="rounded-xl border-[1.5px] border-border-2 px-3.5 py-2.5 text-sm outline-none focus:border-brand-500" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-ink-700">Featured image</label>
            {featuredImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={featuredImage} alt="" className="mb-2 h-40 w-full rounded-xl object-cover" />
            )}
            <ImageUploader pathPrefix="blog" label="Uploading image" onUploaded={setFeaturedImage} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-ink-700">Content (Markdown)</label>
            <textarea
              name="content"
              required
              rows={16}
              defaultValue={post?.content}
              className="rounded-xl border-[1.5px] border-border-2 px-3.5 py-2.5 font-mono text-sm leading-relaxed outline-none focus:border-brand-500"
            />
            <p className="text-xs text-ink-600">
              Supports Markdown: **bold**, *italic*, # headings, [links](url), lists, etc.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-white p-6">
        <h2 className="mb-4 font-heading text-lg font-extrabold text-ink-900">Publishing</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-ink-700">Status</label>
            <select
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as Post["status"])}
              className="h-11 rounded-xl border-[1.5px] border-border-2 px-3.5 text-sm outline-none focus:border-brand-500"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="scheduled">Scheduled</option>
            </select>
          </div>
          {status === "scheduled" && (
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-ink-700">Publish date</label>
              <input
                type="datetime-local"
                name="published_at"
                defaultValue={post?.published_at ? post.published_at.slice(0, 16) : ""}
                className="h-11 rounded-xl border-[1.5px] border-border-2 px-3.5 text-sm outline-none focus:border-brand-500"
              />
            </div>
          )}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-ink-700">Author</label>
            <input name="author" defaultValue={post?.author ?? ""} className="h-11 rounded-xl border-[1.5px] border-border-2 px-3.5 text-sm outline-none focus:border-brand-500" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-ink-700">Tags (comma separated)</label>
            <input name="tags" defaultValue={post?.tags?.join(", ") ?? ""} className="h-11 rounded-xl border-[1.5px] border-border-2 px-3.5 text-sm outline-none focus:border-brand-500" />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-white p-6">
        <h2 className="mb-4 font-heading text-lg font-extrabold text-ink-900">SEO</h2>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-ink-700">SEO title</label>
            <input name="seo_title" defaultValue={post?.seo_title ?? ""} className="h-11 rounded-xl border-[1.5px] border-border-2 px-3.5 text-sm outline-none focus:border-brand-500" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-ink-700">SEO description</label>
            <textarea name="seo_description" rows={2} defaultValue={post?.seo_description ?? ""} className="rounded-xl border-[1.5px] border-border-2 px-3.5 py-2.5 text-sm outline-none focus:border-brand-500" />
          </div>
        </div>
      </section>

      <div className="flex items-center gap-4">
        <button type="submit" disabled={pending} className="rounded-full bg-brand-500 px-8 py-3.5 font-heading text-base font-bold text-white hover:bg-brand-600 disabled:opacity-60">
          {pending ? "Saving…" : isEdit ? "Save changes" : "Create post"}
        </button>
        {isEdit && (
          <button
            type="button"
            onClick={() => {
              if (confirm("Delete this post permanently?")) deleteBlogPost(post!.id!);
            }}
            className="text-sm font-semibold text-ink-600 hover:text-accent-900"
          >
            Delete post
          </button>
        )}
      </div>
    </form>
  );
}
