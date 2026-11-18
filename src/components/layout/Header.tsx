"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { track } from "@vercel/analytics";
import { navLinks } from "@/content/site";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1080) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => closeRef.current?.focus(), 30);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const openMenu = () => {
    lastFocus.current = document.activeElement as HTMLElement;
    setOpen(true);
  };

  const closeMenu = () => {
    setOpen(false);
    lastFocus.current?.focus?.();
  };

  const onDrawerKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab") return;
    const focusable = drawerRef.current?.querySelectorAll<HTMLElement>("a,button");
    if (!focusable || focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border-3 bg-white/97 font-body backdrop-blur-sm transition-shadow">
        <div
          className={`mx-auto flex max-w-[1320px] items-center justify-between gap-6 px-6 transition-[height] duration-300 ${
            scrolled ? "h-[76px]" : "h-20 lg:h-24"
          }`}
        >
          <Link href="/" aria-label="Florence Foundation home" className="flex flex-shrink-0 items-center">
            <Image
              src="/images/logo-color.png"
              alt="Florence Foundation"
              width={200}
              height={52}
              className="h-11 w-auto lg:h-[52px]"
              priority
            />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-9 lg:flex">
            {navLinks.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className="relative py-2.5 font-heading text-[15px] font-semibold text-ink-900 transition-colors hover:text-brand-500"
                >
                  {item.label}
                  {active && (
                    <span className="absolute inset-x-0 bottom-0.5 h-0.5 rounded-full bg-accent-300" />
                  )}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/support"
            onClick={() => track("donate_cta_click", { location: "header-desktop" })}
            className="hidden items-center gap-2.5 rounded-full bg-brand-500 px-[26px] py-3.5 font-heading text-[15px] font-bold text-white transition hover:-translate-y-px hover:bg-brand-600 lg:inline-flex"
          >
            Donate Now
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </Link>

          <div className="flex items-center gap-2.5 lg:hidden">
            <Link
              href="/support"
              onClick={() => track("donate_cta_click", { location: "header-mobile" })}
              className="inline-flex min-h-11 items-center rounded-full bg-brand-500 px-[18px] font-heading text-sm font-bold text-white"
            >
              Donate
            </Link>
            <button
              type="button"
              onClick={openMenu}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="ff-drawer"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-border-2 bg-white text-ink-900"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h10" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {open && (
        <>
          <div
            onClick={closeMenu}
            className="animate-ff-fade fixed inset-0 z-[90] bg-ink-900/55"
            aria-hidden="true"
          />
          <div
            id="ff-drawer"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            onKeyDown={onDrawerKeyDown}
            className="fixed inset-y-0 right-0 z-[100] flex w-[min(88vw,380px)] flex-col overflow-y-auto bg-white px-6 py-5 font-body"
          >
            <div className="mb-7 flex items-center justify-between">
              <Image src="/images/logo-color.png" alt="Florence Foundation" width={160} height={44} className="h-11 w-auto" />
              <button
                type="button"
                ref={closeRef}
                onClick={closeMenu}
                aria-label="Close menu"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-border-2 bg-white text-ink-900"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav aria-label="Mobile" className="flex flex-col">
              {navLinks.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className="flex items-center justify-between border-b border-border-4 py-4 font-heading text-xl font-bold text-ink-900"
                  >
                    <span>{item.label}</span>
                    {active && <span className="h-2 w-2 rounded-full bg-accent-300" />}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-auto flex flex-col gap-4 pt-8">
              <Link
                href="/support"
                onClick={() => track("donate_cta_click", { location: "header-drawer" })}
                className="flex items-center justify-between rounded-full bg-brand-500 px-6 py-[18px] font-heading text-base font-bold text-white"
              >
                Donate Now <span aria-hidden="true">→</span>
              </Link>
              <p className="text-sm leading-relaxed text-ink-600">
                We Empower People, We Feed People, We Give Hope to People.
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
