import React, {
    useState,
    useEffect,
    type CSSProperties,
    type ComponentPropsWithRef,
    type ReactNode,
    Children,
} from "react";
import axios from "axios";
import styles from "./JobList.module.scss";
import { motion } from "motion/react";
import TextType from "../../../components/TypeText/TextType";
import "vault66-crt-effect/style.css";
import type { Tool, School, Job, Contact, Gallery, Project } from "../../../interfaces/Types";
import JitterDiv from "../../../components/JitterDiv/JitterDiv";

interface JobListProps extends ComponentPropsWithRef<"div"> {
    job: Job;
}

export default function JobList({ job }: JobListProps) {
    const [visible, setVisible] = useState(true);

    const imageModules = import.meta.glob("../../../icons/Resume/*.{png,jpg,jpeg,svg}", { eager: true });
    // Map them into a clean key-value object (e.g., { "logo.png": "/src/assets/images/logo.png" })
    const images = Object.fromEntries(
        Object.entries(imageModules).map(([path, module]) => {
            const fileName = path.split("/").pop();
            return [fileName, (module as any).default];
        }),
    );

    const jobExpand = (
        <JitterDiv className={`${styles.expand}`}>
            <img
                src={visible ? images[`BlueCross.png`] : images[`BlueDash.png`]}
                className={`btn-grow`}
                onClick={() => setVisible(!visible)}
            />
        </JitterDiv>
    );

    return (
        <>
            <div className={`${styles.job}`}>
                <div className={`${styles.company}`}>
                    {jobExpand}
                    <div className={`${styles.companyName}`}>
                        <JitterDiv>
                            {job.company} {" - "} {job.location}
                        </JitterDiv>
                    </div>
                </div>
                <div className={`${styles.date}`}>
                    <JitterDiv>
                        {job.start} {" - "}
                        {job.end}
                    </JitterDiv>
                </div>
            </div>
            {visible && (
                <div className={`${styles.title}`}>
                    <JitterDiv>{job.title}</JitterDiv>
                    {/* Roles */}
                    <div className={`${styles.roles}`}>
                        <ul>
                            {job.roles.map((role, index2) => (
                                <li key={index2}>
                                    <JitterDiv scale={0.5}>{role}</JitterDiv>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
}
