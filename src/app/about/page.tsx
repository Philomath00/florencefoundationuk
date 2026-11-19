import Image from "next/image";
import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Kicker from "@/components/ui/Kicker";
import PillLink from "@/components/ui/PillLink";
import CtaBand from "@/components/ui/CtaBand";
import Marquee from "@/components/about/Marquee";
import { aboutAreas, aboutImpact, team } from "@/content/about";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Grace Compassion Crew Foundation is dedicated to creating meaningful change in marginalised communities across the United Kingdom, Nigeria and the wider African continent through poverty alleviation, clean water, healthcare, education and women's empowerment.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        image="/images/elder-sepia.png"
        imageAlt="Close portrait of an elderly woman in a head scarf, warm-toned"
        imagePos="48% 35%"
        watermark="Hope"
        crumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
        title="About Grace Compassion Crew Foundation"
        subtitle="Driven by Compassion. Committed to Hope."
      />

      {/* WHO WE ARE */}
      <section aria-labelledby="who-h" className="bg-white">
        <div className="mx-auto grid max-w-[1320px] items-center gap-14 px-6 py-[clamp(80px,9vw,128px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr))] lg:gap-24">
          <div role="group" aria-label="Where we work" className="flex flex-col gap-7">
            <span className="block font-heading text-[clamp(48px,6.4vw,96px)] leading-[0.95] font-extrabold tracking-[-0.035em] text-transparent [-webkit-text-stroke:1.5px_#918AF0]">
              United Kingdom
            </span>
            <div className="flex flex-wrap items-end gap-5">
              <span className="font-heading text-[clamp(48px,6.4vw,96px)] leading-[0.95] font-extrabold tracking-[-0.035em] text-transparent [-webkit-text-stroke:1.5px_#F2848F]">
                Nigeria
              </span>
              <span className="pb-2.5 text-sm font-medium text-ink-600">and the wider</span>
            </div>
            <span className="block font-heading text-[clamp(48px,6.4vw,96px)] leading-[0.95] font-extrabold tracking-[-0.035em] text-transparent [-webkit-text-stroke:1.5px_#302F35]">
              African continent
            </span>
            <p className="mt-1 text-sm text-ink-600">Where Grace Compassion Crew Foundation works</p>
          </div>
          <div>
            <Kicker>WHO WE ARE</Kicker>
            <h2 id="who-h" className="mb-7 font-heading text-[clamp(34px,3.8vw,54px)] font-extrabold leading-[1.08] tracking-[-0.02em] text-ink-900">
              Building Hope. Empowering Communities.
            </h2>
            <p className="mb-5 font-heading text-[19px] font-semibold leading-[1.6] text-ink-900">
              Grace Compassion Crew Foundation is dedicated to creating meaningful change in marginalised
              communities by addressing poverty, hunger, healthcare needs, access to clean water,
              educational inequality, and barriers to women&apos;s empowerment.
            </p>
            <p className="text-[17px] leading-[1.7] text-ink-700">
              We believe in working collaboratively with communities and local partners to
              develop sustainable solutions. Our work is guided by compassion, dignity,
              accountability, transparency, and a commitment to making a meaningful difference.
            </p>
          </div>
        </div>
      </section>

      <Marquee />

      {/* MISSION + VISION */}
      <section aria-label="Our mission and vision" className="-mt-px bg-ink-900 text-white">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-[72px] px-6 py-[clamp(72px,8vw,112px)]">
          <div className="grid items-center gap-14 [grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr))] lg:gap-24">
            <div>
              <p className="mb-4 flex items-center gap-2.5 font-heading text-[13px] font-bold tracking-[0.16em] text-accent-300">
                <span aria-hidden="true" className="flex gap-1">
                  <span className="h-[7px] w-[7px] rounded-full border-[1.5px] border-current" />
                  <span className="h-[7px] w-[7px] rounded-full border-[1.5px] border-current" />
                </span>
                OUR MISSION
              </p>
              <h2 className="mb-7 font-heading text-[clamp(32px,3.4vw,50px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-white">
                Fostering hope and positive change in marginalised communities.
              </h2>
              <p className="mb-5 text-lg leading-[1.7] text-white">
                To foster hope and positive change in marginalised communities through poverty
                alleviation, clean water solutions, healthcare, women&apos;s empowerment,
                education, and sustainable humanitarian initiatives.
              </p>
              <p className="text-base leading-[1.7] text-ink-muted-2">
                Across the United Kingdom, Nigeria, and the African continent, we address
                critical challenges, alleviate suffering, and create opportunities for
                individuals and communities to thrive.
              </p>
            </div>
            <div className="relative aspect-[4/5] max-h-[640px] overflow-hidden rounded-3xl bg-ink-800">
              <Image
                src="/images/women-certificates.jpg"
                alt="A group of women in purple sashes celebrate, holding up certificates"
                fill
                style={{ objectPosition: "38% 0%", transform: "scale(1.15)", transformOrigin: "38% 0%" }}
                className="object-cover"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-ink-900/0 via-transparent to-brand-500/55" />
              <span
                aria-hidden="true"
                className="absolute -right-[0.06em] -bottom-[0.05em] font-heading text-[clamp(64px,7vw,104px)] leading-[0.8] font-extrabold tracking-[-0.03em] text-white [writing-mode:vertical-rl]"
                style={{ transform: "rotate(180deg)" }}
              >
                Mission
              </span>
            </div>
          </div>
          <div className="grid items-center gap-14 [grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr))] lg:gap-24">
            <div className="relative aspect-[4/5] max-h-[640px] overflow-hidden rounded-3xl bg-ink-800 lg:order-1">
              <Image
                src="/images/health-check-portrait.jpg"
                alt="An older woman in a patterned head wrap has her blood pressure taken"
                fill
                style={{ objectPosition: "55% 0%", transform: "scale(1.1)", transformOrigin: "55% 0%" }}
                className="object-cover"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-ink-900/0 via-transparent to-accent-500/55" />
              <span
                aria-hidden="true"
                className="absolute -bottom-[0.05em] -left-[0.06em] font-heading text-[clamp(64px,7vw,104px)] leading-[0.8] font-extrabold tracking-[-0.03em] text-white [writing-mode:vertical-rl]"
                style={{ transform: "rotate(180deg)" }}
              >
                Vision
              </span>
            </div>
            <div className="lg:order-2">
              <p className="mb-4 flex items-center gap-2.5 font-heading text-[13px] font-bold tracking-[0.16em] text-brand-200">
                <span aria-hidden="true" className="flex gap-1">
                  <span className="h-[7px] w-[7px] rounded-full border-[1.5px] border-current" />
                  <span className="h-[7px] w-[7px] rounded-full border-[1.5px] border-current" />
                </span>
                OUR VISION
              </p>
              <h2 className="mb-7 font-heading text-[clamp(32px,3.4vw,50px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-white">
                Empowering individuals to thrive with dignity and hope.
              </h2>
              <p className="mb-5 text-lg leading-[1.7] text-white">
                To address poverty, inequality, and gender-based violence through initiatives
                that enable individuals to thrive with dignity, opportunity, and hope.
              </p>
              <p className="mb-9 text-base leading-[1.7] text-ink-muted-2">
                Our strategic initiatives in education, healthcare, and disaster relief are
                aligned with the United Nations Sustainable Development Goals.
              </p>
              <div className="flex flex-wrap gap-x-7 gap-y-2.5 border-t border-ink-700 pt-6 font-heading text-[clamp(20px,2vw,26px)] font-extrabold">
                <span className="text-brand-200">Empower.</span>
                <span className="text-white">Uplift.</span>
                <span className="text-accent-300">Be a Blessing.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section aria-labelledby="wwd-h" className="bg-white">
        <div className="mx-auto max-w-[1320px] px-6 py-[clamp(80px,9vw,128px)]">
          <div className="mb-16 grid items-end gap-6 [grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr))]">
            <div>
              <Kicker>WHAT WE DO</Kicker>
              <h2 id="wwd-h" className="m-0 font-heading text-[clamp(34px,3.8vw,54px)] font-extrabold leading-[1.08] tracking-[-0.02em] text-ink-900">
                Addressing urgent needs. Supporting long-term wellbeing.
              </h2>
            </div>
            <p className="max-w-[540px] text-lg leading-relaxed text-ink-700">
              Our initiatives focus on poverty alleviation, food security, clean water,
              healthcare, women&apos;s empowerment, and education.
            </p>
          </div>
          <ul className="grid list-none gap-6 p-0 [grid-template-columns:repeat(auto-fit,minmax(min(100%,max(290px,calc((100%-48px)/3))),1fr))]">
            {aboutAreas.map((a) => (
              <li
                key={a.title}
                className={`group relative flex min-h-[clamp(300px,26vw,360px)] flex-col overflow-hidden rounded-[28px] p-[clamp(28px,2.6vw,40px)] text-ink-900 transition-all duration-300 ${
                  a.lav ? "bg-brand-50 hover:bg-brand-500 hover:text-white" : "bg-accent-50 hover:bg-accent-300"
                }`}
              >
                <a href={a.href} className="absolute inset-0" aria-label={`Learn more about ${a.title}`} />
                <span className="absolute top-2 right-5 font-heading text-[clamp(72px,7vw,104px)] leading-none font-extrabold tracking-[-0.04em] text-transparent opacity-[0.35] [-webkit-text-stroke:1.5px_#302F35] group-hover:[-webkit-text-stroke:1.5px_#FFFFFF]">
                  {a.n}
                </span>
                <h3 className="relative mt-[clamp(56px,5vw,80px)] mb-3.5 max-w-[85%] font-heading text-[clamp(22px,1.8vw,26px)] font-extrabold leading-tight tracking-[-0.015em]">
                  {a.title}
                </h3>
                <p className="relative mb-8 flex-1 text-base leading-relaxed">{a.desc}</p>
                <div
                  aria-hidden="true"
                  className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white text-brand-500"
                >
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17 17 7M7 7h10v10" />
                  </svg>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* OUR IMPACT */}
      <section aria-labelledby="impact-h" className="bg-accent-50">
        <div className="mx-auto grid max-w-[1320px] gap-14 px-6 py-[clamp(80px,9vw,128px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr))] lg:gap-24">
          <div>
            <p className="mb-4 flex items-center gap-2.5 font-heading text-[13px] font-bold tracking-[0.16em] text-accent-800">
              <span aria-hidden="true" className="flex gap-1">
                <span className="h-[7px] w-[7px] rounded-full border-[1.5px] border-current" />
                <span className="h-[7px] w-[7px] rounded-full border-[1.5px] border-current" />
              </span>
              OUR IMPACT
            </p>
            <h2 id="impact-h" className="mb-6 font-heading text-[clamp(34px,3.8vw,54px)] font-extrabold leading-[1.08] tracking-[-0.02em] text-ink-900">
              Listening. Collaborating. Empowering.
            </h2>
            <p className="mb-10 max-w-[520px] text-lg leading-[1.7] text-ink-700">
              Sustainable humanitarian work begins with understanding the real needs of the
              people and communities we serve. We combine immediate assistance with long-term
              solutions that promote dignity and self-reliance.
            </p>
            <div className="grid max-w-[560px] grid-cols-[1.2fr_1fr] grid-rows-2 gap-3.5">
              <div className="relative row-span-2 min-h-[300px] overflow-hidden rounded-3xl">
                <Image src="/images/children-four.jpg" alt="Young children in colourful dresses stand close together outdoors" fill style={{ objectPosition: "40% 30%" }} className="object-cover" />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image src="/images/health-talk.jpg" alt="A man in a blue jacket speaks to a seated group of women in head wraps" fill style={{ objectPosition: "65% 10%" }} className="object-cover" />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image src="/images/goods-clothing.jpg" alt="People look through donated clothing laid out under a canopy" fill style={{ objectPosition: "50% 10%" }} className="object-cover" />
              </div>
            </div>
          </div>
          <ol className="m-0 flex list-none flex-col p-0">
            {aboutImpact.map((item) => (
              <li key={item.n} className="grid grid-cols-[72px_minmax(0,1fr)] gap-5 border-b border-[#EFC9CE] py-[26px]">
                <span className="font-heading text-[44px] leading-none font-extrabold tracking-[-0.03em] text-transparent [-webkit-text-stroke:1.5px_#C24A5C]">
                  {item.n}
                </span>
                <div>
                  <h3 className="mb-1.5 font-heading text-xl font-extrabold text-ink-900">{item.title}</h3>
                  <p className="m-0 text-base leading-relaxed text-ink-700">{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* TEAM */}
      <section aria-labelledby="team-h" className="bg-white">
        <div className="mx-auto grid max-w-[1320px] items-start gap-8 px-6 py-[clamp(80px,9vw,128px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,270px),1fr))]">
          <div className="pt-2">
            <Kicker>OUR TEAM</Kicker>
            <h2 id="team-h" className="mb-6 font-heading text-[clamp(34px,3.4vw,50px)] font-extrabold leading-[1.08] tracking-[-0.02em] text-ink-900">
              The people behind our mission.
            </h2>
            <p className="mb-8 text-[17px] leading-relaxed text-ink-700">
              Grace Compassion Crew Foundation is led by people committed to compassion, dignity, and
              meaningful change.
            </p>
            <PillLink href="/contact" variant="accent" className="border-2 border-accent-300 !bg-white !text-ink-900 hover:!bg-accent-50">
              Get Involved <span aria-hidden="true">↗</span>
            </PillLink>
          </div>
          {team.map((t) => (
            <article key={t.name} style={{ marginTop: t.offset }}>
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-surface-alt">
                <Image src={t.img} alt={t.alt} fill style={{ objectPosition: t.pos }} className="object-cover" />
                <div aria-hidden="true" className="absolute inset-0" style={{ background: `linear-gradient(180deg, rgba(255,255,255,0) 58%, ${t.tint} 100%)` }} />
                <span
                  aria-hidden="true"
                  className="absolute -right-[0.06em] -bottom-[0.05em] font-heading text-[clamp(52px,5vw,76px)] leading-[0.8] font-extrabold tracking-[-0.03em] text-white [writing-mode:vertical-rl]"
                  style={{ transform: "rotate(180deg)" }}
                >
                  {t.word}
                </span>
              </div>
              <h3 className="mt-[22px] mb-1 font-heading text-xl font-extrabold tracking-[-0.01em] text-ink-900">{t.name}</h3>
              <p className="m-0 text-base text-ink-600">{t.role}</p>
            </article>
          ))}
        </div>
      </section>

      <CtaBand heading="Together, We Can Keep Hope Alive." ctaLabel="Support Our Mission" ctaHref="/support" />
    </>
  );
}
