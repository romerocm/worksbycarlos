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

    const posts = await Promise.all(filenames.map(async (filename) => {
      try {
      const filePath = path.join(postsDirectory, filename)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(fileContents)
      
      return {
        ...data,
        slug: filename.replace('.mdx', ''),
        excerpt: content.slice(0, 150) + '...',
        readingTime: calculateReadingTime(content)
      }
    })

        return {
          ...data,
          slug: filename.replace('.mdx', ''),
          excerpt: content.slice(0, 150) + '...',
          readingTime: calculateReadingTime(content)
        }
      } catch (error) {
        console.error(`Error processing ${filename}:`, error)
        return null
      }
    }))

    const validPosts = posts.filter((post): post is BlogPost => post !== null)
    
    const sortedPosts = validPosts.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )

    return NextResponse.json(sortedPosts)
  } catch (error) {
    const { error: errorMessage, code, statusCode } = handleApiError(error)
    return NextResponse.json({ error: errorMessage, code }, { status: statusCode })
  }
}
