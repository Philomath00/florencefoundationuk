import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "outline" | "outline-light" | "white" | "accent";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-500 text-white hover:bg-brand-600 hover:-translate-y-0.5",
  outline:
    "border-2 border-ink-900 text-ink-900 hover:bg-ink-900 hover:text-white",
  "outline-light":
    "border-2 border-white text-white hover:bg-white hover:text-brand-700",
  white:
    "bg-white text-brand-700 hover:bg-accent-200 hover:text-ink-900 hover:-translate-y-0.5",
  accent:
    "bg-accent-300 text-ink-900 hover:bg-accent-200",
};

export default function PillLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-3 rounded-full px-[30px] py-[18px] font-heading text-base font-bold transition ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
