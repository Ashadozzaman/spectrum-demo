import {
  getProduct, getProductSlugs, getProject, getProjectSlugs, getService, getServiceSlugs,
} from "@/lib/data";

/** One item with its detail content, e.g. GET /api/content/services/brand-protection. */
const items = {
  services: { slugs: getServiceSlugs, get: getService },
  products: { slugs: getProductSlugs, get: getProduct },
  projects: { slugs: getProjectSlugs, get: getProject },
};

export async function generateStaticParams() {
  const all = await Promise.all(
    Object.entries(items).map(async ([kind, api]) => (await api.slugs()).map((slug) => ({ kind, slug }))),
  );
  return all.flat();
}

export async function GET(_req: Request, { params }: { params: Promise<{ kind: string; slug: string }> }) {
  const { kind, slug } = await params;
  const api = items[kind as keyof typeof items];
  const item = api ? await api.get(slug) : null;
  if (!item) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(item);
}
