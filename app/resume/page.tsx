import Workspace from "../../datatypes/Workplace"
import ResumeWorkplace from "../../components/resumeWorkplace"

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
        timePeriod: "2019 - 2024"

    },
    {
        name: "Kent State",
        title: "Full Stack Developer",
        bulletPoints: [
            "Designed and built responsive web applications using React.js for the frontend and .NET Core for the backend to support university administrative workflows and student services",
            "Refactored legacy applications for improved performance and maintainability, reducing page load times and simplifying future updates"
        ],
        timePeriod: "2017 - 2019"

    }
]


export default function Resume() {
    return (
        <div>
            {workplaces.map(workplace => {
                return (
                    <ResumeWorkplace key={workplace.title} workplace={workplace}/>
                )
            })}
        </div>
    )
}