import styles from "./Return.module.scss";
import "vault66-crt-effect/style.css";
import JitterDiv from "../../components/JitterDiv/JitterDiv";
import CRTEffect from "vault66-crt-effect";
import ret from "../../icons/Resume/Return.png";
import { useNavigate, useLocation } from "react-router";
import { usePower } from "../../hooks/PowerContext";

interface ReturnProps extends React.ComponentProps<"button"> {
    title?: string;
    onClick?: () => void;
}

export default function Return({ title = "", className, children, onClick }: ReturnProps) {
    const navigate = useNavigate();
    const { setPower } = usePower();
    const location = useLocation();

    const go = (path: string) => {
        setPower("off"); // TV shuts off
        setTimeout(() => {
            navigate(path); // swap the page
            setPower("on"); // TV turns back on
        }, 200);
    };
    return (
        <JitterDiv className={`${styles.Return} btn-grow ${className}`} scale={3} onClick={onClick}>
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
                <div className={`${styles.ReturnBox}`} onClick={() => go("/Portfolio")}>
                    <img src={ret} /> {children}
                </div>
            </CRTEffect>
        </JitterDiv>
    );
}
