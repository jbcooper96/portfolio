

import { MDXRemote } from 'next-mdx-remote/rsc'
const markdownUrl = "https://portfoliomarkdown.s3.us-east-2.amazonaws.com/bio.mdx";

export default async function Bio() {
    try {
        const res = await fetch(markdownUrl);
        const markdown = await res.text();
        return (
            <MDXRemote source={markdown} />
        )
    }
    catch {
        return (<div></div>)
    }
    
}