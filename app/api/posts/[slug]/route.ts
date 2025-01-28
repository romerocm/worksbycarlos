import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { BlogError, handleApiError } from "@/lib/error-handling";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const filePath = path.join(
      process.cwd(),
      "app/blog/posts",
      `${params.slug}.mdx`
    );

    if (!fs.existsSync(filePath)) {
      throw new BlogError("Post not found", "POST_NOT_FOUND", 404);
    }

    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    // Validate required fields
    const requiredFields = [
      "title",
      "excerpt",
      "date",
      "tags",
      "author",
      "authorImage",
      "coverImage",
    ];
    const missingFields = requiredFields.filter((field) => !data[field]);

    if (missingFields.length > 0) {
      throw new BlogError(
        `Missing required fields: ${missingFields.join(", ")}`,
        "INVALID_POST_DATA",
        400
      );
    }

    // Serialize the MDX content
    const mdxSource = await serialize(content, {
      parseFrontmatter: false, // We already parsed it with gray-matter
    });

    return NextResponse.json({
      ...data,
      content: mdxSource,
      slug: params.slug,
    });
  } catch (error) {
    const { error: errorMessage, code, statusCode } = handleApiError(error);
    return NextResponse.json(
      { error: errorMessage, code },
      { status: statusCode }
    );
  }
}
import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import { BlogError, handleApiError } from '@/lib/error-handling'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug
    const postsDirectory = path.join(process.cwd(), 'app/blog/posts')
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)

    if (!fs.existsSync(fullPath)) {
      throw new BlogError('Post not found', 'POST_NOT_FOUND', 404)
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    // Serialize the MDX content
    const mdxSource = await serialize(content, {
      parseFrontmatter: true,
      mdxOptions: {
        development: process.env.NODE_ENV === 'development',
      },
    })

    return NextResponse.json({
      ...data,
      slug,
      content: mdxSource
    })
  } catch (error) {
    const { error: errorMessage, code, statusCode } = handleApiError(error)
    return NextResponse.json({ error: errorMessage, code }, { status: statusCode || 500 })
  }
}
