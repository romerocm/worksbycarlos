"use client"

import { motion } from 'framer-motion'
import { MDXContent } from './mdx-components'
import { ReadingProgress } from './reading-progress'
import Image from 'next/image'
import { Header } from '@/components/header'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

import { BlogPost } from '@/types/blog'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { LoadingSpinner } from '@/components/loading-spinner'
import { cn } from '@/lib/utils'

interface PostLayoutProps {
  post: BlogPost & {
    content: any // MDX content
  }
}

export function PostLayout({ post }: PostLayoutProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (post) {
      setIsLoading(false)
    }
  }, [post])

  if (isLoading) {
    return <LoadingSpinner />
  }
  return (
    <>
      <Head>
        <title>{post.title} | WorksbyCarlos Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.coverImage} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={post.coverImage} />
      </Head>
      <div className="min-h-screen flex flex-col bg-background/50 relative">
      <ReadingProgress />
      <div className="animated-gradient-background" />
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/blog">
              <Button variant="ghost" className="mb-8">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
            
            <div className="relative h-[400px] mb-8 rounded-lg overflow-hidden">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/assets/blog/placeholder.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
            </div>

            <div className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag: string) => (
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
              <div className={cn(
                "prose-headings:scroll-mt-20 prose-headings:font-bold",
                "prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl",
                "prose-img:rounded-lg prose-img:shadow-lg",
                "dark:prose-invert",
                "prose-a:text-primary hover:prose-a:text-primary/80",
                "prose-code:text-primary dark:prose-code:text-primary-foreground",
                "prose-pre:bg-muted dark:prose-pre:bg-gray-950",
                "prose-blockquote:border-l-primary dark:prose-blockquote:border-l-primary-foreground"
              )}>
                {post.content ? (
                  <MDXContent source={post.content} />
                ) : (
                  <div className="p-4 rounded-md bg-destructive/10 text-destructive">
                    <p>Content could not be loaded</p>
                  </div>
                )}
              </div>
            </article>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
