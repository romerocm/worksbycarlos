import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export async function GET() {
  try {
    const postsDirectory = path.join(process.cwd(), 'app/blog/posts')
    const filenames = fs.readdirSync(postsDirectory)

    const posts = filenames.map((filename) => {
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

    // Sort posts by date
    const sortedPosts = posts.sort((a: any, b: any) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )

    return NextResponse.json(sortedPosts)
  } catch (error) {
    console.error('Error reading blog posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}
