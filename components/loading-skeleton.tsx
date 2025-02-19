"use client"

import { motion } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"
import { usePathname } from "next/navigation"

export function LoadingSkeleton() {
  const pathname = usePathname() || "/"

  // Render different skeletons based on the current path
  const renderContent = () => {
    // Home page skeleton
    if (pathname === "/") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {/* Profile Section */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 row-span-2">
            <Skeleton className="h-[500px] rounded-lg" />
          </div>
          
          {/* Featured Project */}
          <div className="col-span-1 md:col-span-2">
            <Skeleton className="h-[300px] rounded-lg" />
          </div>
          
          {/* Stats Cards */}
          <Skeleton className="h-[150px] rounded-lg" />
          <Skeleton className="h-[150px] rounded-lg" />
          
          {/* Tech Stack Section */}
          <div className="col-span-1 md:col-span-2 lg:col-span-4">
            <Skeleton className="h-[200px] rounded-lg" />
          </div>
        </div>
      )
    }

    // Blog page skeleton
    if (pathname === "/blog") {
      return (
        <div className="space-y-8">
          {/* Featured Posts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {[1, 2].map((i) => (
              <Skeleton key={i} className="h-[400px] rounded-lg" />
            ))}
          </div>
          
          {/* Tags Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-8 w-20 rounded-full" />
            ))}
          </div>
          
          {/* Regular Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-[350px] rounded-lg" />
            ))}
          </div>
        </div>
      )
    }

    // Projects page skeleton
    if (pathname === "/projects") {
      return (
        <div className="space-y-8">
          {/* Title Section */}
          <div className="text-center space-y-4 mb-16">
            <Skeleton className="h-6 w-48 mx-auto" />
            <Skeleton className="h-12 w-96 mx-auto" />
          </div>
          
          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-[400px] rounded-lg" />
            ))}
          </div>
          
          {/* 3D Scene Section */}
          <Skeleton className="h-[500px] rounded-lg" />
        </div>
      )
    }

    // About page skeleton
    if (pathname === "/about") {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Skills Section */}
          <div className="lg:col-span-3 space-y-6">
            <Skeleton className="h-8 w-48" />
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-[120px] rounded-lg" />
            ))}
          </div>
          
          {/* Experience Timeline */}
          <div className="lg:col-span-9">
            <Skeleton className="h-8 w-64 mb-8" />
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="mb-12">
                <Skeleton className="h-[200px] rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      )
    }

    // Contact page skeleton
    if (pathname === "/contact") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-12 w-32" />
          </div>
          
          {/* Connect Section */}
          <div className="space-y-6">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-24 w-full" />
            <div className="flex space-x-4">
              <Skeleton className="h-12 w-32" />
              <Skeleton className="h-12 w-32" />
            </div>
          </div>
        </div>
      )
    }

    // Blog post or project detail skeleton
    if (pathname.startsWith("/blog/") || pathname.startsWith("/projects/")) {
      return (
        <div className="max-w-4xl mx-auto space-y-8">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-[400px] rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-12 w-3/4" />
            <div className="flex space-x-4">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-24" />
            </div>
            <div className="space-y-4 mt-8">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </div>
          </div>
        </div>
      )
    }

    // Default skeleton
    return (
      <div className="grid gap-8">
        <Skeleton className="h-[400px] rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-[200px] rounded-lg" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background/50 relative">
      <div className="animated-gradient-background" />
      {/* Header Skeleton */}
      <div className="fixed top-0 left-0 right-0 z-50 h-16 backdrop-blur-xl backdrop-saturate-150 border-b border-gray-200/10">
        <div className="container mx-auto px-4 h-full">
          <div className="flex items-center justify-between h-full">
            <div className="flex space-x-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-4 w-16" />
              ))}
            </div>
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <main className="container mx-auto px-4 py-12 pt-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {renderContent()}
        </motion.div>
      </main>
    </div>
  )
}