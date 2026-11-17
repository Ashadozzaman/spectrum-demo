# Migration notes

Working log for moving the old static site (`../spectrum/*.html`, Bootstrap) to
this Next.js app in the new home-page design. Newest entries first.

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
- Service pages: `/digital-identity-security`, `/smart-card-technologies`,
  `/artificial-intelligence`, `/blockchain-technology`, `/anti-counterfeit`,
  `/brand-protection`, `/business-automation`, `/ai-contact-center`, `/mobile-apps`
- Case studies: `/case-study`, `/case-study-tcb`, `/case-study-tcb-contact-center`,
  `/case-study-e-licensing`, `/case-study-gcc`, `/case-study-apfs`,
  `/case-study-smart-card`, `/case-study-ocd`, `/case-study-novotheatre`,
  `/case-study-e-court`
- `/upokari`, `/privacy-policy`, `/terms`, about page (currently `/#about`)

### Ideas / follow-ups

- Home page sections still have some `href="#"` links (service cards, case
  studies, CTA) that can now point at `routes.*`.
- Language switch (EN / বাং) is visual only.
- Consider `next/font` instead of the Google Fonts `<link>` (fixes the lint warning).
- The untracked `spectrum-website-2026-11-12/` folder (copy of the old site) is
  excluded from Tailwind scanning; decide whether to delete or `.gitignore` it.
