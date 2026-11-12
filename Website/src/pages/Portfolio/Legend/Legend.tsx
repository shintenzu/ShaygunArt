import styles from "./Legend.module.scss";
import "vault66-crt-effect/style.css";
import JitterDiv from "../../../components/JitterDiv/JitterDiv";
import project from "../../../icons/Resume/Project.png";
import process from "../../../icons/Resume/Process.png";
import solo from "../../../icons/Resume/Solo.png";
import CRTEffect from "vault66-crt-effect";

interface LegendProps {}

export default function Legend({}: LegendProps) {
    return (
        <JitterDiv className={`${styles.legend}`} scale={1}>
            <CRTEffect
                theme="custom"
                fill={true}
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
                glitchIntensity={0.1}
            >
                <div className={`${styles.legendBox}`}>
                    <JitterDiv className={`${styles.title}`}>Legend</JitterDiv>

                    <div className={`${styles.keyContainer}`}>
                        <div className={`${styles.keyIcon}`}>
                            <JitterDiv className={`${styles.img} btn-grow`}>
                                <img src={project} />
                            </JitterDiv>
                            <JitterDiv className={`${styles.img} btn-grow`}>
                                <img src={process} />
                            </JitterDiv>
                            <JitterDiv className={`${styles.img} btn-grow`}>
                                <img src={solo} />
                            </JitterDiv>
                        </div>
                        <div className={`${styles.keyDesc}`}>
                            {" "}
                            <JitterDiv>= Project</JitterDiv>
                            <JitterDiv>= Wip</JitterDiv>
                            <JitterDiv>= Single</JitterDiv>
                        </div>
                    </div>
                </div>
            </CRTEffect>
        </JitterDiv>
    );
}
