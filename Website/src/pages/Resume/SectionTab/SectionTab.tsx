import { useState, type ComponentPropsWithRef, type ReactNode } from "react";
import styles from "./SectionTab.module.scss";

import "vault66-crt-effect/style.css";
import JitterDiv from "../../../components/JitterDiv/JitterDiv";
//import type { Tool, School, Job, Contact, Gallery, Project } from "../../../interfaces/Types";

interface SectionTabProps extends ComponentPropsWithRef<"div"> {
    children?: ReactNode;
    title?: string;
}

export default function SectionTab({ children, title = "" }: SectionTabProps) {
    const [visibleP, setVisibleP] = useState(true);
    const imageModules = import.meta.glob("../../../icons/Resume/*.{png,jpg,jpeg,svg}", { eager: true });
    // Map them into a clean key-value object (e.g., { "logo.png": "/src/assets/images/logo.png" })
    const images = Object.fromEntries(
        Object.entries(imageModules).map(([path, module]) => {
            const fileName = path.split("/").pop();
            return [fileName, (module as any).default];
        }),
    );

    // const toggleIndex = (index: number) => {
    //     setVisible((show) => show.map((item, idx) => (index === idx ? !item : item)));
    // };

    const bPlusExpand = (
        // <img src={images[`BluePlus.png`]} className={`${styles.expand}  btn-grow`} onClick={() => toggleIndex(0)} />
        <JitterDiv className={`${styles.expand}  btn-grow`}>
            <img
                src={visibleP ? images[`BluePlus.png`] : images[`BlueMinus.png`]}
                onClick={() => setVisibleP(!visibleP)}
            />
        </JitterDiv>
    );
    return (
        <div className={`${styles.header} `}>
            <div className={`${styles.sectionHead} `}>
                {bPlusExpand}
                <JitterDiv className={`${styles.title}`}>{title}</JitterDiv>
            </div>

            {visibleP && children}
        </div>
    );
}
