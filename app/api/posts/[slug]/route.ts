import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { BlogError, handleApiError } from "@/lib/error-handling";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";

export const revalidate = 3600; // Revalidate every hour

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    const postsDirectory = path.join(process.cwd(), "app/blog/posts");
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) {
      throw new BlogError("Post not found", "POST_NOT_FOUND", 404);
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // Check if post is disabled
    if (data.disabled) {
      throw new BlogError("Post is not available", "POST_DISABLED", 403);
    }

    // Serialize the MDX content with optimizations
    const mdxSource = await serialize(content, {
      parseFrontmatter: true,
      mdxOptions: {
        development: process.env.NODE_ENV === "development",
        rehypePlugins: [[rehypeSlug as any], [rehypeHighlight as any]],
      },
    });

    // Cache headers
    const headers = new Headers();
    headers.set(
      "Cache-Control",
      "public, s-maxage=3600, stale-while-revalidate=86400"
    );

    return NextResponse.json(
      {
        ...data,
        slug,
        content: mdxSource,
      },
      { headers }
    );
  } catch (error) {
    const { error: errorMessage, code, statusCode } = handleApiError(error);
    return NextResponse.json(
      { error: errorMessage, code },
      { status: statusCode || 500 }
    );
  }
}
