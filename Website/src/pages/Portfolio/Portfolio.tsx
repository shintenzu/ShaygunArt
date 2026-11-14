import styles from "./Portfolio.module.scss";
import { useState, useEffect } from "react";
import "vault66-crt-effect/style.css";
import JitterDiv from "../../components/JitterDiv/JitterDiv";
import PageTitle from "../../components/PageTitle/PageTitle";
import PageBox from "../../components/PageBox/PageBox";
import CardCarousel from "../../components/Cardcarousel/CardCarousel";
import CyberBorder from "../../components/CyberBorder/CyberBorder";
import { usePower } from "../../hooks/PowerContext";
import { useNavigate } from "react-router";
//import axios from "axios";
import Legend from "./Legend/Legend";

interface PortfolioProps {}

export default function Portfolio({}: PortfolioProps) {
    const navigate = useNavigate();
    const { setPower } = usePower();

    const go = (path: string) => {
        setPower("off"); // TV shuts off
        setTimeout(() => {
            navigate(path); // swap the page
            setPower("on"); // TV turns back on
        }, 200);
    };
    // const imageModules = import.meta.glob("../../icons/Resume/*.{png,jpg,jpeg,svg}", { eager: true });

    // // Map them into a clean key-value object (e.g., { "logo.png": "/src/assets/images/logo.png" })
    // const images = Object.fromEntries(
    //     Object.entries(imageModules).map(([path, module]) => {
    //         const fileName = path.split("/").pop();
    //         return [fileName, (module as any).default];
    //     }),
    // );

    // Module level: runs once, so the array identity never changes between renders
    const galleryModules = import.meta.glob<string>("../../Gallery/**/*.{png,jpg,jpeg,svg}", {
        eager: true,
        query: "?url",
        import: "default",
    });

    const BASE_IMAGES = Object.entries(galleryModules)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([, url]) => url); // already an array of URL strings

    // Repeat the images until there are enough cards to fill the loop (~14)
    const MIN_CARDS = 14;
    const gallery = Array.from(
        { length: Math.max(MIN_CARDS, BASE_IMAGES.length) },
        (_, i) => BASE_IMAGES[i % BASE_IMAGES.length],
    );

    const items = gallery.map((src) => (
        <div
            style={{
                backgroundImage: `url("${src}")`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
            }}
        />
    ));

    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        // Set a timer to change the state after 3000ms (3 seconds)
        const timer = setTimeout(() => {
            setShouldRender(true);
        }, 10);

        // Clean up the timer if the component unmounts before the delay finishes
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {shouldRender && (
                <>
                    <Legend />
                    <PageBox>
                        <div className={`${styles.content}`}>
                            <div className={`${styles.top} `}>
                                {/* Page title */}
                                <PageTitle size1={60} title="Portfolio" className={`${styles.title} `} />
                            </div>

                            {/* Skills */}
                            <div className={`${styles.header} `}>
                                <JitterDiv className={`${styles.sectionHead} `}>
                                    <span className={`${styles.title}`}>Marketing Collaterol</span>
                                </JitterDiv>
                                <div className={`${styles.categories}`}>
                                    <CyberBorder
                                        id="yes"
                                        caption="CAC Specialty Event Collaterol Collection"
                                        className={`${styles.catBox} btn-grow`}
                                        onClick={() => go("/Project")}
                                        type="Project"
                                    >
                                        CAC Specialty Events
                                    </CyberBorder>
                                    <CyberBorder
                                        id="yes"
                                        caption="CAC Specialty Benefits Collateral and Designs"
                                        className={`${styles.catBox} btn-grow`}
                                        onClick={() => go("/Project")}
                                        type="Project"
                                    >
                                        CAC Specilty Benefits
                                    </CyberBorder>
                                    <CyberBorder
                                        id="yes"
                                        caption="Miscellaneous CAC Specialty Projects"
                                        className={`${styles.catBox} btn-grow`}
                                        onClick={() => go("/Project")}
                                        type="Process"
                                    >
                                        Cac Specialty Misc
                                    </CyberBorder>
                                </div>
                            </div>

                            {/* Education */}
                            <div className={`${styles.header} `}>
                                <JitterDiv className={`${styles.sectionHead} `}>
                                    <span className={`${styles.title}`}>Web Design</span>
                                </JitterDiv>
                                <div className={`${styles.categories}`}>
                                    <CyberBorder
                                        id="yes"
                                        caption="Personal Portfolio Website"
                                        className={`${styles.catBox} btn-grow`}
                                        onClick={() => go("/Project")}
                                        type="Project"
                                    >
                                        Shaygun Art and Design
                                    </CyberBorder>
                                    <CyberBorder
                                        id="yes"
                                        caption="CAC Specialty Subsidiary Website"
                                        className={`${styles.catBox} btn-grow`}
                                        onClick={() => go("/Project")}
                                        type="Process"
                                    >
                                        Silvercliff Partners
                                    </CyberBorder>
                                    <CyberBorder
                                        id="yes"
                                        caption="Final Senior Project"
                                        className={`${styles.catBox} btn-grow`}
                                        onClick={() => go("/Project")}
                                        type="Process"
                                    >
                                        Project Gearturn
                                    </CyberBorder>
                                </div>
                            </div>

                            <div className={`${styles.header} `}>
                                <JitterDiv className={`${styles.sectionHead} `}>
                                    <span className={`${styles.title}`}>Visual Illustrations</span>
                                </JitterDiv>
                                <div className={`${styles.categories}`}>
                                    {/* <Slider
                                            images={gallery}
                                            spacing={0.22}
                                            spread={180}
                                            edgeScale={0.6}
                                        /> */}
                                    <CardCarousel items={items} visible={5} spread={140} edgeScale={0.6} />
                                </div>
                            </div>
                        </div>
                    </PageBox>
                </>
            )}
        </>
    );
}
