import styles from "./PageTitle.module.scss";
import { motion } from "motion/react";
import CRTEffect from "vault66-crt-effect";
import StrokeText from "../../components/StrokeText/StrokeText";
import type { ComponentPropsWithoutRef } from "react";

interface PageTitleProps extends ComponentPropsWithoutRef<"div"> {
    title: string;
    subtitle?: string;
    size1?: number;
    size2?: number;
    drawTime?: number;
    delay?: number;
}

function PageTitle({
    className = "",
    style,
    title,
    subtitle = "",
    size1 = 65,
    size2 = size1 * 0.577,
    drawTime = 0.8,
    delay = 0,
    ...rest
}: PageTitleProps) {
    return (
        <div className={`jitter ${className}`} style={{ ...style }} {...rest}>
            <CRTEffect
                theme="custom"
                fill={false}
                glitchChromatic={true}
                enabled={true}
                enableNoise={false}
                enableSweep={false}
                enableGlow={true}
                enableEdgeGlow={false}
                enableFlicker={false}
                enableGlitch={true}
                enableVignette={false}
                enableScanlines={false}
                enableCurvature={false}
                enableGlare={false}
                tintText={true}
                glowColor="#0e6a6d62"
                flickerIntensity={0.1}
                flickerSpeed={0.1}
                glitchSpeed={0.6}
                glitchIntensity={0.2}
                //textColor="#c09215"
                //edgeGlowColor="#64555079"
                //sweepColor="#11528f59"
                //scanlineColor="#5e5050"
                //edgeGlowSize={20}
                //vignetteIntensity={0.9}
                //curvatureIntensity={0.9}
                //glareIntensity={0.1}
                //noiseOpacity={0.15}
                //sweepDuration={7}
                //sweepThickness={20}
                //sweepStyle="soft"
                //scanlineOpacity={0.1}
                //scanlineThickness={2}
                //scanlineGap={4}
                //scanlineOrientation="horizontal"
            >
                <StrokeText
                    text={title}
                    strokeColor="#4197a9"
                    fillColor="#d6dadd"
                    strokeWidth={1.4}
                    drawDuration={drawTime}
                    fillDelay={delay}
                    stagger={0.06}
                    ease="power2.out"
                    trigger="mount"
                    fillMode="wipe"
                    fontSize={size1}
                    fontWeight={800}
                    letterSpacing={2}
                    reverse={false}
                    className=""
                />

                {subtitle !== "" && (
                    <StrokeText
                        text={subtitle}
                        strokeColor="#4197a9"
                        fillColor="#f2000d"
                        strokeWidth={1.4}
                        drawDuration={drawTime}
                        fillDelay={delay}
                        stagger={0.06}
                        ease="power2.out"
                        trigger="mount"
                        fillMode="wipe"
                        fontSize={size2}
                        fontWeight={800}
                        letterSpacing={2}
                        reverse={false}
                        className=""
                    />
                )}
            </CRTEffect>
        </div>
    );
}

export default PageTitle;
