import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Allow cross-origin requests from local network devices during development
  allowedDevOrigins: [
    'http://192.168.0.132:3000',
    'http://192.168.0.132',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
  ],
};

export default nextConfig;
