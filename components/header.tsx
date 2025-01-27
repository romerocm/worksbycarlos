"use client"

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function Header() {
  const { setTheme, theme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ]

  useEffect(() => {
    setMounted(true)
    setIsOpen(false)
  }, [pathname])

  if (!mounted) {
    return null
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out backdrop-blur-xl backdrop-saturate-150 border-b border-gray-200/10 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center h-16">
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 flex-1">
            {links.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className={`text-sm transition-colors ${
                  pathname === link.href 
                    ? "text-primary font-medium" 
                    : "text-secondary-foreground hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-between w-full md:w-auto">
            {/* Mobile Menu Toggle */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              <span className="sr-only">Toggle menu</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full"
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ maxHeight: 0, opacity: 0 }}
              animate={{ maxHeight: isOpen ? 500 : 0, opacity: 1 }}
              exit={{ maxHeight: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden transition-all duration-300 ease-in-out"
            >
              <nav className="py-4" style={{ height: isOpen ? 'auto' : 0 }}>
                <ul className="space-y-4">
                  {links.map((link, index) => (
                    <motion.li
                      key={link.href}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        className={`block text-lg font-medium transition-colors ${
                          pathname === link.href 
                            ? "text-primary" 
                            : "text-secondary-foreground hover:text-primary"
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                        {pathname === link.href && (
                          <motion.div
                            className="h-1 bg-primary mt-1"
                            layoutId="underline"
                          />
                        )}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

