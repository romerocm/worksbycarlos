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
