"use client"

import React, { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment, Html } from '@react-three/drei'
import { Header } from '@/components/header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'
import { LoadingSkeleton } from '@/components/loading-skeleton'
import { caseStudies } from '@/types/case-study'
import { Suspense } from 'react'

const rubberDuckQuestions = [
  "What does 'rm -rf /' do? Asking for a friend...",
  "Is the cloud just someone else's computer?",
  "If I push to production on Friday, what could go wrong?",
  "Why can't I just store passwords in plain text?",
  "Do you think my YAML is valid?",
  "Is it okay to hardcode API keys?",
  "Can you explain Terraform to me like I'm 5?",
  "Why do we need CI/CD when we have interns?",
]

function Model() {
  const [currentQuestion, setCurrentQuestion] = React.useState(0)
  const gltf = useGLTF("/assets/3d/duck.glb")

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuestion((prev) => (prev + 1) % rubberDuckQuestions.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <group>
      <primitive object={gltf.scene} scale={2} position={[0, -1, 0]} />
      <Html position={[1, 1, 0]}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="relative min-w-[200px] max-w-[280px]"
          >
            <div className="bg-[#0B93F6] text-white p-4 rounded-[1.15rem] rounded-tr-[0.4rem]">
              <p className="text-sm">{rubberDuckQuestions[currentQuestion]}</p>
            </div>
            <div className="text-xs text-gray-500 mt-1 text-right pr-2">
              Delivered
            </div>
          </motion.div>
        </AnimatePresence>
      </Html>
    </group>
  )
}

function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <Suspense fallback={<Html center><LoadingSkeleton /></Html>}>
        <Environment preset="studio" />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <Model />
        <OrbitControls />
      </Suspense>
    </Canvas>
  )
}

export default function Projects() {
  const [activeProject, setActiveProject] = React.useState(0)

  return (
    <div className="min-h-screen flex flex-col bg-background/50 relative">
      <div className="animated-gradient-background" />
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-lg text-muted-foreground mb-4"
          >
            FEATURED PROJECTS & CASE STUDIES
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold"
          >
            Engineering Excellence
          </motion.h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
              onMouseEnter={() => setActiveProject(index)}
            >
              <Link href={`/projects/${study.id}`} prefetch className="block">
                <Card className="overflow-hidden border-0 bg-gradient-to-br from-gray-900 to-gray-800 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
                  <div className="relative aspect-[16/9] bg-muted overflow-hidden">
                    <Image
                      src={study.thumbnail || "/placeholder.svg"}
                      alt={study.title}
                      fill
                      className="object-cover transition-all duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />
                    <div className="absolute inset-0 p-6 flex flex-col justify-between transform transition-all duration-300 group-hover:translate-y-[-5px]">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-white mb-2">{study.client}</h3>
                          <div className="flex flex-wrap gap-2">
                            {study.tags.map((tag) => (
                              <Badge 
                                key={tag} 
                                variant="outline" 
                                className="text-white border-white/20 bg-white/5 hover:bg-white/10 transition-colors duration-300"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        {study.funding && (
                          <div className="text-right">
                            <div className="text-2xl font-bold text-white">{study.funding}</div>
                            <div className="text-sm text-white/60">in funding</div>
                          </div>
                        )}
                      </div>
                      <div>
                        <h2 className="text-xl md:text-2xl font-bold text-white mb-2">{study.title}</h2>
                        <p className="text-white/80">{study.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 flex items-center justify-between text-white backdrop-blur-sm bg-black/20 transition-all duration-300 group-hover:bg-black/30">
                    <div className="flex items-center gap-6">
                      <div className="text-sm">
                        <div className="text-white/60 font-medium uppercase tracking-wider text-xs mb-1">Year</div>
                        <div className="font-semibold">{study.year}</div>
                      </div>
                      <div className="text-sm">
                        <div className="text-white/60 font-medium uppercase tracking-wider text-xs mb-1">Stack</div>
                        <div className="font-semibold">{study.stack.join(" · ")}</div>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="project-card-button text-white bg-black/20 hover:bg-white/10 hover:text-white transition-all duration-300"
                    >
                      View Case Study <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="h-[500px] bg-muted rounded-lg overflow-hidden">
          <ErrorBoundary fallback={<div className="text-red-500">Error loading 3D scene</div>}>
            <Scene />
          </ErrorBoundary>
        </div>
      </main>
      <footer className="py-6 px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
        © {new Date().getFullYear()} WorksbyCarlos. All rights reserved.
      </footer>
    </div>
  )
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }

    return this.props.children
  }
}