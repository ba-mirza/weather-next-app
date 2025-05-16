import type { NextConfig } from "next";

const nextConfig: NextConfig = {
      images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*',
            },
            {
                protocol: "http",
                hostname: "*",
            }
        ]
    }
};

export default nextConfig;
