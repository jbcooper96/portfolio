import Project from "../../datatypes/Project"
import ProjectTile from "../../components/projectTile"

const PROJECTS_URL = "https://portfoliomarkdown.s3.us-east-2.amazonaws.com/projects.json";

async function getProjects() : Promise<Project[]> {
    try {
        const res = await fetch(PROJECTS_URL);
        const markdown = await res.text();
        const projectList = JSON.parse(markdown);
        const projects = [];
        for (const project of projectList) {
            projects.push(new Project(project));
        }
        return projects;
    }
    catch {
        console.error("Error loading projects");
        return [];
    }
}

export default async function Projects() {
    const projectList = await getProjects();
    return (
        <div>
            {projectList.map(p => <ProjectTile key={p.name} project={p}/>)}
        </div>
    )
}