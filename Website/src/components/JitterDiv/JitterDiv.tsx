import type { ComponentPropsWithoutRef, ComponentPropsWithRef } from "react";
import { useJitter } from "../../hooks/useJitter";
import "./jitter.css";

interface JitterDivProps extends ComponentPropsWithRef<"div"> {
    scale?: number; // Or 'string' if you pass values like "1.5"
}

export default function JitterDiv({ className = "", style, scale = 1, ...rest }: JitterDivProps) {
    const jitter = useJitter(scale * 0.75);
    return <div className={`jitter ${className}`} style={{ ...jitter, ...style }} {...rest} />;
}
