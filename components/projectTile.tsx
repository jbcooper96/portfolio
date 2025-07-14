import Project from "../datatypes/Project"
import Image from "next/image";
import Link from 'next/link'

export default function ProjectTile({
    project
}: Readonly<{
    project: Project
}>) {

    return (
        <Link href={`/projects/${project.urlName}`}>
            <div className="grid grid-cols-4 gap-8 mt-12 border-b pb-12 cursor-pointer">
            
                <div className="col-span-1">
                    <Image  src={project.imgUrl} width={400} height={400} alt="project image"/>
                </div>
                
                <div className="col-span-3">
                    <h2 className="text-4xl mb-6">{project.name}</h2>
                    <span>{project.description}</span>
                </div>
            
            </div>
        </Link>
    )
}