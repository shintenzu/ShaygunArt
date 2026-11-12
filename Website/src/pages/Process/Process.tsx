import styles from "./Process.module.scss";
import { motion } from "motion/react";

interface ProcessProps {
    title?: string;
}

export default function Process({ title = "" }: ProcessProps) {
    return (
        <div className={`${styles.Process} `} data-testid="Process">
            <h1>{title || "Hello from Process"}</h1>
        </div>
    );
}
