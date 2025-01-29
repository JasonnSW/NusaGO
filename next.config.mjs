/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["maps.googleapis.com", "earthengine.googleapis.com"],
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/auth/:path*",
  //       destination: "https://nusago-ruddy.vercel.app/api/v1/:path*", 
  //     },
  //   ];
  // },
};

export default nextConfig;
