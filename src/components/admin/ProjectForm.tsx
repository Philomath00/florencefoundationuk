"use client";

import { useActionState, useState } from "react";
import ImageUploader from "@/components/admin/ImageUploader";
import { createProject, updateProject, deleteProject } from "@/app/admin/actions";

type Activity = { t: string; d: string; s: string };
type Photo = { src: string; alt: string; pos: string };

type Project = {
  id?: string;
  slug: string;
  cat: string;
  word: string;
  title: string;
  summary: string;
  img: string;
  img_pos: string;
  alt: string;
  hero: string;
  hero_pos: string;
  hero_alt: string;
  tint: "lav" | "coral";
  amount: string;
  amount_label: string;
  lead: string;
  overview: string;
  problem: string;
  objectives: string[];
  activities: Activity[];
  beneficiaries: string;
  quote: string;
  photos: Photo[];
  give: "meals" | "sponsor" | "donate";
  published: boolean;
};

function Field({ label, name, defaultValue, hint }: { label: string; name: string; defaultValue?: string; hint?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-ink-700">{label}</label>
      <input name={name} defaultValue={defaultValue ?? ""} className="h-11 rounded-xl border-[1.5px] border-border-2 px-3.5 text-sm outline-none focus:border-brand-500" />
      {hint && <p className="text-xs text-ink-600">{hint}</p>}
    </div>
  );
}

function Area({ label, name, defaultValue, hint, rows = 3 }: { label: string; name: string; defaultValue?: string; hint?: string; rows?: number }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-ink-700">{label}</label>
      <textarea name={name} defaultValue={defaultValue ?? ""} rows={rows} className="rounded-xl border-[1.5px] border-border-2 px-3.5 py-2.5 text-sm leading-relaxed outline-none focus:border-brand-500" />
      {hint && <p className="text-xs text-ink-600">{hint}</p>}
    </div>
  );
}

export default function ProjectForm({ project }: { project?: Project }) {
  const isEdit = Boolean(project?.id);
  const action = isEdit ? updateProject.bind(null, project!.id!) : createProject;
  const [state, formAction, pending] = useActionState(action, null);
  const [img, setImg] = useState(project?.img || "");
  const [hero, setHero] = useState(project?.hero || "");

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

      <input type="hidden" name="img" value={img} />
      <input type="hidden" name="hero" value={hero} />

      <section className="rounded-2xl border border-border bg-white p-6">
        <h2 className="mb-4 font-heading text-lg font-extrabold text-ink-900">Basics</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Title" name="title" defaultValue={project?.title} />
          <Field label="Slug (URL)" name="slug" defaultValue={project?.slug} hint="/projects/your-slug" />
          <Field label="Category label" name="cat" defaultValue={project?.cat} />
          <Field label="Watermark word" name="word" defaultValue={project?.word} hint="Large decorative word on the hero, e.g. Hunger" />
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-ink-700">Accent tint</label>
            <select name="tint" defaultValue={project?.tint ?? "lav"} className="h-11 rounded-xl border-[1.5px] border-border-2 px-3.5 text-sm outline-none focus:border-brand-500">
              <option value="lav">Lavender (purple)</option>
              <option value="coral">Coral (pink)</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-ink-700">Give button links to</label>
            <select name="give" defaultValue={project?.give ?? "donate"} className="h-11 rounded-xl border-[1.5px] border-border-2 px-3.5 text-sm outline-none focus:border-brand-500">
              <option value="donate">Donate Now</option>
              <option value="meals">Support Meals</option>
              <option value="sponsor">Sponsor a Child</option>
            </select>
          </div>
        </div>
        <div className="mt-4">
          <Area label="Summary (shown on the projects grid)" name="summary" defaultValue={project?.summary} rows={2} />
        </div>
        <label className="mt-4 flex items-center gap-2 text-sm font-semibold text-ink-700">
          <input type="checkbox" name="published" defaultChecked={project?.published ?? true} className="h-4 w-4 accent-brand-500" />
          Published (visible on the public site)
        </label>
      </section>

      <section className="rounded-2xl border border-border bg-white p-6">
        <h2 className="mb-4 font-heading text-lg font-extrabold text-ink-900">Images</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold text-ink-700">Card / detail image</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {img && <img src={img} alt="" className="h-32 w-full rounded-xl object-cover" />}
            <ImageUploader pathPrefix="projects" label="Uploading image" onUploaded={setImg} />
            <Field label="Image position" name="img_pos" defaultValue={project?.img_pos ?? "50% 50%"} hint="e.g. 50% 30%" />
            <Field label="Alt text" name="alt" defaultValue={project?.alt} />
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold text-ink-700">Hero banner image</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {hero && <img src={hero} alt="" className="h-32 w-full rounded-xl object-cover" />}
            <ImageUploader pathPrefix="projects" label="Uploading image" onUploaded={setHero} />
            <Field label="Image position" name="hero_pos" defaultValue={project?.hero_pos ?? "50% 50%"} hint="e.g. 50% 20%" />
            <Field label="Alt text" name="hero_alt" defaultValue={project?.hero_alt} />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-white p-6">
        <h2 className="mb-4 font-heading text-lg font-extrabold text-ink-900">Giving</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Amount (e.g. £2)" name="amount" defaultValue={project?.amount} hint="Leave blank to hide the amount badge" />
          <Field label="Amount label" name="amount_label" defaultValue={project?.amount_label} />
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-white p-6">
        <h2 className="mb-4 font-heading text-lg font-extrabold text-ink-900">Article content</h2>
        <div className="flex flex-col gap-4">
          <Area label="Lead paragraph" name="lead" defaultValue={project?.lead} rows={2} />
          <Area label="Overview" name="overview" defaultValue={project?.overview} rows={3} />
          <Area label="The need" name="problem" defaultValue={project?.problem} rows={3} />
          <Area label="Who it supports" name="beneficiaries" defaultValue={project?.beneficiaries} rows={2} />
          <Area label="Pull quote" name="quote" defaultValue={project?.quote} rows={2} />
          <Area
            label="Objectives (one per line)"
            name="objectives"
            defaultValue={project?.objectives?.join("\n")}
            rows={4}
          />
          <Area
            label="Activities"
            name="activities"
            defaultValue={project?.activities?.map((a) => `${a.t} | ${a.d} | ${a.s}`).join("\n")}
            rows={5}
            hint="One per line: Title | Description | Status (Ongoing, Active appeal, or Planned)"
          />
          <Area
            label="Extra photos"
            name="photos"
            defaultValue={project?.photos?.map((p) => `${p.src} | ${p.alt}`).join("\n")}
            rows={3}
            hint="One per line: image URL | alt text. Upload images above first, then paste the URL here."
          />
        </div>
      </section>

      <div className="flex items-center gap-4">
        <button type="submit" disabled={pending} className="rounded-full bg-brand-500 px-8 py-3.5 font-heading text-base font-bold text-white hover:bg-brand-600 disabled:opacity-60">
          {pending ? "Saving…" : isEdit ? "Save changes" : "Create project"}
        </button>
        {isEdit && (
          <button
            type="button"
            onClick={() => {
              if (confirm("Delete this project permanently?")) deleteProject(project!.id!);
            }}
            className="text-sm font-semibold text-ink-600 hover:text-accent-900"
          >
            Delete project
          </button>
        )}
      </div>
    </form>
  );
}
