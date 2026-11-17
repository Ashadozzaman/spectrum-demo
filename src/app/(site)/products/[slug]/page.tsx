import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Blocks, { Bullets } from "@/components/blocks/Blocks";
import Section from "@/components/blocks/Section";
import IconTile from "@/components/ui/IconTile";
import LinkCard from "@/components/ui/LinkCard";
import ButtonLink from "@/components/ui/ButtonLink";
import ProductCard from "@/components/products/ProductCard";
import { DetailCta, DetailHero, Intro, ProjectGrid } from "@/components/detail/DetailParts";
import { getProduct, getProductSlugs, getProductsIndex, getProjectsBySlug, getServicesIndex } from "@/lib/data";
import { getIcon } from "@/lib/icons";
import { contactFor, productHref, routes, serviceHref } from "@/lib/routes";

type Props = { params: Promise<{ slug: string }> };

/** One page per product in src/data/products.json; src/data/products/<slug>.json adds detail sections. */
export async function generateStaticParams() {
  return (await getProductSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProduct(slug);
  if (!p) return {};
  const title = p.seo?.title ?? `${p.name} in Bangladesh`;
  const description = p.seo?.description ?? p.description;
  return {
    title,
    description,
    alternates: { canonical: productHref(slug) },
    openGraph: { title, description, url: productHref(slug), images: p.seo?.image ? [p.seo.image] : undefined },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const [{ groups, why }, { core }, projects] = await Promise.all([
    getProductsIndex(),
    getServicesIndex(),
    getProjectsBySlug(product.relatedProjects ?? []),
  ]);
  const service = product.service ? core.find((s) => s.slug === product.service) : undefined;
  const siblings = groups.find((g) => g.id === product.group.id)!.products.filter((p) => p.slug !== slug);
  const sections = product.sections ?? [];

  // Bands alternate plain / dotted: features (dotted), the JSON sections, then the
  // sections below (only those that render count).
  const lastAlt = sections.filter((b) => b.type !== "divider").length % 2 === 0;
  const tail = ["included", service?.slug && "how", projects.length && "projects", siblings.length && "related"].filter(
    (k): k is string => typeof k === "string",
  );
  const altOf = (key: string) => tail.indexOf(key) % 2 === 0 !== lastAlt;

  const hero = product.hero ?? { lead: product.description };

  return (
    <>
      <DetailHero
        hero={{ eyebrow: product.kind, ...hero }}
        title={product.name}
        trail={[
          { label: "Products", href: routes.products },
          { label: product.group.title, href: `${routes.products}#${product.group.id}` },
        ]}
        extraActions={
          <>
            <ButtonLink href={contactFor(product.name)} label="Ask for a quote" />
            {product.external && <ButtonLink href={product.external.href} label={product.external.label} variant="outline" />}
          </>
        }
      />

      <Intro text={product.intro} />

      {/* Key features: always shown, from products.json `specs` */}
      <Section id="features" eyebrow="At a glance" title="Key features" alt>
        <div className="grid items-start gap-[clamp(32px,5vw,72px)] lg:grid-cols-[auto_1fr]">
          <IconTile icon={getIcon(product.icon)} />
          <div className="flex flex-col gap-6">
            <p className="m-0 max-w-[760px] text-[17px] leading-[1.7] text-fg-muted">{product.description}</p>
            <Bullets items={product.specs} />
          </div>
        </div>
      </Section>

      <Blocks blocks={sections} firstAlt={false} />

      <Section
        id="included"
        eyebrow="Every product comes with"
        title="Installation, training and local support"
        lead="We set it up, connect it to the systems you already use, train your team, and stay on hand when you need help."
        alt={altOf("included")}
      >
        <ul className="m-0 grid list-none grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line p-0 sm:grid-cols-2 xl:grid-cols-4">
          {why.map((w, i) => (
            <li key={w.title} className="flex flex-col gap-4 bg-surface p-7" data-reveal={i * 70}>
              <IconTile icon={getIcon(w.icon)} size="sm" />
              <h3 className="m-0 font-display text-lg font-semibold text-fg">{w.title}</h3>
              <p className="m-0 text-[15px] leading-relaxed text-fg-muted">{w.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      {service?.slug && (
        <Section id="how-it-works" eyebrow="How it works" title="Learn about the technology" alt={altOf("how")}>
          <div className="services__grid">
            <LinkCard
              href={serviceHref(service.slug)}
              title={service.title}
              description={service.description}
              image={service.image}
              icon={service.icon ? getIcon(service.icon) : undefined}
              more="Read the guide"
            />
          </div>
        </Section>
      )}

      <ProjectGrid projects={projects} eyebrow="In use" title="Where we have used it" alt={altOf("projects")} />

      {siblings.length > 0 && (
        <Section id="related" eyebrow={product.group.title} title="Related products" alt={altOf("related")}>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {siblings.slice(0, 3).map((p, i) => (
              <div key={p.slug} className="h-full" data-reveal={(i % 3) * 60}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </Section>
      )}

      <DetailCta
        cta={product.cta}
        fallback={{
          eyebrow: "Bulk orders and tenders",
          title: `Interested in ${product.name}?`,
          text: "Tell us what you need. We can visit your site, show you a demo and help with tender documents.",
          action: "Ask for a quote",
          href: contactFor(product.name),
        }}
      />
    </>
  );
}
