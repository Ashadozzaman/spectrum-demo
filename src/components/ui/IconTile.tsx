import type { LucideIcon } from "lucide-react";

/**
 * Orange rounded square with a white line icon: the same look as the home
 * page's PNG icons (public/assets/ic-*.png), but for any lucide icon.
 */
export default function IconTile({
  icon: Icon,
  size = "md",
  className = "",
}: {
  icon: LucideIcon;
  size?: "sm" | "md";
  className?: string;
}) {
  const box = size === "sm" ? "size-11 rounded-[12px]" : "size-14 rounded-[14px]";
  const glyph = size === "sm" ? "size-5" : "size-[26px]";
  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center bg-accent text-white shadow-[0_10px_30px_rgb(242_101_34/0.25)] ${box} ${className}`}
    >
      <Icon className={glyph} strokeWidth={1.75} />
    </span>
  );
}
