import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { cache } from "react";
import type {
  AboutPage, ContactPage, DetailFile, Product, ProductsIndex, ProductSummary, Project, ProjectsIndex, Service, ServicesIndex,
} from "./content-types";

// Server-only module (reads the file system). Import it from Server Components and route handlers only.

/**
 * Content API. Pages call these functions instead of importing content, so the
 * data source (JSON files today) can later be swapped for a CMS or a real API
 * without touching any page.
 *
 *   src/data/services.json            list page data   -> getServicesIndex()
 *   src/data/services/<slug>.json     one detail page  -> getService(slug)
 *   (same for products and projects)
 *
 * Adding a page = adding a JSON file (and, for products/projects, an entry in
 * the list file). No code changes.
 *
 * Files are read with readFileSync: Next treats sync reads as predictable, so
 * pages are prerendered at build time, and in `next dev` every request sees
 * the latest JSON. React `cache` dedupes reads within one render.
 */

const DATA_DIR = path.join(process.cwd(), "src", "data");

const readJson = cache(<T,>(file: string): T => {
  return JSON.parse(readFileSync(path.join(DATA_DIR, file), "utf8")) as T;
});

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function readDetail(kind: string, slug: string): DetailFile | null {
  if (!SLUG.test(slug)) return null; // also blocks ../ paths
  const file = `${kind}/${slug}.json`;
  return existsSync(path.join(DATA_DIR, file)) ? readJson<DetailFile>(file) : null;
}

/** Slugs that have a detail file in src/data/<kind>/. */
const detailSlugs = cache((kind: string): string[] =>
  readdirSync(path.join(DATA_DIR, kind))
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.slice(0, -5)),
);

// ---- Services ----------------------------------------------------------------

export async function getServicesIndex(): Promise<ServicesIndex> {
  return readJson<ServicesIndex>("services.json");
}

export async function getServiceSlugs(): Promise<string[]> {
  return detailSlugs("services");
}

export async function getService(slug: string): Promise<Service | null> {
  const detail = readDetail("services", slug);
  if (!detail) return null;
  const summary = (await getServicesIndex()).core.find((s) => s.slug === slug);
  if (!summary) throw new Error(`src/data/services/${slug}.json has no entry in services.json "core"`);
  return { ...summary, ...detail, slug };
}

/** Title + link for each service with a detail page (for menus and related links). */
export async function getServiceLinks() {
  const { core } = await getServicesIndex();
  return core.filter((s): s is typeof s & { slug: string } => !!s.slug);
}

// ---- Products ----------------------------------------------------------------

export async function getProductsIndex(): Promise<ProductsIndex> {
  return readJson<ProductsIndex>("products.json");
}

export async function getProducts(): Promise<(ProductSummary & { groupId: string })[]> {
  const { groups } = await getProductsIndex();
  return groups.flatMap((g) => g.products.map((p) => ({ ...p, groupId: g.id })));
}

export async function getProductSlugs(): Promise<string[]> {
  return (await getProducts()).map((p) => p.slug);
}

/** A product page exists for every product in products.json; its JSON file adds detail sections. */
export async function getProduct(slug: string): Promise<Product | null> {
  const { groups } = await getProductsIndex();
  for (const { products, ...group } of groups) {
    const summary = products.find((p) => p.slug === slug);
    if (summary) return { ...summary, group, ...(readDetail("products", slug) ?? {}) };
  }
  return null;
}

export async function getProductsForService(serviceSlug: string) {
  return (await getProducts()).filter((p) => p.service === serviceSlug);
}

// ---- Projects ----------------------------------------------------------------

export async function getProjectsIndex(): Promise<ProjectsIndex> {
  return readJson<ProjectsIndex>("projects.json");
}

export async function getVisibleProjects() {
  return (await getProjectsIndex()).projects.filter((p) => !p.hidden);
}

export async function getProjectSlugs(): Promise<string[]> {
  return detailSlugs("projects");
}

export async function getProject(slug: string): Promise<Project | null> {
  const detail = readDetail("projects", slug);
  if (!detail) return null;
  const summary = (await getProjectsIndex()).projects.find((p) => p.slug === slug);
  if (!summary) throw new Error(`src/data/projects/${slug}.json has no entry in projects.json`);
  return { ...summary, ...detail };
}

/** Projects that have their own case-study page (visible, with a `projects/<slug>.json`), in list order. */
export async function getCaseStudies() {
  const slugs = new Set(await getProjectSlugs());
  return (await getVisibleProjects()).filter((p) => slugs.has(p.slug));
}

/** Summaries for a list of project slugs, in that order (unknown or hidden slugs skipped). */
export async function getProjectsBySlug(slugs: string[]) {
  const { projects } = await getProjectsIndex();
  return slugs.flatMap((s) => projects.filter((p) => p.slug === s && !p.hidden));
}

// ---- Pages ---------------------------------------------------------------------

export async function getAboutPage(): Promise<AboutPage> {
  return readJson<AboutPage>("about.json");
}

export async function getContactPage(): Promise<ContactPage> {
  return readJson<ContactPage>("contact.json");
}
