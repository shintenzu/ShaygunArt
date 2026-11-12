import styles from "./CyberBtn.module.scss";
import { motion } from "motion/react";
import JitterDiv from "../../components/JitterDiv/JitterDiv";

interface CyberBtnProps extends React.ComponentProps<"button"> {
    title: string;
    subtitle?: string;
    hue?: number;
    tag?: string;
    page?: string;
    onClick?: () => void;
}

export default function CyberBtn({
    title,
    subtitle = "",
    hue = 0,
    tag = "",
    page = "/",
    type = "button",
    onClick,
    ...props
}: CyberBtnProps) {
    //const navigate = useNavigate();
    return (
        <>
            <JitterDiv className={`${styles["jitter"]}`}>
                <motion.button
                    type={type}
                    onClick={onClick}
                    className={`${styles["cybr-btn"]}`}
                    style={
                        {
                            "--primary-hue": hue,
                        } as React.CSSProperties
                    }
                    whileHover={{
                        scale: 1.1,
                        y: 1,
                    }}
                    whileTap={{
                        scale: 0.9,
                        rotate: 2,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.02,
                        ease: "easeIn",
                    }}
                >
                    {title}
                    <span aria-hidden></span>
                    <span aria-hidden className={`${styles["cybr-btn__glitch"]}`}>
                        {subtitle}
                    </span>
                    <span aria-hidden className={`${styles["cybr-btn__tag"]}`}>
                        {tag}
                    </span>
                </motion.button>
            </JitterDiv>
        </>
    );
}
