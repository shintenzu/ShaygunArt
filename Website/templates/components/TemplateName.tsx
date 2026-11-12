import styles from "./TemplateName.module.scss";
import { motion } from "motion/react";

interface TemplateNameProps {
    title: string;
}

function TemplateName({ title }: TemplateNameProps) {
    return (
        <div className={`${styles.TemplateName} `} data-testid="TemplateName">
            <h1>{title || "Hello from TemplateName"}</h1>
        </div>
    );
}

export default TemplateName;
