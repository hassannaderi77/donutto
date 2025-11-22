/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "saas-behtarino.hs3.ir",
      },
    ],
  },
};

export default nextConfig;
