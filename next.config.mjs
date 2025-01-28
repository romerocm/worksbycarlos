import withMDX from '@next/mdx';
import rehypePrismPlus from 'rehype-prism-plus';

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }
    return config
  },
}

export default withMDX({
  extension: /\.mdx?$/,
  options: {
    rehypePlugins: [rehypePrismPlus],
  },
})(nextConfig);
