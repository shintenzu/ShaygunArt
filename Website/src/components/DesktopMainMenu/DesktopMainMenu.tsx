import styles from "./DesktopMainMenu.module.scss";
import { motion } from "motion/react";
import MenuButton from "./MenuButton/MenuButton";
import logo from "../../images/TransparentLogo.png";
import JitterDiv from "../../components/JitterDiv/JitterDiv";
import type { PowerState } from "../../interfaces/Types";
import { usePower } from "../../hooks/PowerContext";
import { useNavigate, useLocation } from "react-router";

interface DesktopMainMenuProps {
    float?: boolean;
}

export default function DesktopMainMenu({ float = false }: DesktopMainMenuProps) {
    const navigate = useNavigate();
    const { setPower } = usePower();
    const location = useLocation();
    const active = "#00defe";
    const setFloat = float === true ? styles.float : "";

    const go = (path: string) => {
        setPower("off"); // TV shuts off
        setTimeout(() => {
            navigate(path); // swap the page
            setPower("on"); // TV turns back on
        }, 200);
    };
    return (
        <div className={`${styles.DesktopMainMenu} crt ${setFloat}`}>
            <JitterDiv className={`${styles.logo}`} scale={0.5}>
                <img src={logo} className={`${styles.image} glitch-image btn-grow`} onClick={() => go("/")} />
            </JitterDiv>
            <div className={`${styles.logo}`}>
                <div className={`${styles.title} `}>
                    <div className={`${styles.titleBox} `}>
                        <div className={`${styles.top} `}>Shaygun</div>
                        <div className={`${styles.bottom} `}>
                            Art <span className={`${styles.gold} `}>and</span> Design
                        </div>
                    </div>
                </div>
            </div>

            <motion.div
                className={`${styles.content} `}
                initial={{ opacity: 0.1, x: 500 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                    duration: 1,
                    ease: "anticipate",
                }}
            >
                {location.pathname != "/" ? (
                    <MenuButton name="Home" onClick={() => go("/")} />
                ) : (
                    <MenuButton name="Home" style={{ color: `${active}` }} />
                )}
                {location.pathname != "/About" ? (
                    <MenuButton name="About" onClick={() => go("/About")} />
                ) : (
                    <MenuButton name="About" style={{ color: `${active}` }} />
                )}
                {location.pathname != "/Resume" ? (
                    <MenuButton name="Resume" onClick={() => go("/Resume")} />
                ) : (
                    <MenuButton name="Resume" style={{ color: `${active}` }} />
                )}
                {location.pathname != "/Portfolio" ? (
                    <MenuButton name="Portfolio" onClick={() => go("/Portfolio")} />
                ) : (
                    <MenuButton name="Portfolio" style={{ color: `${active}` }} />
                )}

                {location.pathname != "/Contact" ? (
                    <MenuButton name="Contact" onClick={() => go("/Contact")} />
                ) : (
                    <MenuButton name="Contact" style={{ color: `${active}` }} />
                )}
            </motion.div>
        </div>
    );
}
