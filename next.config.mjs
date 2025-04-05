/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['furo.s3.ap-southeast-2.amazonaws.com'],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
};

export default nextConfig;
