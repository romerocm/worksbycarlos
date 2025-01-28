import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

interface BlogPostCardProps {
  post: {
    slug: string
    title: string
    excerpt: string
    date: string
    tags: string[]
    author: string
    authorImage: string
    coverImage: string
    readingTime: string
    featured?: boolean
  }
  index: number
  featured?: boolean
}

export function BlogPostCard({ post, index, featured = false }: BlogPostCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group h-full"
    >
      <Link href={`/blog/${post.slug}`}>
        <Card className="overflow-hidden h-full hover:shadow-xl transition-all duration-300 bg-card">
          <div className={`relative ${featured ? 'h-64' : 'h-48'}`}>
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {featured && (
              <>
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
              </>
            )}
          </div>
          
          <div className="p-6">
            {!featured && (
              <>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
              </>
            )}
            
            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center gap-2">
                <Image
                  src={post.authorImage}
                  alt={post.author}
                  width={featured ? 32 : 24}
                  height={featured ? 32 : 24}
                  className="rounded-full"
                />
                <div>
                  <p className={`font-medium ${featured ? 'text-base' : 'text-sm'}`}>{post.author}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(post.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size={featured ? "default" : "sm"}
                className="group-hover:translate-x-1 transition-transform"
              >
                Read More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  )
}
