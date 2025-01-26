"use client"

import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Header } from '@/components/header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { caseStudies } from '@/types/case-study'

export default function CaseStudy() {
  const router = useRouter()
  const params = useParams()
  const study = caseStudies.find(s => s.id === params.id)

  if (!study) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            className="mb-8"
            onClick={() => router.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
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
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold"
              >
                {study.title}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="prose prose-gray dark:prose-invert max-w-none"
              >
                <p className="text-xl">{study.description}</p>
              </motion.div>

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

