"use client";

import { useEffect, useState } from "react";
import { PostLayout } from "../components/post-layout";
import { LoadingSpinner } from "@/components/loading-spinner";
import { Alert } from "@/components/ui/alert";
import type { BlogPost } from "@/types/blog";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";

export default function BlogPost({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchPost() {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(`/api/posts/${params.slug}`);

        if (!response.ok) {
          if (response.status === 404) {
            router.push("/blog");
            return;
          }
          throw new Error(`Failed to load post (${response.status})`);
        }

        const data = await response.json();
        if (!data || data.error) {
          throw new Error(data?.error || "Failed to load post content");
        }

        setPost(data);
      } catch (error) {
        console.error("Failed to fetch post:", error);
        setError(
          error instanceof Error ? error.message : "Failed to load post"
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchPost();
  }, [params.slug, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-12 pt-24">
          <LoadingSpinner />
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-12 pt-24">
          <div className="flex items-center justify-center">
            <Alert variant="destructive" className="max-w-md">
              <h2 className="font-semibold mb-2">Error Loading Post</h2>
              <p>{error}</p>
            </Alert>
          </div>
        </main>
      </div>
    );
  }

  if (!post) return null;

  return <PostLayout post={post} />;
}
"use client"

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { PostLayout } from '../components/post-layout'
import { LoadingSpinner } from '@/components/loading-spinner'
import { BlogPost } from '@/types/blog'

export default function BlogPostPage() {
  const params = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadPost() {
      if (!params.slug) return
      
      try {
        setIsLoading(true)
        const response = await fetch(`/api/posts/${params.slug}`)
        
        if (!response.ok) {
          throw new Error('Failed to load post')
        }
        
        const data = await response.json()
        setPost(data)
      } catch (error) {
        console.error('Error loading post:', error)
        setError('Failed to load post')
      } finally {
        setIsLoading(false)
      }
    }

    loadPost()
  }, [params.slug])

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (error || !post) {
    return <div className="p-4 text-destructive">Error: {error || 'Post not found'}</div>
  }

  return <PostLayout post={post} />
}
