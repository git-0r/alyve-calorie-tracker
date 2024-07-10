/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.edamam.com",
      },
    ],
  },
};

export default nextConfig;
