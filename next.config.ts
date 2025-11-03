import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return process.env.MAINTENANCE_MODE === "true"
    ? [
        {
          source: "/((?!maintenance.html$).*$)",
          destination: "/maintenance.html",
          permanent: false,
        },
      ]
    :[
      {
        source: "/maintenance.html",
        destination: "/",
        permanent: false,
      },
    ];
  }
};


export default nextConfig;
