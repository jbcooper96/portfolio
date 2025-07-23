

import { MDXRemote } from 'next-mdx-remote/rsc'
const markdownUrl = "https://portfoliomarkdown.s3.us-east-2.amazonaws.com/bio.mdx";

export default async function Bio() {
    try {
        const res = await fetch(markdownUrl);
        const markdown = await res.text();
        console.log(markdown)
        return (
            <MDXRemote source={markdown} />
        )
    }
    catch (error) {
        console.log(error)
        return (<div></div>)
    }
    
}