import styles from "./About.module.scss";
import { motion } from "motion/react";
import "../../index.scss";
import React, { useState, useEffect, type CSSProperties } from "react";
import "vault66-crt-effect/style.css";
import splash from "../../images/AboutSplash.png";
import plus from "../../images/plus.png";
import JitterDiv from "../../components/JitterDiv/JitterDiv";
import PageTitle from "../../components/PageTitle/PageTitle";
import PageBox from "../../components/PageBox/PageBox";
import ImageSplash from "../../components/ImageSplash/ImageSplash";
import splash1 from "../../images/AboutSplashPixel1.png";
import { useScrollFade } from "../../hooks/useScrollFade";
import { useNavigate } from "react-router";
import ResumeIcon from "../../images/Resume.png";

interface AboutProps {}

function About({}: AboutProps) {
    const ref = useScrollFade<HTMLDivElement>(20, 30);
    const [shouldRender, setShouldRender] = useState(false);
    useEffect(() => {
        // Set a timer to change the state after 3000ms (3 seconds)
        const timer = setTimeout(() => {
            setShouldRender(true);
        }, 10);

        // Clean up the timer if the component unmounts before the delay finishes
        return () => clearTimeout(timer);
    }, []);

    const navigate = useNavigate();

    return (
        <>
            {shouldRender && (
                <PageBox className={`${styles.home}`} boxHeight="auto">
                    <div className={`${styles.content}`}>
                        <div className={`${styles.top} `}>
                            <PageTitle title="About Me" />
                        </div>

                        <JitterDiv ref={ref} className={`scrollFade ${styles.typedHeader}`}>
                            In consequat aliqua officia anim molestias vel.{" "}
                            <span className={`${styles.gold} `}> Voluptatum ex mollit </span>
                            nostrud eu vel eligendi accusamus nulla id. Omnis in non in tempor consatur quibusdam
                            nobis.o
                            <br />
                            <br />
                            Imperdiet anim enim atque atque expedita et. Iusto fugiat
                            <span className={`${styles.teal}`}> blanditiis commodo </span> vel ducimus commodo eiusmod
                            est quos quod. Eos quo atque aut cum in nobis eum.
                            <br />
                            <br />
                            Proident expedita facilis et tempor et eligendi et est occaecat praesentium. Ut laborum
                            quidem ducimus omnis tempore incididunt do. Aliquip exercitation quas possimus harum est
                            lorem est blanditiis repellendus non. Nisi et nihil cillum libero nulla odio culpa proident
                            quod pariatur occaecat sunt. Harum distinctio cumque elit eligendi proident quos optio minim
                            commodo minim.
                            <br />
                            <br />
                            Magna aliquip deserunt vel iusto fugiat. Occaecat dolore optio possimus{" "}
                            <span className={`${styles.red}`}> nostrud sunt pariatur do </span> mollitia. Duis dolorem
                            qui sed quod repellendus quo. Et expedita enim officia sint rerum accusamus libero sunt.
                            <br />
                            <br />
                            Vel nulla distinctio dignissimos officia iusto ad veniam. Pariatur dolor sint nostrud id
                            voluptate <span className={`${styles.gold}`}> Voluptatum ex mollit </span>
                            quod mollitia quas. Libero nobis temporibus est fugiat aliquip molestias eligendi nobis in.
                            Ut qui proident nisi commodo accusamus aliqua voluptas quis et maxime.
                            <br />
                            <br />
                            Quod est id quo aliqua consectetur praesentium voluptas. Duis do quibusdam consequat vero
                            minim aut molestias. Mollitia dolores
                            <span className={`${styles.teal}`}> blanditiis commodo </span> tempor et minus occaecat
                            omnis fugiat excepturi amet quas. Qui officia fugiat duis atque omnis soluta nobis rerum quo
                            similique quis cupidatat.
                            <br />
                            <br />
                            Nobis omnis ipsum est quidem tempore id occaecat quibusdam distinctio. Ad occaecat imperdiet
                            culpa exercitation ea deserunt dolorem.{" "}
                            <span className={`${styles.red}`}> nostrud sunt pariatur do </span> Placeat nobis rerum vel
                            aliquip vel vel aut id mollit. Pariatur nam laborum deleniti consequatur anim reprehenderit
                            veniam incididunt aliqua eligendi.
                            <br />
                            <br />
                            In consequat aliqua officia anim molestias vel. Voluptatum ex mollit nostrud eu vel eligendi
                            accusamus nulla id. Omnis in non in tempor consequatur quibusdam nobis.
                            <br />
                            <br />
                            Imperdiet anim enim atque atque expedita et. Iusto fugiat blanditiis commodo vel ducimus
                            commodo eiusmod est quos quod. Eos quo atque aut cum in nobis eum.
                            <br />
                            <br />
                            Proident expedita facilis et tempor et eligendi et est occaecat praesentium. Ut laborum
                            quidem ducimus omnis tempore incididunt do. Aliquip exercitation quas possimus harum est
                            lorem est blanditiis repellendus non. Nisi et nihil cillum libero nulla odio culpa proident
                            quod pariatur occaecat sunt. Harum distinctio cumque elit eligendi proident quos optio minim
                            commodo minim.
                            <br />
                            <br />
                            Magna aliquip deserunt vel iusto fugiat. Occaecat dolore optio possimus nostrud sunt
                            pariatur do <span className={`${styles.red}`}> nostrud sunt pariatur do </span> mollitia.
                            Duis dolorem qui sed quod repellendus quo. Et expedita enim officia sint rerum accusamus
                            libero sunt.
                            <br />
                            <br />
                            Vel nulla distinctio dignissimos officia iusto ad veniam. Pariatur dolor sint nostrud id
                            voluptate quod mollitia quas. Libero nobis temporibus est fugiat aliquip molestias eligendi
                            nobis in. Ut qui proident nisi commodo accusamus aliqua voluptas quis et maxime.
                            <br />
                            <br />
                            Quod est id quo aliqua consectetur praesentium voluptas. Duis do quibusdam consequat vero
                            minim aut molestias. Mollitia dolores tempor et minus occaecat omnis fugiat excepturi amet
                            quas. Qui officia fugiat duis atque omnis soluta nobis rerum quo similique quis cupidatat.
                        </JitterDiv>

                        <JitterDiv className={`${styles.buttons}  btn-grow`} onClick={() => navigate("/Resume")}>
                            <span className="crt">View Resume</span>
                            <img src={ResumeIcon} className={`${styles.sIcon} glitch-image`} />
                        </JitterDiv>
                    </div>
                    <ImageSplash
                        src={splash}
                        src2={splash1}
                        //src3={splash2}
                        width={48}
                    />
                </PageBox>
            )}
        </>
    );
}

export default About;
