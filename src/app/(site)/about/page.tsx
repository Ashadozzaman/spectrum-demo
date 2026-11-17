/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { Plus } from "lucide-react";
import Blocks from "@/components/blocks/Blocks";
import Section from "@/components/blocks/Section";
import { Paragraphs } from "@/components/blocks/RichText";
import { DetailCta, DetailHero, seoMetadata } from "@/components/detail/DetailParts";
import ProjectCard from "@/components/projects/ProjectCard";
import Clients from "@/components/home/Clients";
import LinkCard, { serviceCardProps } from "@/components/ui/LinkCard";
import ButtonLink from "@/components/ui/ButtonLink";
import { getAboutPage, getProjectsBySlug, getServicesIndex } from "@/lib/data";
import { routes } from "@/lib/routes";
import type { AboutPage } from "@/lib/content-types";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getAboutPage();
  return seoMetadata(seo, routes.about);
}

export default async function AboutUsPage() {
  const about = await getAboutPage();
  const [{ core }, projects] = await Promise.all([getServicesIndex(), getProjectsBySlug(about.work.projects)]);

  return (
    <>
      <DetailHero hero={about.hero} title="About Us" trail={[]} />

      {/* Who we are (plain) · numbers (dotted) */}
      <Blocks blocks={about.intro} firstAlt={false} />

      <Section id="areas" eyebrow={about.areas.eyebrow} title={about.areas.title} lead={about.areas.lead}>
        <div className="services__grid">
          {core.map((s, i) => (
            <LinkCard key={s.title} {...serviceCardProps(s)} num={i + 1} reveal={(i % 3) * 70} />
          ))}
        </div>
      </Section>

      <Section id="our-work" eyebrow={about.work.eyebrow} title={about.work.title} lead={about.work.lead} alt>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,340px),1fr))] gap-5">
          {projects.map((p, i) => (
            <div key={p.slug} className="h-full" data-reveal={(i % 3) * 70}>
              <ProjectCard project={p} />
            </div>
          ))}
        </div>
        <div className="mt-10">
          <ButtonLink href="page:projects" label="See all projects" variant="outline" />
        </div>
      </Section>

      {/* Mission & vision (plain) · how we work (dotted) */}
      <Blocks blocks={about.values} firstAlt={false} />

      <Leader leader={about.leader} />

      {/* Certifications + clients: same section as the home page */}
      <Clients />

      <DetailCta
        cta={about.cta}
        fallback={{ title: "Let’s build something that lasts.", text: "", action: "Work with us" }}
      />
    </>
  );
}

function Leader({ leader }: { leader: AboutPage["leader"] }) {
  return (
    <Section id="leadership" eyebrow={leader.eyebrow} title={leader.title}>
      <div className="grid items-start gap-[clamp(32px,5vw,72px)] lg:grid-cols-[5fr_7fr]">
        <figure className="m-0 flex flex-col gap-5 lg:sticky lg:top-28" data-reveal="0">
          <img
            src={leader.image.src}
            alt={leader.image.alt}
            width={leader.image.width}
            height={leader.image.height}
            loading="lazy"
            className="h-auto w-full rounded-[24px] border border-line-strong bg-linear-to-b from-card to-card-deep object-cover"
          />
          <figcaption className="flex flex-col gap-1.5">
            <span className="font-display text-2xl font-semibold tracking-[-0.015em] text-fg">{leader.name}</span>
            <span className="text-base text-fg-muted">{leader.role}</span>
            {leader.tagline && (
              <span className="mt-1 font-mono text-xs tracking-[.14em] text-brand">{leader.tagline.toUpperCase()}</span>
            )}
          </figcaption>
        </figure>

        <div className="flex flex-col gap-8" data-reveal="80">
          <Paragraphs items={leader.summary} className="[&_p]:text-fg" />

          <details className="group rounded-2xl border border-line bg-surface open:border-line-strong">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 font-display text-lg font-semibold text-fg [&::-webkit-details-marker]:hidden">
              <span className="group-open:hidden">Read the full profile</span>
              <span className="hidden group-open:inline">Full profile</span>
              <Plus aria-hidden="true" className="size-5 shrink-0 text-brand transition-transform group-open:rotate-45" />
            </summary>
            <div className="flex flex-col gap-8 px-6 pb-8">
              {leader.profile.map((part) => (
                <div key={part.title} className="flex flex-col gap-3">
                  <h3 className="m-0 font-display text-xl leading-tight font-semibold tracking-[-0.015em] text-fg">
                    {part.title}
                  </h3>
                  <Paragraphs items={part.body} />
                </div>
              ))}
            </div>
          </details>
        </div>
      </div>
    </Section>
  );
}
