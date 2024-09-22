/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/notion-page',
        destination: 'https://agnelnieves.notion.site/109b65190d6f80aba5d0d53ade167351',
      },
    ];
  },
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
