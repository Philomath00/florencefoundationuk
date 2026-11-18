const phrases = ["We Empower People", "We Feed People", "We Give Hope to People"];

function Run({ dotColor }: { dotColor: string }) {
  return (
    <div className="flex flex-shrink-0 items-center">
      {[...phrases, ...phrases].map((p, i) => (
        <span key={i} className="flex items-center gap-[0.5em] whitespace-nowrap pr-[0.5em]">
          {p}
          <span className="inline-flex gap-[0.14em]">
            <span className="h-[0.22em] w-[0.22em] rounded-full" style={{ background: dotColor }} />
            <span className="h-[0.22em] w-[0.22em] rounded-full" style={{ background: dotColor }} />
          </span>
        </span>
      ))}
    </div>
  );
}

function Band({ color, dotColor, reverse }: { color: string; dotColor: string; reverse?: boolean }) {
  return (
    <div
      className={`flex w-max font-heading text-[clamp(30px,4vw,60px)] font-extrabold leading-[1.1] tracking-[-0.02em] ${
        reverse ? "animate-ff-marquee-reverse" : "animate-ff-marquee"
      }`}
      style={{ color }}
    >
      <Run dotColor={dotColor} />
      <Run dotColor={dotColor} />
    </div>
  );
}

export default function Marquee() {
  return (
    <div aria-hidden="true" className="relative h-[clamp(200px,20vw,260px)] overflow-hidden bg-white">
      <div className="absolute -left-[5%] -right-[5%] top-[14%] overflow-hidden bg-ink-900 py-[clamp(14px,1.6vw,22px)] [transform:rotate(-2.2deg)]">
        <Band color="#FFFFFF" dotColor="#F79AA7" />
      </div>
      <div className="absolute -left-[5%] -right-[5%] top-[48%] overflow-hidden bg-brand-300 py-[clamp(14px,1.6vw,22px)] [transform:rotate(1.6deg)]">
        <Band color="#302F35" dotColor="#FFFFFF" reverse />
      </div>
    </div>
  );
}
