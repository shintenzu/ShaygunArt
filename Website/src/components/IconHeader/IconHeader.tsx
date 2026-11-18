import styles from "./IconHeader.module.scss";
import { motion } from "motion/react";
import JitterDiv from "../../components/JitterDiv/JitterDiv";
import { useGlitch } from "react-powerglitch";

interface IconHeaderProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    title: string;
    icon?: string;
    delayAdd?: number;
    pad?: number;
    hcolor?: string;
    glitch?: boolean;
    animate?: boolean;
}

function IconHeader({
    title,
    icon = "",
    delayAdd = 0,
    pad = 0,
    hcolor = "#FFFFFF",
    glitch = true,
    className = "",
    animate = true,
}: IconHeaderProps) {
    const clickGlitch = useGlitch({
        playMode: "hover",
        //playMode: "hover",
        optimizeSeo: true,
        createContainers: true,
        hideOverflow: false,
        timing: {
            duration: 500,
            iterations: 1,
            easing: "ease-in",
        },
        glitchTimeSpan: {
            start: 0.0,
            end: 1,
        },
        shake: {
            velocity: 15,
            amplitudeX: 0.2,
            amplitudeY: 0.2,
        },
        slice: {
            count: 6,
            velocity: 15,
            minHeight: 0.02,
            maxHeight: 0.15,
            hueRotate: true,
            cssFilters: "blur(5px) brightness(0.8)",
        },
        pulse: false,
    });

    const Header = () => {
        return (
            <>
                {icon !== "" && (
                    <span
                        className={`${styles.sub} ${glitch ? "" : "btn-grow"}`}
                        ref={glitch ? clickGlitch.ref : undefined}
                    >
                        <img src={icon} className={`${styles.sIcon} `} />
                        {title}
                    </span>
                )}
                {icon == "" && <span className={`${styles.sub} `}>{title}</span>}
            </>
        );
    };

    return (
        <JitterDiv className={`${styles.container} ${className}`}>
            <motion.div
                className={`${styles.skill1}`}
                style={{ color: `${hcolor}`, paddingLeft: `${pad}%` }}
                initial={
                    animate
                        ? {
                              opacity: 0,
                              x: -500,
                          }
                        : false
                }
                animate={animate ? { opacity: 1, x: 0 } : false}
                transition={{
                    delay: delayAdd,
                    duration: 0.5,
                    ease: "anticipate",
                    type: "spring",
                }}
            >
                {Header()}
            </motion.div>
        </JitterDiv>
    );
}

export default IconHeader;
