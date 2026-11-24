import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "api.dicebear.com" }],
  },
  // El contenido editable se lee del disco: inclúyelo en el despliegue
  outputFileTracingIncludes: {
    "/*": ["./content/**/*", "./keystatic.config.ts"],
  },
  async redirects() {
    return [
      { source: "/memorias/evento/:slug", destination: "/eventos/:slug", permanent: true },
      { source: "/membresia", destination: "/unete", permanent: true },
    ];
  },
};

export default nextConfig;
