import type { Metadata } from "next";
import type { ReactNode } from "react";
import type { Cta, Hero, ProjectSummary, Seo } from "@/lib/content-types";
import { getIcon } from "@/lib/icons";
import PageHero from "@/components/ui/PageHero";
import ButtonLink from "@/components/ui/ButtonLink";
import CtaBanner from "@/components/ui/CtaBanner";
import ProjectCard from "@/components/projects/ProjectCard";
import Section from "@/components/blocks/Section";
import { Paragraphs, Rich } from "@/components/blocks/RichText";
import { resolveHref } from "@/lib/routes";

/** Page metadata from a JSON `seo` object. */
export function seoMetadata(seo: Seo, path: string): Metadata {
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: path },
    openGraph: { title: seo.title, description: seo.description, url: path, images: seo.image ? [seo.image] : undefined },
  };
}

/** PageHero filled from a JSON `hero` object. */
export function DetailHero({
  hero,
  title,
  trail,
  extraActions,
}: {
  hero: Hero;
  title: string;
  trail: { label: string; href: string }[];
  extraActions?: ReactNode;
}) {
  const actions = (hero.actions?.length || extraActions) && (
    <>
      {hero.actions?.map((a, i) => (
        <ButtonLink key={a.href} href={a.href} label={a.label} variant={i === 0 ? "primary" : "outline"} />
      ))}
      {extraActions}
    </>
  );
  return (
    <PageHero
      crumb={title}
      trail={trail}
      eyebrow={hero.eyebrow}
      title={<Rich text={hero.title ?? title} />}
      lead={hero.lead}
      chips={hero.chips?.map((c) => {
        const Icon = c.icon ? getIcon(c.icon) : null;
        return { label: c.label, icon: Icon ? <Icon /> : undefined };
      })}
      actions={actions || undefined}
      image={hero.image}
    />
  );
}

/** Opening paragraph(s) under the hero. */
export function Intro({ text }: { text?: string[] }) {
  if (!text?.length) return null;
  return (
    <div className="bg-bg">
      <div className="shell py-[clamp(48px,5vw,80px)]">
        <Paragraphs items={text} className="max-w-[860px] [&_p]:text-[clamp(18px,1.5vw,21px)] [&_p]:text-fg" />
      </div>
    </div>
  );
}

export function ProjectGrid({
  projects,
  eyebrow,
  title,
  lead,
  alt,
}: {
  projects: ProjectSummary[];
  eyebrow: string;
  title: string;
  lead?: string;
  alt?: boolean;
}) {
  if (!projects.length) return null;
  return (
    <Section id="related-projects" eyebrow={eyebrow} title={title} lead={lead} alt={alt}>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,340px),1fr))] gap-5">
        {projects.map((p, i) => (
          <div key={p.slug} className="h-full" data-reveal={(i % 3) * 70}>
            <ProjectCard project={p} />
          </div>
        ))}
      </div>
    </Section>
  );
}

/** The green CTA box; JSON `cta` overrides the defaults. */
export function DetailCta({ cta, fallback }: { cta?: Cta; fallback: Cta }) {
  const c = { ...fallback, ...cta };
  return <CtaBanner eyebrow={c.eyebrow} title={c.title} text={c.text} action={c.action} href={c.href ? resolveHref(c.href) : undefined} />;
}
