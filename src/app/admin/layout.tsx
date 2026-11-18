import Link from "next/link";
import Image from "next/image";
import { createRscSupabaseClient } from "@/lib/supabase/rsc";
import { signOut } from "@/app/admin/actions";

const navItems = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/submissions", label: "Contact Submissions" },
  { href: "/admin/slider", label: "Hero Slider" },
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/settings", label: "Website Settings" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createRscSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // Middleware should already have redirected; this is a defensive fallback.
    return children;
  }

  const { data: adminRow } = await supabase.from("admin_users").select("id").eq("id", user.id).maybeSingle();

  if (!adminRow) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface px-6">
        <div className="max-w-[440px] rounded-[28px] bg-white p-8 text-center shadow-lg">
          <h1 className="mb-2 font-heading text-xl font-extrabold text-ink-900">Not authorized</h1>
          <p className="mb-6 text-sm leading-relaxed text-ink-600">
            You&apos;re signed in as <strong>{user.email}</strong>, but this account isn&apos;t on the
            admin allowlist for Florence Foundation. Ask an existing admin to add you.
          </p>
          <form action={signOut}>
            <button type="submit" className="rounded-full border-2 border-accent-300 px-6 py-3 font-heading text-sm font-bold text-ink-900 hover:bg-accent-50">
              Sign out
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-surface">
      <aside className="flex w-64 flex-shrink-0 flex-col border-r border-border bg-white">
        <div className="flex items-center gap-2 border-b border-border-4 px-6 py-5">
          <Image src="/images/logo-color.png" alt="Florence Foundation" width={140} height={36} className="h-9 w-auto" />
        </div>
        <nav className="flex-1 px-3 py-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-ink-700 hover:bg-brand-50 hover:text-brand-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-border-4 px-6 py-4">
          <p className="mb-2 truncate text-xs text-ink-600">{user.email}</p>
          <form action={signOut}>
            <button type="submit" className="text-sm font-semibold text-accent-800 hover:underline">
              Sign out
            </button>
          </form>
        </div>
      </aside>
      <main className="min-w-0 flex-1 px-8 py-8">{children}</main>
    </div>
  );
}
