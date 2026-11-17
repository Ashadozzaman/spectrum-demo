import { routes } from "@/lib/routes";

/** Main navigation, shared by the desktop header and the mobile menu. */
export const mainNav = [
  { label: "About Us", href: routes.about },
  { label: "Services", href: routes.services },
  { label: "Products", href: routes.products },
  { label: "Projects", href: routes.projects },
  { label: "Case Studies", href: routes.caseStudies },
  { label: "Contact", href: routes.contact },
] as const;
