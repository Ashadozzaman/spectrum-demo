import { getProductsIndex, getProjectsIndex, getServicesIndex } from "@/lib/data";

/**
 * Read-only JSON API over src/data, e.g. GET /api/content/projects.
 * Same data the pages use (through src/lib/data.ts), prerendered at build time.
 */
const lists = {
  services: getServicesIndex,
  products: getProductsIndex,
  projects: getProjectsIndex,
};

export function generateStaticParams() {
  return Object.keys(lists).map((kind) => ({ kind }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ kind: string }> }) {
  const { kind } = await params;
  const load = lists[kind as keyof typeof lists];
  if (!load) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(await load());
}
