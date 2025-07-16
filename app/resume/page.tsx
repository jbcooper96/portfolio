"use client"
import Workspace from "../../datatypes/Workplace"
import ResumeWorkplace from "../../components/resumeWorkplace"
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Theme from "../../theme/Theme"

const workplaces: Workspace[] = [
    {
        name: "Salesforce",
        title: "Technical Consultant",
        bulletPoints: [
            "Led end-to-end development of web applications for enterprise clients, leveraging frameworks such as React.js and Lightning Web Components (LWC).",
            "Collaborated directly with stakeholders to gather requirements, define technical specifications, and deliver scalable solutions tailored to complex business needs.",
            "Acted as primary developer and technical lead for issue resolution, technical design, and post-deployment support on multiple Agile scrum teams",
            "Developed and maintained strong relationships with business stakeholders, ensuring alignment between technical delivery and business goals",
            "Proactively identified system performance improvements and security enhancements, delivering higher efficiency and client satisfaction"
        ],
        timePeriod: "2019 - 2024",
        animation: "animate-slide-up-tag"

    },
    {
        name: "Kent State",
        title: "Full Stack Developer",
        bulletPoints: [
            "Designed and built responsive web applications using React.js for the frontend and .NET Core for the backend to support university administrative workflows and student services",
            "Refactored legacy applications for improved performance and maintainability, reducing page load times and simplifying future updates"
        ],
        timePeriod: "2017 - 2019",
        animation: "animate-slide-up-tag-5"
    }
]

const skills = [{label: "React.js", animation: "animate-slide-right-tag"}, {label: "Next.js", animation: "animate-slide-down-tag"}, {label: "Lightning Web Components", animation: "animate-slide-down-tag"}, 
    {label: "Typescript", animation: "animate-slide-down-tag"}, {label: "Node.js", animation: "animate-slide-down-tag"}, {label: "Nest.js", animation: "animate-slide-down-tag"}, {label: "Express", animation: "animate-slide-down-tag"}, 
    {label: "Python", animation: "animate-slide-down-tag"}, {label: "Flask", animation: "animate-slide-down-tag"}, {label: "Fast Api", animation: "animate-slide-down-tag"}, {label: "Pydantic", animation: "animate-slide-down-tag"}, {label: "C#", animation: "animate-slide-down-tag"}, 
    {label: ".NET", animation: "animate-slide-down-tag"}, {label: "Agile Methodologies", animation: "animate-slide-down-tag"}, {label: "Scrum", animation: "animate-slide-left-tag"}, {label: "SQL", animation: "animate-slide-right-tag"}, {label:"MySql", animation: "animate-slide-up-tag"}, 
    {label: "PostgreSQL", animation: "animate-slide-up-tag"}, {label: "Entity Framework", animation: "animate-slide-up-tag"}, {label: "Prisma", animation: "animate-slide-up-tag"}, {label: "Salesforce Development", animation: "animate-slide-up-tag"}, {label: "Docker", animation: "animate-slide-up-tag"}, 
    {label: "Amazon Web Services", animation: "animate-slide-left-tag"}
];

export default function Resume() {
    return (
        <div>
            <h2 className="text-2xl mt-10">Skills</h2>
            <Paper
            sx={{
                display: 'flex',
                justifyContent: 'left',
                flexWrap: 'wrap',
                listStyle: 'none',
                backgroundColor: "black",
                p: 0.5,
                m: 1,
            }}
            component="ul"
            >
                {skills.map(skill => {
                    return (
                    <li key={skill.label}>
                        <Chip className={skill.animation} sx={{backgroundColor: "black", color: "white", borderColor: Theme.accent, margin: .5}} label={skill.label} variant="outlined" />
                    </li>
                    )
                })}
                
            </Paper>
            <h2 className="text-2xl mt-10 mb-5">Experience</h2>
            {workplaces.map(workplace => {
                return (
                    <ResumeWorkplace key={workplace.title} workplace={workplace}/>
                )
            })}
        </div>
    )
}