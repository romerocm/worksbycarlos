import { cn } from "@/lib/utils"
import Image from "next/image"
import { MDXRemote } from 'next-mdx-remote'
import 'highlight.js/styles/github-dark.css'

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
        "relative rounded font-mono text-sm font-semibold",
        "px-[0.3rem] py-[0.2rem]",
        "bg-[#282A36] text-[#F8F8F2]",
        "dark:bg-[#282A36] dark:text-[#F8F8F2]",
        className?.includes("hljs") ? className : "",
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className={cn(
        "mb-4 mt-6 overflow-x-auto rounded-lg p-4",
        "bg-[#282A36] text-[#F8F8F2]",
        "dark:bg-[#282A36] dark:text-[#F8F8F2]",
        "border border-[#44475A]",
        "scrollbar-thin scrollbar-thumb-[#44475A]",
        className?.includes("hljs") ? className : "",
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
      <div className={cn(
        "prose prose-lg dark:prose-invert max-w-none",
        "prose-code:text-[#F8F8F2] prose-code:bg-[#282A36]",
        "prose-pre:bg-[#282A36] prose-pre:text-[#F8F8F2]",
        "prose-pre:border prose-pre:border-[#44475A]"
      )}>
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
