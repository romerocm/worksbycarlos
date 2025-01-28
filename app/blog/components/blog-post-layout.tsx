"use client"

import { motion } from 'framer-motion'
import { MDXRemote } from 'next-mdx-remote'
import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, ArrowLeft, Share2 } from 'lucide-react'

interface BlogPostLayoutProps {
  post: {
    title: string
    excerpt: string
    date: string
    tags: string[]
    author: string
    authorImage: string
    coverImage: string
    readingTime: string
    content: any
    slug: string
  }
}

export function BlogPostLayout({ post }: BlogPostLayoutProps) {
  const handleShare = async () => {
    try {
      await navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      })
    } catch (error) {
      console.log('Error sharing:', error)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background/50 relative">
      <div className="animated-gradient-background" />
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center mb-8">
              <Link href="/blog">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Blog
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>

            <div className="relative h-[400px] mb-8 rounded-lg overflow-hidden">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
            </div>

            <div className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
              <div className="flex items-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Image
                    src={post.authorImage}
                    alt={post.author}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  <span>{post.author}</span>
                </div>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.date).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.readingTime}
                </span>
              </div>
            </div>

            <article className="prose prose-lg dark:prose-invert max-w-none">
              <MDXRemote {...post.content} />
            </article>

            <div className="mt-16 pt-8 border-t">
              <h2 className="text-2xl font-bold mb-4">Share this post</h2>
              <div className="flex gap-4">
                <Button variant="outline" onClick={handleShare}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Article
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
