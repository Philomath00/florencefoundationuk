import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Kicker from "@/components/ui/Kicker";
import PillLink from "@/components/ui/PillLink";
import GalleryPreview from "@/components/home/GalleryPreview";
import { whatWeDo, featuredProjects, impactAreas } from "@/content/home";
import { galleryPreview } from "@/content/gallery";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: siteConfig.defaultTitle,
  description: siteConfig.defaultDescription,
  alternates: { canonical: "/" },
};

const tintGradient: Record<string, string> = {
  lav: "linear-gradient(180deg,rgba(106,98,214,0) 35%,rgba(106,98,214,0.55) 65%,rgba(58,52,140,0.95) 100%)",
  coral: "linear-gradient(180deg,rgba(242,132,143,0) 35%,rgba(242,132,143,0.55) 65%,rgba(150,52,72,0.95) 100%)",
};

export default function HomePage() {
  return (
    <>
      {/* 1 HERO */}
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

      {/* 2 WHAT WE DO */}
      <section aria-labelledby="wwd-h" className="bg-white">
        <div className="mx-auto max-w-[1320px] px-6 py-[clamp(80px,9vw,128px)]">
          <div className="mb-14 grid items-end gap-6 [grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr))]">
            <div>
              <Kicker>WHAT WE DO</Kicker>
              <h2 id="wwd-h" className="m-0 font-heading text-[clamp(34px,3.8vw,54px)] font-extrabold leading-[1.08] tracking-[-0.02em] text-ink-900">
                Creating Hope Through Meaningful Action
              </h2>
            </div>
            <p className="max-w-[520px] text-lg leading-relaxed text-ink-700">
              From providing essential meals to expanding access to education and healthcare, our
              work is focused on addressing critical needs and empowering communities.
            </p>
          </div>
          <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(min(100%,270px),1fr))]">
            {whatWeDo.map((item) =>
              item.featured ? (
                <Link
                  key={item.title}
                  href={item.href}
                  className="row-span-2 flex flex-col overflow-hidden rounded-[28px] bg-brand-50 text-ink-900 transition hover:-translate-y-1"
                >
                  <div className="relative min-h-[300px] flex-1">
                    <Image src={item.img} alt={item.alt} fill style={{ objectPosition: item.pos }} className="object-cover" />
                  </div>
                  <div className="p-8">
                    <span className="font-heading text-sm font-bold text-brand-500">{item.num}</span>
                    <h3 className="mt-2.5 mb-3 font-heading text-[30px] font-extrabold tracking-[-0.015em]">{item.title}</h3>
                    <p className="mb-5 text-base leading-relaxed text-ink-700">{item.desc}</p>
                    <span className="font-heading text-[15px] font-bold text-brand-500">Learn more →</span>
                  </div>
                </Link>
              ) : (
                <Link key={item.title} href={item.href} className="flex flex-col rounded-3xl text-ink-900 transition hover:-translate-y-1">
                  <div className="relative overflow-hidden rounded-[22px] bg-surface-alt [aspect-ratio:16/10]">
                    <Image src={item.img} alt={item.alt} fill style={{ objectPosition: item.pos }} className="object-cover" />
                  </div>
                  <div className="px-1 pt-[22px] pb-2">
                    <span className="font-heading text-sm font-bold text-brand-500">{item.num}</span>
                    <h3 className="mt-1.5 mb-2.5 font-heading text-[22px] font-extrabold tracking-[-0.01em]">{item.title}</h3>
                    <p className="mb-3.5 text-[15.5px] leading-relaxed text-ink-700">{item.desc}</p>
                    <span className="font-heading text-[15px] font-bold text-brand-500">Learn more →</span>
                  </div>
                </Link>
              ),
            )}
          </div>
        </div>
      </section>

      {/* 3 ABOUT */}
      <section aria-labelledby="about-h" className="relative overflow-hidden bg-surface">
        <Image
          src="/images/symbol.png"
          alt=""
          aria-hidden="true"
          width={420}
          height={420}
          className="pointer-events-none absolute -top-20 -right-[120px] w-[420px] opacity-[0.06]"
        />
        <div className="relative mx-auto grid max-w-[1320px] items-center gap-16 px-6 py-[clamp(80px,9vw,128px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,460px),1fr))]">
          <div className="relative h-[clamp(440px,46vw,620px)]">
            <div className="absolute top-0 left-0 h-[90%] w-[68%] overflow-hidden rounded-[200px_200px_28px_28px]">
              <Image
                src="/images/elder-bw.png"
                alt="An elderly woman in a head wrap and patterned shawl, seated, in black and white"
                fill
                style={{ objectPosition: "50% 20%" }}
                className="object-cover"
              />
            </div>
            <div className="absolute right-0 bottom-0 aspect-[386/646] w-[42%] overflow-hidden rounded-full border-8 border-surface bg-surface">
              <Image src="/images/oval-man.jpg" alt="An older man in a striped shirt looks into the camera" fill className="object-cover" style={{ transform: "scale(1.06)" }} />
            </div>
            <div aria-hidden="true" className="absolute top-[6%] right-[8%] flex items-end gap-2.5">
              <span className="h-[22px] w-[22px] rounded-full bg-accent-200" />
              <span className="h-8 w-8 rounded-full bg-accent-300" />
              <span className="h-[46px] w-[46px] rounded-full bg-brand-300" />
            </div>
          </div>
          <div>
            <Kicker>ABOUT OUR FOUNDATION</Kicker>
            <h2 id="about-h" className="mb-7 font-heading text-[clamp(34px,3.8vw,54px)] font-extrabold leading-[1.08] tracking-[-0.02em] text-ink-900">
              Compassion in Action. Hope for Every Community.
            </h2>
            <p className="mb-10 max-w-[520px] text-lg leading-[1.7] text-ink-700">
              At Florence Foundation, we believe everyone deserves the opportunity to live with
              dignity, access essential resources, and build a better future. Through
              community-centred initiatives and partnerships, we work to alleviate suffering and
              create lasting opportunities.
            </p>
            <div className="mb-10 grid grid-cols-3 border-y border-border-2">
              <div className="py-5 pr-4"><span className="font-heading text-[clamp(18px,1.8vw,24px)] font-extrabold text-brand-500">Empower.</span></div>
              <div className="border-l border-border-2 px-4 py-5"><span className="font-heading text-[clamp(18px,1.8vw,24px)] font-extrabold text-ink-900">Uplift.</span></div>
              <div className="border-l border-border-2 py-5 pl-4"><span className="font-heading text-[clamp(18px,1.8vw,24px)] font-extrabold text-accent-800">Be a Blessing.</span></div>
            </div>
            <PillLink href="/about">Learn About Us <span aria-hidden="true">→</span></PillLink>
          </div>
        </div>
      </section>

      {/* 4 FEATURED PROJECTS */}
      <section aria-labelledby="proj-h" className="bg-white">
        <div className="mx-auto max-w-[1320px] px-6 py-[clamp(80px,9vw,128px)]">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-7">
            <div className="max-w-[640px]">
              <Kicker>OUR PROJECTS</Kicker>
              <h2 id="proj-h" className="m-0 font-heading text-[clamp(34px,3.8vw,54px)] font-extrabold leading-[1.08] tracking-[-0.02em] text-ink-900">
                Together, We Can Make a Difference
              </h2>
            </div>
            <PillLink href="/projects" variant="outline">View All Projects <span aria-hidden="true">→</span></PillLink>
          </div>
          <div className="grid items-start gap-6 [grid-template-columns:repeat(auto-fit,minmax(min(100%,270px),1fr))]">
            {featuredProjects.map((p) => (
              <Link
                key={p.title}
                href={p.href}
                style={{ marginTop: p.offset }}
                className="relative block aspect-[3/4.2] overflow-hidden rounded-[28px] bg-ink-900 text-white transition hover:-translate-y-1.5"
              >
                <Image src={p.img} alt={p.alt} fill style={{ objectPosition: p.pos }} className="object-cover" />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-ink-900/0 via-transparent to-[rgba(36,34,44,0.92)]" />
                <span className="absolute top-5 left-5 rounded-full bg-white px-3.5 py-2 font-heading text-xs font-bold text-brand-700">
                  {p.cat}
                </span>
                <div className="absolute inset-x-0 bottom-0 p-[26px]">
                  <h3 className="mb-2.5 font-heading text-2xl font-extrabold leading-tight tracking-[-0.01em] text-white">{p.title}</h3>
                  <p className="mb-4 text-[15px] leading-relaxed text-ink-faint">{p.desc}</p>
                  <span className="inline-flex items-center gap-2 font-heading text-sm font-bold text-accent-200">View project →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5 FOOD AID CAMPAIGN */}
      <section aria-labelledby="food-h" className="overflow-hidden bg-ink-900 text-white">
        <div className="grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,520px),1fr))]">
          <div className="relative min-h-[clamp(360px,44vw,640px)]">
            <Image
              src="/images/enjoy-a-meal.jpg"
              alt="A volunteer serves a cup of food from a dispenser to a woman in an orange patterned top"
              fill
              style={{ objectPosition: "50% 0%", transform: "scale(1.12)", transformOrigin: "50% 0%" }}
              className="object-cover"
            />
          </div>
          <div className="relative flex flex-col justify-center px-6 py-[clamp(56px,7vw,112px)] lg:pl-[clamp(24px,5vw,88px)] lg:pr-[max(24px,calc((100vw-1320px)/2+24px))]">
            <Image src="/images/symbol.png" alt="" aria-hidden="true" width={280} height={280} className="pointer-events-none absolute -top-10 -right-[60px] w-[280px] opacity-[0.08]" />
            <p className="mb-4 font-heading text-[13px] font-bold tracking-[0.16em] text-accent-300">HELP FIGHT HUNGER</p>
            <h2 id="food-h" className="mb-6 font-heading text-[clamp(34px,3.8vw,54px)] font-extrabold leading-[1.08] tracking-[-0.02em] text-white">
              A Fresh Hot Meal Can Make a Difference.
            </h2>
            <p className="mb-9 max-w-[520px] text-lg leading-[1.7] text-ink-light">
              Through our Fresh Hot Meal initiative, Florence Foundation seeks to provide
              nutritious meals and food support to individuals and families facing hardship.
            </p>
            <div className="mb-9 flex max-w-[520px] items-center gap-6 rounded-3xl bg-ink-800 px-7 py-6">
              <span className="font-heading text-[clamp(56px,6vw,80px)] font-extrabold leading-none tracking-[-0.03em] text-accent-300">£2</span>
              <span className="text-[17px] leading-snug text-white">can help provide a fresh hot meal.</span>
            </div>
            <PillLink href="/support#meals" variant="accent">Support Food Aid <span aria-hidden="true">→</span></PillLink>
          </div>
        </div>
      </section>

      {/* 6 IMPACT */}
      <section aria-labelledby="impact-h" className="bg-surface">
        <div className="mx-auto max-w-[1320px] px-6 py-[clamp(80px,9vw,128px)]">
          <div className="mb-16 max-w-[760px]">
            <Kicker>WHY OUR WORK MATTERS</Kicker>
            <h2 id="impact-h" className="m-0 font-heading text-[clamp(34px,3.8vw,54px)] font-extrabold leading-[1.08] tracking-[-0.02em] text-ink-900">
              Every Act of Kindness Creates Hope.
            </h2>
          </div>
          <ul className="grid list-none gap-x-7 gap-y-10 p-0 [grid-template-columns:repeat(auto-fit,minmax(min(100%,210px),1fr))]">
            {impactAreas.map((item) => (
              <li key={item.area} className="flex flex-col gap-[18px] border-t-2 border-ink-900 pt-6">
                <div className="flex h-[72px] items-end">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full text-ink-900" style={{ background: item.bg }} aria-hidden="true">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={item.icon} />
                    </svg>
                  </span>
                </div>
                <span className="font-heading text-[13px] font-bold tracking-[0.12em] text-brand-500">{item.area}</span>
                <p className="m-0 font-heading text-xl font-bold leading-snug text-ink-900">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7 SPONSOR A CHILD */}
      <section aria-labelledby="sponsor-h" className="relative overflow-hidden bg-accent-50">
        <div className="mx-auto grid max-w-[1320px] items-center gap-14 px-6 py-[clamp(80px,9vw,128px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr))] lg:gap-24">
          <div className="relative flex justify-center">
            <div aria-hidden="true" className="absolute top-[8%] left-[4%] aspect-square w-[min(78%,420px)] rounded-full bg-accent-200" />
            <div className="relative aspect-[386/646] w-[min(72%,380px)] overflow-hidden rounded-full bg-accent-50">
              <Image
                src="/images/help-a-child.jpg"
                alt="A young child in a blue T-shirt looks down at a cup being handed to him"
                fill
                style={{ objectPosition: "50% 0%", transform: "scale(1.2)", transformOrigin: "50% 20%" }}
                className="object-cover"
              />
            </div>
            <Image src="/images/symbol.png" alt="" aria-hidden="true" width={96} height={96} className="absolute right-[4%] bottom-[6%] h-24 w-24" />
          </div>
          <div>
            <p className="mb-4 font-heading text-[13px] font-bold tracking-[0.16em] text-accent-800">SPONSOR A CHILD</p>
            <h2 id="sponsor-h" className="mb-6 font-heading text-[clamp(34px,3.8vw,54px)] font-extrabold leading-[1.08] tracking-[-0.02em] text-ink-900">
              Help a Child Build a Brighter Future.
            </h2>
            <p className="mb-9 max-w-[520px] text-lg leading-[1.7] text-ink-700">
              Your support can help provide children with access to essential needs, educational
              opportunities, and a more secure environment in which to grow.
            </p>
            <div className="flex flex-wrap items-center gap-6 sm:gap-8">
              <div className="rounded-3xl bg-white px-7 py-[22px]">
                <div className="font-heading text-4xl font-extrabold tracking-[-0.02em] text-brand-500">
                  £5 <span className="text-lg font-bold text-ink-900">per month</span>
                </div>
                <div className="mt-2 text-sm text-ink-600">Child sponsorship contribution</div>
              </div>
              <PillLink href="/support#sponsor">Sponsor a Child <span aria-hidden="true">→</span></PillLink>
            </div>
          </div>
        </div>
      </section>

      {/* 8 GALLERY PREVIEW */}
      <section aria-labelledby="gal-h" className="bg-white">
        <div className="mx-auto max-w-[1320px] px-6 py-[clamp(80px,9vw,128px)]">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-7">
            <div className="max-w-[680px]">
              <Kicker>MOMENTS OF HOPE</Kicker>
              <h2 id="gal-h" className="m-0 font-heading text-[clamp(34px,3.8vw,54px)] font-extrabold leading-[1.08] tracking-[-0.02em] text-ink-900">
                Stories Told Through the People We Serve.
              </h2>
            </div>
            <PillLink href="/gallery" variant="outline">Explore Our Gallery <span aria-hidden="true">→</span></PillLink>
          </div>
          <GalleryPreview items={galleryPreview} />
        </div>
      </section>

      {/* 9 SUPPORT CTA */}
      <section aria-labelledby="cta-h" className="relative overflow-hidden bg-brand-500 text-white">
        <Image
          src="/images/symbol.png"
          alt=""
          aria-hidden="true"
          width={480}
          height={480}
          className="pointer-events-none absolute top-1/2 right-[max(-80px,calc((100vw-1320px)/2-40px))] w-[clamp(260px,34vw,480px)] -translate-y-1/2 opacity-[0.16]"
        />
        <div className="relative mx-auto max-w-[1320px] px-6 py-[clamp(80px,9vw,120px)]">
          <h2 id="cta-h" className="mb-6 max-w-[820px] font-heading text-[clamp(36px,4.4vw,64px)] font-extrabold leading-[1.05] tracking-[-0.025em] text-white">
            Be Part of Something That Changes Lives.
          </h2>
          <p className="mb-10 max-w-[600px] text-lg leading-[1.7] text-white">
            Whether through financial giving, sponsorship, or donated goods, your support can
            help us reach communities facing urgent challenges.
          </p>
          <div className="flex flex-wrap gap-3.5">
            <PillLink href="/support" variant="white">Donate Now <span aria-hidden="true">→</span></PillLink>
            <PillLink href="/contact" variant="outline-light">Contact Us</PillLink>
          </div>
        </div>
      </section>
    </>
  );
}
