import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // Old static-site URLs -> new routes (keeps search rankings and old links working).
  // Add a line here each time another old page is ported.
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/services.html", destination: "/services", permanent: true },
      { source: "/products.html", destination: "/products", permanent: true },
      { source: "/projects.html", destination: "/projects", permanent: true },
      { source: "/Services.html", destination: "/services", permanent: true },
      { source: "/Products.html", destination: "/products", permanent: true },
      { source: "/Projects.html", destination: "/projects", permanent: true },
    ];
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
