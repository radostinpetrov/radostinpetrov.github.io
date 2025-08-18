/** @type {import('next').NextConfig} */
const isStaticExport = process.env.STATIC_EXPORT === 'true' || process.env.GITHUB_PAGES === 'true';
const nextConfig = {
  ...(isStaticExport ? { output: 'export' } : {}),
  basePath: '',
  images: {
    unoptimized: true,
  },
  assetPrefix: '',
};

module.exports = nextConfig;