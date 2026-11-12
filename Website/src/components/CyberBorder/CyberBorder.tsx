import { Children, type ComponentPropsWithoutRef, type ComponentPropsWithRef } from "react";
import styles from "./CyberBorder.module.scss";
import { motion } from "motion/react";
import { useJitter } from "../../hooks/useJitter";
import CRTBox from "../CRTBox/CRTBox";
import JitterDiv from "../JitterDiv/JitterDiv";
import plus from "../../images/plus.png";
import bg from "../../images/HomeSplash.png";
import project from "../../icons/Resume/Project.png";
import wip from "../../icons/Resume/Process.png";
import solo from "../../icons/Resume/Solo.png";

type ProjectType = "Project" | "Process" | "Solo" | "";

interface CyberBorderProps extends ComponentPropsWithRef<"div"> {
    className?: string;
    color1?: string;
    color2?: string;
    scale?: number;
    id?: string;
    caption?: string;
    children?: React.ReactNode;
    icon?: string;
    onClick?: () => void;
    type?: ProjectType;
}

function CyberBorder({
    className = "",
    children,
    //ref = "",
    style,
    scale = 1,
    color1 = "#FFFFFF00",
    color2 = "#ffffff00",
    caption = "",
    id = "",
    icon = "Project.png",
    type = "",
    onClick,
    ...rest
}: CyberBorderProps) {
    const CRT_PROPS = {
        theme: "custom",
        enabled: true,
        enableScanlines: true,
        enableVignette: true,
        enableEdgeGlow: true,
        enableGlow: false,
        enableNoise: false,
        enableSweep: false,
        enableFlicker: false,
        enableGlitch: false,
        enableCurvature: false,
        enableGlare: false,
        tintText: false,
        scanlineColor: "#5e5050",
        scanlineOpacity: 0.1,
        scanlineThickness: 2,
        scanlineGap: 4,
        scanlineOrientation: "horizontal",
        vignetteIntensity: 0.5,
        edgeGlowColor: "#64555079",
        edgeGlowSize: 20,
    } as const;

    const jitter = useJitter(scale);
    const imageModules = import.meta.glob("../../icons/Resume/*.{png,jpg,jpeg,svg}", { eager: true });

    // Map them into a clean key-value object (e.g., { "logo.png": "/src/assets/images/logo.png" })
    const images = Object.fromEntries(
        Object.entries(imageModules).map(([path, module]) => {
            const fileName = path.split("/").pop();
            return [fileName, (module as any).default];
        }),
    );
    return (
        // The JitterDiv IS the card: it keeps the positioning, ring and
        // drag logic. The CRT effect goes INSIDE it, around the content.
        <JitterDiv
            onClick={onClick}
            data-card
            //data-hidden={opacity === 0 || undefined}
            className={`${styles.card} ${styles.active} ${className}`}
            //style={cardStyle}
            //aria-hidden={opacity === 0}
            //data-offset={offset}
            //style={{ "--background": `url(${icon})` }}
            style={{
                backgroundImage: `url(${bg})`,
                backgroundSize: "cover",
                opacity: 1,
                //backgroundColor: "#000000",
                //backgroundBlendMode: "lighten",
            }}
        >
            <CRTBox {...CRT_PROPS} className={`${styles.crt} ${styles.crtOuter}  `} innerClassName={styles.crtInner}>
                {caption != "" && (
                    <div className={styles.caption}>
                        {/* <div className={styles.captionLeft}>
                            <div>Title:</div>
                            <div>Year:</div>
                            <div>Medium:</div>
                        </div>
                        <div className={styles.captionRight}>
                            <div>This is some awesome</div>
                            <div>2015</div>
                            <div>Digital Painting</div>
                        </div> */}
                        <div className={styles.captionLeft}>
                            <div>{caption}</div>
                        </div>
                    </div>
                )}

                {id != "" && (
                    <div className={styles.counter}>
                        {/* {id} */}
                        {type == "Project" && <img src={project} />}
                        {type == "Process" && <img src={wip} />}
                        {type == "Solo" && <img src={solo} />}
                        {type == "" && <img src={solo} />}
                    </div>
                )}
                {children}
            </CRTBox>
        </JitterDiv>
    );
}

export default CyberBorder;
