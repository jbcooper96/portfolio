"use client"

import { usePathname } from 'next/navigation'

function getSubheading(pathname: string) : string {
    const pathnameSplit = pathname.split("/");
    const page = pathnameSplit.length > 1 ? pathnameSplit[1] : "home";
    switch (page) {
        case "projects":
            return "Projects";
        case "bio":
            return "Bio";
        case "aiassistant":
            return "Ai Assistant";
        case "resume":
            return "Resume";
        default:
            return "Software Developer";
    }
}

export default function SubHeading() {
    const pathname = usePathname();
    const subHeading = getSubheading(pathname);
    
    return (<h2 className="text-1g animate-slide-right">{subHeading}</h2>);
}