/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { ReactNode } from "react";
import { routes } from "@/lib/routes";

export type HeroChip = { label: string; icon?: ReactNode; href?: string };

/**
 * Top banner for inner pages. Uses the home hero's grid + orb backgrounds
 * (.hero__grid-bg, .hero__orb) so inner pages open the same way home does.
 *
 *   <PageHero crumb="Projects" title={<>Our <em>Projects</em></>} lead="..." chips={[...]} />
 *
 * Wrap the highlighted word of `title` in <em>; it is styled in brand green.
 * Detail pages also pass `trail` (parent pages in the breadcrumb), `eyebrow`,
 * `actions` (buttons) and an optional `image` shown on the right.
 */
export default function PageHero({
  crumb,
  trail = [],
  eyebrow,
  title,
  lead,
  chips = [],
  actions,
  image,
}: {
  crumb: string;
  trail?: { label: string; href: string }[];
  eyebrow?: string;
  title: ReactNode;
  lead: string;
  chips?: HeroChip[];
  actions?: ReactNode;
  image?: { src: string; alt: string };
}) {
  return (
    <section className="relative overflow-hidden border-b border-line pt-[clamp(132px,13vw,176px)] pb-[clamp(56px,6vw,88px)]">
      <div className="hero__grid-bg" aria-hidden="true" />
      <div className="hero__orb" aria-hidden="true" />

      <div className={`shell relative grid items-center gap-[clamp(40px,5vw,80px)] ${image ? "lg:grid-cols-[7fr_5fr]" : ""}`}>
        <div className="flex flex-col gap-6">
          <nav aria-label="Breadcrumb" className="font-mono text-xs tracking-[.14em] text-fg-subtle">
            <ol className="m-0 flex list-none flex-wrap items-center gap-2 p-0">
              {[{ label: "Home", href: routes.home }, ...trail].map((t) => (
                <li key={t.href} className="flex items-center gap-2">
                  <Link href={t.href} className="text-fg-subtle hover:text-brand">
                    {t.label.toUpperCase()}
                  </Link>
                  <span aria-hidden="true">/</span>
                </li>
              ))}
              <li aria-current="page" className="text-brand">{crumb.toUpperCase()}</li>
            </ol>
          </nav>

          {eyebrow && <div className="eyebrow -mb-2">{eyebrow.toUpperCase()}</div>}

          <h1 className="m-0 max-w-[900px] font-display text-[clamp(40px,5.4vw,76px)] leading-[1.04] font-semibold tracking-[-0.03em] text-balance text-fg [&_em]:text-brand [&_em]:not-italic">
            {title}
          </h1>

          <p className="lead lead--pretty max-w-[680px]">{lead}</p>

          {chips.length > 0 && (
            <ul className="m-0 mt-2 flex list-none flex-wrap gap-2.5 p-0">
              {chips.map((chip) => {
                const inner = (
                  <>
                    {chip.icon && <span className="text-brand [&_svg]:size-4">{chip.icon}</span>}
                    {chip.label}
                  </>
                );
                const cls =
                  "inline-flex items-center gap-2 rounded-full border border-line-strong bg-white/[0.03] px-4 py-2 text-sm text-fg backdrop-blur";
                return (
                  <li key={chip.label}>
                    {chip.href ? (
                      <a href={chip.href} className={`${cls} transition-colors hover:border-brand hover:bg-brand/10 hover:text-fg`}>
                        {inner}
                      </a>
                    ) : (
                      <span className={cls}>{inner}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          )}

          {actions && <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-3">{actions}</div>}
        </div>

        {image && (
          <img
            src={image.src}
            alt={image.alt}
            className="w-full rounded-[24px] border border-line-strong object-cover shadow-[0_40px_100px_rgb(0_0_0/0.45)]"
          />
        )}
      </div>
    </section>
  );
}
