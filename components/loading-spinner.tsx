"use client"

import { motion } from "framer-motion"

export function LoadingSpinner() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        <div className="w-16 h-16 border-4 border-primary/20 rounded-full" />
        <div className="absolute top-0 w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </motion.div>
    </div>
  )
}