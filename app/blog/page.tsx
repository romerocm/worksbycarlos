"use client"

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { Header } from '@/components/header'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const posts = [
  {
    title: "The Future of DevOps: Trends to Watch",
    excerpt: "Exploring emerging trends in DevOps and how they're shaping the future of software development and operations.",
    date: "2023-12-15",
    category: "DevOps"
  },
  {
    title: "Optimizing Kubernetes for Scale",
    excerpt: "Best practices and strategies for scaling Kubernetes clusters in high-demand environments.",
    date: "2023-11-30",
    category: "Kubernetes"
  },
  {
    title: "Infrastructure as Code: Beyond the Basics",
    excerpt: "Advanced techniques and patterns for managing complex infrastructure using Terraform and other IaC tools.",
    date: "2023-11-15",
    category: "Infrastructure"
  }
]

const categories = ["All", "DevOps", "Kubernetes", "Infrastructure"]

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const filtersRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()

  const filteredPosts = selectedCategory === "All" 
    ? posts 
    : posts.filter(post => post.category === selectedCategory)

  useEffect(() => {
    const checkScroll = () => {
      if (filtersRef.current) {
        const isScrollable = filtersRef.current.scrollWidth > filtersRef.current.clientWidth
        if (isScrollable) {
          controls.start({
            x: [0, -10, 0],
            transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
          })
        } else {
          controls.stop()
        }
      }
    }

    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [controls])

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
        <div className="mb-8 relative">
          <div 
            ref={filtersRef}
            className="flex space-x-2 overflow-x-auto pb-2 max-w-full scrollbar-hide"
          >
            <motion.div 
              className="flex whitespace-nowrap"
              animate={controls}
            >
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className="mx-1"
                >
                  {category}
                </Button>
              ))}
            </motion.div>
          </div>
          <div className="absolute right-0 top-0 bottom-0 bg-gradient-to-l from-background to-transparent w-8" />
        </div>
        <AnimatePresence>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            layout
          >
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col">
                  <CardHeader>
                    <CardTitle>{post.title}</CardTitle>
                    <CardDescription>{post.date}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{post.excerpt}</p>
                  </CardContent>
                  <CardFooter className="mt-auto">
                    <Button>Read More</Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </main>
      <footer className="py-6 px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
        © {new Date().getFullYear()} WorksbyCarlos. All rights reserved.
      </footer>
    </div>
  )
}

