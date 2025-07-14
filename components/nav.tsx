"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const CLASS_NAME = "transition delay-75 duration-200 ease-in-out hover:scale-110 hover:-translate-y-1 hover:font-medium";
const CLASS_NAME_SELECTED = "font-bold underline";

function getPage(pathname: string): string {
    const pathnameSplit = pathname.split("/");
    return pathnameSplit.length > 1 ? pathnameSplit[1] : "home";
}

function getClassname(pathname: string, linkname: string): string {
    if (linkname === getPage(pathname)) {
        return CLASS_NAME_SELECTED;
    }
    return CLASS_NAME;
}

export default function Nav() {
    const pathname = usePathname();

    return (
        <div className="grid grid-cols-4 gap-4 border-b mt-10 mb-10 text-center">
            <div className="border-r border-l grid" >
                <Link className={getClassname(pathname, "projects")} href="/projects">Projects</Link>
            </div>
            <div className="border-r grid">
                <Link className={getClassname(pathname, "resume")} href="/resume">Resume</Link>
            </div>
            <div className="border-r grid">
                <Link className={getClassname(pathname, "aiassistant")} href="/aiassistant">Ai Assistant</Link>
            </div>
            <div className="border-r grid">
                <Link className={getClassname(pathname, "bio")} href="/bio">Bio</Link>
            </div>
        </div>
    )
}