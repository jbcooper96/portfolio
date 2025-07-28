import type { MDXComponents } from 'mdx/types'
 

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Standard HTML elements with proper styling
    h1: ({ children }) => <h1 className="text-3xl font-bold mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-semibold mb-3">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-medium mb-2">{children}</h3>,
    p: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
    a: ({ href, children }) => (
      <a href={href} className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
    img: ({ src, alt }) => (
      <img src={src} alt={alt} className="max-w-full h-auto my-4 rounded-lg shadow-md" />
    ),
    video: ({ children, ...props }) => (
      <video className="max-w-full h-auto my-4 rounded-lg shadow-md" {...props}>
        {children}
      </video>
    ),
    pre: ({ children }) => (
      <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4 text-sm">
        {children}
      </pre>
    ),
    code: ({ children }) => (
      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
        {children}
      </code>
    ),
    ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>,
    li: ({ children }) => <li className="mb-1">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4 text-gray-700">
        {children}
      </blockquote>
    ),
    ...components,
  }
}