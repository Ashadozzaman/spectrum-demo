import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { isExternal, resolveHref } from "@/lib/routes";

/**
 * Button-style link. `href` may be a URL or a JSON reference (`service:...`).
 * External links open in a new tab with an arrow icon.
 *
 *   primary  orange, for the main action (same as the product card "Ask for a quote")
 *   outline  home .btn-outline look
 *   text     green text link
 */
export default function ButtonLink({
  href,
  label,
  variant = "primary",
}: {
  href: string;
  label: string;
  variant?: "primary" | "outline" | "text";
}) {
  const url = resolveHref(href);
  const external = isExternal(url);
  const cls = {
    primary:
      "inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-[15px] font-semibold text-[#1A0A02] transition-[background-color,box-shadow] hover:bg-[#FF7A3A] hover:text-[#1A0A02] hover:shadow-[0_10px_36px_rgb(242_101_34/0.4)]",
    outline:
      "inline-flex items-center gap-2 rounded-xl border border-line-strong px-5 py-3 text-[15px] font-medium text-fg transition-colors hover:border-brand hover:bg-brand/10 hover:text-fg",
    text: "inline-flex items-center gap-1.5 text-[15px] font-medium text-brand hover:text-accent-soft",
  }[variant];
  const icon = external ? (
    <ArrowUpRight aria-hidden="true" className="size-4" />
  ) : (
    <span aria-hidden="true" className="font-mono">→</span>
  );

  return external ? (
    <a href={url} target="_blank" rel="noopener" className={cls}>
      {label}
      {icon}
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  ) : (
    <Link href={url} className={cls}>
      {label}
      {icon}
    </Link>
  );
}
