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
    const galleryModules = import.meta.glob<string>("../../gallery/**/*.{png,jpg,jpeg,svg}", {
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

    // const items = gallery.map((src) => (
    //     <div
    //         style={{
    //             backgroundImage: `url("${src}")`,
    //             backgroundSize: "contain",
    //             backgroundRepeat: "no-repeat",
    //             backgroundPosition: "center",
    //         }}
    //     />
    // ));

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
                                        In consequat aliqua officia anim molestias vel.{" "}
                                        <span className={`gold `}> Voluptatum ex mollit </span>
                                        nostrud eu vel eligendi accusamus nulla id. Omnis in non in tempor consatur
                                        quibusdam nobis.o
                                        <br />
                                        <br />
                                        Imperdiet anim enim atque atque expedita et. Iusto fugiat
                                        <span className={`teal`}> blanditiis commodo </span> vel ducimus commodo eiusmod
                                        est quos quod. Eos quo atque aut cum in nobis eum.
                                        <br />
                                        <br />
                                        Proident expedita facilis et tempor et eligendi et est occaecat praesentium. Ut
                                        laborum quidem ducimus omnis tempore incididunt do. Aliquip exercitation quas
                                        possimus harum est lorem est blanditiis repellendus non. Nisi et nihil cillum
                                        libero nulla odio culpa proident quod pariatur occaecat sunt. Harum distinctio
                                        cumque elit eligendi proident quos optio minim commodo minim.
                                        <br />
                                        <br />
                                        Magna aliquip deserunt vel iusto fugiat. Occaecat dolore optio possimus{" "}
                                        <span className={`red`}> nostrud sunt pariatur do </span> mollitia. Duis dolorem
                                        qui sed quod repellendus quo. Et expedita enim officia sint rerum accusamus
                                        libero sunt.
                                        <br />
                                        <br />
                                        Vel nulla distinctio dignissimos officia iusto ad veniam. Pariatur dolor sint
                                        nostrud id voluptate <span className={`gold`}> Voluptatum ex mollit </span>
                                        quod mollitia quas. Libero nobis temporibus est fugiat aliquip molestias
                                        eligendi nobis in. Ut qui proident nisi commodo accusamus aliqua voluptas quis
                                        et maxime.
                                        <br />
                                        <br />
                                        Quod est id quo aliqua consectetur praesentium voluptas. Duis do quibusdam
                                        consequat vero minim aut molestias. Mollitia dolores
                                        <span className={`teal`}> blanditiis commodo </span> tempor et minus occaecat
                                        omnis fugiat excepturi amet quas. Qui officia fugiat duis atque omnis soluta
                                        nobis rerum quo similique quis cupidatat.
                                        <br />
                                        <br />
                                        Nobis omnis ipsum est quidem tempore id occaecat quibusdam distinctio. Ad
                                        occaecat imperdiet culpa exercitation ea deserunt dolorem.{" "}
                                        <span className={`red`}> nostrud sunt pariatur do </span> Placeat nobis rerum
                                        vel aliquip vel vel aut id mollit. Pariatur nam laborum deleniti consequatur
                                        anim reprehenderit veniam incididunt aliqua eligendi.
                                        <br />
                                        <br />
                                        In consequat aliqua officia anim molestias vel. Voluptatum ex mollit nostrud eu
                                        vel eligendi accusamus nulla id. Omnis in non in tempor consequatur quibusdam
                                        nobis.
                                        <br />
                                        <br />
                                        Imperdiet anim enim atque atque expedita et. Iusto fugiat blanditiis commodo vel
                                        ducimus commodo eiusmod est quos quod. Eos quo atque aut cum in nobis eum.
                                        <br />
                                        <br />
                                        Proident expedita facilis et tempor et eligendi et est occaecat praesentium. Ut
                                        laborum quidem ducimus omnis tempore incididunt do. Aliquip exercitation quas
                                        possimus harum est lorem est blanditiis repellendus non. Nisi et nihil cillum
                                        libero nulla odio culpa proident quod pariatur occaecat sunt. Harum distinctio
                                        cumque elit eligendi proident quos optio minim commodo minim.
                                        <br />
                                        <br />
                                        Magna aliquip deserunt vel iusto fugiat. Occaecat dolore optio possimus nostrud
                                        sunt pariatur do <span className={`red`}> nostrud sunt pariatur do </span>{" "}
                                        mollitia. Duis dolorem qui sed quod repellendus quo. Et expedita enim officia
                                        sint rerum accusamus libero sunt.
                                        <br />
                                        <br />
                                        Vel nulla distinctio dignissimos officia iusto ad veniam. Pariatur dolor sint
                                        nostrud id voluptate quod mollitia quas. Libero nobis temporibus est fugiat
                                        aliquip molestias eligendi nobis in. Ut qui proident nisi commodo accusamus
                                        aliqua voluptas quis et maxime.
                                        <br />
                                        <br />
                                        Quod est id quo aliqua consectetur praesentium voluptas. Duis do quibusdam
                                        consequat vero minim aut molestias. Mollitia dolores tempor et minus occaecat
                                        omnis fugiat excepturi amet quas. Qui officia fugiat duis atque omnis soluta
                                        nobis rerum quo similique quis cupidatat.
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
                                                        {Array.from({ length: 15 }).map((_, i) => (
                                                            <p key={i}>Open Sans Bold</p>
                                                        ))}
                                                    </div>
                                                    <div className={`${styles.primaryList}`}>
                                                        {Array.from({ length: 15 }).map((_, i) => (
                                                            <p key={i}>Open Sans Bold</p>
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
                                    <CardCarousel gallery={gallery} visible={5} spread={140} edgeScale={0.6} />
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
