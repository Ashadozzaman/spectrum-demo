/* eslint-disable @next/next/no-img-element */
import { Check, Plus, TriangleAlert } from "lucide-react";
import type { Block, Image, Item, Stat } from "@/lib/content-types";
import { getIcon } from "@/lib/icons";
import { resolveHref } from "@/lib/routes";
import IconTile from "@/components/ui/IconTile";
import LinkCard from "@/components/ui/LinkCard";
import ButtonLink from "@/components/ui/ButtonLink";
import SectionHeading from "@/components/ui/SectionHeading";
import { AppCard, AppShowcase } from "./Apps";
import { Paragraphs, Rich } from "./RichText";
import Section from "./Section";

/**
 * Renders the `sections` array of a detail JSON file. Each block type maps to
 * one layout below, built from the home page's design pieces. Sections
 * alternate between the plain and the dotted band automatically (the first
 * one is dotted unless `firstAlt={false}`); set `"tone"` on a block to force one.
 */
export default function Blocks({ blocks, firstAlt = true }: { blocks: Block[]; firstAlt?: boolean }) {
  const tones = bandTones(blocks, firstAlt);
  return (
    <>
      {blocks.map((block, i) => {
        if (block.type === "divider") return <Divider key={i} text={block.text} />;
        const alt = tones[i];
        return (
          <Section
            key={block.id ?? i}
            id={block.id}
            eyebrow={block.eyebrow}
            title={block.title}
            lead={block.lead}
            after={block.after}
            alt={alt}
            heading={block.type !== "feature"}
            split={block.type === "text" || block.type === "list" || block.type === "faq"}
          >
            <BlockBody block={block} />
          </Section>
        );
      })}
    </>
  );
}

/** Dotted (true) or plain (false) band for each block; dividers don't count. */
function bandTones(blocks: Block[], firstAlt: boolean): boolean[] {
  const tones: boolean[] = [];
  let alt = !firstAlt;
  for (const block of blocks) {
    if (block.type !== "divider") alt = block.tone ? block.tone === "alt" : !alt;
    tones.push(alt);
  }
  return tones;
}

function BlockBody({ block }: { block: Block }) {
  switch (block.type) {
    case "text":
      return <Paragraphs items={block.body} />;
    case "cards":
      return <Cards items={block.items} columns={block.columns} />;
    case "list":
      return (
        <>
          {block.intro && <Paragraphs items={[block.intro]} className="mb-8" />}
          <List items={block.items} ordered={block.ordered} />
        </>
      );
    case "steps":
      return <Steps items={block.items} />;
    case "columns":
      return (
        <div className={`grid grid-cols-1 gap-5 ${block.columns.length > 1 ? "lg:grid-cols-2" : ""}`}>
          {block.columns.map((col, i) => (
            <div key={col.title} data-reveal={i * 80}>
              <div className="h-full rounded-[20px] border border-line bg-linear-to-b from-card to-card-deep p-[clamp(24px,2.5vw,36px)]">
                <h3 className="m-0 mb-6 flex items-center gap-3 font-display text-xl font-semibold text-fg">
                  <span
                    aria-hidden="true"
                    className={`grid size-9 place-items-center rounded-[10px] ${
                      col.tone === "bad" ? "bg-accent/15 text-accent" : "bg-brand/15 text-brand"
                    }`}
                  >
                    {col.tone === "bad" ? <TriangleAlert className="size-5" /> : <Check className="size-5" strokeWidth={2.5} />}
                  </span>
                  {col.title}
                </h3>
                <List items={col.items} compact tone={col.tone} />
              </div>
            </div>
          ))}
        </div>
      );
    case "feature":
      return <Feature block={block} />;
    case "table":
      return <Table columns={block.columns} rows={block.rows} />;
    case "faq":
      return (
        <div className="flex max-w-[900px] flex-col gap-3">
          {block.items.map((f, i) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-line bg-surface open:border-line-strong"
              data-reveal={Math.min(i, 5) * 40}
              open={i === 0}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 font-display text-lg font-semibold text-fg [&::-webkit-details-marker]:hidden">
                {f.q}
                <Plus aria-hidden="true" className="size-5 shrink-0 text-brand transition-transform group-open:rotate-45" />
              </summary>
              <p className="m-0 px-6 pb-6 text-base leading-relaxed text-pretty text-fg-muted">
                <Rich text={f.a} />
              </p>
            </details>
          ))}
        </div>
      );
    case "stats":
      return (
        <>
          <Stats items={block.items} />
          {block.bullets && <Bullets items={block.bullets} className="mt-10" />}
        </>
      );
    case "facts":
      return <Facts block={block} />;
    case "app":
      return <AppShowcase app={block.app} />;
    case "apps":
      return (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {block.items.map((app, i) => (
            <div key={app.name} className="h-full" data-reveal={(i % 2) * 70}>
              <AppCard app={app} />
            </div>
          ))}
        </div>
      );
    case "gallery":
      return (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {block.items.map((g, i) => (
            <figure key={g.src} className="m-0 flex flex-col gap-3" data-reveal={(i % 3) * 70}>
              <img
                src={g.src}
                alt={g.alt ?? g.caption}
                loading="lazy"
                className="w-full rounded-2xl border border-line bg-surface object-cover"
              />
              <figcaption className="text-sm leading-snug text-fg-muted">{g.caption}</figcaption>
            </figure>
          ))}
        </div>
      );
    case "links":
      return (
        <div className="services__grid">
          {block.items.map((l, i) => (
            <LinkCard
              key={l.href}
              href={resolveHref(l.href)}
              title={l.title ?? ""}
              description={l.text}
              icon={l.icon ? getIcon(l.icon) : undefined}
              more={l.more}
              reveal={(i % 3) * 70}
            />
          ))}
        </div>
      );
    case "divider":
      return null;
  }
}

