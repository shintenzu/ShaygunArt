import styles from "./Contact.module.scss";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import TextType from "../../components/TypeText/TextType";
import "vault66-crt-effect/style.css";
import JitterDiv from "../../components/JitterDiv/JitterDiv";
import CyberBtn from "../../components/CyberBtn/CyberBtn";
import PageTitle from "../../components/PageTitle/PageTitle";
import PageBox from "../../components/PageBox/PageBox";
import IconHeader from "../../components/IconHeader/IconHeader";
import ContactForm from "../../components/ContactForm/ContactForm";
import { type Socials } from "../../interfaces/Types";
//import axios from "axios";

import contactsData from "../../server/contacts.json";
const contacts = contactsData as Socials[];

interface ContactProps {}

function Contact({}: ContactProps) {
    //Old Server Imports
    // const [contacts, setContacts] = useState<Socials[]>([]);
    // const fetchData = async () => {
    //     try {
    //         const [contectRes] = await Promise.all([axios.get("http://localhost:8080/data/contacts")]);
    //         setContacts(contectRes.data);
    //     } catch (err) {
    //         console.error("Error loading contacts", err);
    //     } finally {
    //     }
    // };
    // useEffect(() => {
    //     fetchData();
    // }, []);

    const imageModules = import.meta.glob("../../icons/*.{png,jpg,jpeg,svg}", { eager: true });

    // Map them into a clean key-value object (e.g., { "logo.png": "/src/assets/images/logo.png" })
    const images = Object.fromEntries(
        Object.entries(imageModules).map(([path, module]) => {
            const fileName = path.split("/").pop();
            return [fileName, (module as any).default];
        }),
    );

    const [shouldRender, setShouldRender] = useState(false);
    const [formType, setFormType] = useState("Message Me");

    useEffect(() => {
        // Set a timer to change the state after 3000ms (3 seconds)
        const timer = setTimeout(() => {
            setShouldRender(true);
        }, 100);

        // Clean up the timer if the component unmounts before the delay finishes
        return () => clearTimeout(timer);
    }, []);
    const [animate, setAnimate] = useState(false);
    const delayScale = 0.2;
    const delay = 1.5;

    const contactList = () => {
        return contacts.map((cont: Socials, index) => {
            return (
                <IconHeader
                    key={index}
                    title={cont.name + " :"}
                    icon={images[cont.url]}
                    hcolor={index % 2 == 0 ? "var(--color-primary-red)" : "var(--color-primary-teal)"}
                    delayAdd={delay + index * delayScale}
                    glitch={false}
                    animate={animate}
                />
            );
        });
    };

    const contactInfo = () => {
        return contacts.map((cont: Socials, index) => {
            return (
                <IconHeader
                    key={index}
                    title={cont.info}
                    hcolor="var(--color-primary-white)"
                    delayAdd={delay + index * delayScale}
                    animate={animate}
                />
            );
        });
    };

    return (
        <>
            {shouldRender && (
                <PageBox boxHeight="80dvh">
                    <div className={`${styles.content}`}>
                        <div className={`${styles.top} `}>
                            <PageTitle title="Contact Me" />
                        </div>

                        <JitterDiv className={`${styles.typedHeader}`}>
                            <TextType
                                text={["Need to reach me? Here's My Contacts!"]}
                                text2="Here's My Contacts!"
                                text2Color="#00defe"
                                initialDelay={1000}
                                typingSpeed={10}
                                pauseDuration={0}
                                showCursor={true}
                                cursorCharacter="_"
                                deletingSpeed={50}
                                variableSpeedEnabled={true}
                                variableSpeedMin={20}
                                variableSpeedMax={35}
                                cursorBlinkDuration={0.5}
                                reverseMode={false}
                                animate={animate}
                            />
                        </JitterDiv>

                        <div className={`${styles.iconHeader}`}>
                            <div className={`${styles.skills} `}>{contactList()}</div>
                            <div className={`${styles.skills2} `}>{contactInfo()}</div>
                        </div>

                        <motion.div
                            className={`${styles.buttons} `}
                            initial={
                                animate
                                    ? {
                                          opacity: 0,
                                          //x: -500,
                                          scaleY: 0,
                                      }
                                    : false
                            }
                            animate={
                                animate
                                    ? {
                                          opacity: 1,
                                          //x: 0
                                          scaleY: 1,
                                      }
                                    : false
                            }
                            transition={{
                                delay: 2.8,
                                duration: 0.7,
                                ease: "anticipate",
                                type: "spring",
                            }}
                        >
                            <CyberBtn
                                title="Message Me"
                                subtitle="Message Me"
                                tag="Message"
                                hue={0}
                                onClick={() => setFormType("Message Me")}
                            />
                            <CyberBtn
                                title="Job offers"
                                subtitle="Job Offers"
                                tag="Jobs"
                                hue={190}
                                onClick={() => setFormType("Job Offer")}
                            />
                        </motion.div>
                    </div>
                    <motion.div
                        className={`${styles.formBox} `}
                        initial={
                            animate
                                ? {
                                      opacity: 0,
                                      x: +500,
                                      //scaleY: 0,
                                  }
                                : false
                        }
                        animate={
                            animate
                                ? {
                                      opacity: 1,
                                      x: 0,
                                      //scaleY: 1,
                                  }
                                : false
                        }
                        transition={{
                            delay: 3.2,
                            duration: 0.7,
                            ease: "anticipate",
                            type: "spring",
                        }}
                    >
                        <ContactForm title={formType} />
                    </motion.div>
                </PageBox>
            )}
        </>
    );
}

export default Contact;
