# Migration notes

Working log for moving the old static site (`../spectrum/*.html`, Bootstrap) to
this Next.js app in the new home-page design. Newest entries first.

---

## 2026-11-17 (4): Privacy Policy, Terms of Use, Case Studies menu

### What was done

| Route | Source | Data |
|---|---|---|
| `/privacy-policy` | `privacy-policy.html` | `src/data/legal/privacy-policy.json` |
| `/terms` | `terms.html` | `src/data/legal/terms.json` |

- Shared layout `components/legal/LegalDocument.tsx`: sticky "On this page" list + numbered
  sections. Section `body` items are a paragraph (string), `{ "list": [...] }` or `{ "heading": "..." }`
  (type `LegalPage` in `content-types.ts`, loaded with `getLegalPage(slug)`).
- Redirects: `privacy-policy.html` → `/privacy-policy`, `terms.html` → `/terms`.
- Header: "Case Studies" opens a dropdown on hover/focus listing every case-study page
  (`getCaseStudies()` = visible projects with a `projects/<slug>.json`). Mobile menu unchanged.

---

## 2026-11-17 (3): About and Contact pages

### What was done

| Route | Source | Sections |
|---|---|---|
| `/about` | `about-us.html` | Hero · who we are (facts + photo) · numbers · areas of work (services.json `core`) · 6 projects (projects.json) · mission & vision · how we work · chairman (full profile in a `<details>`, replaces the old modal) · home certifications/clients section · CTA |
| `/contact` | `contact.html` | Hero · 3 "why are you writing" cards · office details + form · map · what happens next · FAQ · certifications · CTA |

- Content in `src/data/about.json` and `src/data/contact.json`, read via `getAboutPage()` / `getContactPage()`
  (types `AboutPage`, `ContactPage` in `content-types.ts`).
- `routes.about` is now `/about` (was `/#about`), so the header, mobile menu and footer "About Us" link
  go to the page and highlight it. Home "Read more about us" button links there too.
- Contact form (`components/contact/ContactForm.tsx`, client) posts to the **same Formspree endpoint**
  as the old site (`form.endpoint` in contact.json) with fetch, same fields, honeypot, "email or phone"
  rule, success/error messages. `?product=<name>` (from `contactFor()`) pre-selects "A quote for one of
  our products", shows the product and sets the subject. It is read on the client, so `/contact` stays static.
- Redirects: `about-us(.html)`, `about.html` → `/about`; `contact(.html)`, `Contact.html`, `contact-us` → `/contact`.
- Images: `public/images/about/team.webp`, `chairman.webp` (from the old site).
- `serviceCardProps()` (LinkCard props from a services.json entry) moved to `components/ui/LinkCard.tsx`,
  shared by `/services` and `/about`. Icons `Handshake`, `Target` added to `icons.ts`.

### Not done / follow-ups

- No test message was sent through the form (it would email the real inbox); try one from the live site.
- ~~Still pending: `/privacy-policy`, `/terms`~~ done (see entry (4)).

---

## 2026-11-17 (2): Detail pages + all content as JSON

### What was done

- **Content moved to JSON** (`src/data/`), read through an API-like layer `src/lib/data.ts`.
  `src/content/*.ts` removed. Icons are referenced by name (`src/lib/icons.ts`), links by
  reference (`service:slug`, `project:slug`, ..., resolved by `resolveHref` in `routes.ts`).
- **Detail pages** (all static, 91 pages in the build):
  | Route | Count | Source |
  |---|---|---|
  | `/services/[slug]` | 9 | the old service guides + `mobile-apps.html` |
  | `/projects/[slug]` | 9 | `case-study-*.html` (e-Court kept, still hidden from lists) |
  | `/products/[slug]` | 21 | `products.json`; 12 have extra sections (`upokari.html` in full, e-KYC/biometrics/printers from the identity & smart card guides, the 7 AI Contact Center parts) |
- One generic block renderer (`components/blocks/Blocks.tsx`) draws every section type
  in the home design; `PageHero` gained breadcrumb trail, eyebrow, actions and image.
- **JSON API:** `GET /api/content/{services|products|projects}` and `/api/content/<kind>/<slug>`.
- Old URLs redirect (with and without `.html`): service guides → `/services/...`,
  `case-study-*` → `/projects/...`, `upokari` → `/products/upokari`, `case-study` → `/projects`.
- Images from the old site copied to `public/images/` (pages, digital-identity, apps, projects, og).
- Home service cards, case-study links and CTA now point at real routes.
- Product cards link to their page ("Details"); `/services` "systems" link to product pages.
- ESLint ignores the old-site folder `spectrum-website-2026-11-12/`.
- **Fixed: content invisible** (scroll reveal). `SiteEffects` hid `[data-reveal]` elements and
  marked them `data-revealed`; when the effect was cleaned up before they scrolled into view
  (Strict Mode double effects in dev, back/forward to a kept-alive page) they stayed at
  opacity 0 forever. Cleanup now resets elements that were never revealed.

