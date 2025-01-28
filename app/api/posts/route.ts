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
