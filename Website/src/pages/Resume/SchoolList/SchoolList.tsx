import { type ComponentPropsWithRef } from "react";
import styles from "./SchoolList.module.scss";
import "vault66-crt-effect/style.css";
import type { School } from "../../../interfaces/Types";
import JitterDiv from "../../../components/JitterDiv/JitterDiv";

interface SchoolListProps extends ComponentPropsWithRef<"div"> {
    schools: School[];
}

export default function SchoolList({ schools }: SchoolListProps) {
    const imageModules = import.meta.glob("../../../icons/Resume/*.{png,jpg,jpeg,svg}", { eager: true });
    // Map them into a clean key-value object (e.g., { "logo.png": "/src/assets/images/logo.png" })
    const images = Object.fromEntries(
        Object.entries(imageModules).map(([path, module]) => {
            const fileName = path.split("/").pop();
            return [fileName, (module as any).default];
        }),
    );

    return schools.map((_, index) => (
        <div key={index} className={`${styles.degreeBox} `}>
            <JitterDiv className={`${styles.degreeIcon}`}>
                <img src={images[schools[index].icon]} className={`grow`} />
            </JitterDiv>
            <div className={`${styles.degree} `}>
                <JitterDiv className={`${styles.degreeTitle} `}>
                    {schools[index].degree}
                    <br /> {schools[index].major}
                </JitterDiv>
                <div className={`${styles.school} `}>
                    <JitterDiv className={`${styles.schoolIcon}`}>
                        <img className={`grow`} src={images[schools[index].logo]} />
                    </JitterDiv>

                    <div className={`${styles.schoolDetails} `}>
                        <JitterDiv className={`${styles.schoolName} `}>{schools[index].name}</JitterDiv>
                        <JitterDiv className={`${styles.schoolCity} `}>
                            <span>{schools[index].location}</span>
                            <span>|</span>
                            <span>{schools[index].period}</span>
                        </JitterDiv>
                        <JitterDiv className={`${styles.gpa} `}>{schools[index].GPA}</JitterDiv>
                    </div>
                </div>
            </div>
        </div>
    ));
}
