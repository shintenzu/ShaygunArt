import styles from "./PageBox.module.scss";
import CRTEffect from "vault66-crt-effect";
import type { ComponentPropsWithRef } from "react";
import { usePower } from "../../hooks/PowerContext";

interface PageBoxProps extends ComponentPropsWithRef<"div"> {
    children?: React.ReactNode;
    boxHeight?: string;
}

function PageBox({ children, boxHeight = "auto", className = "", style, ...rest }: PageBoxProps) {
    const { power } = usePower();
    const powerClass = power === "off" ? "shrunk" : power === "on" ? "expand" : "";
    return (
        <div className={`${styles.PageBox} ${powerClass}`}>
            <CRTEffect
                theme="custom"
                fill={true}
                glitchChromatic={true}
                enabled={true}
                enableNoise={true}
                enableSweep={true}
                enableGlow={true}
                enableEdgeGlow={true}
                enableFlicker={true}
                enableGlitch={false}
                enableVignette={true}
                enableScanlines={true}
                enableCurvature={false}
                enableGlare={false}
                tintText={true}
                textColor="#c09215"
                glowColor="#0e6a6d27"
                edgeGlowColor="#64555079"
                sweepColor="#11528f59"
                scanlineColor="#5e5050"
                edgeGlowSize={20}
                flickerIntensity={0.1}
                flickerSpeed={0.1}
                glitchSpeed={0.8}
                glitchIntensity={0.1}
                vignetteIntensity={0.3}
                curvatureIntensity={0.9}
                glareIntensity={0.1}
                noiseOpacity={0.15}
                sweepDuration={7}
                sweepThickness={20}
                sweepStyle="soft"
                scanlineOpacity={0.1}
                scanlineThickness={2}
                scanlineGap={4}
                scanlineOrientation="horizontal"
            >
                <div className={`${styles.home} ${className}`} style={{ height: `${boxHeight}` }} {...rest}>
                    {children}
                </div>
            </CRTEffect>
        </div>
    );
}

export default PageBox;
