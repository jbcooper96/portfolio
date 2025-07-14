import { MDXRemote } from 'next-mdx-remote/rsc'
import withToc from "@stefanprobst/rehype-extract-toc"
import './project.css'

const markdownUrlBase = "https://portfoliomarkdown.s3.us-east-2.amazonaws.com/";

export default async function Page({
    params
}: {
    params: Promise<{project: string}>
}) {
    let projectFound = false;
    let markdown = "";

    const projectName = (await params).project;
    const projectMarkdownUrl = `${markdownUrlBase}${projectName}.mdx`;

    try {
        const res = await fetch(projectMarkdownUrl);
        markdown = await res.text();
        if (res.ok)
            projectFound = true;
    }
    catch (e) {
        console.error(e);
    }

    return (
        <div>
            {projectFound ? <MDXRemote source={markdown}/> : <span>Project could not be found</span>}
        </div>
    )
}