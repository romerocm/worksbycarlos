import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeHighlight from 'rehype-highlight'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  // Remove eslint and typescript checks during development
  eslint: {
    ignoreDuringBuilds: process.env.NODE_ENV === 'development',
  },
  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV === 'development',
  },
  images: {
    domains: [
      'github.com', 
      'cdn.jsdelivr.net', 
      'sjc.microlink.io',
      'media.licdn.com',
      'images.unsplash.com'
    ],
    // Enable image optimization in development
    unoptimized: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizeCss: true,
    mdxRs: true,
  },
  // Optimize webpack configuration
  webpack: (config, { dev, isServer }) => {
    // Only enable polling in development
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      }
    }

    return config
  },
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, rehypeHighlight],
    providerImportSource: "@mdx-js/react",
  },
})

export default withMDX(nextConfig)