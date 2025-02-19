import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { BlogError, handleApiError } from '@/lib/error-handling'
import { BlogPost } from '@/types/blog'

function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export async function GET() {
  try {
    const postsDirectory = path.join(process.cwd(), 'app/blog/posts')
    
    if (!fs.existsSync(postsDirectory)) {
      throw new BlogError('Posts directory not found', 'POSTS_DIR_NOT_FOUND', 404)
    }

    const filenames = fs.readdirSync(postsDirectory)
    const mdxFiles = filenames.filter(filename => filename.endsWith('.mdx'))

    const posts = await Promise.all(mdxFiles.map(async (filename) => {
      try {
        const filePath = path.join(postsDirectory, filename)
        
        // Check if file exists and is readable
        if (!fs.existsSync(filePath)) {
          console.error(`File ${filename} does not exist`)
          return null
        }

        try {
          fs.accessSync(filePath, fs.constants.R_OK)
        } catch (error) {
          console.error(`File ${filename} is not readable:`, error)
          return null
        }

        const fileContents = fs.readFileSync(filePath, 'utf8')
        const { data, content } = matter(fileContents)
        
        // Validate required fields
        const requiredFields = ['title', 'excerpt', 'date', 'tags', 'author', 'authorImage', 'coverImage']
        const missingFields = requiredFields.filter(field => !data[field])
        
        if (missingFields.length > 0) {
          console.error(`Missing required fields in ${filename}: ${missingFields.join(', ')}`)
          return null
        }

        // Ensure tags is an array
        const tags = Array.isArray(data.tags) ? data.tags : [data.tags]

        // Skip disabled posts
        if (data.disabled) {
          return null
        }

        return {
          ...data,
          tags,
          slug: filename.replace('.mdx', ''),
          readingTime: calculateReadingTime(content)
        } as BlogPost
      } catch (error) {
        console.error(`Error processing ${filename}:`, error)
        return null
      }
    }))

    const validPosts = posts.filter((post): post is BlogPost => post !== null)
    
    if (validPosts.length === 0) {
      throw new BlogError('No valid posts found', 'NO_POSTS_FOUND', 404)
    }

    const sortedPosts = validPosts.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )

    return NextResponse.json(sortedPosts)
  } catch (error) {
    const { error: errorMessage, code, statusCode } = handleApiError(error)
    return NextResponse.json({ error: errorMessage, code }, { status: statusCode })
  }
}