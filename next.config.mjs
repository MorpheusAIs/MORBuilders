/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "custom-images.strikinglycdn.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
