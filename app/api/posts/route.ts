import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'

export async function GET() {
  try {
    const postsDirectory = path.join(process.cwd(), 'app/blog/posts')
    const filenames = fs.readdirSync(postsDirectory)

    const posts = await Promise.all(
      filenames.map(async (filename) => {
        const filePath = path.join(postsDirectory, filename)
        const fileContents = fs.readFileSync(filePath, 'utf8')
        const { data, content } = matter(fileContents)
        const mdxSource = await serialize(content)

        return {
          ...data,
          content: mdxSource,
        }
      })
    )

    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'

export async function GET() {
  try {
    const postsDirectory = path.join(process.cwd(), 'app/blog/posts')
    const filenames = fs.readdirSync(postsDirectory)

    const posts = await Promise.all(
      filenames.map(async (filename) => {
        const filePath = path.join(postsDirectory, filename)
        const fileContents = fs.readFileSync(filePath, 'utf8')
        const { data, content } = matter(fileContents)
        const mdxSource = await serialize(content, {
          parseFrontmatter: true,
          scope: data
        })

        return {
          ...data,
          slug: filename.replace('.mdx', ''),
          content: mdxSource,
          preview: content.slice(0, 150) + '...'
        }
      })
    )

    // Sort posts by date
    const sortedPosts = posts.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )

    return Response.json(sortedPosts)
  } catch (error) {
    return Response.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}
import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'

export async function GET() {
  try {
    const postsDirectory = path.join(process.cwd(), 'app/blog/posts')
    const filenames = fs.readdirSync(postsDirectory)

    const posts = await Promise.all(
      filenames.map(async (filename) => {
        const filePath = path.join(postsDirectory, filename)
        const fileContents = fs.readFileSync(filePath, 'utf8')
        const { data, content } = matter(fileContents)
        const mdxSource = await serialize(content, {
          parseFrontmatter: true,
          scope: data
        })

        return {
          ...data,
          slug: filename.replace('.mdx', ''),
          content: mdxSource,
          preview: content.slice(0, 150) + '...'
        }
      })
    )

    // Sort posts by date
    const sortedPosts = posts.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )

    return NextResponse.json(sortedPosts)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}
import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export async function GET() {
  try {
    const postsDirectory = path.join(process.cwd(), 'app/blog/posts')
    const filenames = fs.readdirSync(postsDirectory)

    const posts = filenames.map((filename) => {
      const filePath = path.join(postsDirectory, filename)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(fileContents)
      
      return {
        ...data,
        slug: filename.replace('.mdx', ''),
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
