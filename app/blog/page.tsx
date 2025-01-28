"use client"

import { Metadata } from 'next'
import { useState, useEffect } from 'react'

export const metadata: Metadata = {
  title: 'Blog | WorksbyCarlos',
  description: 'Engineering insights, DevOps best practices, and cloud architecture articles',
}
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/header'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, ArrowRight, Tag as TagIcon } from 'lucide-react'

interface Post {
  title: string
  excerpt: string
  date: string
  tags: string[]
  author: string
  authorImage: string
  coverImage: string
  readingTime: string
  slug: string
  featured?: boolean
}

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([])
  const [selectedTag, setSelectedTag] = useState<string>('All')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/api/posts')
        const data = await response.json()
        setPosts(data)
      } catch (error) {
        console.error('Failed to fetch posts:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const allTags = ['All', ...new Set(posts.flatMap(post => post.tags))]
  const featuredPosts = posts.filter(post => post.featured)
  const regularPosts = posts.filter(post => !post.featured)

  const filteredPosts = selectedTag === 'All'
    ? regularPosts
    : regularPosts.filter(post => post.tags.includes(selectedTag))

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background/50 relative">
      <div className="animated-gradient-background" />
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        {/* Featured Posts Section */}
        {featuredPosts.length > 0 && (
          <section className="mb-16 bg-gradient-to-br from-background/50 to-muted/50 p-6 rounded-lg border border-muted">
            <h2 className="text-2xl font-bold mb-8">Featured Posts</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredPosts.map((post) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <Card className="overflow-hidden h-full hover:shadow-xl transition-all duration-300">
                      <div className="relative h-64">
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <div className="flex flex-wrap gap-2 mb-2">
                            {post.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="bg-black/50">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <h3 className="text-2xl font-bold mb-2">{post.title}</h3>
                          <p className="text-sm text-white/80 line-clamp-2">{post.excerpt}</p>
                        </div>
                      </div>
                      <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Image
                            src={post.authorImage}
                            alt={post.author}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                          <div>
                            <p className="font-medium">{post.author}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(post.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" className="group-hover:translate-x-1 transition-transform">
                          Read More <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Tags Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {allTags.map((tag) => (
            <Button
              key={tag}
              variant={selectedTag === tag ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTag(tag)}
              className={cn(
                "rounded-full transition-colors",
                selectedTag === tag 
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "hover:bg-muted"
              )}
            >
              {tag === 'All' && <TagIcon className="mr-2 h-4 w-4" />}
              {tag}
            </Button>
          ))}
        </div>

        {/* Regular Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/blog/${post.slug}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="relative h-48">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Image
                          src={post.authorImage}
                          alt={post.author}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                        <span className="text-sm text-muted-foreground">{post.author}</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        Read More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  )
}

