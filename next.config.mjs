/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 's3.amazonaws.com',
          pathname: '/my-bucket/**',
        },
        {
          protocol: 'https',
          hostname: 'i.imgur.com',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'ipfs.io',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'euc.li',
          pathname: '/**',
        },
      ],
    },
  };
  
  export default nextConfig;  