import { Metadata } from 'next'
import { useEffect, useState } from 'react'
import { PostLayout } from '../components/post-layout'
import { LoadingSpinner } from '@/components/loading-spinner'
import { Alert } from '@/components/ui/alert'

interface BlogPost {
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
  content?: any
}

interface BlogError {
  message: string
  code?: string
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${params.slug}`)
    const post = await response.json()

    return {
      title: `${post.title} | WorksbyCarlos Blog`,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        images: [post.coverImage],
        type: 'article',
        authors: [post.author],
        publishedTime: post.date,
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt,
        images: [post.coverImage],
      }
    }
  } catch (error) {
    return {
      title: 'Blog Post | WorksbyCarlos',
      description: 'Engineering insights and technical articles'
    }
  }
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<BlogError | null>(null)

  useEffect(() => {
    async function fetchPost() {
      try {
        setIsLoading(true)
        setError(null)
        
        const response = await fetch(`/api/posts/${params.slug}`)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        
        if (!data) {
          throw new Error('No data received')
        }

        setPost(data)
      } catch (error) {
        console.error('Failed to fetch post:', error)
        setError({
          message: error instanceof Error 
            ? error.message 
            : 'Failed to load blog post. Please try again later.',
          code: 'FETCH_ERROR'
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchPost()
  }, [params.slug])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-md">
          <h2 className="font-semibold mb-2">Error Loading Post</h2>
          <p>{error.message}</p>
          {process.env.NODE_ENV === 'development' && error.code && (
            <p className="text-sm mt-2 text-muted-foreground">Error code: {error.code}</p>
          )}
        </Alert>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Alert className="max-w-md">
          <h2 className="font-semibold">Post Not Found</h2>
          <p>The requested blog post could not be found.</p>
        </Alert>
      </div>
    )
  }

  return <PostLayout post={post} />
}
