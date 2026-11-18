# Florence Foundation Website

Production Next.js site for Florence Foundation, built from the approved Claude Design
export in [`_design-reference/`](_design-reference). That folder is the visual source of
truth — layout, branding, typography, copy and imagery must not be redesigned.

## Status

**Built so far:**

- Next.js 16 (App Router) + TypeScript + Tailwind CSS v4, matching the design's brand
  tokens exactly (see `src/app/globals.css`).
- All six public marketing pages, pixel/content-faithful to the design export and
  verified in-browser: Home, About Us, Projects (index + dynamic detail pages), Gallery
  (with year tabs, masonry layout and a full lightbox), Support Us (with copy-to-clipboard
  bank details), Contact Us (working form with client + server validation).
- Shared `Header` (sticky, scroll-aware, mobile drawer with focus trap) and `Footer`.
- A real `/api/contact` route: Zod validation, a honeypot field, basic per-IP rate
  limiting, Supabase insert, and a Resend email send. It currently returns a clear
  "not configured" error because no Supabase or Resend project exists yet — see
  **What we need from you** below. This is intentionally *not* mocked.
- SEO foundations: per-page metadata, Organization (NGO) and BreadcrumbList JSON-LD,
  `sitemap.xml`, and `robots.ts` that automatically **disallows all indexing on anything
  that isn't the production Vercel deployment** (previews and local dev are never
  indexed).

**Not built yet:** Blog, the `/admin` dashboard, the hero slider and gallery becoming
database-backed (they currently read from static files in `src/content/`), analytics
wiring, and the Supabase schema/migrations. These need the accounts below before they
can be built against something real.

## Known placeholder data

These values came from the design export as **sample data for design review** and must
be replaced with Florence Foundation's real information before launch:

- Bank account details for UK and Nigeria (`src/content/site.ts` → `bankAccounts`) — shown
  on `/support` with an on-page warning banner.
- Phone number and office address (`src/content/site.ts` → `siteConfig.phone` /
  `siteConfig.address`) — shown on `/contact`, also marked "(sample)" on the page itself.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in values as they become available
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## What we need from you

The project has no backend yet — these all need **your own accounts** (for billing,
ownership and security reasons this isn't something to hand over credentials for
instead). Once created, send the values below and the next build phase (DB schema,
admin dashboard, email, analytics, deployment) can proceed.

1. **GitHub** — create an empty repository (e.g. `florence-foundation-website`) under
   your account or organization. Send the repo URL.
2. **Supabase** ([supabase.com](https://supabase.com)) — create a new project (choose a
   region close to your users, e.g. `eu-west-2` for UK). From *Project Settings → API*,
   send: Project URL, `anon` public key, and `service_role` secret key (treat the service
   role key like a password).
3. **Resend** ([resend.com](https://resend.com)) — create an account, verify a sending
   domain (or use their shared test domain while developing), and create an API key.
   Send the API key and the verified "from" address.
4. **Vercel** ([vercel.com](https://vercel.com)) — create an account/team and connect it
   to the GitHub repo from step 1 once it exists. Vercel will handle hosting, preview
   deployments and analytics.
5. Confirm the **real** bank details, phone number and office address to replace the
   placeholders described above.

Nothing above requires technical knowledge beyond clicking "create project" and copying
some keys — all of them have a free tier suitable for a site this size.

## Project structure

```
src/
  app/            Next.js App Router pages, layouts, API routes, sitemap/robots
  components/     Shared UI (ui/), per-page sections (home/, about/, ...), layout/
  content/        Static content + types (projects, gallery, site config) — becomes
                   the fallback/seed data once Supabase is wired up
  lib/            Server-only integrations (Supabase, Resend, rate limiting)
_design-reference/  The approved Claude Design export — do not edit; read from it for
                     any content/imagery not yet ported
```

## Design system

Brand tokens (colors, fonts) are defined once in `src/app/globals.css` under `:root` /
`@theme inline`, taken directly from the design export's inline styles (brand purple
`#6A62D6`, ink `#302F35`, Plus Jakarta Sans for headings, DM Sans for body). Use the
Tailwind classes generated from these tokens (`bg-brand-500`, `text-accent-300`, etc.)
rather than hard-coding new colors.

## Deployment

Designed to deploy to Vercel with zero extra configuration once the GitHub repo is
connected: `npm run build` is a standard Next.js build with no custom server
requirements, so it would also run on any Node.js host if ever moved off Vercel.