// ---- Pieces -------------------------------------------------------------------

function Cards({ items, columns }: { items: Item[]; columns?: 2 | 3 | 4 }) {
  const cols = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 xl:grid-cols-3",
    4: "sm:grid-cols-2 xl:grid-cols-4",
  }[columns ?? (items.length % 3 === 0 ? 3 : items.length === 4 ? 4 : 2)];
  return (
    <div className={`grid grid-cols-1 gap-5 ${cols}`}>
      {items.map((it, i) => (
        <div key={it.title ?? i} className="h-full" data-reveal={(i % 4) * 60}>
          <article className="flex h-full flex-col gap-4 rounded-[20px] border border-line bg-linear-to-b from-card to-card-deep p-7 text-fg transition-[transform,border-color,box-shadow] duration-300 ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_30px_60px_rgb(0_0_0/0.35)]">
            {it.icon ? (
              <IconTile icon={getIcon(it.icon)} size="sm" />
            ) : (
              <span aria-hidden="true" className="font-mono text-xs tracking-[.14em] text-brand">
                {String(i + 1).padStart(2, "0")}
              </span>
            )}
            {it.title && (
              <h3 className="m-0 font-display text-xl leading-tight font-semibold tracking-[-0.015em]">{it.title}</h3>
            )}
            <p className="m-0 text-[15px] leading-relaxed text-pretty text-fg-muted">
              <Rich text={it.text} />
            </p>
          </article>
        </div>
      ))}
    </div>
  );
}

function List({
  items,
  ordered,
  compact,
  tone,
}: {
  items: Item[];
  ordered?: boolean;
  compact?: boolean;
  tone?: "good" | "bad";
}) {
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag className={`m-0 flex list-none flex-col p-0 ${compact ? "gap-4" : "max-w-[900px] gap-0 divide-y divide-line border-y border-line"}`}>
      {items.map((it, i) => (
        <li
          key={i}
          className={`flex items-start gap-4 ${compact ? "" : "py-5"}`}
          data-reveal={compact ? undefined : Math.min(i, 6) * 40}
        >
          {ordered ? (
            <span aria-hidden="true" className="mt-0.5 w-7 shrink-0 font-mono text-sm text-brand">
              {String(i + 1).padStart(2, "0")}
            </span>
          ) : (
            <span
              aria-hidden="true"
              className={`mt-[9px] size-1.5 shrink-0 rounded-full ${tone === "bad" ? "bg-accent" : "bg-brand"}`}
            />
          )}
          <p className="m-0 text-base leading-relaxed text-pretty text-fg-muted">
            {it.title && <strong className="font-semibold text-fg">{it.title} </strong>}
            <Rich text={it.text} />
          </p>
        </li>
      ))}
    </Tag>
  );
}

