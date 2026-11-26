@AGENTS.md

# Spectrum IT Solutions website (Next.js)

Marketing site for Spectrum IT Solutions Ltd., being migrated from an old static
Bootstrap site (`../spectrum/*.html`) to Next.js 16 (App Router, Turbopack, React 19).
See `NOTE.md` for what has been migrated so far and what is still pending.

## Commands

- `npm run dev`: dev server (http://localhost:3000)
- `npm run build`: production build; run it before calling work done
- `npm run lint`: ESLint

## Design rule: every page uses the NEW design

Only the home page has a design file (`../Spectrum IT redesign direction/Home.dc.html`).
All other pages must **look like the home page**, not like the old Bootstrap site.
Port the *content* of an old page, never its markup or CSS.
Do not add Bootstrap, Font Awesome or the old `style.min.css`.

Design language: dark green surfaces, Sora headings, IBM Plex Sans body,
JetBrains Mono eyebrows/labels, brand green `#3DBE5A`, orange `#F26522` for
primary actions and icon tiles.

## Styling

- **Tailwind v4** for all new work. Tokens live in `src/app/globals.css` (`@theme`):
  `bg-bg`, `bg-surface`, `from-card to-card-deep`, `text-fg`, `text-fg-muted`,
  `text-fg-subtle`, `text-brand`, `bg-accent`, `border-line`, `border-line-strong`,
  `font-display`, `font-mono`. Use these, not raw hex values.
- **Preflight is OFF** (it would break the pixel-matched home page). Elements keep
  browser defaults, so set `m-0`, `p-0`, `list-none` etc. explicitly on headings,
  paragraphs and lists.
- `src/app/home.css` is the hand-ported home stylesheet. It sits in the
  `components` layer, so utilities always win over it. Its classes are reused on
  inner pages on purpose for a perfect visual match:
  `.eyebrow`, `.section-title`, `.lead`, `.svc-card*`, `.services`/`.services__inner`/
  `.services__dots`/`.services__grid`, `.stats`/`.stat*`, `.cta*`, `.btn-outline`,
  `.btn-cta-lg`, `.btn-glass`, `.hero__grid-bg`, `.hero__orb`.
- Do not give a home.css class a name that is also a Tailwind utility (e.g. `block`,
  `flex`, `hidden`, `container`): the utility would override it. (`.block` was
  renamed to `.chain-block` for this reason.)
- `.shell` = page max width + side gutter (same as home sections).

## Structure

```
src/app/layout.tsx              root <html>, fonts, metadata title template
src/app/(site)/layout.tsx       shared chrome: Header, MobileMenu, <main>, Footer, SiteEffects
src/app/(site)/page.tsx         home
src/app/(site)/<route>/page.tsx inner pages (services, products, projects)
src/app/(site)/<route>/[slug]/  data-driven detail pages (one per JSON file / list entry)
src/app/api/content/            read-only JSON API over src/data (GET /api/content/<kind>[/<slug>])
src/components/site/            header, footer, mobile menu, nav list, NavLink, SiteEffects
src/components/ui/              reusable blocks: PageHero, SectionHeading, LinkCard,
                                IconTile, FilterTabs, CtaBanner
src/components/home/            home-only sections + HomeEffects (hero carousel, cases, timeline)
src/components/<page>/          page-specific components (ProjectCard, ProductCard)
src/components/blocks/          JSON section renderer (Blocks, Section, RichText, Apps)
src/components/detail/          shared detail-page parts (hero, intro, CTA, metadata)
src/data/                       ALL services/products/projects content as JSON (see below)
src/lib/data.ts                 content API: getService(slug), getProductsIndex(), ...
src/lib/content-types.ts        JSON schema (types) incl. the block types
src/lib/icons.ts                lucide icons allowed in JSON, by name
src/lib/routes.ts               EVERY internal URL + phone/email constants
```

## Content (JSON)

- List data: `src/data/services.json`, `products.json`, `projects.json`.
  Detail pages: `src/data/<kind>/<slug>.json` = `{ seo, hero, intro?, sections: Block[], cta?, related... }`.
- Pages never import JSON directly; they call `src/lib/data.ts` (an API-shaped layer, so the
  source can become a CMS later). Files are read with `readFileSync`, so pages stay static
  and `next dev` shows JSON edits on refresh.
- **Add a service/case study:** add the JSON file + its entry in the list file.
  **Add a product:** add it to `products.json` (page exists already); optional
  `products/<slug>.json` adds sections. Then add an old-URL redirect in `next.config.ts` if any.
- Section `type`s: text, cards, list, steps, columns, feature, table, faq, stats, facts,
  app, apps, gallery, links, divider (see `content-types.ts`). Bands alternate automatically.
- In JSON text: `**bold**`, `*green*`, `[label](ref)`. Links/hrefs use refs, not paths:
  `service:<slug>`, `product:<slug>`, `project:<slug>`, `page:<routes key>`, `contact:<topic>`.
- Icons in JSON are lucide names registered in `src/lib/icons.ts` (unknown name = build error).
- Redirect sources match case-insensitively: never add a bare redirect whose source equals
  a real route in another case (`/Products` would loop `/products`).

## Conventions

- **Links:** never hard-code internal paths; use `routes` from `src/lib/routes.ts`
  and `contactFor(product)` for "ask for a quote" links. Use `next/link` for internal links.
- **New inner page recipe:** `PageHero` → sections built from `SectionHeading` +
  cards → `CtaBanner`. Put the copy in `src/data/` (JSON) and read it via `src/lib/data.ts`. Add
  `export const metadata` (title, description, `alternates.canonical`).
  Then add a redirect for the old `<page>.html` in `next.config.ts` and update
  the route table in `NOTE.md`.
- **Icons:** `lucide-react`. Show them in an `IconTile` (orange square, white
  icon), which matches the home PNG icons in `public/assets/ic-*.png`.
  Check the export name exists in this lucide version before using it
  (e.g. `FingerprintPattern`, not `Fingerprint`; `Building`, not `Building2`).
- **Server first:** pages and cards are Server Components. Client components only
  for interaction (`FilterTabs`, `NavLink`, `SiteEffects`, `HomeEffects`).
  Pass server-rendered nodes into client components instead of icon components
  (functions can't cross the server/client boundary).
- **Animations** are attribute-driven and handled by `SiteEffects` on every route:
  `data-reveal="<delay ms>"` (scroll fade-in), `data-tilt` (with `.svc-card`),
  `data-magnetic`, `data-menu-open` / `data-menu-close`. Don't put `data-reveal`
  on an element that also has hover transforms (reveal writes inline transform);
  wrap it in a `<div data-reveal>` instead.
- `cacheComponents` is enabled: pages are static by default.
