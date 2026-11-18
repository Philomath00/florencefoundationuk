import Image from "next/image";
import PillLink from "./PillLink";

export default function CtaBand({
  heading,
  ctaLabel,
  ctaHref,
  arrow = "→",
}: {
  heading: string;
  ctaLabel: string;
  ctaHref: string;
  arrow?: string;
}) {
  return (
    <section aria-labelledby="cta-h" className="relative overflow-hidden bg-brand-500 text-white">
      <Image
        src="/images/symbol.png"
        alt=""
        aria-hidden="true"
        width={420}
        height={420}
        className="pointer-events-none absolute top-1/2 right-[max(-80px,calc((100vw-1320px)/2-40px))] w-[clamp(240px,30vw,420px)] -translate-y-1/2 opacity-[0.16]"
      />
      <div className="relative mx-auto max-w-[1320px] px-6 py-[clamp(80px,9vw,120px)]">
        <h2 id="cta-h" className="mb-10 max-w-[860px] font-heading text-[clamp(36px,4.4vw,64px)] font-extrabold leading-[1.05] tracking-[-0.025em] text-white">
          {heading}
        </h2>
        <PillLink href={ctaHref} variant="white">
          {ctaLabel} <span aria-hidden="true">{arrow}</span>
        </PillLink>
      </div>
    </section>
  );
}
