import type { CSSProperties, ReactNode } from "react";
import { computeCrt } from "vault66-crt-effect/core";
import "vault66-crt-effect/style.css";

// Reuse the library's own option types so every prop (preset, enableGlow, ...) still works
type CRTOptions = Parameters<typeof computeCrt>[0];

export type CRTBoxProps = CRTOptions & {
    children: ReactNode;
    /** Added to the outer wrapper element (the one the library styles) */
    className?: string;
    /** Added to the element that directly holds your content */
    innerClassName?: string;
    /** Merged into the outer wrapper's inline style */
    style?: CSSProperties;
};

const join = (...parts: Array<string | undefined | false>) =>
    parts.filter(Boolean).join(" ");

/**
 * Drop-in replacement for <CRTEffect> that also accepts className / style.
 * The library's React component is a thin renderer around computeCrt(),
 * so this renders the same markup and just merges in your classes.
 */
export default function CRTBox({
    children,
    className,
    innerClassName,
    style,
    ...options
}: CRTBoxProps) {
    const { enabled, wrapper, inner, overlays } = computeCrt(options);

    // Effect switched off: render the content only, but keep your class and style
    if (!enabled) {
        return className || style ? (
            <div className={className} style={style}>
                {children}
            </div>
        ) : (
            <>{children}</>
        );
    }

    return (
        <div
            className={join(wrapper.className, className)}
            style={{ ...wrapper.style, ...style } as CSSProperties}
        >
            <div
                className={join(inner.className, innerClassName)}
                style={inner.style as CSSProperties | undefined}
            >
                {children}
            </div>

            {/* one empty div per overlay layer (scanlines, glow, glare, ...) */}
            {overlays.map((cls, i) => (
                <div key={`${cls}-${i}`} className={cls} />
            ))}
        </div>
    );
}
