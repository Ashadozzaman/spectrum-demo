import { Building } from "lucide-react";
import IconTile from "@/components/ui/IconTile";
import ButtonLink from "@/components/ui/ButtonLink";
import type { ProjectSummary } from "@/lib/content-types";
import { getIcon } from "@/lib/icons";
import { projectHref } from "@/lib/routes";

/** One delivered project. Same surface as the home .svc-card, with two actions. */
export default function ProjectCard({ project }: { project: ProjectSummary }) {
  const { slug, title, icon, badge, client, description, tags, primary, secondary, flagship } = project;
  const main = primary ?? { label: "Read case study", href: projectHref(slug) };
  return (
    <article
      className={`relative flex h-full flex-col gap-5 rounded-[20px] border bg-linear-to-b from-card to-card-deep p-[30px] text-fg transition-[transform,border-color,box-shadow] duration-300 ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-1.5 hover:shadow-[0_30px_60px_rgb(0_0_0/0.35)] ${
        flagship
          ? "border-brand/60 shadow-[0_0_0_1px_rgb(61_190_90/0.25),0_30px_80px_rgb(14_90_46/0.35)]"
          : "border-line hover:border-line-strong"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <IconTile icon={getIcon(icon)} />
        <span
          className={`rounded-full border px-3 py-1 font-mono text-[11px] tracking-[.1em] ${
            flagship ? "border-brand/50 bg-brand/15 text-brand" : "border-line-strong text-fg-subtle"
          }`}
        >
          {(flagship ? "FLAGSHIP · " : "") + badge.toUpperCase()}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="m-0 font-display text-[22px] leading-tight font-semibold tracking-[-0.015em]">{title}</h3>
        <p className="m-0 flex items-center gap-1.5 text-sm text-fg-subtle">
          <Building aria-hidden="true" className="size-3.5 shrink-0" />
          {client}
        </p>
      </div>

      <p className="m-0 text-base leading-relaxed text-pretty text-fg-muted">{description}</p>

      <ul className="m-0 flex list-none flex-wrap gap-2 p-0" aria-label="Key features">
        {tags.map((t) => (
          <li key={t} className="rounded-md bg-white/[0.04] px-2.5 py-1 text-[13px] text-fg-muted ring-1 ring-line">
            {t}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-line pt-5">
        <ButtonLink href={main.href} label={main.label} />
        {secondary && <ButtonLink href={secondary.href} label={secondary.label} variant="text" />}
      </div>
    </article>
  );
}
