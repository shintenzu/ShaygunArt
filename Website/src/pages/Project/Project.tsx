import styles from "./Project.module.scss";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import "vault66-crt-effect/style.css";
import PageTitle from "../../components/PageTitle/PageTitle";
import PageBox from "../../components/PageBox/PageBox";
import design from "../../gallery/Design/CAC/Collateral/CACBannerDisplay.jpg";
import CardCarousel from "../../components/Cardcarousel/CardCarousel";
import CyberBorder from "../../components/CyberBorder/CyberBorder";
import { useScrollFade } from "../../hooks/useScrollFade";
import ps from "../../icons/Resume/Ps.png";
import ai from "../../icons/Resume/Ai.png";
import id from "../../icons/Resume/Id.png";
import Return from "../../components/Return/Return";

interface ProjectProps {
    name?: string;
}

function getContrastColor(hexColor: string) {
    // Remove hash if present
    const hex = hexColor.replace("#", "");

    // Convert to RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Calculate luminance (ITU-R BT.709 formula)
    const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

    // Return black for light backgrounds, white for dark backgrounds
    return luminance > 0.5 ? "#000000" : "#ffffff";
}

function Project({ name = "Projects" }: ProjectProps) {
    const ref = useScrollFade<HTMLDivElement>(20, 30);
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

    // const bPlusExpand = <img src={images[`BluePlus.png`]} className={`${styles.expand}  btn-grow`} />;

    // const jobExpand = (
    //     <div className={`${styles.expand}`}>
    //         <img src={images[`BlueCross.png`]} className={`btn-grow`} />
    //     </div>
    // );

    // const toolSet = (logo: string) => (
    //     <div className={`${styles.expand}`}>
    //         <img src={images[`${logo}`]} className={`btn-grow`} />
    //     </div>
    // );

    const [shouldRender, setShouldRender] = useState(false);

    const colorPallet = (color: string, name: string) => (
        <div
            className={`${styles.colorX}`}
            style={{
                backgroundColor: `${color}`,
            }}
        >
            <p
                style={{
                    color: `${getContrastColor(color)}`,
                }}
            >
                {name}
                {/* {": "} */}
                <br />
                {color}
            </p>
        </div>
    );

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
            {/* Section Container*/}
            {shouldRender && (
                <>
                    <PageBox>
                        {/* does not render contents until animation completes */}

                        {/* Page contents */}

                        <div className={`${styles.content}`}>
                            <div className={`${styles.top} `}>
                                {/* Page title */}

                                <PageTitle size1={60} title={name} className={`${styles.title} `} />
                                <Return className={`${styles.return}`}>Return to Portfolio</Return>
                            </div>

                            {/* Skills */}
                            <div className={`${styles.pHeader} `}>
                                <div className={`${styles.sectionHead} `}>
                                    <span className={`${styles.title}`}>Marketing Collaterol</span>
                                </div>
                                <div className={`${styles.pInfo}`}>
                                    <div className={`${styles.projectIcon}`}>
                                        Cac Specialty
                                        <img src={design} />
                                    </div>

                                    <div ref={ref} className={`scrollFade ${styles.projectDesc}`}>
                                        Cac Specialty. Is a project where I did a plenty of things and stuff that
                                        occueres in tandom with the ninjas in the basement. DO not cry for the ninjas
                                        know you and feel no fear. They feel no pain, they feel no passion. They are
                                        simply here to take you and throw you into the eternal fire where the pains of
                                        the world fall away and all that is left is silence and regret. Cac Specialty.
                                        Is a project where I did a plenty of things and stuff that occueres in tandom
                                        with the ninjas in the basement. DO not cry for the ninjas know you and feel no
                                        fear. They feel no pain, they feel no passion. They are simply here to take you
                                        and throw you into the eternal fire where the pains of the world fall away and
                                        all that is left is silence and regret. Is a project where I did a plenty of
                                        things and stuff that occueres in tandom with the ninjas in the basement. DO not
                                        cry for the ninjas know you and feel no fear. They feel no pain, they feel no
                                        passion. They are simply here to take you and throw you into the eternal fire
                                        where the pains of the world fall away and all that is left is silence and
                                        regret.
                                    </div>
                                </div>

                                <div className={`${styles.pDetails}`}>
                                    <div className={`${styles.pColors}`}>
                                        <div className={`${styles.title}`}>Primary Colors</div>

                                        <div className={`${styles.content}`}>
                                            {colorPallet("#FF0000", "red")}
                                            {colorPallet("#000000", "black")}
                                            {colorPallet("#0c2ea0", "Blue")}
                                            {colorPallet("#f0a401", "Gold")}
                                        </div>
                                    </div>

                                    <div className={`${styles.sColors}`}>
                                        <div className={`${styles.title}`}>Secondary Colors</div>

                                        <div className={`${styles.content}`}>
                                            {colorPallet("#FF0000", "red")}
                                            {colorPallet("#000000", "black")}
                                            {colorPallet("#0c2ea0", "Blue")}
                                            {colorPallet("#f0a401", "Gold")}
                                        </div>
                                    </div>

                                    <div className={`${styles.typography}`}>
                                        <div className={`${styles.title}`}>Typography</div>

                                        <div className={`${styles.typeContent}`}>
                                            <div className={`${styles.typeColumn}`}>
                                                <div className={`${styles.typeHeader}`}>
                                                    <p className={`${styles.primaryHeader}`}>Primary Type</p>
                                                    <p className={`${styles.primaryHeader}`}>Secondary Type</p>
                                                </div>
                                                <div ref={ref} className={`scrollFade ${styles.typeList}`}>
                                                    <div className={`${styles.primaryList}`}>
                                                        {Array.from({
                                                            length: 15,
                                                        }).map(() => (
                                                            <p>Open Sans Bold</p>
                                                        ))}
                                                    </div>
                                                    <div className={`${styles.primaryList}`}>
                                                        {Array.from({
                                                            length: 15,
                                                        }).map(() => (
                                                            <p>Open Sans Bold</p>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`${styles.tools}`}>
                                        <div className={`${styles.title}`}>Tools</div>

                                        <div className={`${styles.toolContent}`}>
                                            {/* {Array.from({ length: 6 }).map((_, index) => (
                                                <img src={design} className={`${styles.toolX}`} />
                                            ))} */}
                                            <img src={ps} className={`${styles.toolX}`} />
                                            <img src={ai} className={`${styles.toolX}`} />
                                            <img src={id} className={`${styles.toolX}`} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Education */}
                            <div className={`${styles.header} `}>
                                <div className={`${styles.sectionHead} `}>
                                    <span className={`${styles.title}`}>Section Title</span>
                                </div>
                                <div className={`${styles.categories}`}>
                                    <CyberBorder className={`${styles.catBox} btn-grow`}>
                                        <p className={`${styles.catTitle}`}>Shaygun Art and Design</p>
                                    </CyberBorder>
                                    <CyberBorder className={`${styles.catBox} btn-grow`}>
                                        <p className={`${styles.catTitle}`}>Silvercliff Partners</p>
                                    </CyberBorder>
                                    <CyberBorder className={`${styles.catBox} btn-grow`}>
                                        <p className={`${styles.catTitle}`}>Shaygun Art and Design</p>
                                    </CyberBorder>
                                </div>
                            </div>

                            <div className={`${styles.header} `}>
                                <div className={`${styles.sectionHead} `}>
                                    <span className={`${styles.title}`}>Card Carousel</span>
                                </div>
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

                        <motion.ul initial={{ y: 10 }} animate={{ y: 0 }} transition={{ duration: 0 }}></motion.ul>
                    </PageBox>
                </>
            )}
        </>
    );
}

export default Project;
