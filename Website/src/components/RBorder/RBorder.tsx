import styles from "./RBorder.module.scss";
import { motion } from "motion/react";

interface RBorderProps {
    title: string;
}

function RBorder({ title }: RBorderProps) {
    return (
        <div className={`${styles.RBorder} `} data-testid="RBorder">
            <h1>{title || "Hello from RBorder"}</h1>
        </div>
    );
}

export default RBorder;
