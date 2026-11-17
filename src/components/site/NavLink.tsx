"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

/** A `<Link>` that marks itself `aria-current="page"` when its route is active. */
export default function NavLink({ href, ...props }: ComponentProps<typeof Link> & { href: string }) {
  const pathname = usePathname();
  const path = href.split("#")[0] || "/";
  // Hash links into the home page ("/#about") are never "the current page".
  const active = !href.includes("#") && (path === "/" ? pathname === "/" : pathname.startsWith(path));
  return <Link href={href} aria-current={active ? "page" : undefined} {...props} />;
}
