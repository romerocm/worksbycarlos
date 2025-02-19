"use client"

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { List } from 'lucide-react'

interface Heading {
  id: string
  text: string
  level: number
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    // Get all headings from the article
    const elements = Array.from(document.querySelectorAll('article h1, article h2, article h3'))
    const headingElements = elements.map((element) => ({
      id: element.id,
      text: element.textContent || '',
      level: Number(element.tagName[1])
    }))
    setHeadings(headingElements)

    // Set up intersection observer
    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(callback, {
      rootMargin: '-100px 0px -66%'
    })

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  if (headings.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="hidden xl:block"
    >
      <div className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-auto scrollbar-hide">
        <div className="flex items-center gap-2 mb-4 text-muted-foreground">
          <List className="h-4 w-4" />
          <span className="text-sm font-medium">Table of Contents</span>
        </div>
        <nav className="space-y-1">
          {headings.map((heading) => (
            <Button
              key={heading.id}
              variant="ghost"
              size="sm"
              className={cn(
                "w-full justify-start font-normal",
                heading.level === 1 && "font-medium",
                heading.level === 2 && "pl-4",
                heading.level === 3 && "pl-8",
                heading.id === activeId && "bg-muted font-medium"
              )}
              onClick={() => {
                document.querySelector(`#${heading.id}`)?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
                })
              }}
            >
              {heading.text}
            </Button>
          ))}
        </nav>
      </div>
    </motion.div>
  )
}