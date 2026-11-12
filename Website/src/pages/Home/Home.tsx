import styles from "./Home.module.scss";
import { motion, scale } from "motion/react";
import React, { useState, useEffect, type CSSProperties } from "react";
import TextType from "../../components/TypeText/TextType";
import "vault66-crt-effect/style.css";
import splash from "../../images/HomeSplash.png";
import design from "../../images/Design.png";
import draw from "../../images/Draw.png";
import web from "../../images/Web.png";
import JitterDiv from "../../components/JitterDiv/JitterDiv";
import CyberBtn from "../../components/CyberBtn/CyberBtn";
import PageTitle from "../../components/PageTitle/PageTitle";
import PageBox from "../../components/PageBox/PageBox";
import ImageSplash from "../../components/ImageSplash/ImageSplash";
import splash1 from "../../images/HomeSplashPixel1.png";
import IconHeader from "../../components/IconHeader/IconHeader";
import { useNavigate } from "react-router";
import { type Socials } from "../../interfaces/Types";
import axios from "axios";

interface HomeProps {}

function Home({}: HomeProps) {
    const [contacts, setContacts] = useState<Socials[]>([]);
    const fetchData = async () => {
        try {
            const [contectRes] = await Promise.all([axios.get("http://localhost:8080/data/contacts")]);
            setContacts(contectRes.data);
        } catch (err) {
            console.error("Error loading contacts", err);
        } finally {
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const imageModules = import.meta.glob("../../icons/*.{png,jpg,jpeg,svg}", { eager: true });

    // Map them into a clean key-value object (e.g., { "logo.png": "/src/assets/images/logo.png" })
    const images = Object.fromEntries(
        Object.entries(imageModules).map(([path, module]) => {
            const fileName = path.split("/").pop();
            return [fileName, (module as any).default];
        }),
    );
    const [shouldRender, setShouldRender] = useState(false);
    const pageHeight = "80dvh";
    const navigate = useNavigate();

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
                <PageBox boxHeight="auto">
                    <div className={`${styles.content}`}>
                        <div className={`${styles.top} `}>
                            <PageTitle title="Shaygun" subtitle="Art and Design" size1={70} />
                        </div>

                        <div className={`${styles.iconHeader}`}>
                            <div className={`${styles.skills} `}>
                                <IconHeader title="Web Developer" icon={web} hcolor="#00defe" delayAdd={1} pad={0} />
                                <IconHeader
                                    title="Graphic Designer"
                                    icon={design}
                                    hcolor="#f2000d"
                                    delayAdd={1.4}
                                    pad={10}
                                />
                                <IconHeader
                                    title="Digital Illustrator"
                                    icon={draw}
                                    hcolor="#00defe"
                                    delayAdd={1.8}
                                    pad={20}
                                />
                            </div>
                        </div>

                        <JitterDiv className={`${styles.typedHeader}`}>
                            <TextType
                                text={[
                                    "Need a designer who can tap into all elements of design? I've got you covered!",
                                ]}
                                text2="I've got you covered!"
                                text2Color="#ffba41"
                                initialDelay={2000}
                            />
                        </JitterDiv>

                        <motion.div
                            className={`${styles.buttons} `}
                            initial={{
                                opacity: 0,
                                //x: -500,
                                scaleY: 0,
                            }}
                            animate={{
                                opacity: 1,
                                //x: 0
                                scaleY: 1,
                            }}
                            transition={{
                                delay: 3.5,
                                duration: 0.5,
                                ease: "anticipate",
                                type: "spring",
                            }}
                        >
                            <CyberBtn
                                title="View My Resume"
                                subtitle="Epic Resume"
                                tag="Resume"
                                hue={0}
                                onClick={() => navigate("/Resume")}
                            />
                            <CyberBtn
                                title="View My Portfolio"
                                subtitle="Best Portfolio"
                                tag="Portfolio"
                                hue={190}
                                onClick={() => navigate("/Portfolio")}
                            />
                        </motion.div>
                        <motion.div className={`${styles.contacts} `}>
                            {contacts.map((cont: Socials, index) => (
                                <JitterDiv scale={0.5}>
                                    <motion.img
                                        key={index}
                                        //src={cont.url}
                                        src={images[`${cont.url}`]}
                                        alt={`Gallery item ${index}`}
                                        className={`${styles.icons} btn-grow`}
                                        //ref={clickGlitch.ref}
                                        initial={{
                                            opacity: 0,
                                            x: -500,
                                        }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            delay: 3.8 + index * 0.1,
                                            duration: 0.5,
                                            ease: "anticipate",
                                            type: "spring",
                                        }}
                                    />
                                </JitterDiv>
                            ))}
                        </motion.div>
                    </div>
                    <motion.div
                        className={`${styles.splash} `}
                        initial={{
                            opacity: 0,
                            //x: +500,
                            scaleY: 0,
                        }}
                        animate={{
                            opacity: 1,
                            //x: 0,
                            scaleY: 1,
                        }}
                        transition={{
                            delay: 0,
                            duration: 0.75,
                            ease: "anticipate",
                            type: "spring",
                        }}
                    >
                        <ImageSplash
                            src={splash}
                            src2={splash1}
                            //src3={splash2}
                            width={100}
                            height={pageHeight}
                        />
                    </motion.div>
                </PageBox>
            )}
        </>
    );
}

export default Home;
