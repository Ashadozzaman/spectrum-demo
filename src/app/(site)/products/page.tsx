import type { Metadata } from "next";
import Link from "next/link";
import { Layers } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import FilterTabs from "@/components/ui/FilterTabs";
import IconTile from "@/components/ui/IconTile";
import CtaBanner from "@/components/ui/CtaBanner";
import ProductCard from "@/components/products/ProductCard";
import { productCount, productGroups, whySpectrum, type ProductGroup } from "@/content/products";
import { contactFor } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Card Printers, Biometrics and Software",
  description:
    "Smart card printers, biometric devices, kiosks, CCTV, ERP and e-KYC software, supplied and supported across Bangladesh by Spectrum.",
  alternates: { canonical: "/products" },
};

function Group({ group }: { group: ProductGroup }) {
  const cols = group.half
    ? "sm:grid-cols-2"
    : group.products.length % 3 === 0
      ? "sm:grid-cols-2 xl:grid-cols-3"
      : "sm:grid-cols-2 xl:grid-cols-4";
  return (
    <section id={group.id} aria-labelledby={`${group.id}-h`} className="flex scroll-mt-28 flex-col gap-7">
      <div className="flex items-center gap-4 border-b border-line pb-5" data-reveal="0">
        <IconTile icon={group.icon} size="sm" />
        <div className="flex flex-col gap-1">
          <h2 id={`${group.id}-h`} className="m-0 font-display text-[clamp(24px,2.2vw,30px)] font-semibold tracking-[-0.02em] text-fg">
            {group.title}
          </h2>
          <p className="m-0 text-[15px] text-fg-muted">{group.description}</p>
        </div>
        <span className="ml-auto hidden font-mono text-xs text-fg-subtle sm:block">
          {String(group.products.length).padStart(2, "0")} ITEMS
        </span>
      </div>
      <div className={`grid grid-cols-1 gap-5 ${cols}`}>
        {group.products.map((p, i) => (
          <div key={p.name} className="h-full" data-reveal={(i % 4) * 60}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default function ProductsPage() {
  const options = [
    { id: "all", label: "All", icon: <Layers />, count: productCount },
    ...productGroups.map((g) => {
      const Icon = g.icon;
      return { id: g.filter, label: g.title, icon: <Icon />, count: g.products.length };
    }),
  ];

  return (
    <>
      <PageHero
        crumb="Products"
        title={<>Our <em>products</em></>}
        lead="Ready-to-use devices and software for ID cards, security, self-service and running your business. We supply, install and support them across Bangladesh."
        chips={productGroups.map((g) => {
          const Icon = g.icon;
          return { label: g.title, icon: <Icon />, href: `#${g.id}` };
        })}
      />

      {/* Catalogue */}
      <div className="bg-bg">
        <div className="shell flex flex-col gap-8 py-[clamp(80px,9vw,140px)]">
          <SectionHeading
            eyebrow="Find what you need"
            title="Products grouped by what you need"
            lead="Pick a group to see only those products. Every product comes with installation, training and local support."
          />
          <FilterTabs
            label="Show products by group"
            options={options}
            className="mt-6 grid grid-cols-1 gap-x-10 gap-y-[clamp(56px,6vw,88px)] lg:grid-cols-2"
            classNameWhenFiltered="lg:col-span-2"
            items={productGroups.map((g) => ({
              key: g.id,
              category: g.filter,
              className: g.half ? "" : "lg:col-span-2",
              node: <Group group={g} />,
            }))}
          />
        </div>
      </div>

      {/* Why Spectrum */}
      <section aria-labelledby="why-h" className="services">
        <div className="services__dots" aria-hidden="true" />
        <div className="services__inner grid items-center gap-[clamp(40px,5vw,80px)] lg:grid-cols-[5fr_7fr]">
          <div className="flex flex-col gap-7">
            <SectionHeading
              id="why-h"
              eyebrow="Why Spectrum"
              title="More than a box on a desk"
              lead="We do not just deliver a product. We set it up, connect it to the systems you already use, train your team, and stay on hand when you need help."
            />
            <Link href={contactFor("Product catalogue")} className="btn-outline" data-reveal="200">
              Ask for our catalogue <span aria-hidden="true" className="arrow-accent">→</span>
            </Link>
          </div>
          <ul className="m-0 grid list-none grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line p-0 sm:grid-cols-2">
            {whySpectrum.map((w, i) => (
              <li key={w.title} className="flex flex-col gap-4 bg-surface p-7" data-reveal={i * 70}>
                <IconTile icon={w.icon} size="sm" />
                <h3 className="m-0 font-display text-lg font-semibold text-fg">{w.title}</h3>
                <p className="m-0 text-[15px] leading-relaxed text-fg-muted">{w.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBanner
        eyebrow="Bulk orders and tenders"
        title="Need many units or a custom setup?"
        text="Tell us what you need. We can visit your site, show you a demo and help with tender documents."
        action="Ask for a quote"
      />
    </>
  );
}
