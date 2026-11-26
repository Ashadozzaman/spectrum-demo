/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import IconTile from "./IconTile";
import type { ServiceSummary } from "@/lib/content-types";
import { getIcon } from "@/lib/icons";
import { resolveHref, serviceHref } from "@/lib/routes";

/** LinkCard props from a services.json entry (used on /services and /about). */
export const serviceCardProps = (s: ServiceSummary) => ({
  title: s.title,
  description: s.description,
  href: s.href ? resolveHref(s.href) : serviceHref(s.slug!),
  more: s.more,
  image: s.image,
  icon: s.icon ? getIcon(s.icon) : undefined,
});

/**
 * Clickable card with tilt + spotlight border: exactly the home page's
 * service card (.svc-card). Pass either `image` (a /public PNG icon) or `icon`.
 */
export default function LinkCard({
  href,
  title,
  description,
  more = "Learn more",
  num,
  icon,
  image,
  reveal = 0,
}: {
  href: string;
  title: string;
  description: string;
  more?: string;
  num?: number;
  icon?: LucideIcon;
  image?: string;
  reveal?: number;
}) {
  return (
    <Link href={href} className="svc-card" data-reveal={reveal} data-tilt="">
      <div className="svc-card__glow" aria-hidden="true"></div>
      <div className="svc-card__border" aria-hidden="true"></div>
      <div className="svc-card__top">
        {image ? (
          <img src={image} alt="" width="56" height="56" className="svc-card__icon" />
        ) : icon ? (
          <IconTile icon={icon} className="svc-card__icon" />
        ) : null}
        {num !== undefined && <span className="svc-card__num">{String(num).padStart(2, "0")}</span>}
      </div>
      <h3 className="svc-card__title">{title}</h3>
      <p className="svc-card__desc">{description}</p>
      <span className="svc-card__more">
        {more}
        <span aria-hidden="true" className="mono">→</span>
      </span>
    </Link>
  );
}
