import type { MDXComponents } from 'mdx/types'
import { Toc } from "@stefanprobst/rehype-extract-toc";
 
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  }
}