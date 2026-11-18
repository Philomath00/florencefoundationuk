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
  limiting, a Supabase insert, and a Resend email send — both verified end-to-end with
  live test submissions (confirmed in the database, and the Resend call completed with
  no errors). The database save and the email send are independent, so a real enquiry
  is saved even if one of the two channels is ever down.
- Supabase project `florence-foundation` (`eu-west-2`) created, with the
  `contact_submissions` table and Row Level Security policies: the public `anon` role
  can only insert; reading/updating/deleting is reserved for `authenticated` users
  (the future `/admin` dashboard, once Supabase Auth is wired up there). No service-role
  key is used anywhere in the app — everything goes through RLS.
- Resend connected on its Free plan, sending from the shared `resend.dev` test domain
  for now (swap `CONTACT_FROM_EMAIL` once a real domain is verified).
- Vercel project `florence-foundation-website` created and linked to the GitHub repo —
  **live at [florence-foundation-website.vercel.app](https://florence-foundation-website.vercel.app)**,
  auto-deploying on every push to `main`.
- SEO foundations: per-page metadata, Organization (NGO) and BreadcrumbList JSON-LD,
  `sitemap.xml`, and `robots.ts` that automatically **disallows all indexing on anything
  that isn't the production Vercel deployment** (previews and local dev are never
  indexed).

**Not built yet:** Blog, the `/admin` dashboard (incl. Supabase Auth for admin login),
the hero slider and gallery becoming database-backed (they currently read from static
files in `src/content/`), and analytics wiring.

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

All four accounts are now connected: ~~GitHub~~, ~~Supabase~~, ~~Resend~~, ~~Vercel~~.
What's left:

1. Confirm the **real** bank details, phone number and office address, to replace the
   design export's sample placeholders described above.
2. Whenever ready: a verified sending domain in Resend (so email comes from
   `@florencefoundation.co.uk` instead of the shared test domain), and a custom domain
   pointed at the Vercel project instead of the `.vercel.app` address.

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
