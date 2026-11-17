import type { NextConfig } from "next";

/** Old static-site page names -> new routes. Each gets a redirect with and without `.html`. */
const oldPages: Record<string, string> = {
  index: "/",
  "about-us": "/about",
  about: "/about",
  contact: "/contact",
  Contact: "/contact",
  "contact-us": "/contact",
  services: "/services",
  Services: "/services",
  products: "/products",
  Products: "/products",
  projects: "/projects",
  Projects: "/projects",
  "case-study": "/projects",
  "Case-study": "/projects",

  // Service guides
  "digital-identity-security": "/services/digital-identity-security",
  "Digital_Identity_&_Security": "/services/digital-identity-security",
  dis: "/services/digital-identity-security",
  "smart-card-technologies": "/services/smart-card-technologies",
  Smart_Card_Technologies: "/services/smart-card-technologies",
  sct: "/services/smart-card-technologies",
  "artificial-intelligence": "/services/artificial-intelligence",
  Artificial_Intelligence: "/services/artificial-intelligence",
  ai: "/services/artificial-intelligence",
  "blockchain-technology": "/services/blockchain-technology",
  "anti-counterfeit": "/services/anti-counterfeit",
  "brand-protection": "/services/brand-protection",
  "business-automation": "/services/business-automation",
  "ai-contact-center": "/services/ai-contact-center",
  "mobile-apps": "/services/mobile-apps",

  // Products
  upokari: "/products/upokari",

  // Case studies
  "case-study-tcb": "/projects/tcb-smart-card",
  "case-study-tcb-contact-center": "/projects/tcb-ai-contact-center",
  "case-study-e-licensing": "/projects/e-licensing",
  "case-study-gcc": "/projects/gcc-e-revenue",
  "case-study-apfs": "/projects/presence-feedback",
  "case-study-smart-card": "/projects/smart-card-issuance",
  "case-study-ocd": "/projects/officers-club-dhaka",
  "case-study-novotheatre": "/projects/novotheatre-eticket",
  "case-study-e-court": "/projects/industrial-e-court",
};

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Content JSON is read with fs at runtime too (src/lib/data.ts), so ship it with the server.
  outputFileTracingIncludes: { "/**": ["./src/data/**/*.json"] },
  // Old static-site URLs -> new routes (keeps search rankings and old links working).
  // Add a line to `oldPages` each time another old page is ported.
  async redirects() {
    return Object.entries(oldPages).flatMap(([page, destination]) => {
      const source = `/${encodeURI(page)}`;
      const withHtml = { source: `${source}.html`, destination, permanent: true };
      // Redirect sources match case-insensitively, so a bare `/Products` would also
      // catch `/products` and loop. Those (and `/index`) only get the `.html` redirect.
      const bareIsRoute = page === "index" || `/${page}`.toLowerCase() === destination.toLowerCase();
      return bareIsRoute ? [withHtml] : [withHtml, { source, destination, permanent: true }];
    });
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
