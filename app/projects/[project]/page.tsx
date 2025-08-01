import { MDXRemote } from 'next-mdx-remote/rsc'
import './project.css'
import { Suspense } from 'react'

const markdownUrlBase = "https://portfoliomarkdown.s3.us-east-2.amazonaws.com/";

export default async function Page({
    params
}: {
    params: Promise<{project: string}>
}) {
    try {
        const projectName = (await params).project;
        const projectMarkdownUrl = `${markdownUrlBase}${projectName}.mdx`;
        
        const res = await fetch(projectMarkdownUrl, {
            // Add cache control for better performance
            next: { revalidate: 3600 } // Cache for 1 hour
        });
        
        if (!res.ok) {
            console.error(`Failed to fetch project: ${res.status} ${res.statusText}`);
            return (
                <div className="p-8 text-center">
                    <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
                    <p className="text-gray-600">
                        The project &quot;{projectName}&quot; could not be found.
                    </p>
                </div>
            );
        }
        
        const markdown = await res.text();
        
        console.log(markdown)


        // Validate that we have content
        if (!markdown || markdown.trim().length === 0) {
            console.error('Empty markdown content received');
            return (
                <div className="p-8 text-center">
                    <h1 className="text-2xl font-bold mb-4">Empty Project</h1>
                    <p className="text-gray-600">
                        The project content appears to be empty.
                    </p>
                </div>
            );
        }
        
        const cleanedMarkdown = markdown
            .replace(/\r\n/g, '\n') 
            .trim();
        // Try to render MDX with additional error boundary
        try {
            return (
                <div className="max-w-4xl mx-auto p-6">
                    <Suspense fallback={<div className="p-4">Loading project content...</div>}>
                        <MDXRemote
                            source={cleanedMarkdown}
                            options={{
                                mdxOptions: {
                                    remarkPlugins: [],
                                    rehypePlugins: [],
                                    development: process.env.NODE_ENV === 'development'
                                }
                            }}
                        />
                    </Suspense>
                </div>
            );
        } catch (mdxError) {
            console.error('MDX Rendering Error:', mdxError);
            
            // Fallback: render as HTML if MDX fails
            return (
                <div className="max-w-4xl mx-auto p-6">
                    <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6">
                        <p className="text-yellow-700">
                            <strong>Note:</strong> MDX rendering failed, displaying as HTML fallback.
                        </p>
                    </div>
                    <div
                        className="prose prose-lg max-w-none"
                        dangerouslySetInnerHTML={{
                            __html: cleanedMarkdown
                                .replace(/^# /gm, '<h1>')
                                .replace(/^## /gm, '<h2>')
                                .replace(/^### /gm, '<h3>')
                                .replace(/\n\n/g, '</p><p>')
                                .replace(/^/, '<p>')
                                .replace(/$/, '</p>')
                        }}
                    />
                    <details className="mt-6">
                        <summary className="cursor-pointer text-blue-600">Debug Information</summary>
                        <pre className="mt-2 p-4 bg-gray-100 rounded text-sm overflow-auto">
                            {mdxError instanceof Error ? mdxError.message : String(mdxError)}
                        </pre>
                    </details>
                </div>
            );
        }
        
    } catch (error) {
        console.error('Error loading project:', error);
        
        // More specific error handling
        if (error instanceof TypeError && error.message.includes('stack')) {
            return (
                <div className="p-8 text-center">
                    <h1 className="text-2xl font-bold mb-4 text-red-600">MDX Processing Error</h1>
                    <p className="text-gray-600 mb-4">
                        There was an error processing the project content. This might be due to:
                    </p>
                    <ul className="text-left text-gray-600 max-w-md mx-auto">
                        <li>• Invalid MDX syntax in the content</li>
                        <li>• Missing or undefined components</li>
                        <li>• Malformed frontmatter</li>
                    </ul>
                </div>
            );
        }
        
        return (
            <div className="p-8 text-center">
                <h1 className="text-2xl font-bold mb-4 text-red-600">Error Loading Project</h1>
                <p className="text-gray-600">
                    An unexpected error occurred while loading the project.
                </p>
                <details className="mt-4 text-left">
                    <summary className="cursor-pointer text-blue-600">Error Details</summary>
                    <pre className="mt-2 p-4 bg-gray-100 rounded text-sm overflow-auto">
                        {error instanceof Error ? error.message : String(error)}
                    </pre>
                </details>
            </div>
        );
    }
}