import type { Metadata } from "next";
import { Brain, FingerprintPattern, IdCard, ShieldCheck } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import LinkCard, { serviceCardProps as card } from "@/components/ui/LinkCard";
import CtaBanner from "@/components/ui/CtaBanner";
import { getServicesIndex } from "@/lib/data";

export const metadata: Metadata = {
  title: "IT and Software Services in Bangladesh",
  description:
    "Digital identity, smart cards, AI, AI contact centres, blockchain, anti-counterfeit, brand protection and business automation: IT and software services from Spectrum in Dhaka.",
  alternates: { canonical: "/services" },
};

export default async function ServicesPage() {
  const { core: coreServices, systems, workSteps } = await getServicesIndex();
  return (
    <>
      <PageHero
        crumb="Services"
        title={<>Our <em>services</em></>}
        lead="From the first plan to a system running across the country, we design, build and support software and secure technology for government and business."
        chips={[
          { label: "Digital Identity", icon: <FingerprintPattern /> },
          { label: "Smart Cards", icon: <IdCard /> },
          { label: "Artificial Intelligence", icon: <Brain /> },
          { label: "Anti-Counterfeit", icon: <ShieldCheck /> },
        ]}
      />

      {/* Core services */}
      <section aria-labelledby="core-h" className="relative bg-bg">
        <div className="shell py-[clamp(80px,9vw,140px)]">
          <SectionHeading
            id="core-h"
            eyebrow="What we do"
            title="Our main services"
            lead="Each of these has its own page with a plain guide to the topic and how we can help."
            className="mb-[clamp(40px,4vw,64px)]"
          />
          <div className="services__grid">
            {coreServices.map((s, i) => (
              <LinkCard key={s.title} {...card(s)} num={i + 1} reveal={(i % 3) * 70} />
            ))}
          </div>
        </div>
      </section>

      {/* Systems we install */}
      <section aria-labelledby="systems-h" className="services">
        <div className="services__dots" aria-hidden="true" />
        <div className="services__inner">
          <SectionHeading
            id="systems-h"
            eyebrow="Systems we install"
            title="Devices and systems, set up for you"
            lead="We supply, install, connect and support these systems. Each links to the matching product."
            className="mb-[clamp(40px,4vw,64px)]"
          />
          <div className="services__grid">
            {systems.map((s, i) => (
              <LinkCard key={s.title} {...card(s)} more={s.more ?? "See product"} reveal={(i % 3) * 70} />
            ))}
          </div>
        </div>
      </section>

      {/* How we work */}
      <section aria-labelledby="how-h" className="border-t border-line bg-bg">
        <div className="shell py-[clamp(80px,9vw,140px)]">
          <SectionHeading
            id="how-h"
            eyebrow="How we work"
            title="From first talk to long-term support"
            className="mb-[clamp(40px,4vw,64px)]"
          />
          <ol className="m-0 grid list-none grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line p-0 sm:grid-cols-2 lg:grid-cols-4">
            {workSteps.map((step, i) => (
              <li key={step.title} className="flex flex-col gap-4 bg-surface p-8" data-reveal={i * 70}>
                <span className="font-mono text-xs tracking-[.14em] text-brand">
                  <span className="sr-only">Step </span>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="m-0 font-display text-2xl font-semibold tracking-[-0.015em] text-fg">{step.title}</h3>
                <p className="m-0 text-base leading-relaxed text-fg-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBanner
        eyebrow="Not sure where to start?"
        title="Tell us what you want to do."
        text="We will suggest the simplest way to get there, with an honest view of time and cost."
        action="Talk to our team"
      />
    </>
  );
}
