/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  async rewrites() {
    return [
      {
        source: "/album/api/:path*",
        destination: "http://localhost:4000/:path*",
      },
      {
        source: "/api/:path*",
        destination: "http://localhost:4000/:path*",
      },
    ];
  },
  images: {
    // for test
    domains: ["playce-uploads.s3.ap-northeast-2.amazonaws.com"],
  },
};

module.exports = nextConfig;
