import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Blocks from "@/components/blocks/Blocks";
import Section from "@/components/blocks/Section";
import ProductCard from "@/components/products/ProductCard";
import { DetailCta, DetailHero, Intro, ProjectGrid, seoMetadata } from "@/components/detail/DetailParts";
import { getProductsForService, getProjectsBySlug, getService, getServiceSlugs } from "@/lib/data";
import { routes, serviceHref } from "@/lib/routes";

type Props = { params: Promise<{ slug: string }> };

/** One page per src/data/services/<slug>.json. */
export async function generateStaticParams() {
  return (await getServiceSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  return service ? seoMetadata(service.seo, serviceHref(slug)) : {};
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) notFound();

  const [products, projects] = await Promise.all([
    getProductsForService(slug),
    getProjectsBySlug(service.relatedProjects ?? []),
  ]);
  const altAfterBlocks = service.sections.filter((b) => b.type !== "divider").length % 2 === 0;

  return (
    <>
      <DetailHero hero={service.hero} title={service.title} trail={[{ label: "Services", href: routes.services }]} />
      <Intro text={service.intro} />
      <Blocks blocks={service.sections} />

      {products.length > 0 && (
        <Section
          id="products"
          eyebrow="Products"
          title="Ready-made products for this"
          lead="Devices and software we supply, install and support."
          alt={altAfterBlocks}
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((p, i) => (
              <div key={p.slug} className="h-full" data-reveal={(i % 3) * 60}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </Section>
      )}

      <ProjectGrid
        projects={projects}
        eyebrow="Our work"
        title="Projects that use it"
        alt={products.length > 0 ? !altAfterBlocks : altAfterBlocks}
      />

      <DetailCta
        cta={service.cta}
        fallback={{
          eyebrow: "Let’s talk",
          title: "Tell us what you need.",
          text: "We will suggest the simplest way to get there, with an honest view of time and cost.",
          action: "Talk to our team",
        }}
      />
    </>
  );
}
