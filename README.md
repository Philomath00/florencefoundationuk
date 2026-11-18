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
  limiting, a Supabase insert, and a Resend email send. Supabase is live — submissions
  are genuinely saved to the `contact_submissions` table (verified end-to-end). Resend
  isn't set up yet, so no notification email goes out yet, but the form still succeeds
  because the database save alone counts as success (a real enquiry is never silently
  dropped just because one channel isn't configured).
- Supabase project `florence-foundation` (`eu-west-2`) created, with the
  `contact_submissions` table and Row Level Security policies: the public `anon` role
  can only insert; reading/updating/deleting is reserved for `authenticated` users
  (the future `/admin` dashboard, once Supabase Auth is wired up there). No service-role
  key is used anywhere in the app — everything goes through RLS.
- SEO foundations: per-page metadata, Organization (NGO) and BreadcrumbList JSON-LD,
  `sitemap.xml`, and `robots.ts` that automatically **disallows all indexing on anything
  that isn't the production Vercel deployment** (previews and local dev are never
  indexed).

**Not built yet:** Blog, the `/admin` dashboard (incl. Supabase Auth for admin login),
the hero slider and gallery becoming database-backed (they currently read from static
files in `src/content/`), Resend email sending, analytics wiring, and Vercel deployment.

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

1. ~~**GitHub**~~ — done: [github.com/Philomath00/florencefoundationuk](https://github.com/Philomath00/florencefoundationuk).
2. ~~**Supabase**~~ — done: project `florence-foundation` in `eu-west-2`, connected and
   schema applied.
3. **Resend** ([resend.com](https://resend.com)) — still needed. Create an account
   (you can sign up with GitHub), optionally verify a sending domain (or use their
   shared test domain while developing), and create an API key. Send the API key and
   the verified "from" address (or say you're using the test domain).
4. ~~**Vercel**~~ — done: project `florence-foundation-website` created and linked to
   the GitHub repo (team `heydanehq-9182's projects`). `NEXT_PUBLIC_SUPABASE_URL`,
   `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `CONTACT_RECIPIENT_EMAIL` and `CONTACT_FROM_EMAIL`
   are set for all environments. Every push to `main` now auto-deploys to production.
   `RESEND_API_KEY` still needs adding once step 3 is done.
5. Confirm the **real** bank details, phone number and office address to replace the
   placeholders described above.

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
