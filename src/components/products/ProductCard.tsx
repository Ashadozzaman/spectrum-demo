import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import IconTile from "@/components/ui/IconTile";
import { contactFor } from "@/lib/routes";
import type { Product } from "@/content/products";

/** One product. Same surface as the home .svc-card. */
export default function ProductCard({ product }: { product: Product }) {
  const { name, kind, icon, description, specs, learnMore, external, highlight } = product;
  return (
    <article
      className={`flex h-full flex-col gap-5 rounded-[20px] border bg-linear-to-b from-card to-card-deep p-7 text-fg transition-[transform,border-color,box-shadow] duration-300 ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-1.5 hover:shadow-[0_30px_60px_rgb(0_0_0/0.35)] ${
        highlight ? "border-brand/60" : "border-line hover:border-line-strong"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <IconTile icon={icon} />
        <span className={`font-mono text-[11px] tracking-[.12em] ${highlight ? "text-brand" : "text-fg-subtle"}`}>
          {highlight && <span className="mr-1.5 inline-block size-1.5 animate-[blink_1.6s_infinite] rounded-full bg-brand align-middle" />}
          {kind.toUpperCase()}
        </span>
      </div>

      <div className="flex flex-col gap-2.5">
        <h3 className="m-0 font-display text-xl leading-tight font-semibold tracking-[-0.015em]">{name}</h3>
        <p className="m-0 text-[15px] leading-relaxed text-pretty text-fg-muted">{description}</p>
      </div>

      <ul className="m-0 flex list-none flex-col gap-2 p-0">
        {specs.map((s) => (
          <li key={s} className="flex items-start gap-2.5 text-sm leading-snug text-fg-muted">
            <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={2.5} />
            {s}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-line pt-5">
        <Link
          href={contactFor(name)}
          className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-[#1A0A02] transition-[background-color,box-shadow] hover:bg-[#FF7A3A] hover:text-[#1A0A02] hover:shadow-[0_10px_36px_rgb(242_101_34/0.4)]"
        >
          Ask for a quote
        </Link>
        {learnMore && (
          <Link href={learnMore} className="inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:text-accent-soft">
            How it works <span aria-hidden="true" className="font-mono">→</span>
          </Link>
        )}
        {external && (
          <a
            href={external.href}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-1 text-sm font-medium text-brand hover:text-accent-soft"
          >
            {external.label}
            <ArrowUpRight aria-hidden="true" className="size-4" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        )}
      </div>
    </article>
  );
}
