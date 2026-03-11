"use client"

import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Header } from '@/components/header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowLeft01Icon } from "@hugeicons-pro/core-stroke-rounded"
import { caseStudies } from '@/types/case-study'

export default function CaseStudy() {
  const router = useRouter()
  const params = useParams()
  const study = caseStudies.find(s => s.id === params.id)

  if (!study) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col bg-background/50 relative">
      <div className="animated-gradient-background" />
      <Header />
      
      {/* Banner Image Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-[40vh] sm:h-[50vh] w-full overflow-hidden"
      >
        <Image
          src={study.thumbnail || "/placeholder.svg"}
          alt={study.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/20 opacity-85" />
        {/* Updated positioning to center content and add mobile padding */}
        <div className="absolute inset-0 flex items-center justify-start p-4 sm:p-8 pt-20 sm:pt-8">
          <div className="backdrop-blur-sm bg-black/25 rounded-lg p-4 sm:p-6 max-w-2xl w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="text-white/80 text-xs sm:text-sm font-medium mb-2 drop-shadow-sm">{study.client}</div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 drop-shadow-lg leading-tight">
                {study.title}
              </h1>
              <p className="text-white/90 text-sm sm:text-base md:text-lg drop-shadow-md leading-relaxed">
                {study.description}
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            className="mb-8"
            onClick={() => router.back()}
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} size={16} className="mr-2" />
            Go Back
          </Button>

          <div className="grid gap-8 md:grid-cols-[240px_1fr] mb-16">
            <div className="space-y-6">
              <div>
                <div className="text-sm text-muted-foreground mb-1">CLIENT</div>
                <div className="font-semibold">{study.client}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">YEAR</div>
                <div className="font-semibold">{study.year}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">SCOPE OF WORK</div>
                <div className="space-y-1">
                  {study.scope.map((item) => (
                    <Badge key={item} variant="secondary" className="mr-2">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">STACK</div>
                <div className="space-y-1">
                  {study.stack.map((item) => (
                    <div key={item} className="font-mono text-sm">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">INDUSTRY</div>
                <div className="space-y-1">
                  {study.industry.map((item) => (
                    <div key={item}>{item}</div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-8"
              >
                <h2 className="text-2xl font-bold">Results</h2>
                <div className="grid gap-6">
                  {study.results.map((result, index) => (
                    <motion.div
                      key={result.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      className="p-6 rounded-lg bg-muted"
                    >
                      <h3 className="font-semibold mb-2">{result.title}</h3>
                      <p className="text-muted-foreground">{result.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      <footer className="py-6 px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
        © {new Date().getFullYear()} WorksbyCarlos. All rights reserved.
      </footer>
    </div>
  )
}

