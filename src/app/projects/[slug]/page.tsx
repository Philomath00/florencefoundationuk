import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import PillLink from "@/components/ui/PillLink";
import CtaBand from "@/components/ui/CtaBand";
import { getProject, giveCta, projects, relatedProjects, type ProjectActivity } from "@/content/projects";

const heroGradient: Record<string, string> = {
  lav: "linear-gradient(90deg,rgba(36,34,44,0.8) 0%,rgba(36,34,44,0.4) 45%,rgba(106,98,214,0.6) 100%)",
  coral: "linear-gradient(90deg,rgba(36,34,44,0.8) 0%,rgba(36,34,44,0.4) 45%,rgba(242,132,143,0.6) 100%)",
};

const relatedGradient: Record<string, string> = {
  lav: "linear-gradient(180deg,rgba(106,98,214,0) 35%,rgba(106,98,214,0.55) 65%,rgba(58,52,140,0.95) 100%)",
  coral: "linear-gradient(180deg,rgba(242,132,143,0) 35%,rgba(242,132,143,0.55) 65%,rgba(150,52,72,0.95) 100%)",
};

const statusStyle: Record<ProjectActivity["s"], string> = {
  Ongoing: "bg-brand-500 text-white border-brand-500",
  "Active appeal": "bg-accent-50 text-accent-800 border-accent-500",
  Planned: "bg-white text-ink-600 border-[#B9B6C0]",
};

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: { title: project.title, description: project.summary, images: [project.hero] },
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const give = giveCta[project.give];
  const related = relatedProjects(project.slug, 3);

  return (
    <>
      <PageHero
        image={project.hero}
        imageAlt={project.heroAlt}
        imagePos={project.heroPos}
        watermark={project.word}
        gradient={heroGradient[project.tint]}
        crumbs={[{ label: "Home", href: "/" }, { label: "Projects", href: "/projects" }, { label: project.cat }]}
        title={project.title}
      />

      <section aria-label="Project detail" className="bg-white">
        <div className="mx-auto flex max-w-[1320px] flex-wrap items-start gap-14 px-6 py-[clamp(64px,7vw,104px)] lg:gap-[72px]">
          <article className="min-w-0 flex-[999_1_620px] max-w-[860px]">
            <div className="relative mb-12 aspect-[16/10] overflow-hidden rounded-[28px] bg-surface-alt">
              <Image src={project.img} alt={project.alt} fill style={{ objectPosition: project.pos }} className="object-cover" />
            </div>
            <p className="mb-6 font-heading text-[clamp(19px,1.6vw,22px)] font-bold leading-[1.55] text-ink-900">
              {project.lead}
            </p>
            <p className="text-[17px] leading-[1.75] text-ink-700">{project.overview}</p>

            <figure className="my-14 grid grid-cols-[auto_minmax(0,1fr)] items-start gap-8">
              <svg width="64" height="40" viewBox="0 0 64 40" fill="none" stroke="#F79AA7" strokeWidth="2" aria-hidden="true">
                <path d="M14 2C7 2 2 7 2 14s5 12 12 12c0 4-2 8-6 12 8-2 18-10 18-24C26 7 21 2 14 2Z" />
                <path d="M48 2c-7 0-12 5-12 12s5 12 12 12c0 4-2 8-6 12 8-2 18-10 18-24C60 7 55 2 48 2Z" />
              </svg>
              <blockquote className="m-0 font-heading text-[clamp(20px,1.9vw,26px)] font-bold leading-[1.45] text-ink-900">
                {project.quote}
              </blockquote>
            </figure>

            <div className="grid border-t-2 border-ink-900 [grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))]">
              <div className="border-b border-border py-7 pr-7">
                <h2 className="mb-3 font-heading text-[13px] font-bold tracking-[0.16em] text-brand-500">THE NEED</h2>
                <p className="m-0 text-[16.5px] leading-[1.7] text-ink-700">{project.problem}</p>
              </div>
              <div className="border-b border-border py-7">
                <h2 className="mb-3 font-heading text-[13px] font-bold tracking-[0.16em] text-brand-500">WHO IT SUPPORTS</h2>
                <p className="m-0 text-[16.5px] leading-[1.7] text-ink-700">{project.beneficiaries}</p>
              </div>
            </div>

            <h2 className="mt-14 mb-5 font-heading text-[clamp(26px,2.4vw,34px)] font-extrabold tracking-[-0.015em] text-ink-900">
              Objectives
            </h2>
            <ul className="grid list-none gap-3 p-0 [grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))]">
              {project.objectives.map((o) => (
                <li key={o} className="flex items-start gap-3.5 rounded-2xl bg-surface px-5 py-[18px] text-base leading-relaxed text-ink-900">
                  <span aria-hidden="true" className="mt-1 h-3.5 w-3.5 flex-shrink-0 rounded-full bg-brand-300" />
                  {o}
                </li>
              ))}
            </ul>

            <div className="mt-14 mb-5 flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="m-0 font-heading text-[clamp(26px,2.4vw,34px)] font-extrabold tracking-[-0.015em] text-ink-900">
                Activities
              </h2>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-[13px] text-ink-600">
                <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-brand-500" />Ongoing</span>
                <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-accent-500" />Active appeal</span>
                <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full border-2 border-[#8A8792]" />Planned</span>
              </div>
            </div>
            <ol className="m-0 list-none border-t-2 border-ink-900 p-0">
              {project.activities.map((a) => (
                <li key={a.t} className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2 border-b border-border py-[22px] sm:gap-6">
                  <div>
                    <h3 className="mb-1.5 font-heading text-[19px] font-extrabold text-ink-900">{a.t}</h3>
                    <p className="m-0 text-base leading-relaxed text-ink-700">{a.d}</p>
                  </div>
                  <span className={`whitespace-nowrap rounded-full border-[1.5px] px-3 py-1.5 font-heading text-xs font-bold tracking-[0.04em] ${statusStyle[a.s]}`}>
                    {a.s}
                  </span>
                </li>
              ))}
            </ol>

            {project.photos.length > 0 && (
              <div className="mt-14 grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))]">
                {project.photos.map((ph) => (
                  <div key={ph.src + ph.alt} className="relative aspect-[4/3] overflow-hidden rounded-[22px] bg-surface-alt">
                    <Image src={ph.src} alt={ph.alt} fill style={{ objectPosition: ph.pos }} className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </article>

          <aside aria-label="Support this project" className="sticky top-[120px] flex max-w-[420px] flex-1 flex-col gap-4 [flex-basis:300px]">
            <div className="relative overflow-hidden rounded-[28px] bg-ink-900 p-8 text-white">
              <Image src="/images/symbol.png" alt="" aria-hidden="true" width={160} height={160} className="pointer-events-none absolute -top-[30px] -right-10 w-40 opacity-10" />
              <p className="relative mb-2.5 font-heading text-[13px] font-bold tracking-[0.16em] text-accent-300">
                SUPPORT THIS PROJECT
              </p>
              {project.amount ? (
                <>
                  <div className="relative mb-2.5 font-heading text-6xl font-extrabold tracking-[-0.03em] text-accent-300">
                    {project.amount}
                  </div>
                  <p className="relative mb-6 text-base leading-[1.55] text-white">{project.amountLabel}</p>
                </>
              ) : (
                <p className="relative mb-6 font-heading text-[22px] font-bold leading-[1.35] text-white">
                  Your donation helps this programme reach more people.
                </p>
              )}
              <Link
                href={give.href}
                className="relative flex items-center justify-between rounded-full bg-accent-300 px-6 py-[18px] font-heading text-base font-bold text-ink-900 transition hover:bg-accent-200"
              >
                {give.label} <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="rounded-[28px] bg-brand-50 px-8 py-7">
              <h2 className="mb-4 font-heading text-xl font-extrabold text-ink-900">Ways to contribute</h2>
              <ul className="m-0 flex list-none flex-col p-0">
                <li>
                  <Link href="/support#donate" className="flex items-center justify-between border-b border-[#D9D5F7] py-3.5 text-base font-semibold text-ink-900 hover:text-brand-500">
                    Donate funds <span aria-hidden="true">↗</span>
                  </Link>
                </li>
                <li>
                  <Link href="/support#sponsor" className="flex items-center justify-between border-b border-[#D9D5F7] py-3.5 text-base font-semibold text-ink-900 hover:text-brand-500">
                    Sponsor a child <span aria-hidden="true">↗</span>
                  </Link>
                </li>
                <li>
                  <Link href="/contact?enquiry=donate-goods#contact-form" className="flex items-center justify-between py-3.5 text-base font-semibold text-ink-900 hover:text-brand-500">
                    Donate goods <span aria-hidden="true">↗</span>
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="rel-h" className="bg-surface">
          <div className="mx-auto max-w-[1320px] px-6 py-[clamp(80px,9vw,120px)]">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
              <h2 id="rel-h" className="m-0 font-heading text-[clamp(32px,3.4vw,48px)] font-extrabold leading-[1.08] tracking-[-0.02em] text-ink-900">
                Related Projects
              </h2>
              <PillLink href="/projects" variant="outline" className="!border-accent-300 !bg-white">
                All Projects <span aria-hidden="true">↗</span>
              </PillLink>
            </div>
            <ul className="grid list-none gap-5 p-0 [grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr))]">
              {related.map((r) => (
                <li key={r.slug} className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-ink-900">
                  <Link href={`/projects/${r.slug}`} className="absolute inset-0 block text-white transition hover:scale-[1.015]">
                    <Image src={r.img} alt={r.alt} fill style={{ objectPosition: r.pos }} className="object-cover" />
                    <div aria-hidden="true" className="absolute inset-0" style={{ background: relatedGradient[r.tint] }} />
                    <span
                      aria-hidden="true"
                      className="absolute -right-[0.07em] -bottom-[0.05em] font-heading text-[clamp(56px,5vw,84px)] leading-[0.8] font-extrabold tracking-[-0.03em] text-white [writing-mode:vertical-rl]"
                      style={{ transform: "rotate(180deg)" }}
                    >
                      {r.word}
                    </span>
                    <div className="absolute inset-x-0 bottom-0 p-[26px]">
                      <span className="mb-3 inline-block rounded-full bg-white px-3 py-1.5 font-heading text-[11.5px] font-bold tracking-[0.06em] text-brand-700 uppercase">
                        {r.cat}
                      </span>
                      <h3 className="m-0 font-heading text-[22px] font-extrabold leading-tight text-white">{r.title}</h3>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaBand heading="Your Support Can Turn Compassion Into Action." ctaLabel="Support Us" ctaHref="/support" />
    </>
  );
}
