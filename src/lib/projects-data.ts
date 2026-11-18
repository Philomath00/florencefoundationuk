import { getSupabaseServer, isSupabaseConfigured } from "@/lib/supabase/server";
import { projects as staticProjects, type Project } from "@/content/projects";

type ProjectRow = {
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
  activities: { t: string; d: string; s: string }[];
  beneficiaries: string;
  quote: string;
  photos: { src: string; alt: string; pos: string }[];
  give: "meals" | "sponsor" | "donate";
};

function mapRow(row: ProjectRow): Project {
  return {
    slug: row.slug,
    cat: row.cat,
    word: row.word,
    title: row.title,
    summary: row.summary,
    img: row.img,
    pos: row.img_pos,
    alt: row.alt,
    hero: row.hero,
    heroPos: row.hero_pos,
    heroAlt: row.hero_alt,
    tint: row.tint,
    amount: row.amount,
    amountLabel: row.amount_label,
    lead: row.lead,
    overview: row.overview,
    problem: row.problem,
    objectives: row.objectives,
    activities: row.activities.map((a) => ({ ...a, s: a.s as "Ongoing" | "Active appeal" | "Planned" })),
    beneficiaries: row.beneficiaries,
    quote: row.quote,
    photos: row.photos,
    give: row.give,
  };
}

/** All published projects, DB-backed with a static fallback. */
export async function getAllProjects(): Promise<Project[]> {
  if (!isSupabaseConfigured()) return staticProjects;
  try {
    const supabase = getSupabaseServer();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true });
    if (error || !data || data.length === 0) return staticProjects;
    return data.map(mapRow);
  } catch {
    return staticProjects;
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const projects = await getAllProjects();
  return projects.find((p) => p.slug === slug);
}

export async function getRelatedProjects(slug: string, count = 3): Promise<Project[]> {
  const projects = await getAllProjects();
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) return [];
  return Array.from({ length: Math.min(count, projects.length - 1) }, (_, k) => projects[(i + k + 1) % projects.length]);
}
