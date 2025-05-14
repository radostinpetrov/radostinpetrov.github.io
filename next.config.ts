/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.GITHUB_ACTIONS ? '/radostinpetrov.github.io' : '',
  images: {
    unoptimized: true,
  },
  assetPrefix: process.env.GITHUB_ACTIONS ? '/radostinpetrov.github.io' : '',
};

module.exports = nextConfig;