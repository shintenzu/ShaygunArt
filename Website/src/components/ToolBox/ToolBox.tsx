import styles from "./ToolBox.module.scss";
import { motion } from "motion/react";
import CyberBtn from "../CyberBtn/CyberBtn";
import JitterDiv from "../JitterDiv/JitterDiv";
import { useScrollFade } from "../../hooks/useScrollFade";
import plus from "../../images/plus.png";
import starF from "../../icons/Resume/StarFull.png";
import starH from "../../icons/Resume/StarHalf.png";
import type { Tool } from "../../interfaces/Types";
import { Fragment } from "react/jsx-runtime";

interface ToolBoxProps {
    tool: Tool;
}

function ToolBox({ tool }: ToolBoxProps) {
    const fullStars = Math.floor(tool.exp / 1);
    const halfStars = tool.exp % 1;

    const fullStarsP = Math.floor(tool.pref / 1);
    const halfStarsP = tool.pref % 1;

    const fStars = (
        <JitterDiv>
            <img src={starF} className={`${styles.stars}  btn-grow`} />
        </JitterDiv>
    );
    const hStars = (
        <JitterDiv>
            <img src={starF} className={`${styles.stars}  btn-grow`} />
        </JitterDiv>
    );

    const imageModules = import.meta.glob("../../icons/Resume/*.{png,jpg,jpeg,svg}", { eager: true });

    // Map them into a clean key-value object (e.g., { "logo.png": "/src/assets/images/logo.png" })
    const images = Object.fromEntries(
        Object.entries(imageModules).map(([path, module]) => {
            const fileName = path.split("/").pop();
            return [fileName, (module as any).default];
        }),
    );

    //const stars = [];
    // creating elements in a for loop
    // for (let i = 0; i < exp; i++) {
    //     stars.push(<img src={plus} className={`${styles.stars}  btn-grow`} />);
    // }

    const ref = useScrollFade<HTMLDivElement>(20, 30);
    return (
        <JitterDiv className={`${styles.ToolBox} `} scale={0.25}>
            <JitterDiv className={`${styles.formTitle} `}>{tool.name}</JitterDiv>

            <div className={`${styles.details} `}>
                <JitterDiv className={`${styles.toolIcon} `}>
                    <img src={images[`${tool.icon}`]} className={`${styles.imgBox} grow`} />
                </JitterDiv>
                <div className={`${styles.toolDetails} `}>
                    <div className={`${styles.sender} `}>
                        <div className={`${styles.inputLabel} `}>
                            <JitterDiv className={`${styles.label} `}>Experience:</JitterDiv>
                            <JitterDiv className={`${styles.label} `}>Preference:</JitterDiv>
                        </div>
                        <div className={`${styles.inputs} `}>
                            <div className={`${styles.healthbarContainer} `}>
                                <div className={`${styles.healthbar} `}>
                                    {Array.from({ length: fullStars }).map((_, index) => (
                                        <div className={`${styles.tick} `}>{index + 1}</div>
                                    ))}
                                    {halfStars != 0 && <>{hStars}</>}
                                </div>
                            </div>
                            <div className={`${styles.starContainer} `}>
                                {Array.from({ length: fullStarsP }).map((_, index) => (
                                    <Fragment key={index}>{fStars}</Fragment>
                                ))}

                                {halfStarsP != 0 && <>{hStars}</>}
                            </div>
                        </div>
                        <div className={`${styles.inputLabel} `}>
                            <JitterDiv className={`${styles.numbers} `}>
                                ({tool.exp < 10 ? "0" : ""}
                                {tool.exp} years){" "}
                            </JitterDiv>
                            <JitterDiv className={`${styles.label} `}>({tool.pref} / 5) </JitterDiv>
                        </div>
                    </div>
                    <JitterDiv className={`${styles.messageLabel} `}>Description:</JitterDiv>
                    <div className={`${styles.messageBox} `}>
                        <JitterDiv ref={ref} className={`scrollFade ${styles.textarea}`}>
                            {tool.desc}
                        </JitterDiv>
                    </div>
                </div>
            </div>
        </JitterDiv>
    );
}

export default ToolBox;
