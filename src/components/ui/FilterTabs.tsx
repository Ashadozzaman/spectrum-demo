"use client";

import { useState, type ReactNode } from "react";

export type FilterOption = { id: string; label: string; icon: ReactNode; count: number };
export type FilterItem = { key: string; category: string; node: ReactNode; className?: string };

/**
 * Category tabs + the items they filter.
 *
 * Items are rendered on the server and passed in as `node`, so this client
 * component only decides what is visible. Hidden items stay in the HTML
 * (good for SEO and no-JS) via the `hidden` attribute.
 *
 * `classNameWhenFiltered` lets an item change layout when a single category is
 * shown (e.g. a half-width group becoming full width).
 */
export default function FilterTabs({
  label,
  options,
  items,
  className = "",
  classNameWhenFiltered = "",
}: {
  label: string;
  options: FilterOption[];
  items: FilterItem[];
  className?: string;
  classNameWhenFiltered?: string;
}) {
  const [active, setActive] = useState("all");

  return (
    <>
      <div role="group" aria-label={label} className="flex flex-wrap gap-2.5" data-reveal="0">
        {options.map((o) => {
          const on = o.id === active;
          return (
            <button
              key={o.id}
              type="button"
              aria-pressed={on}
              onClick={() => setActive(o.id)}
              className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2.5 font-sans text-sm font-medium transition-colors [&_svg]:size-4 ${
                on
                  ? "border-brand bg-brand text-bg"
                  : "border-line-strong bg-white/[0.03] text-fg hover:border-brand hover:bg-brand/10"
              }`}
            >
              {o.icon}
              {o.label}
              <span
                className={`rounded-full px-2 py-0.5 font-mono text-[11px] ${on ? "bg-bg/20 text-bg" : "bg-brand/15 text-brand"}`}
              >
                {o.count}
              </span>
            </button>
          );
        })}
      </div>

      <div className={className} aria-live="polite">
        {items.map((it) => {
          const off = active !== "all" && it.category !== active;
          return (
            <div
              key={it.key}
              hidden={off}
              // `hidden` class too: a display utility in it.className would otherwise beat [hidden].
              className={`${it.className ?? ""} ${active !== "all" ? classNameWhenFiltered : ""} ${off ? "hidden" : ""}`}
            >
              {it.node}
            </div>
          );
        })}
      </div>
    </>
  );
}
