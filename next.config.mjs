/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
      domains: ['picsum.photos'], 
    },
    async rewrites() {
      return [];
    },
  };
  
  export default nextConfig;
  