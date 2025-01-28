"use client"

import { useEffect, useState } from 'react'
import { PostLayout } from '../components/post-layout'
import { LoadingSpinner } from '@/components/loading-spinner'
import { Alert } from '@/components/ui/alert'
import { BlogPost } from '@/types/blog'

export default function BlogPost({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`/api/posts/${params.slug}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setPost(data)
      } catch (error) {
        console.error('Failed to fetch post:', error)
        setError(error instanceof Error ? error.message : 'Failed to load post')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPost()
  }, [params.slug])

  if (isLoading) return <LoadingSpinner />
  if (error) return <Alert variant="destructive">{error}</Alert>
  if (!post) return <Alert>Post not found</Alert>

  return <PostLayout post={post} />
}
