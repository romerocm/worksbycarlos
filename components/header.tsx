"use client"

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Ellipsis, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { siteConfig } from '@/lib/config'

export function Header() {
  const { setTheme, theme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isDarkSection, setIsDarkSection] = useState(false)
  const pathname = usePathname()

  const baseLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" },
  ]

  const blogLink = { href: "/blog", label: "Blog" }
  
  const links = siteConfig.features.blog.enabled 
    ? [...baseLinks.slice(0, 3), blogLink, ...baseLinks.slice(3)]
    : baseLinks

  useEffect(() => {
    setMounted(true)
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => {
      // Get the element directly below the navbar
      const navbarHeight = 64 // 16 * 4 = 64px (h-16)
      const elementBelow = document.elementFromPoint(window.innerWidth / 2, navbarHeight + 10)
      
      if (elementBelow) {
        const computedStyle = window.getComputedStyle(elementBelow)
        const backgroundColor = computedStyle.backgroundColor
        const backgroundImage = computedStyle.backgroundImage
        
        // Check for dark backgrounds
        let isDark = false
        
        // Check for dark background colors
        if (backgroundColor && backgroundColor !== 'rgba(0, 0, 0, 0)' && backgroundColor !== 'transparent') {
          const rgb = backgroundColor.match(/\d+/g)
          if (rgb && rgb.length >= 3) {
            const r = parseInt(rgb[0])
            const g = parseInt(rgb[1])
            const b = parseInt(rgb[2])
            // Calculate luminance
            const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
            isDark = luminance < 0.5
          }
        }
        
        // Check for dark background images or gradients
        if (backgroundImage && backgroundImage !== 'none') {
          isDark = true // Assume images/gradients are dark
        }
        
        // Check if element has dark classes or dark gradients
        const classList = elementBelow.classList
        if (classList.contains('bg-black') || 
            classList.contains('bg-gray-900') || 
            classList.contains('bg-slate-900') ||
            classList.contains('bg-neutral-900') ||
            elementBelow.closest('.bg-black, .bg-gray-900, .bg-slate-900, .bg-neutral-900')) {
          isDark = true
        }
        
        // Check for dark gradient overlays (common in hero sections)
        if (elementBelow.closest('[class*="bg-gradient"]') || 
            elementBelow.closest('[class*="from-black"]') ||
            elementBelow.closest('[class*="to-black"]') ||
            (elementBelow as HTMLElement).style?.backgroundImage?.includes('gradient')) {
          isDark = true
        }
        
        // Special check for case study banner sections
        if (elementBelow.closest('[class*="banner"]') || 
            elementBelow.closest('[class*="hero"]') ||
            elementBelow.closest('.relative.h-\\[40vh\\]') ||
            elementBelow.closest('.relative.h-\\[50vh\\]')) {
          isDark = true
        }
        
        setIsDarkSection(isDark)
      }
    }

    // Run on mount and scroll
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleScroll)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [pathname])

  if (!mounted) {
    return null
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out backdrop-blur-xl backdrop-saturate-150 border-b border-gray-200/10 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center h-16">
          {/* Desktop Logo */}
          <Link href="/" className="hidden md:flex items-center mr-8">
            <img 
              src="/assets/images/logo-wbc.svg" 
              alt="WorksByCarlos" 
              className="w-8 h-8 hover:scale-110 transition-transform duration-200"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 flex-1">
            {links.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className={`text-sm transition-colors ${
                  pathname === link.href 
                    ? isDarkSection ? "text-white font-medium" : "text-primary font-medium"
                    : isDarkSection 
                      ? "text-white/80 hover:text-white" 
                      : "text-secondary-foreground hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Layout: Menu - Logo - Theme */}
          <div className="flex items-center justify-between w-full md:hidden">
            {/* Mobile Menu Toggle - Left */}
            <Button variant="ghost" size="icon" className={`${isDarkSection ? 'text-white hover:text-white' : ''}`} onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Ellipsis className="h-6 w-6" />}
              <span className="sr-only">Toggle menu</span>
            </Button>

            {/* Mobile Logo - Center */}
            <Link href="/" className="flex items-center">
              <img 
                src="/assets/images/logo-wbc-rect.svg" 
                alt="WorksByCarlos" 
                className="h-8 w-auto hover:scale-110 transition-transform duration-200"
              />
            </Link>

            {/* Theme Toggle - Right */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`rounded-full ${isDarkSection ? 'text-white hover:text-white' : ''}`}
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>

          {/* Desktop Theme Toggle */}
          <div className="hidden md:block">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`rounded-full ${isDarkSection ? 'text-white hover:text-white' : ''}`}
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

