import { MDXRemoteSerializeResult } from 'next-mdx-remote'

export interface BlogPost {
  title: string
  excerpt: string
  date: string
  tags: string[]
  author: string
  authorImage: string
  coverImage: string
  readingTime: string
  slug: string
  featured?: boolean
  content?: MDXRemoteSerializeResult
}
