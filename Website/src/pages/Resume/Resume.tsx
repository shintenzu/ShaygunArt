import { useState, useEffect } from "react";
//import axios from "axios";
import styles from "./Resume.module.scss";
//import { motion } from "motion/react";
//import TextType from "../../components/TypeText/TextType";
import "vault66-crt-effect/style.css";
import JitterDiv from "../../components/JitterDiv/JitterDiv";
//import CyberBtn from "../../components/CyberBtn/CyberBtn";
import PageTitle from "../../components/PageTitle/PageTitle";
import PageBox from "../../components/PageBox/PageBox";
import ToolBox from "../../components/ToolBox/ToolBox";
import SectionTab from "./SectionTab/SectionTab";
import JobList from "./JobList/JobList";
import SchoolList from "./SchoolList/SchoolList";
import resumeUrl from "/download/Segun-O-SWE-Resume-2026.docx?url";
import type {
    Tool,
    School,
    Job,
    //Socials,
    //Gallery,
    //Project
} from "../../interfaces/Types";

// Local JSON imports (adjust path to wherever your files live)
import toolsData from "../../server/tools.json";
import schoolsData from "../../server/schools.json";
import jobsData from "../../server/jobs.json";
//import contactsData from "../../server/contacts.json";
//import galleryData from "../../server/gallery.json";
//import projectsData from "../../server/projects.json";

// Cast to your interfaces
const tools = toolsData as Tool[];
const schools = schoolsData as School[];
const jobs = jobsData as Job[];
//const contacts = contactsData as Socials[];
//const gallery = galleryData as Gallery[];
//const projects = projectsData as Project[];

interface ResumeProps {}

export default function Resume({}: ResumeProps) {
    // Local server import syste.

    // const [tools, setTools] = useState<Tool[]>([]);
    // const [schools, setSchools] = useState<School[]>([]);
    // const [jobs, setJobs] = useState<Job[]>([]);
    // const [contacts, setContacts] = useState<Socials[]>([]);
    // const [gallery, setGallery] = useState<Gallery[]>([]);
    // const [projects, setProjects] = useState<Project[]>([]);

    //const [loading, setLoading] = useState(true);
    //const [error, setError] = useState<string | null>(null);
    const [current, setCurrent] = useState(0);
    const [shouldRender, setShouldRender] = useState(false);
    const imageModules = import.meta.glob("../../icons/Resume/*.{png,jpg,jpeg,svg}", { eager: true });

    // Map them into a clean key-value object (e.g., { "logo.png": "/src/assets/images/logo.png" })
    const images = Object.fromEntries(
        Object.entries(imageModules).map(([path, module]) => {
            const fileName = path.split("/").pop();
            return [fileName, (module as any).default];
        }),
    );

    // const fetchData = async () => {
    //     try {
    //         const [toolsRes, schoolsRes, jobsRes, contactsRes, galleryRes, projectsRes] = await Promise.all([
    //             axios.get("http://localhost:8080/data/tools"),
    //             axios.get("http://localhost:8080/data/schools"),
    //             axios.get("http://localhost:8080/data/jobs"),
    //             axios.get("http://localhost:8080/data/contacts"),
    //             axios.get("http://localhost:8080/data/gallery"),
    //             axios.get("http://localhost:8080/data/projects"),
    //         ]);
    //         setTools(toolsRes.data);
    //         setSchools(schoolsRes.data);
    //         setJobs(jobsRes.data);
    //         setContacts(contactsRes.data);
    //         setGallery(galleryRes.data);
    //         setProjects(projectsRes.data);
    //         console.log("tools:", tools, "schools:", schools, "jobs:", jobs);
    //     } catch (err) {
    //         console.error("Error fetching data:", err);
    //         setError("Failed to load resume data.");
    //     } finally {
    //         setLoading(false);
    //         setShouldRender(true);
    //     }
    // };

    // useEffect(() => {
    //     fetchData();
    // }, []);

    const currentTool = tools[current];

    //Reusable Elements

    const toolSet = (tool: Tool) => (
        <JitterDiv key={tool.id} className={styles.expand}>
            <img src={images[tool.icon]} className={`${styles.img} btn-grow`} onClick={() => setCurrent(tool.id - 1)} />
        </JitterDiv>
    );

    const toolType = (cat: string) => {
        return tools.filter((tool: Tool) => tool.cat === cat).map((tool: Tool) => toolSet(tool));
    };

    const jobList = () => {
        return jobs.map((_, index) => <JobList key={index} job={jobs[index]} />);
    };

    useEffect(() => {
        // Set a timer to change the state after 3000ms (3 seconds)
        const timer = setTimeout(() => {
            setShouldRender(true);
        }, 100);

        // Clean up the timer if the component unmounts before the delay finishes
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {shouldRender && (
                <PageBox>
                    {/* Page contents */}
                    <div className={`${styles.content}`}>
                        <div className={`${styles.top} `}>
                            {/* Page title */}
                            <PageTitle size1={75} title="Resume" className={`${styles.title} `} />
                            <a href={resumeUrl} download="Segun-O-Resume.docx">
                                <JitterDiv className={`${styles.downloadBox} btn-grow`}>
                                    <div className={`${styles.download} crt`}>
                                        <span>Download resume (DOCX)</span>
                                    </div>
                                    <img src={images[`Download2.png`]} className={`${styles.icon} glitch-image`} />
                                </JitterDiv>
                            </a>
                        </div>

                        {/* Skills */}
                        <SectionTab title="Technical Proficiencies">
                            <div className={`${styles.toolSet} `}>
                                <div className={`${styles.toolList} `}>
                                    {" "}
                                    <JitterDiv className={`${styles.toolCategory} `}>Design and Print Tools </JitterDiv>
                                    <div className={`${styles.toolIconContainer} `}>{toolType("Design")}</div>
                                    <JitterDiv className={`${styles.toolCategory} `}>Generative AI Tools</JitterDiv>
                                    <div className={`${styles.toolIconContainer} `}>{toolType("AI")}</div>
                                    <JitterDiv className={`${styles.toolCategory} `}>
                                        Marketing and Web Design
                                    </JitterDiv>
                                    <div className={`${styles.toolIconContainer} `}>{toolType("Web")}</div>
                                </div>
                                <div className={`${styles.toolDisplay} `}>
                                    {currentTool && <ToolBox tool={currentTool} />}
                                </div>
                            </div>
                        </SectionTab>

                        {/* Education */}
                        <SectionTab title="Education">
                            <div className={`${styles.education} `}>
                                <SchoolList schools={schools} />
                            </div>
                        </SectionTab>

                        <SectionTab title="Job Experience">
                            <div className={`${styles.experience}`}>{jobList()}</div>
                        </SectionTab>
                    </div>
                </PageBox>
            )}
        </>
    );
}

// export default Resume;
