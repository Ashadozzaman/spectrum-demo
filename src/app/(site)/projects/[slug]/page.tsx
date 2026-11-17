import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Blocks from "@/components/blocks/Blocks";
import Section from "@/components/blocks/Section";
import LinkCard from "@/components/ui/LinkCard";
import ButtonLink from "@/components/ui/ButtonLink";
import { DetailCta, DetailHero, Intro, ProjectGrid, seoMetadata } from "@/components/detail/DetailParts";
import { getProject, getProjectSlugs, getServicesIndex, getVisibleProjects } from "@/lib/data";
import { getIcon } from "@/lib/icons";
import { contactFor, projectHref, routes, serviceHref } from "@/lib/routes";

type Props = { params: Promise<{ slug: string }> };

/** One page per src/data/projects/<slug>.json (case study). */
export async function generateStaticParams() {
  return (await getProjectSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  return project ? seoMetadata(project.seo, projectHref(slug)) : {};
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const [{ core }, visible] = await Promise.all([getServicesIndex(), getVisibleProjects()]);
  const guides = (project.relatedServices ?? []).flatMap((s) => core.filter((c) => c.slug === s));
  const others = visible.filter((p) => p.slug !== slug).slice(0, 3);
  const blocks = project.sections.filter((b) => b.type !== "divider").length;

  return (
    <>
      <DetailHero
        hero={project.hero}
        title={project.title}
        trail={[{ label: "Projects", href: routes.projects }]}
        extraActions={
          <>
            <ButtonLink href={contactFor(project.title)} label="Discuss a similar project" />
            {project.secondary && <ButtonLink href={project.secondary.href} label={project.secondary.label} variant="outline" />}
          </>
        }
      />
      <Intro text={project.intro} />
      <Blocks blocks={project.sections} />

      {guides.length > 0 && (
        <Section
          id="guides"
          eyebrow="Learn more"
          title="The technology behind it"
          lead="Plain guides to the technology used in this project."
          alt={blocks % 2 === 0}
        >
          <div className="services__grid">
            {guides.map((g, i) => (
              <LinkCard
                key={g.slug}
                href={serviceHref(g.slug!)}
                title={g.title}
                description={g.description}
                image={g.image}
                icon={g.icon ? getIcon(g.icon) : undefined}
                more="Read the guide"
                reveal={(i % 3) * 70}
              />
            ))}
          </div>
        </Section>
      )}

      <ProjectGrid
        projects={others}
        eyebrow="More case studies"
        title="Other systems we built"
        alt={guides.length > 0 ? blocks % 2 !== 0 : blocks % 2 === 0}
      />

      <DetailCta
        cta={project.cta}
        fallback={{
          eyebrow: "Planning a similar system?",
          title: "Let’s build your next system.",
          text: "Tell us what you need to build. We will show you how we would approach it, with an honest view of time and cost.",
          action: "Talk to our team",
        }}
      />
    </>
  );
}