export function Bullets({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`m-0 flex max-w-[900px] list-none flex-col gap-3 p-0 ${className}`}>
      {items.map((b) => (
        <li key={b} className="flex items-start gap-3 text-base leading-relaxed text-fg-muted">
          <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-brand" strokeWidth={2.5} />
          <span>
            <Rich text={b} />
          </span>
        </li>
      ))}
    </ul>
  );
}

export function Stats({ items }: { items: Stat[] }) {
  return (
    <dl className="stats m-0 w-full">
      {items.map((s, i) => (
        <div key={s.label} className="stat" data-reveal={i * 60}>
          <dt className="stat__label">{s.label}</dt>
          <dd className={`stat__value ${s.accent || i === 0 ? "stat__value--accent" : ""}`}>{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function Img({ image, className = "" }: { image: Image; className?: string }) {
  return (
    <img
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      loading="lazy"
      className={`h-auto w-full rounded-[20px] border border-line object-cover shadow-[0_30px_80px_rgb(0_0_0/0.35)] ${className}`}
    />
  );
}

function Steps({ items }: { items: Extract<Block, { type: "steps" }>["items"] }) {
  const rich = items.some((s) => s.image || s.bullets);
  if (!rich) {
    // Columns that fit the count; the last step stretches over any empty cells
    // (the 1px gaps show the line colour, so a hole would look like a block).
    const n = items.length;
    const lg = n % 4 === 0 ? 4 : n % 3 === 0 ? 3 : Math.min(n, 4);
    const lgCols = { 1: "", 2: "lg:grid-cols-2", 3: "lg:grid-cols-3", 4: "lg:grid-cols-4" }[lg];
    const lastSpan =
      (n % 2 ? "sm:col-span-2 " : "") +
      { 1: "lg:col-span-1", 2: "lg:col-span-2", 3: "lg:col-span-3", 4: "lg:col-span-4" }[lg - ((n - 1) % lg)];
    return (
      <ol className={`m-0 grid list-none grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line p-0 sm:grid-cols-2 ${lgCols}`}>
        {items.map((step, i) => (
          <li
            key={step.title}
            className={`flex flex-col gap-4 bg-surface p-8 ${i === n - 1 ? lastSpan : ""}`}
            data-reveal={(i % 4) * 70}
          >
            <span className="font-mono text-xs tracking-[.14em] text-brand">
              <span className="sr-only">Step </span>
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="m-0 font-display text-xl font-semibold tracking-[-0.015em] text-fg">{step.title}</h3>
            {step.text && (
              <p className="m-0 text-base leading-relaxed text-fg-muted">
                <Rich text={step.text} />
              </p>
            )}
          </li>
        ))}
      </ol>
    );
  }
  return (
    <ol className="m-0 flex list-none flex-col gap-[clamp(48px,6vw,96px)] p-0">
      {items.map((step, i) => (
        <li key={step.title} className="grid items-center gap-[clamp(28px,4vw,64px)] lg:grid-cols-2">
          <div className={`flex flex-col gap-5 ${i % 2 ? "lg:order-2" : ""}`} data-reveal="0">
            <span className="font-mono text-xs tracking-[.14em] text-brand">
              STEP {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="m-0 font-display text-[clamp(24px,2.4vw,34px)] leading-tight font-semibold tracking-[-0.02em] text-fg">
              {step.title}
            </h3>
            {step.text && <Paragraphs items={[step.text]} />}
            {step.bullets && <Bullets items={step.bullets} />}
            {step.note && (
              <p className="m-0 rounded-xl border border-line bg-white/[0.03] px-5 py-4 text-[15px] leading-relaxed text-fg-muted">
                <Rich text={step.note} />
              </p>
            )}
          </div>
          {step.image && (
            <div data-reveal="120">
              <Img image={step.image} />
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}

function Feature({ block }: { block: Extract<Block, { type: "feature" }> }) {
  return (
    <div className="flex flex-col gap-[clamp(40px,4vw,64px)]">
      <div className={`grid items-center gap-[clamp(32px,5vw,80px)] ${block.image ? "lg:grid-cols-2" : ""}`}>
        <div className={`flex flex-col gap-6 ${block.reverse ? "lg:order-2" : ""}`}>
          <SectionHeading
            id={block.id ? `${block.id}-h` : undefined}
            eyebrow={block.eyebrow}
            title={block.title ? <Rich text={block.title} /> : undefined}
            lead={block.lead}
          />
          <Paragraphs items={block.body} />
          {block.bullets && <Bullets items={block.bullets} />}
          {block.actions && (
            <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-3" data-reveal="160">
              {block.actions.map((a, i) => (
                <ButtonLink key={a.href} href={a.href} label={a.label} variant={i === 0 ? "primary" : "outline"} />
              ))}
            </div>
          )}
        </div>
        {block.image && (
          <div data-reveal="120">
            <Img image={block.image} />
          </div>
        )}
      </div>
      {block.stats && <Stats items={block.stats} />}
    </div>
  );
}

/** Table on wide screens; on phones each row becomes a small card with labelled values. */
function Table({ columns, rows }: { columns: string[]; rows: string[][] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line" data-reveal="0">
      <table className="w-full border-collapse text-left max-md:block">
        <thead className="max-md:hidden">
          <tr className="bg-surface">
            {columns.map((c) => (
              <th key={c} scope="col" className="border-b border-line px-5 py-4 font-mono text-xs font-medium tracking-[.12em] text-brand">
                {c.toUpperCase()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="max-md:block">
          {rows.map((row) => (
            <tr key={row[0]} className="border-b border-line last:border-b-0 max-md:flex max-md:flex-col max-md:gap-3 max-md:p-5">
              {row.map((cell, j) =>
                j === 0 ? (
                  <th key={j} scope="row" className="px-5 py-4 align-top text-[15px] font-semibold text-fg md:whitespace-nowrap max-md:p-0">
                    {cell}
                  </th>
                ) : (
                  <td
                    key={j}
                    data-label={columns[j]}
                    className="px-5 py-4 align-top text-[15px] leading-relaxed text-fg-muted max-md:flex max-md:flex-col max-md:gap-1 max-md:p-0 max-md:before:font-mono max-md:before:text-[11px] max-md:before:tracking-[.12em] max-md:before:text-fg-subtle max-md:before:uppercase max-md:before:content-[attr(data-label)]"
                  >
                    <span>
                      <Rich text={cell} />
                    </span>
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Facts({ block }: { block: Extract<Block, { type: "facts" }> }) {
  const isIcon = block.image && /icon|logo/.test(block.image.src);
  return (
    <div className={`grid items-start gap-[clamp(32px,5vw,72px)] ${block.image ? "lg:grid-cols-[7fr_5fr]" : ""}`}>
      <div className="flex flex-col gap-8">
        <Paragraphs items={block.body} />
        <dl className="m-0 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2" data-reveal="80">
          {block.items.map((f) => {
            const href = f.href ? resolveHref(f.href) : undefined;
            return (
              <div key={f.label} className="flex flex-col gap-1.5 bg-surface px-6 py-5">
                <dt className="font-mono text-[11px] tracking-[.14em] text-fg-subtle">{f.label.toUpperCase()}</dt>
                <dd className="m-0 text-base leading-snug text-fg">
                  {href ? (
                    <a href={href} target="_blank" rel="noopener" className="text-brand hover:text-accent-soft">
                      {f.value}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ) : (
                    f.value
                  )}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
      {block.image &&
        (isIcon ? (
          <div className="grid place-items-center rounded-[20px] border border-line bg-surface p-12" data-reveal="120">
            <img src={block.image.src} alt={block.image.alt} loading="lazy" className="size-40 rounded-[28px] object-contain" />
          </div>
        ) : (
          <div data-reveal="120">
            <Img image={block.image} />
          </div>
        ))}
    </div>
  );
}

function Divider({ text }: { text: string }) {
  return (
    <div className="border-t border-line bg-linear-to-b from-brand-deep/40 to-bg">
      <p className="shell m-0 py-[clamp(40px,5vw,64px)] text-center font-display text-[clamp(20px,2vw,26px)] leading-snug font-medium text-balance text-fg">
        <Rich text={text} />
      </p>
    </div>
  );
}
