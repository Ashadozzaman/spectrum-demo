/**
 * Every internal URL the site links to, in one place.
 *
 * Detail pages are data-driven: `/services/<slug>`, `/products/<slug>` and
 * `/projects/<slug>`, where `<slug>` is the JSON file name in `src/data/...`.
 * Use `serviceHref()` / `productHref()` / `projectHref()` in code, and
 * `service:<slug>` / `product:<slug>` / `project:<slug>` / `page:<name>` /
 * `contact:<topic>` references inside JSON (see `resolveHref`).
 *
 * Old static-site URLs (`/brand-protection.html`, `/case-study-tcb.html`, ...)
 * redirect here (see `redirects` in next.config.ts).
 */
export const serviceHref = (slug: string) => `/services/${slug}`;
export const productHref = (slug: string) => `/products/${slug}`;
export const projectHref = (slug: string) => `/projects/${slug}`;

export const routes = {
  home: "/",
  about: "/#about",
  caseStudies: "/#case-studies",
  services: "/services",
  products: "/products",
  projects: "/projects",

  // ---- Not ported yet -------------------------------------------------------
  contact: "/contact",
  privacy: "/privacy-policy",
  terms: "/terms",

  // ---- Data-driven detail pages (kept as named keys for existing callers) ---
  upokari: productHref("upokari"),
  mobileApps: serviceHref("mobile-apps"),
  caseStudyIndex: "/projects",

  service: {
    digitalIdentity: serviceHref("digital-identity-security"),
    smartCards: serviceHref("smart-card-technologies"),
    ai: serviceHref("artificial-intelligence"),
    blockchain: serviceHref("blockchain-technology"),
    antiCounterfeit: serviceHref("anti-counterfeit"),
    brandProtection: serviceHref("brand-protection"),
    businessAutomation: serviceHref("business-automation"),
    aiContactCenter: serviceHref("ai-contact-center"),
  },

  caseStudy: {
    tcb: projectHref("tcb-smart-card"),
    tcbContactCenter: projectHref("tcb-ai-contact-center"),
    eLicensing: projectHref("e-licensing"),
    gcc: projectHref("gcc-e-revenue"),
    apfs: projectHref("presence-feedback"),
    smartCard: projectHref("smart-card-issuance"),
    ocd: projectHref("officers-club-dhaka"),
    novotheatre: projectHref("novotheatre-eticket"),
    eCourt: projectHref("industrial-e-court"),
  },
} as const;

/** Contact page link that pre-selects a product/topic in the form. */
export function contactFor(product: string) {
  return `${routes.contact}?product=${encodeURIComponent(product)}#contact-form`;
}

/**
 * Turn a link written in JSON into a real URL, so JSON never hard-codes
 * internal paths:
 *
 *   service:brand-protection      -> /services/brand-protection
 *   product:upokari               -> /products/upokari
 *   project:tcb-smart-card        -> /projects/tcb-smart-card
 *   page:products#id-cards        -> /products#id-cards   (any top-level key of `routes`)
 *   contact:Cyber Security        -> /contact?product=Cyber%20Security#contact-form
 *   https://..., tel:..., #anchor -> unchanged
 */
export function resolveHref(ref: string): string {
  const i = ref.indexOf(":");
  if (i < 0) return ref;
  const kind = ref.slice(0, i);
  const rest = ref.slice(i + 1);
  const [target, hash] = rest.split("#");
  const withHash = (path: string) => (hash ? `${path}#${hash}` : path);
  switch (kind) {
    case "service":
      return withHash(serviceHref(target));
    case "product":
      return withHash(productHref(target));
    case "project":
      return withHash(projectHref(target));
    case "contact":
      return contactFor(rest);
    case "page": {
      const path = (routes as Record<string, unknown>)[target];
      if (typeof path !== "string") throw new Error(`Unknown page reference "${ref}" (no routes.${target})`);
      return withHash(path);
    }
    default:
      return ref; // http:, https:, tel:, mailto:
  }
}

/** True for links that leave the site (open in a new tab). */
export const isExternal = (href: string) => /^https?:\/\//.test(href);

export const PHONE = "+880 1615-900004";
export const PHONE_HREF = "tel:+8801615900004";
export const WHATSAPP_HREF = "https://wa.me/8801615900004";
export const EMAIL = "contact@spectrum.com.bd";
