"use client"

import { motion, useScroll, useSpring } from 'framer-motion'
import { MDXContent } from './mdx-components'
import Image from 'next/image'
import { Header } from '@/components/header'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { BlogPost } from '@/types/blog'
import { cn } from '@/lib/utils'

interface PostLayoutProps {
  post: BlogPost
}

export function PostLayout({ post }: PostLayoutProps) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  if (!post) {
    return (
      <div className="p-4 rounded-md bg-destructive/10 text-destructive">
        <p>No post data available</p>
      </div>
    )
  }

  if (!post.content) {
    console.error('Post content is missing:', post)
    return (
      <div className="p-4 rounded-md bg-destructive/10 text-destructive">
        <p>Post content is missing</p>
      </div>
    )
  }
  return (
    <div className="min-h-screen flex flex-col bg-background/50 relative">
      <motion.div
        className="fixed bottom-0 left-0 right-0 h-1 z-50 bg-[#FF79C6]"
        style={{ 
          scaleX,
          transformOrigin: '0%'
        }}
      />
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
              <div className={cn(
                "prose-headings:scroll-mt-20 prose-headings:font-bold",
                "prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl",
                "prose-img:rounded-lg prose-img:shadow-lg",
                "dark:prose-invert",
                "prose-a:text-primary hover:prose-a:text-primary/80",
                "prose-code:text-primary dark:prose-code:text-primary-foreground",
                "prose-pre:bg-muted dark:prose-pre:bg-gray-950",
                "prose-blockquote:border-l-primary dark:prose-blockquote:border-l-primary-foreground",
                "prose-strong:text-foreground dark:prose-strong:text-foreground",
                "prose-em:text-foreground dark:prose-em:text-foreground"
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
