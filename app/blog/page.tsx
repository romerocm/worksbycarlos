"use client"

import { useState, useEffect, Suspense, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { cn } from "@/lib/utils"
import Image from 'next/image'
import { Header } from '@/components/header'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, ArrowRight, Tag as TagIcon } from 'lucide-react'
import { LoadingSkeleton } from '@/components/loading-skeleton'

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

function BlogContent() {
  const [posts, setPosts] = useState<Post[]>([])
  const [selectedTag, setSelectedTag] = useState<string>('All')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    async function fetchPosts() {
      try {
        const response = await fetch('/api/posts')
        const data = await response.json()
        
        if (mounted) {
          setPosts(data)
          setIsLoading(false)
        }
      } catch (error) {
        console.error('Failed to fetch posts:', error)
        if (mounted) {
          setIsLoading(false)
        }
      }
    }

    fetchPosts()

    return () => {
      mounted = false
    }
  }, [])

  // Memoize derived values to prevent unnecessary recalculations
  const { allTags, featuredPosts, regularPosts, filteredPosts } = useMemo(() => {
    // Get unique tags from all posts and sort them alphabetically
    const tags = Array.from(new Set(posts.flatMap(post => post.tags))).sort()
    
    // Featured posts
    const featured = posts.filter(post => post.featured)
    
    // Regular posts
    const regular = posts.filter(post => !post.featured)
    
    // Filtered posts based on selected tag
    const filtered = selectedTag === 'All'
      ? regular
      : regular.filter(post => post.tags.includes(selectedTag))

    return {
      allTags: ['All', ...tags],
      featuredPosts: featured,
      regularPosts: regular,
      filteredPosts: filtered
    }
  }, [posts, selectedTag])

  // Get tag counts for displaying in the filter buttons
  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = { All: regularPosts.length }
    regularPosts.forEach(post => {
      post.tags.forEach(tag => {
        counts[tag] = (counts[tag] || 0) + 1
      })
    })
    return counts
  }, [regularPosts])

  if (isLoading) {
    return <LoadingSkeleton />
  }

  return (
    <>
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
                            <Badge 
                              key={tag} 
                              variant="secondary" 
                              className="bg-black/50 cursor-pointer"
                              onClick={(e) => {
                                e.preventDefault()
                                setSelectedTag(tag)
                              }}
                            >
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
      <AnimatePresence mode="wait">
        <motion.div
          key="tags"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-2 mb-8"
        >
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
              <span className="ml-2 text-xs bg-muted-foreground/10 px-2 py-0.5 rounded-full">
                {tagCounts[tag]}
              </span>
            </Button>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Regular Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredPosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="col-span-full text-center py-12"
            >
              <p className="text-muted-foreground text-lg">
                No posts found for tag "{selectedTag}"
              </p>
              <Button 
                variant="ghost" 
                onClick={() => setSelectedTag('All')}
                className="mt-4"
              >
                Show all posts
              </Button>
            </motion.div>
          ) : (
            filteredPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
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
                          <Badge 
                            key={tag} 
                            variant="secondary"
                            className="cursor-pointer"
                            onClick={(e) => {
                              e.preventDefault()
                              setSelectedTag(tag)
                            }}
                          >
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
            ))
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

export default function Blog() {
  return (
    <div className="min-h-screen flex flex-col bg-background/50 relative">
      <div className="animated-gradient-background" />
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        <Suspense fallback={<LoadingSkeleton />}>
          <BlogContent />
        </Suspense>
      </main>
      <footer className="py-6 px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
        © {new Date().getFullYear()} WorksbyCarlos. All rights reserved.
      </footer>
    </div>
  )
}