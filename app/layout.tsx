import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import './globals.css'

// Optimize font loading
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // Add display swap for better performance
  preload: true,
  adjustFontFallback: true,
})

export const metadata: Metadata = {
  title: 'WorksbyCarlos | Engineering Tomorrow\'s Systems – Today',
  description: 'Personal portfolio of Carlos, a visionary technology leader specializing in DevOps, platform engineering, and infrastructure automation in the health sector.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload critical assets */}
        <link 
          rel="preload" 
          href="/assets/images/profile.jpeg" 
          as="image"
        />
      </head>
      <body className={`${inter.className} bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}