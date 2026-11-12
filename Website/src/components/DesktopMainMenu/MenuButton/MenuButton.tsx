import styles from "./MenuButton.module.scss";
import { motion } from "motion/react";
import JitterDiv from "../../JitterDiv/JitterDiv";
import type { ComponentPropsWithRef } from "react";

interface MenuButtonProps extends ComponentPropsWithRef<"div"> {
    name: string;
    active?: boolean;
    onClick?: () => void;
}

export default function MenuButton({ name, active = false, onClick = () => {}, style }: MenuButtonProps) {
    const handleClick = () => {
        onClick();
    };
    return (
        <JitterDiv className={`${styles.MenuButton} crt`}>
            <motion.button
                onClick={onClick}
                style={style}
                className={`${styles.MenuButton} crt `}
                whileHover={{ scale: 1.2, y: 1, color: "#1581c0" }}
                whileTap={{ scale: 0.9, y: 0, rotate: 2, color: "#56b6ce" }}
                transition={{
                    duration: 0.02,
                    ease: "easeIn",
                    // type: "spring",
                    // stiffness: 800,
                    // damping: 20,
                }}
            >
                {name}
            </motion.button>
        </JitterDiv>
    );
}
