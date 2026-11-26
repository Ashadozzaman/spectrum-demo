import type { Metadata } from "next";
import { FileText, IdCard, Layers, ShieldCheck, Ticket } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import FilterTabs from "@/components/ui/FilterTabs";
import CtaBanner from "@/components/ui/CtaBanner";
import ProjectCard from "@/components/projects/ProjectCard";
import { getProjectsIndex } from "@/lib/data";
import { getIcon } from "@/lib/icons";

export const metadata: Metadata = {
  title: "National & Enterprise Projects",
  description:
    "National and enterprise systems built by Spectrum: TCB smart card, TCB AI contact centre, e-Licensing, the Officers’ Club Dhaka member portal and apps, and more.",
  alternates: { canonical: "/projects" },
};

export default async function ProjectsPage() {
  const { categories: projectCategories, stats: projectStats, projects } = await getProjectsIndex();
  const visibleProjects = projects.filter((p) => !p.hidden);
  const options = [
    { id: "all", label: "All", icon: <Layers />, count: visibleProjects.length },
    ...projectCategories.map((c) => {
      const Icon = getIcon(c.icon);
      return {
      id: c.id,
      label: c.label,
      icon: <Icon />,
      count: visibleProjects.filter((p) => p.category === c.id).length,
      };
    }),
  ];

  return (
    <>
      <PageHero
        crumb="Projects"
        title={<>Our <em>projects</em></>}
        lead="Systems we have built and still look after: smart cards, an AI contact centre, licences, online club bookings and ticketing, used by millions of people in Bangladesh."
        chips={[
          { label: "10M+ families served", icon: <IdCard /> },
          { label: "National e-Licensing", icon: <FileText /> },
          { label: "Online ticketing", icon: <Ticket /> },
          { label: "Secure by design", icon: <ShieldCheck /> },
        ]}
      />

      {/* Delivered projects */}
      <section aria-labelledby="projects-h" className="bg-bg">
        <div className="shell py-[clamp(80px,9vw,140px)]">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-8">
            <SectionHeading
              id="projects-h"
              eyebrow="Our projects"
              title="Systems in daily use"
              lead="Nationwide digital transformation initiatives delivering tangible socio-economic impact across government ministries and public service departments."
            />
          </div>
          <FilterTabs
            label="Show projects by category"
            options={options}
            className="mt-8 grid grid-cols-[repeat(auto-fill,minmax(min(100%,340px),1fr))] gap-5"
            items={visibleProjects.map((p, i) => ({
              key: p.slug,
              category: p.category,
              node: (
                <div className="h-full" data-reveal={(i % 3) * 70}>
                  <ProjectCard project={p} />
                </div>
              ),
            }))}
          />
        </div>
      </section>

      {/* In numbers */}
      <section aria-labelledby="numbers-h" className="services">
        <div className="services__dots" aria-hidden="true" />
        <div className="services__inner flex flex-wrap items-end justify-between gap-10">
          <SectionHeading
            id="numbers-h"
            eyebrow="In numbers"
            title="Our work at a glance"
            lead="A few numbers from the systems above."
          />
          <dl className="stats m-0 w-full">
            {projectStats.map((s, i) => (
              <div key={s.label} className="stat" data-reveal={i * 60}>
                <dt className="stat__label">{s.label}</dt>
                <dd className={`stat__value ${s.accent ? "stat__value--accent" : ""}`}>{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CtaBanner
        eyebrow="Planning a large project?"
        title="Let’s build your next system."
        text="We help government offices and businesses plan, build and run secure systems, and we stay on to support them."
        action="Talk to our team"
      />
    </>
  );
}
