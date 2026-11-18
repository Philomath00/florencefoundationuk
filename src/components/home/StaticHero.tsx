import Image from "next/image";
import PillLink from "@/components/ui/PillLink";

/** Fallback hero shown when no hero_slides exist in the database yet. */
export default function StaticHero() {
  return (
    <section aria-labelledby="hero-h" className="relative overflow-hidden bg-surface">
      <div className="grid items-stretch [grid-template-columns:repeat(auto-fit,minmax(min(100%,540px),1fr))]">
        <div className="relative z-10 flex flex-col justify-center px-6 py-[clamp(56px,7vw,112px)] lg:pl-[max(24px,calc((100vw-1320px)/2+24px))]">
          <div className="mb-7 flex items-center gap-3">
            <span aria-hidden="true" className="flex items-center gap-[5px]">
              <span className="h-[7px] w-[7px] rounded-full bg-accent-200" />
              <span className="h-[9px] w-[9px] rounded-full bg-accent-300" />
              <span className="h-3 w-3 rounded-full bg-accent-500" />
            </span>
            <span className="font-heading text-[13px] font-bold tracking-[0.16em] text-brand-500">
              FLORENCE FOUNDATION
            </span>
          </div>
          <h1
            id="hero-h"
            className="m-0 font-heading text-[clamp(44px,5.4vw,82px)] font-extrabold leading-[1.02] tracking-[-0.025em] text-ink-900"
          >
            <span className="block">Empowering Lives.</span>
            <span className="block text-brand-500">Feeding Hope.</span>
            <span className="block">
              Changing{" "}
              <span className="relative whitespace-nowrap">
                Futures.
                <span aria-hidden="true" className="absolute bottom-[0.04em] left-0 right-[6%] -z-10 h-[0.16em] rounded bg-accent-200" />
              </span>
            </span>
          </h1>
          <p className="mt-7 max-w-[520px] text-[clamp(17px,1.3vw,19px)] leading-[1.65] text-ink-700">
            We are committed to uplifting vulnerable communities through food aid, education,
            healthcare, clean water, and sustainable empowerment initiatives.
          </p>
          <div className="mt-10 flex flex-wrap gap-3.5">
            <PillLink href="/support">
              Support Our Mission <span aria-hidden="true">→</span>
            </PillLink>
            <PillLink href="/projects" variant="outline">
              Explore Our Projects
            </PillLink>
          </div>
          <p className="mt-14 max-w-[520px] border-t border-border-3 pt-6 font-heading text-[15px] font-semibold leading-[1.55] text-ink-900">
            We Empower People, We Feed People, We Give Hope to People.
          </p>
        </div>
        <div className="relative min-h-[clamp(440px,52vw,780px)]">
          <Image
            src="/images/hero-beads.png"
            alt="An older woman wearing layered, colourful beaded necklaces looks towards the camera"
            fill
            priority
            style={{ objectPosition: "46% 25%" }}
            className="rounded-bl-[clamp(80px,12vw,220px)] object-cover"
          />
          <div className="absolute bottom-4 left-4 flex max-w-[320px] items-start gap-3.5 rounded-2xl bg-white p-5 shadow-xl sm:bottom-10 sm:left-10">
            <Image src="/images/symbol.png" alt="" aria-hidden="true" width={40} height={40} className="h-10 w-10 flex-shrink-0" />
            <p className="m-0 text-sm leading-relaxed text-ink-700">
              Working with communities across the <strong className="text-ink-900">United Kingdom, Nigeria</strong> and
              the wider <strong className="text-ink-900">African continent</strong>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
