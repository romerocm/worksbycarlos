import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const filePath = path.join(process.cwd(), 'app/blog/posts', `${params.slug}.mdx`)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)
    const mdxSource = await serialize(content, {
      scope: data,
    })

    return NextResponse.json({
      ...data,
      content: mdxSource,
      slug: params.slug,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 404 }
    )
  }
}
