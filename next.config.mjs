import createMDX from '@next/mdx'
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      'github.com', 
      'cdn.jsdelivr.net', 
      'sjc.microlink.io',
      'media.licdn.com',
      'images.unsplash.com'
    ],
    unoptimized: true,
  },
  experimental: {
    mdxRs: true,
  },
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }
    return config
  },
}

const withMDX = createMDX({
  // Add markdown plugins here, if needed
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

export default withMDX(nextConfig)
