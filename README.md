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
  (year tabs, masonry layout, full lightbox), Support Us (copy-to-clipboard bank
  details), Contact Us (working form with client + server validation).
- A public **Blog** (`/blog`, `/blog/[slug]`) with Markdown content and `BlogPosting`
  JSON-LD, fully admin-managed (see below).
- A real **homepage hero image slider**: the right-hand image auto-advances (and
  respects `prefers-reduced-motion`), admin-managed from `/admin/slider` — the
  heading/copy/buttons on the left are fixed design content, never per-slide.
- A floating **"back to top" button** (appears after scrolling) and a floating
  **WhatsApp button** (bottom-left, hidden unless a number is set in Website Settings)
  that opens a chat with an admin-configurable default message.
- Shared `Header` (sticky, scroll-aware, mobile drawer with focus trap) and `Footer`.
  "Blog" is intentionally not in the nav (matches the approved design) — `/blog` and
  its admin CMS still work, just unlinked until wanted there.
- A real `/api/contact` route: Zod validation, a honeypot field, per-IP rate limiting, a
  Supabase insert, and a Resend email send — verified end-to-end with live test
  submissions. The database save and the email send are independent, so a real enquiry
  is saved even if one channel is ever down.
- **`/admin` dashboard**, gated by Supabase Auth with an explicit `admin_users`
  allowlist (not just "anyone logged in") — `proxy.ts` (Next 16's middleware
  convention) guards the routes, and the layout double-checks allowlist membership
  server-side before rendering anything. Modules, all backed by real Supabase tables
  with Row Level Security:
  - **Overview** — real content counts (no fabricated analytics); links out to the
    Vercel Analytics dashboard for full visitor/pageview/traffic-source numbers.
  - **Contact Submissions** — view, mark read/resolved, delete.
  - **Website Settings** — org info, contact details, social links, default SEO,
    Google/Bing search verification codes, the WhatsApp button's number and default
    message, and both bank accounts. The public Footer/Contact/Support pages (and the
    page `<head>`) read from here, falling back to `src/content/site.ts` if Supabase
    is ever unavailable.
  - **Hero Slider** — upload/edit/reorder/publish/delete slide images.
  - **Gallery** — albums + multi-image upload (select several files at once — alt
    text is pre-filled from each file name and editable afterward), publish toggle
    per image.
  - **Projects** — full CRUD on all six programme pages (objectives, activities,
    photos, giving CTA) — these were static files, now genuinely admin-editable.
  - **Blog** — full CRUD: Markdown content, featured image, tags, draft/published/
    scheduled status, per-post SEO.
  - All image uploads go through a new Supabase Storage bucket (`site-media`), with
    admin-only write policies and image-type/size validation.
- **Vercel Web Analytics + Speed Insights** installed and collecting data, with two
  custom events tracked: `donate_cta_click` (every "Donate Now" button) and
  `contact_form_submitted`.
- Supabase project `florence-foundation` (`eu-west-2`), no service-role key used
  anywhere in the app — every table's access is governed by RLS policies checked
  against the `admin_users` allowlist via an `is_admin()` helper.
- Resend connected on its Free plan, sending from the shared `resend.dev` test domain
  for now.
- Vercel project `florence-foundation-website`, linked to the GitHub repo — **live at
  [florence-foundation-website.vercel.app](https://florence-foundation-website.vercel.app)**,
  auto-deploying on every push to `main`.
- SEO foundations: per-page metadata, Organization (NGO), BreadcrumbList and
  BlogPosting JSON-LD, `sitemap.xml` (incl. published blog posts), and `robots.ts` that
  disallows indexing on anything that isn't the production Vercel deployment.
  Google Search Console / Bing Webmaster Tools verification codes can be pasted into
  Website Settings whenever you add the site there — no code change needed.
- A proper **favicon** (the brand mark, not the default Next.js/Vercel icon the
  scaffold ships with) and a branded **Open Graph image** (`public/images/og-image.jpg`)
  so link previews in iMessage/WhatsApp/Slack/social media show the Florence
  Foundation logo and site name instead of a generic icon.

**Not built yet:** blog category UI (the `blog_categories` table exists but has no
admin screen yet — posts currently only have free-text tags), a way to add further
admin users from within `/admin` itself (today that's one manual SQL step), and a
"forgot password" link on the admin login page.

## Admin access

The first admin account is `heydanehq@gmail.com`, created directly in the Supabase
dashboard (Authentication → Users) and added to the `admin_users` allowlist. To add
another admin: create their user the same way in Supabase, then insert a row into
`admin_users` with their `auth.users` id and email — there's no self-service signup by
design, since this is a small internal tool, not a public feature.

## Known placeholder data

These values came from the design export as **sample data for design review**. The
real values can now be entered directly in **Website Settings** under `/admin` rather
than edited in code:

- Bank account details for UK and Nigeria — shown on `/support` with an on-page
  warning banner linking to `/admin/settings`.
- Phone number and office address — shown on `/contact`, marked "(sample)" on the page.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in values as they become available
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Visit `/admin/login` to sign in to
the dashboard.

## What we need from you

All four accounts are connected: ~~GitHub~~, ~~Supabase~~, ~~Resend~~, ~~Vercel~~. What's left:

1. Log in to `/admin` and confirm everything looks right from your end.
2. Enter the **real** bank details, phone number and office address under Website
   Settings in `/admin`, to replace the design export's sample placeholders.
3. Whenever ready: a verified sending domain in Resend (so email comes from
   `@florencefoundation.co.uk` instead of the shared test domain), and a custom domain
   pointed at the Vercel project instead of the `.vercel.app` address.
4. Optional, recommended: enable "leaked password protection" in Supabase
   (Authentication → Policies) — a one-click toggle the Supabase security advisor
   flagged, checking new passwords against known breach lists.

## Project structure

```
src/
  app/            Next.js App Router pages, layouts, API routes, admin dashboard,
                   sitemap/robots
  app/admin/      The admin dashboard (Server Components + Server Actions)
  components/     Shared UI (ui/), per-page sections (home/, about/, ...), layout/,
                   admin/ (dashboard-only components)
  content/        Static fallback content + types (projects, gallery, site config) —
                   used only if Supabase is unreachable
  lib/            Server-only integrations (Supabase clients, Resend, rate limiting,
                   site-settings/projects-data resolvers)
  proxy.ts        Next 16's middleware convention — refreshes the Supabase session and
                   guards /admin routes
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
