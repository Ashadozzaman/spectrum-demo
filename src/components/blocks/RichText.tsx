import Link from "next/link";
import type { ReactNode } from "react";
import { isExternal, resolveHref } from "@/lib/routes";

const TOKEN = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)\s]+\))/g;

/**
 * Inline markup used in JSON text:
 *   **bold**                       -> <strong> (white)
 *   *emphasis*                     -> <em> (brand green, upright)
 *   [text](service:brand-protection) -> link (internal refs resolved, external opens in a new tab)
 */
export function Rich({ text }: { text: string }) {
  const parts = text.split(TOKEN).filter(Boolean);
  return (
    <>
      {parts.map((part, i): ReactNode => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-semibold text-fg">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
          return (
            <em key={i} className="text-brand not-italic">
              {part.slice(1, -1)}
            </em>
          );
        }
        const link = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(part);
        if (link) {
          const href = resolveHref(link[2]);
          const cls = "font-medium text-brand underline decoration-brand/40 underline-offset-4 hover:text-accent-soft";
          return isExternal(href) ? (
            <a key={i} href={href} target="_blank" rel="noopener" className={cls}>
              {link[1]}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : (
            <Link key={i} href={href} className={cls}>
              {link[1]}
            </Link>
          );
        }
        return part;
      })}
    </>
  );
}

/** Several paragraphs of body text. */
export function Paragraphs({ items, className = "" }: { items?: string[]; className?: string }) {
  if (!items?.length) return null;
  return (
    <div className={`flex max-w-[760px] flex-col gap-4 ${className}`}>
      {items.map((p, i) => (
        <p key={i} className="m-0 text-[17px] leading-[1.7] text-pretty text-fg-muted">
          <Rich text={p} />
        </p>
      ))}
    </div>
  );
}