### Not done / follow-ups

- 9 products have no old detail copy (access control, attendance, CCTV, GPS, alarms, kiosks,
  signage, ERP, smart city): their pages show the summary, features, support and related items.
  Add `src/data/products/<slug>.json` to give them sections.
- ~~Still pending: `/privacy-policy`, `/terms`~~ done (see entry (4)).

---

## 2026-11-17: Services, Products and Projects pages

### What was done

**New routes** (static, built in the new dark design, content from the old pages):

| Route       | Source              | Sections |
|-------------|---------------------|----------|
| `/services` | `services.html`     | Hero · 10 main services · 9 systems we install · 4-step "how we work" · CTA |
| `/products` | `products.html`     | Hero (chips jump to groups) · filterable catalogue of 21 products in 5 groups · Why Spectrum · CTA |
| `/projects` | `projects.html`     | Hero · filterable grid of 9 projects · numbers · CTA |

Old URLs `/services.html`, `/products.html`, `/projects.html` (and the
capitalised variants, plus `/index.html`) redirect permanently (308) to the new
routes (`next.config.ts`).

**Tailwind turned on** (it was installed but not imported):
- `src/app/globals.css` imports Tailwind theme + utilities, **without preflight**,
  so the home page renders exactly as before.
- Design tokens from the home design are in `@theme` (colours, fonts).
- `home.css` moved into the `components` layer so utilities override it.

**Shared layout refactor**
- `src/app/page.tsx` → `src/app/(site)/page.tsx`; new `src/app/(site)/layout.tsx`
  renders Header, MobileMenu, Footer for every page.
- Header, Footer, MobileMenu moved `components/home/` → `components/site/`.
  Nav links now point at real routes (they were `#` before) and the active page
  is highlighted (`NavLink`, `aria-current`).
- Mobile menu, magnetic buttons, card tilt and scroll-reveal moved out of
  `HomeEffects` into `components/site/SiteEffects.tsx`, so they work on every
  page and after client-side navigation. `HomeEffects` keeps the home-only parts
  (hero carousel, count-up, sticky case studies, process timeline).
- Escape now closes the mobile menu, and changing route closes it too.

**Reusable building blocks** in `src/components/ui/`: `PageHero`,
`SectionHeading`, `LinkCard` (= home `.svc-card`), `IconTile`, `FilterTabs`,
`CtaBanner` (= home CTA box with custom text).

**Content as data**: `src/content/{services,products,projects}.ts`.
**All internal URLs** in `src/lib/routes.ts`.

**Other changes**
- Added dependency `lucide-react` (icons; replaces Font Awesome from the old site).
- Root metadata: `metadataBase` = https://spectrum.com.bd and title template
  `%s | Spectrum IT Solutions`. Each new page sets title, description, canonical.
- Home hero class `.block` renamed to `.chain-block` (in `home.css` and
  `Hero.tsx`), because Tailwind's `block` utility would have overridden it.

### Decisions

- **New design, not the old look.** The old pages are Bootstrap with a light
  theme; only home has a new design. Copying the old markup would have meant
  loading Bootstrap next to the new CSS and two different-looking sites. The
  content is kept word for word (headings slightly shortened to sentence case to
  match home); the layout uses home's components.
- **Industrial e-Court** project is kept in `src/content/projects.ts` with
  `hidden: true`, same as the old site (ecourt.gov.bd offline). Remove the flag to show it.
- Old stat icons (`assets/img/icon_1..4.png`) were not brought over; the numbers
  use the home page's `.stats` block instead.

### Verified

- `npm run build` passes; `/`, `/services`, `/products`, `/projects` prerender as static.
- `npm run lint`: no errors (1 existing warning about the Google Fonts `<link>` in the root layout).
- Screenshots checked at 1440px and 390px wide; home page hero unchanged.
- `/projects.html` → 308 → `/projects`.

### Pending: pages linked but not built yet (they 404 for now)

All listed in `src/lib/routes.ts`:

- `/contact` (many "Ask for a quote" / CTA links use `?product=…#contact-form`;
  the contact form should read the `product` query param and use `id="contact-form"`)
- ~~Service pages, case studies, `/upokari`~~ done (see entry above)
- ~~`/privacy-policy`, `/terms`, about page~~ done

### Ideas / follow-ups

- Home page sections still have some `href="#"` links (service cards, case
  studies, CTA) that can now point at `routes.*`.
- Language switch (EN / বাং) is visual only.
- Consider `next/font` instead of the Google Fonts `<link>` (fixes the lint warning).
- The untracked `spectrum-website-2026-11-12/` folder (copy of the old site) is
  excluded from Tailwind scanning; decide whether to delete or `.gitignore` it.
