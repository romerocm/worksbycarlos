"use client"

import { useEffect, useState } from 'react'
import { Header } from '@/components/header'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { Calendar, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

export default function BlogPost({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`/api/posts/${params.slug}`)
        const data = await response.json()
        setPost(data)
      } catch (error) {
        console.error('Failed to fetch post:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPost()
  }, [params.slug])

  if (isLoading || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background/50 relative">
      <div className="animated-gradient-background" />
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        <article className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
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
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {/* Content will be rendered here */}
            </div>
          </motion.div>
        </article>
      </main>
    </div>
  )
}
"use client"

import { useEffect, useState } from 'react'
import { PostLayout } from '../components/post-layout'
import { LoadingSpinner } from '@/components/loading-spinner'

export default function BlogPost({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`/api/posts/${params.slug}`)
        const data = await response.json()
        setPost(data)
      } catch (error) {
        console.error('Failed to fetch post:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPost()
  }, [params.slug])

  if (isLoading || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  return <PostLayout post={post} />
}
