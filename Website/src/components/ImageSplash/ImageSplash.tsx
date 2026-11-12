import styles from "./ImageSplash.module.scss";
import { motion } from "motion/react";
import JitterDiv from "../../components/JitterDiv/JitterDiv";
import CRTEffect from "vault66-crt-effect";
import { useGlitch } from "react-powerglitch";

interface ImageSplashProps {
    src?: string;
    src2?: string;
    src3?: string;
    width?: number;
    height?: string;
}

function ImageSplash({ src = "", src2 = "", src3 = "", width = 60, height = "80dvh" }: ImageSplashProps) {
    const glitch = useGlitch({
        playMode: "always",
        //playMode: "hover",
        optimizeSeo: true,
        createContainers: true,
        hideOverflow: false,
        timing: {
            duration: 4000,
            iterations: Infinity,
            easing: "linear",
        },
        glitchTimeSpan: {
            start: 0.05,
            end: 0.15,
        },
        shake: {
            velocity: 25,
            amplitudeX: 0.1,
            amplitudeY: 0.1,
        },
        slice: {
            count: 4,
            velocity: 25,
            minHeight: 0.02,
            maxHeight: 0.15,
            hueRotate: true,
            cssFilters: "blur(5px) brightness(0.8)",
        },
        pulse: false,
    });

    const glitch2 = useGlitch({
        playMode: "always",
        //playMode: "hover",
        optimizeSeo: true,
        createContainers: true,
        hideOverflow: false,
        timing: {
            duration: 3350,
            iterations: Infinity,
            easing: "linear",
        },
        glitchTimeSpan: {
            start: 0.1,
            end: 0.3,
        },
        shake: {
            velocity: 20,
            amplitudeX: 0.2,
            amplitudeY: 0.1,
        },
        slice: {
            count: 5,
            velocity: 20,
            minHeight: 0.015,
            maxHeight: 0.2,
            hueRotate: true,
            cssFilters: "blur(5px) brightness(0.8)",
        },
        pulse: false,
    });

    const glitch3 = useGlitch({
        playMode: "always",
        //playMode: "hover",
        optimizeSeo: true,
        createContainers: true,
        hideOverflow: false,
        timing: {
            duration: 7000,
            iterations: Infinity,
            easing: "linear",
        },
        glitchTimeSpan: {
            start: 0.4,
            end: 0.7,
        },
        shake: {
            velocity: 10,
            amplitudeX: 0.2,
            amplitudeY: 0.1,
        },
        slice: {
            count: 5,
            velocity: 10,
            minHeight: 0.015,
            maxHeight: 0.2,
            hueRotate: true,
            cssFilters: "blur(5px) brightness(0.8)",
        },
        pulse: false,
    });

    return (
        <div className={`${styles.splash} `} style={{ flex: `0 0 ${width}%` }}>
            <CRTEffect
                theme="custom"
                fill={false}
                glitchChromatic={true}
                enabled={false}
                enableNoise={false}
                enableSweep={false}
                enableGlow={true}
                enableEdgeGlow={false}
                enableFlicker={true}
                enableGlitch={true}
                enableVignette={false}
                enableScanlines={false}
                enableCurvature={false}
                enableGlare={false}
                tintText={true}
                glowColor="#0e6a6d62"
                flickerIntensity={0.2}
                flickerSpeed={0.1}
                glitchSpeed={0.8}
                glitchIntensity={0.4}
            >
                {src !== "" && (
                    <JitterDiv scale={4} className={`${styles.base} `}>
                        <img
                            src={src}
                            className={`${styles.image} `}
                            style={{ height: `${height}` }}
                            ref={glitch.ref}
                        />
                    </JitterDiv>
                )}
                {src2 !== "" && (
                    <JitterDiv scale={4} className={`${styles.overlay} `}>
                        <img
                            src={src2}
                            className={`${styles.image2} `}
                            style={{ height: `${height}` }}
                            ref={glitch2.ref}
                        />
                    </JitterDiv>
                )}
                {src2 !== "" && (
                    <JitterDiv scale={4} className={`${styles.overlay} `}>
                        <img
                            src={src3}
                            className={`${styles.image2} `}
                            style={{ height: `${height}` }}
                            ref={glitch3.ref}
                        />
                    </JitterDiv>
                )}
            </CRTEffect>
        </div>
    );
}

export default ImageSplash;
