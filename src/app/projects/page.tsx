import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Kicker from "@/components/ui/Kicker";
import CtaBand from "@/components/ui/CtaBand";
import ProjectGrid from "@/components/projects/ProjectGrid";
import { getAllProjects } from "@/lib/projects-data";

export const metadata: Metadata = {
  title: "Our Projects",
  description:
    "Explore Grace Compassion Crew Foundation's humanitarian programmes: food aid, child sponsorship, education, women's empowerment, clean water and healthcare across Nigeria and the wider African continent.",
  alternates: { canonical: "/projects" },
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <>
      <PageHero
        image="/images/children-four.jpg"
        imageAlt="Young children in colourful dresses stand close together outdoors"
        imagePos="50% 30%"
        watermark="Action"
        gradient="linear-gradient(90deg,rgba(36,34,44,0.8) 0%,rgba(36,34,44,0.4) 45%,rgba(242,132,143,0.55) 100%)"
        crumbs={[{ label: "Home", href: "/" }, { label: "Projects" }]}
        title="Our Projects"
        subtitle="Real Needs. Meaningful Action. Lasting Hope."
      />

      <section aria-labelledby="intro-h" className="bg-white">
        <div className="mx-auto grid max-w-[1320px] items-end gap-6 px-6 pt-[clamp(80px,9vw,120px)] pb-[clamp(48px,5vw,72px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr))] lg:gap-24">
          <div>
            <Kicker>OUR PROGRAMMES</Kicker>
            <h2 id="intro-h" className="m-0 font-heading text-[clamp(34px,3.8vw,54px)] font-extrabold leading-[1.08] tracking-[-0.02em] text-ink-900">
              Supporting Communities Where It Matters Most.
            </h2>
          </div>
          <p className="max-w-[560px] text-lg leading-[1.7] text-ink-700">
            Grace Compassion Crew Foundation responds to humanitarian challenges through programmes that
            address immediate needs while supporting education, health, empowerment, and
            sustainable community wellbeing.
          </p>
        </div>
      </section>

      <section aria-label="Project directory" className="bg-white">
        <div className="mx-auto max-w-[1320px] px-6 pb-[clamp(80px,9vw,128px)]">
          <ProjectGrid projects={projects} />
        </div>
      </section>

      <CtaBand heading="Your Support Can Turn Compassion Into Action." ctaLabel="Support a Project" ctaHref="/support" />
    </>
  );
}
