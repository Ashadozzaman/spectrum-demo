/**
 * Shape of the JSON files in `src/data/`. This is the "API schema" for site
 * content: list files hold the summaries used on /services, /products and
 * /projects; one file per item (`src/data/<kind>/<slug>.json`) holds the
 * detail page.
 *
 * Text fields accept a little inline markup (see components/blocks/RichText):
 *   **bold**   *green emphasis*   [link text](service:brand-protection)
 *
 * Links (`href`) accept URLs or references resolved by `resolveHref`:
 *   service:<slug>  product:<slug>  project:<slug>  page:<routes key>  contact:<topic>
 *
 * Icons are lucide names registered in `src/lib/icons.ts`.
 */

// ---- Shared ------------------------------------------------------------------

export type LinkData = { label: string; href: string };
export type Image = { src: string; alt: string; width?: number; height?: number };
export type Stat = { value: string; label: string; accent?: boolean };
export type Chip = { label: string; icon?: string };
export type Seo = { title: string; description: string; image?: string };
export type Cta = { eyebrow?: string; title: string; text: string; action?: string; href?: string };

export type Hero = {
  /** Small label above the title (falls back to the section name). */
  eyebrow?: string;
  /** Wrap the highlighted words in *asterisks*. Defaults to the item title. */
  title?: string;
  lead: string;
  chips?: Chip[];
  image?: Image;
  actions?: LinkData[];
};

// ---- Content blocks ------------------------------------------------------------

type BlockBase = {
  /** Anchor id (#how-it-works). */
  id?: string;
  eyebrow?: string;
  title?: string;
  lead?: string;
  /** Paragraphs shown after the block body. */
  after?: string[];
  /** Darker band with the dotted background, like the home services section. */
  tone?: "default" | "alt";
};

export type Item = { title?: string; text: string; icon?: string };

export type AppInfo = {
  name: string;
  icon: string;
  platforms: string;
  downloads?: string;
  rating?: string;
  version?: string;
  text?: string;
  stores?: { google?: string; apple?: string };
  more?: LinkData;
  screenshots?: { src: string; caption: string }[];
};

export type Block =
  /** Plain paragraphs. */
  | (BlockBase & { type: "text"; body: string[] })
  /** Grid of cards (title + text, optional icon). */
  | (BlockBase & { type: "cards"; items: Item[]; columns?: 2 | 3 | 4 })
  /** List of "**Title.** text" rows. */
  | (BlockBase & { type: "list"; items: Item[]; ordered?: boolean; intro?: string })
  /** Numbered steps; a step can have bullets, an image and a note. */
  | (BlockBase & {
      type: "steps";
      items: { title: string; text?: string; bullets?: string[]; image?: Image; note?: string }[];
    })
  /** Side-by-side lists, e.g. Benefits / Risks. */
  | (BlockBase & {
      type: "columns";
      columns: { title: string; tone?: "good" | "bad"; items: Item[] }[];
    })
  /** Text + image + buttons (+ optional stats). Used for "how Spectrum helps" and proof sections. */
  | (BlockBase & {
      type: "feature";
      body: string[];
      image?: Image;
      actions?: LinkData[];
      stats?: Stat[];
      bullets?: string[];
      reverse?: boolean;
    })
  /** Simple table. First column is the row header. */
  | (BlockBase & { type: "table"; columns: string[]; rows: string[][] })
  | (BlockBase & { type: "faq"; items: { q: string; a: string }[] })
  | (BlockBase & { type: "stats"; items: Stat[]; bullets?: string[] })
  /** Key facts (Client, Sector, ...) next to an image. */
  | (BlockBase & { type: "facts"; body?: string[]; items: { label: string; value: string; href?: string }[]; image?: Image })
  /** One app with screenshots and store buttons. */
  | (BlockBase & { type: "app"; app: AppInfo })
  /** Grid of apps (no screenshots). */
  | (BlockBase & { type: "apps"; items: AppInfo[] })
  | (BlockBase & { type: "gallery"; items: { src: string; caption: string; alt?: string }[] })
  /** Link cards to other pages. */
  | (BlockBase & { type: "links"; items: (Item & { href: string; more?: string })[] })
  /** A short centred line between the guide part and the "how we help" part. */
  | (BlockBase & { type: "divider"; text: string });

export type BlockType = Block["type"];

/** What every detail JSON file contains. */
export type DetailFile = {
  seo: Seo;
  hero: Hero;
  /** Opening paragraph(s) under the hero. */
  intro?: string[];
  sections: Block[];
  cta?: Cta;
};

// ---- Services ------------------------------------------------------------------

export type ServiceSummary = {
  /** Has a detail page at /services/<slug> (src/data/services/<slug>.json). */
  slug?: string;
  title: string;
  description: string;
  /** Overrides the link (for items without a detail page). */
  href?: string;
  more?: string;
  /** PNG icon in /public (same look as `icon`), preferred when present. */
  image?: string;
  icon?: string;
};

export type ServicesIndex = {
  core: ServiceSummary[];
  systems: ServiceSummary[];
  workSteps: { title: string; text: string }[];
};

export type Service = ServiceSummary & { slug: string } & DetailFile & {
  /** Projects to show at the bottom. */
  relatedProjects?: string[];
};

// ---- Products ------------------------------------------------------------------

export type ProductSummary = {
  slug: string;
  name: string;
  /** Small label above the name. */
  kind: string;
  icon: string;
  description: string;
  specs: string[];
  /** Related service slug ("How it works" link). */
  service?: string;
  external?: LinkData;
  highlight?: boolean;
};

export type ProductGroup = {
  /** Also the anchor id (#id-cards) linked from /services. */
  id: string;
  filter: string;
  title: string;
  description: string;
  icon: string;
  /** Half-width group on large screens. */
  half?: boolean;
  products: ProductSummary[];
};

export type ProductsIndex = {
  groups: ProductGroup[];
  why: { title: string; text: string; icon: string }[];
};

export type Product = ProductSummary & {
  group: Omit<ProductGroup, "products">;
  relatedProjects?: string[];
} & Partial<DetailFile>;

// ---- Projects ------------------------------------------------------------------

export type ProjectCategory = { id: string; label: string; icon: string };

export type ProjectSummary = {
  slug: string;
  title: string;
  category: string;
  icon: string;
  badge: string;
  client: string;
  description: string;
  tags: string[];
  /** Main button; defaults to "Read case study" -> /projects/<slug>. */
  primary?: LinkData;
  secondary?: LinkData;
  flagship?: boolean;
  /** Kept in the data but not listed. Its page still works for old links. */
  hidden?: boolean;
};

export type ProjectsIndex = {
  categories: ProjectCategory[];
  stats: Stat[];
  projects: ProjectSummary[];
};

export type Project = ProjectSummary & DetailFile & {
  /** Service guides linked under "The technology". */
  relatedServices?: string[];
};
