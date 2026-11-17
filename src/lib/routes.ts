/**
 * Every internal URL the site links to, in one place.
 *
 * Slugs keep the old static site's file names (minus `.html`) so old links can
 * be redirected 1:1 (see `redirects` in next.config.ts).
 *
 * `built: false` routes have no page yet and will 404 until they are ported.
 * Flip the flag when you add the page, and keep NOTE.md's route table in sync.
 */
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
  upokari: "/upokari",
  mobileApps: "/mobile-apps",
  caseStudyIndex: "/case-study",

  service: {
    digitalIdentity: "/digital-identity-security",
    smartCards: "/smart-card-technologies",
    ai: "/artificial-intelligence",
    blockchain: "/blockchain-technology",
    antiCounterfeit: "/anti-counterfeit",
    brandProtection: "/brand-protection",
    businessAutomation: "/business-automation",
    aiContactCenter: "/ai-contact-center",
  },

  caseStudy: {
    tcb: "/case-study-tcb",
    tcbContactCenter: "/case-study-tcb-contact-center",
    eLicensing: "/case-study-e-licensing",
    gcc: "/case-study-gcc",
    apfs: "/case-study-apfs",
    smartCard: "/case-study-smart-card",
    ocd: "/case-study-ocd",
    novotheatre: "/case-study-novotheatre",
    eCourt: "/case-study-e-court",
  },
} as const;

/** Contact page link that pre-selects a product/topic in the form. */
export function contactFor(product: string) {
  return `${routes.contact}?product=${encodeURIComponent(product)}#contact-form`;
}

export const PHONE = "+880 1615-900004";
export const PHONE_HREF = "tel:+8801615900004";
export const WHATSAPP_HREF = "https://wa.me/8801615900004";
export const EMAIL = "contact@spectrum.com.bd";
