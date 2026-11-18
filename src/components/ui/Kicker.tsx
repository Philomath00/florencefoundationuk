export default function Kicker({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return (
    <p
      className={`mb-4 flex items-center gap-2.5 font-heading text-[13px] font-bold tracking-[0.16em] text-brand-500 ${className}`}
    >
      <span aria-hidden="true" className="flex gap-1">
        <span className="h-[7px] w-[7px] rounded-full border-[1.5px] border-current" />
        <span className="h-[7px] w-[7px] rounded-full border-[1.5px] border-current" />
      </span>
      {children}
    </p>
  );
}
