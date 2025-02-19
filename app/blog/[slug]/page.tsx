"use client";

import { useEffect, useState, Suspense } from "react";
import { useParams } from "next/navigation";
import { PostLayout } from "../components/post-layout";
import { LoadingSkeleton } from "@/components/loading-skeleton";
import { BlogPost } from "@/types/blog";

// Separate component for post content to enable better loading states
function PostContent({ slug }: { slug: string }) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadPost() {
      try {
        const response = await fetch(`/api/posts/${slug}`, {
          signal: controller.signal,
          // Add cache headers
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          }
        });

        if (!response.ok) {
          throw new Error("Failed to load post");
        }

        const data = await response.json();
        setPost(data);
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          return; // Ignore abort errors
        }
        console.error("Error loading post:", error);
        setError("Failed to load post");
      }
    }

    loadPost();

    // Cleanup function to abort fetch on unmount
    return () => controller.abort();
  }, [slug]);

  if (error) {
    return (
      <div className="p-4 text-destructive">
        Error: {error}
      </div>
    );
  }

  if (!post) {
    return <LoadingSkeleton />;
  }

  return <PostLayout post={post} />;
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;

  if (!slug) {
    return <div>Invalid post</div>;
  }

  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <PostContent slug={slug} />
    </Suspense>
  );
}