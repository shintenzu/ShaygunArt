import { useState, type CSSProperties } from "react";

const rand = (min: number, max: number) => min + Math.random() * (max - min);
const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export function useJitter(scale: number = 1): CSSProperties {
    const [style] = useState(() => {
        const dur = rand(2.2 / scale, 4.6 / scale);
        return {
            "--dur": `${dur.toFixed(3)}s`,
            "--delay": `${(-rand(0, dur)).toFixed(3)}s`,
            "--dir": pick(["normal", "reverse", "alternate", "alternate-reverse"]),
            "--amp": `${rand(0.2 * scale, 0.45 * scale).toFixed(2)}px`,
            "--rot": `${rand(0.02 * scale, 0.06 * scale).toFixed(3)}deg`,
        } as CSSProperties;
    });
    return style;
}
