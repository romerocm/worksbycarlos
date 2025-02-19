"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { MDXRemote } from 'next-mdx-remote'
import 'highlight.js/styles/github-dark.css'
import { Check, Copy } from 'lucide-react'
import { Button } from "@/components/ui/button"

const CodeBlock = React.forwardRef<
  HTMLPreElement,
  React.HTMLAttributes<HTMLPreElement>
>(({ children, className, ...props }, ref) => {
  const [copied, setCopied] = React.useState(false)
  const codeRef = React.useRef<HTMLPreElement>(null)

  const copyToClipboard = React.useCallback(async () => {
    if (!codeRef.current) return

    const code = codeRef.current.textContent || ''
    const cleanCode = code
      .split('\n')
      .map(line => line.replace(/^\d+\s*│\s*/, ''))
      .join('\n')
      .trim()

    try {
      await navigator.clipboard.writeText(cleanCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }, [])

  const addLineNumbers = (code: string) => {
    const lines = code.trim().split('\n')
    const lineCount = lines.length
    const lineNumberWidth = String(lineCount).length

    return (
      <div className="relative table w-full">
        <div className="table-row-group">
          {lines.map((line, i) => (
            <div key={i} className="table-row group">
              <div 
                className={cn(
                  "table-cell select-none pr-4 text-right text-muted-foreground/40",
                  "font-mono text-sm w-[var(--line-number-width)]",
                  "border-r border-muted-foreground/10 group-hover:border-muted-foreground/20",
                  "group-hover:text-muted-foreground/60 transition-colors"
                )}
                style={{ 
                  '--line-number-width': `${lineNumberWidth + 1}ch`,
                  paddingLeft: `${lineNumberWidth / 2}ch`
                } as React.CSSProperties}
              >
                {i + 1}
              </div>
              <div 
                className={cn(
                  "table-cell whitespace-pre pl-4 group-hover:bg-muted/50",
                  "font-mono text-sm transition-colors"
                )}
              >
                {line || ' '}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="group relative my-6 first:mt-0">
      <Button
        size="icon"
        variant="ghost"
        className={cn(
          "absolute right-4 top-4 z-10",
          "opacity-0 group-hover:opacity-100 transition-opacity",
          "bg-muted/50 hover:bg-muted",
          "focus:opacity-100 focus:ring-2 focus:ring-primary"
        )}
        onClick={copyToClipboard}
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
        <span className="sr-only">
          {copied ? 'Copied to clipboard' : 'Copy code'}
        </span>
      </Button>
      <pre
        ref={codeRef}
        className={cn(
          "overflow-x-auto rounded-lg border",
          "bg-[#282A36] text-[#F8F8F2]",
          "dark:bg-[#282A36] dark:text-[#F8F8F2]",
          "border-[#44475A]",
          "p-4",
          "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted",
          className
        )}
        {...props}
      >
        {typeof children === 'string' ? addLineNumbers(children) : children}
      </pre>
    </div>
  )
})
CodeBlock.displayName = "CodeBlock"

const components = {
  h1: ({ className, ...props }) => (
    <h1 
      className={cn(
        "mt-2 scroll-m-20 text-4xl font-bold tracking-tight",
        className
      )} 
      {...props} 
    />
  ),
  h2: ({ className, ...props }) => (
    <h2 
      className={cn(
        "mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        className
      )} 
      {...props} 
    />
  ),
  h3: ({ className, ...props }) => (
    <h3 
      className={cn(
        "mt-8 scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )} 
      {...props} 
    />
  ),
  p: ({ className, ...props }) => (
    <p 
      className={cn(
        "leading-7 [&:not(:first-child)]:mt-6",
        className
      )} 
      {...props} 
    />
  ),
  ul: ({ className, ...props }) => (
    <ul 
      className={cn(
        "my-6 ml-6 list-disc",
        className
      )} 
      {...props} 
    />
  ),
  ol: ({ className, ...props }) => (
    <ol 
      className={cn(
        "my-6 ml-6 list-decimal",
        className
      )} 
      {...props} 
    />
  ),
  li: ({ className, ...props }) => (
    <li 
      className={cn(
        "mt-2",
        className
      )} 
      {...props} 
    />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote 
      className={cn(
        "mt-6 border-l-2 pl-6 italic",
        className
      )} 
      {...props} 
    />
  ),
  img: ({ className, alt, ...props }) => (
    <img 
      className={cn(
        "rounded-md border",
        className
      )} 
      alt={alt} 
      {...props} 
    />
  ),
  code: ({ className, ...props }) => (
    <code
      className={cn(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",
        className
      )}
      {...props}
    />
  ),
  pre: CodeBlock,
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-x-auto rounded-lg border border-border">
      <table 
        className={cn(
          "w-full border-collapse text-sm",
          className
        )} 
        {...props} 
      />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn(
        "m-0 border-t border-border p-0 even:bg-muted",
        className
      )}
      {...props}
    />
  ),
  th: ({ className, ...props }) => (
    <th
      className={cn(
        "border-b border-border bg-muted px-4 py-2 text-left font-medium text-muted-foreground",
        "[&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td
      className={cn(
        "p-4 align-middle [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
}

export function MDXContent({ source }: { source: any }) {
  if (!source) {
    console.error('No source provided to MDXContent')
    return (
      <div className="p-4 rounded-md bg-destructive/10 text-destructive">
        <p>Failed to load content: No source provided</p>
      </div>
    )
  }

  return (
    <div className={cn(
      "prose prose-lg dark:prose-invert max-w-none",
      "prose-headings:scroll-mt-20",
      "prose-a:text-primary hover:prose-a:text-primary/80",
      "prose-code:text-primary dark:prose-code:text-primary-foreground",
      "prose-pre:bg-muted dark:prose-pre:bg-gray-950",
      "[&_pre]:my-0 [&_pre]:max-h-[650px]",
      "[&_pre]:relative [&_pre]:z-0",
      // Table styles
      "prose-table:w-full",
      "prose-thead:bg-muted",
      "prose-th:border prose-th:border-border prose-th:p-4 prose-th:align-middle",
      "prose-td:border prose-td:border-border prose-td:p-4 prose-td:align-middle",
      "prose-tr:even:bg-muted/50",
      "[&_table]:border-collapse",
      "[&_table]:text-sm",
      "[&_th]:whitespace-nowrap",
      "[&_th]:font-medium",
      "[&_th]:text-muted-foreground",
      "[&_tr]:border-border",
      "[&_tr]:transition-colors"
    )}>
      <MDXRemote {...source} components={components} />
    </div>
  )
}