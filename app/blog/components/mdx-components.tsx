import { cn } from "@/lib/utils"
import Image from "next/image"
import { MDXRemote } from 'next-mdx-remote'

const components = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 
      className={cn(
        "mt-2 scroll-m-20 text-4xl font-bold tracking-tight",
        className
      )} 
      {...props} 
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 
      className={cn(
        "mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        className
      )} 
      {...props} 
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 
      className={cn(
        "mt-8 scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )} 
      {...props} 
    />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p 
      className={cn(
        "leading-7 [&:not(:first-child)]:mt-6",
        className
      )} 
      {...props} 
    />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul 
      className={cn(
        "my-6 ml-6 list-disc",
        className
      )} 
      {...props} 
    />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol 
      className={cn(
        "my-6 ml-6 list-decimal",
        className
      )} 
      {...props} 
    />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li 
      className={cn(
        "mt-2",
        className
      )} 
      {...props} 
    />
  ),
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote 
      className={cn(
        "mt-6 border-l-2 pl-6 italic",
        className
      )} 
      {...props} 
    />
  ),
  img: ({ className, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img 
      className={cn(
        "rounded-md border",
        className
      )} 
      alt={alt} 
      {...props} 
    />
  ),
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
        "text-primary dark:text-primary-foreground",
        "dark:bg-secondary",
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className={cn(
        "mb-4 mt-6 overflow-x-auto rounded-lg border p-4",
        "bg-muted dark:bg-secondary",
        "text-primary dark:text-secondary-foreground",
        "scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-700",
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

  try {
    return (
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <MDXRemote {...source} components={components} />
      </div>
    )
  } catch (error) {
    console.error('Error rendering MDX:', error)
    return (
      <div className="p-4 rounded-md bg-destructive/10 text-destructive">
        <p>Error rendering content: {(error as Error).message}</p>
      </div>
    )
  }
}
