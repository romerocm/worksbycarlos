"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import { Header } from '@/components/header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const components = {
  // Add any custom components for MDX here
}

export default async function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All')

  // Fetch posts on the server side
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

  const filteredPosts = selectedCategory === 'All'
    ? posts
    : posts.filter(post => post.category === selectedCategory)

  return (
    <div className="min-h-screen flex flex-col bg-background/50 relative">
      <div className="animated-gradient-background" />
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        <motion.h1 
          className="text-4xl font-bold mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Blog
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col">
                <MDXRemote {...post.content} components={components} />
              </Card>
            </motion.div>
          ))}
        </div>
      </main>
      <footer className="py-6 px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
        © {new Date().getFullYear()} WorksbyCarlos. All rights reserved.
      </footer>
    </div>
  )
}
