import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import PillLink from "@/components/ui/PillLink";
import CtaBand from "@/components/ui/CtaBand";
import BankDetails from "@/components/support/BankDetails";
import { getSiteSettings } from "@/lib/site-settings";

export const metadata: Metadata = {
  title: "Support Us",
  description:
    "Support Florence Foundation through donations, child sponsorship, or by giving essential goods. Every contribution helps provide food, care, education and opportunities to vulnerable communities.",
  alternates: { canonical: "/support" },
};

const purpose = [
  { n: "01", t: "Community needs", d: "We listen to communities and respond to what they need most." },
  { n: "02", t: "Dignity", d: "Every person we serve is treated with respect and compassion." },
  { n: "03", t: "Accountability", d: "We take responsibility for how support is used." },
  { n: "04", t: "Sustainable outcomes", d: "We combine immediate relief with long-term solutions." },
  { n: "05", t: "Transparent action", d: "Responsible humanitarian action guides everything we do." },
];

export default async function SupportPage() {
  const settings = await getSiteSettings();

  return (
    <>
      {/* HERO */}
      <section aria-labelledby="s-hero-h" className="relative overflow-hidden bg-surface">
        <div className="grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,520px),1fr))]">
          <div className="flex flex-col justify-center px-6 py-[clamp(56px,7vw,104px)] lg:pl-[max(24px,calc((100vw-1320px)/2+24px))]">
            <nav aria-label="Breadcrumb" className="mb-7">
              <ol className="flex list-none gap-2.5 p-0 text-sm text-ink-600">
                <li><Link href="/" className="text-ink-900 hover:text-brand-500">Home</Link></li>
                <li aria-hidden="true" className="text-accent-500">/</li>
                <li aria-current="page" className="text-brand-500">Support Us</li>
              </ol>
            </nav>
            <p className="mb-4 font-heading text-[13px] font-bold tracking-[0.16em] text-brand-500">SUPPORT OUR MISSION</p>
            <h1 id="s-hero-h" className="m-0 font-heading text-[clamp(42px,5vw,76px)] font-extrabold leading-[1.04] tracking-[-0.025em] text-ink-900">
              Your Generosity Can Make a Difference.
            </h1>
            <p className="mt-7 mb-10 max-w-[520px] text-lg leading-[1.7] text-ink-700">
              Every contribution helps Florence Foundation pursue its mission of providing food,
              care, education, and opportunities to vulnerable communities.
            </p>
            <div className="flex flex-wrap gap-3.5">
              <PillLink href="#donate">Make a Donation <span aria-hidden="true">↓</span></PillLink>
              <PillLink href="#ways" variant="outline" className="!border-accent-300 bg-white">Ways to Help</PillLink>
            </div>
          </div>
          <div className="relative min-h-[clamp(400px,46vw,700px)]">
            <Image
              src="/images/woman-headscarf-wide.jpg"
              alt="A woman in a patterned head wrap smiles softly"
              fill
              style={{ objectPosition: "76% 35%" }}
              className="rounded-bl-[clamp(80px,12vw,220px)] object-cover"
            />
          </div>
        </div>
      </section>

      {/* WAYS TO HELP */}
      <section id="ways" aria-labelledby="ways-h" className="bg-white">
        <div className="mx-auto max-w-[1320px] px-6 py-[clamp(80px,9vw,120px)]">
          <h2 id="ways-h" className="mb-12 font-heading text-[clamp(34px,3.8vw,54px)] font-extrabold leading-[1.08] tracking-[-0.02em] text-ink-900">
            Choose How You Can Help
          </h2>
          <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(min(100%,max(290px,calc((100%-48px)/3))),1fr))]">
            <article className="flex min-h-[340px] flex-col rounded-[28px] bg-brand-50 p-[clamp(28px,2.6vw,40px)]">
              <span className="font-heading text-[15px] font-extrabold text-brand-500">01</span>
              <h3 className="mt-10 mb-3 font-heading text-[26px] font-extrabold tracking-[-0.015em] text-ink-900">Make a Donation</h3>
              <p className="mb-7 flex-1 text-base leading-relaxed text-ink-700">
                Contribute financially to support Florence Foundation&apos;s humanitarian
                programmes and community initiatives.
              </p>
              <PillLink href="#donate">Donate Now <span aria-hidden="true">↓</span></PillLink>
            </article>
            <article className="flex min-h-[340px] flex-col rounded-[28px] bg-ink-900 p-[clamp(28px,2.6vw,40px)] text-white">
              <span className="font-heading text-[15px] font-extrabold text-accent-300">02</span>
              <h3 className="mt-10 mb-3 font-heading text-[26px] font-extrabold tracking-[-0.015em] text-white">Sponsor a Child</h3>
              <p className="mb-4 text-base leading-relaxed text-ink-faint">
                Support essential needs and educational opportunities through regular child
                sponsorship.
              </p>
              <p className="mb-7 flex-1 font-heading text-[30px] font-extrabold text-accent-300">
                £5 <span className="text-base text-white">per month</span>
              </p>
              <PillLink href="#sponsor" variant="accent">Become a Sponsor <span aria-hidden="true">↓</span></PillLink>
            </article>
            <article className="flex min-h-[340px] flex-col rounded-[28px] bg-accent-50 p-[clamp(28px,2.6vw,40px)]">
              <span className="font-heading text-[15px] font-extrabold text-accent-800">03</span>
              <h3 className="mt-10 mb-3 font-heading text-[26px] font-extrabold tracking-[-0.015em] text-ink-900">Give Essential Items</h3>
              <p className="mb-7 flex-1 text-base leading-relaxed text-ink-700">
                Support individuals and families by contributing useful goods and supplies that
                can help address practical needs.
              </p>
              <PillLink href="/contact?enquiry=donate-goods#contact-form" variant="outline" className="!border-accent-300 bg-white">
                Enquire About Donating Goods <span aria-hidden="true">↗</span>
              </PillLink>
            </article>
          </div>
        </div>
      </section>

      {/* CAMPAIGNS */}
      <section aria-label="Featured giving opportunities" className="bg-surface">
        <div className="mx-auto grid max-w-[1320px] gap-6 px-6 py-[clamp(80px,9vw,120px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,480px),1fr))]">
          <article id="meals" className="relative flex min-h-[520px] items-end overflow-hidden rounded-[32px] bg-ink-900">
            <Image
              src="/images/enjoy-a-meal.jpg"
              alt="A volunteer serves a cup of food to a woman in an orange patterned top"
              fill
              style={{ objectPosition: "50% 0%", transform: "scale(1.12)", transformOrigin: "50% 0%" }}
              className="object-cover"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-ink-900/0 to-[rgba(36,34,44,0.92)]" />
            <div className="relative p-[clamp(28px,3vw,44px)]">
              <p className="mb-2.5 font-heading text-[13px] font-bold tracking-[0.16em] text-accent-200">CAMPAIGN</p>
              <div className="mb-3.5 flex flex-wrap items-end gap-3 sm:gap-6">
                <h3 className="m-0 font-heading text-[clamp(30px,3vw,42px)] font-extrabold tracking-[-0.02em] text-white">Fresh Hot Meals</h3>
                <span className="font-heading text-[clamp(44px,4.4vw,64px)] leading-[0.9] font-extrabold text-accent-300">£2</span>
              </div>
              <p className="mb-6 max-w-[440px] text-[17px] leading-relaxed text-white">
                Help contribute towards a fresh, nutritious meal for someone facing food
                insecurity.
              </p>
              <PillLink href="#donate" variant="accent">Support Meals <span aria-hidden="true">↓</span></PillLink>
            </div>
          </article>
          <article id="sponsor" className="relative flex min-h-[520px] items-end overflow-hidden rounded-[32px] bg-ink-900">
            <Image
              src="/images/help-a-child.jpg"
              alt="A young child in a blue T-shirt looks down at a cup being handed to him"
              fill
              style={{ objectPosition: "50% 15%" }}
              className="object-cover"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-brand-500/0 to-brand-800/[0.94]" />
            <div className="relative p-[clamp(28px,3vw,44px)]">
              <p className="mb-2.5 font-heading text-[13px] font-bold tracking-[0.16em] text-accent-200">CAMPAIGN</p>
              <div className="mb-3.5 flex flex-wrap items-end gap-3 sm:gap-6">
                <h3 className="m-0 font-heading text-[clamp(30px,3vw,42px)] font-extrabold tracking-[-0.02em] text-white">Child Sponsorship</h3>
                <span className="font-heading text-[clamp(44px,4.4vw,64px)] leading-[0.9] font-extrabold text-white">
                  £5<span className="text-xl"> / month</span>
                </span>
              </div>
              <p className="mb-6 max-w-[440px] text-[17px] leading-relaxed text-white">
                Help support a child&apos;s essential needs and opportunities for growth.
              </p>
              <PillLink href="#donate" variant="white">Sponsor a Child <span aria-hidden="true">↓</span></PillLink>
            </div>
          </article>
        </div>
      </section>

      {/* BANK DETAILS */}
      <section id="donate" aria-labelledby="bank-h" className="bg-white">
        <div className="mx-auto max-w-[1320px] px-6 py-[clamp(80px,9vw,120px)]">
          <div className="mb-10 grid items-end gap-6 [grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr))] lg:gap-24">
            <div>
              <p className="mb-4 font-heading text-[13px] font-bold tracking-[0.16em] text-brand-500">DONATE BY BANK TRANSFER</p>
              <h2 id="bank-h" className="m-0 font-heading text-[clamp(34px,3.8vw,54px)] font-extrabold leading-[1.08] tracking-[-0.02em] text-ink-900">
                Give directly to Florence Foundation.
              </h2>
            </div>
            <p className="max-w-[560px] text-[17px] leading-[1.7] text-ink-700">
              Transfer to our UK or Nigeria account. Please add a reference so we can direct your
              gift: <strong className="text-ink-900">MEALS</strong>,{" "}
              <strong className="text-ink-900">SPONSOR</strong>, or{" "}
              <strong className="text-ink-900">DONATE</strong>.
            </p>
          </div>
          <div role="note" className="mb-7 flex items-start gap-3 rounded-2xl border-[1.5px] border-warn-border bg-warn-bg px-5 py-4 text-[15px] leading-snug text-warn-text">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" className="mt-0.5 flex-shrink-0">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4M12 16h.01" />
            </svg>
            <span>
              <strong>Sample details for design review.</strong> These account numbers are
              placeholders — update them under Website Settings in{" "}
              <a href="/admin/settings" className="underline">/admin</a> before launch.
            </span>
          </div>
          <BankDetails bankAccounts={settings.bankAccounts} />
        </div>
      </section>

      {/* WHY SUPPORT US */}
      <section aria-labelledby="purpose-h" className="bg-accent-50">
        <div className="mx-auto grid max-w-[1320px] gap-12 px-6 py-[clamp(80px,9vw,120px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,400px),1fr))] lg:gap-24">
          <div>
            <p className="mb-4 font-heading text-[13px] font-bold tracking-[0.16em] text-accent-800">WHY SUPPORT US</p>
            <h2 id="purpose-h" className="mb-6 font-heading text-[clamp(34px,3.8vw,54px)] font-extrabold leading-[1.08] tracking-[-0.02em] text-ink-900">
              Giving with Purpose.
            </h2>
            <p className="max-w-[480px] text-lg leading-[1.7] text-ink-700">
              Our work is guided by compassion, dignity, accountability, and transparency.
            </p>
          </div>
          <ol className="m-0 list-none p-0">
            {purpose.map((p) => (
              <li key={p.n} className="grid grid-cols-[64px_minmax(0,1fr)] gap-4 border-b border-[#EFC9CE] py-[22px]">
                <span className="font-heading text-4xl leading-none font-extrabold tracking-[-0.03em] text-transparent [-webkit-text-stroke:1.5px_#C24A5C]">
                  {p.n}
                </span>
                <div>
                  <h3 className="mb-1 font-heading text-[19px] font-extrabold text-ink-900">{p.t}</h3>
                  <p className="m-0 text-base leading-relaxed text-ink-700">{p.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand heading="Together, We Can Bring Hope to More Lives." ctaLabel="Make a Contribution" ctaHref="#donate" arrow="↑" />
    </>
  );
}
