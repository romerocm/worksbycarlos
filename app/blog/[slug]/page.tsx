"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { PostLayout } from "../components/post-layout";
import { LoadingSpinner } from "@/components/loading-spinner";
import { BlogPost } from "@/types/blog";

export default function BlogPostPage() {
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPost() {
      if (!params.slug) return;

      try {
        setIsLoading(true);
        const response = await fetch(`/api/posts/${params.slug}`);

        if (!response.ok) {
          throw new Error("Failed to load post");
        }

        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error("Error loading post:", error);
        setError("Failed to load post");
      } finally {
        setIsLoading(false);
      }
    }

    loadPost();
  }, [params.slug]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !post) {
    return (
      <div className="p-4 text-destructive">
        Error: {error || "Post not found"}
      </div>
    );
  }

  return <PostLayout post={post} />;
}
