import styles from "./ContactForm.module.scss";
import CyberBtn from "../CyberBtn/CyberBtn";
import JitterDiv from "../JitterDiv/JitterDiv";
import { useState } from "react";
import check from "../../icons/Resume/BlueCheck.png";
import { useGlitch } from "react-powerglitch";

type Status = "idle" | "sending" | "success" | "error";

interface ContactFormProps {
    title: string;
}

function ContactForm({ title }: ContactFormProps) {
    const sucessGlitch = useGlitch({
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
            velocity: 15,
            amplitudeX: 0.1,
            amplitudeY: 0.1,
        },
        slice: {
            count: 4,
            velocity: 15,
            minHeight: 0.02,
            maxHeight: 0.15,
            hueRotate: true,
            cssFilters: "blur(5px) brightness(0.8)",
        },
        pulse: false,
    });

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<Status>("idle");
    const [shrink, setShrink] = useState(false);
    const [expand, setExpand] = useState(false);
    const [shake, setShake] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>("You are missing the following - ");

    const clear = () => {
        setName("");
        setEmail("");
        setPhone("");
        setSubject("");
        setMessage("");
        setStatus("idle");
        setShrink(false);
        setExpand(false);
        setShake(false);
    };

    const handleError = () => {
        const missing: string[] = [];
        if (!name.trim()) {
            missing.push("[Name]");
        }
        if (!email.trim()) {
            missing.push("[Email]");
        }
        if (!subject.trim()) {
            missing.push("[Subject]");
        }
        if (!message.trim()) {
            missing.push("[Message]");
        }

        setErrorMessage(missing.length > 0 ? `${missing.join(", ")}` : "");
        setStatus("error");
        setShake(true);
        setTimeout(() => {
            setShake(false);
        }, 300);

        return;
    };

    const submit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        setErrorMessage("You are missing the following - ");
        e.preventDefault();

        if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
            handleError();
        }
        setStatus("sending");
        try {
            //Old server import!

            // const res = await fetch("http://localhost:8080/api/contact", {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify({ name, email, phone, subject, message }),
            // });
            // if (!res.ok) {
            //     throw new Error(`Server Responded $(res.status)`);
            // }

            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, phone, subject, message }),
            });
            if (!res.ok) {
                throw new Error(`Server responded ${res.status}`);
            }

            clear();
            setStatus("success");
            setShrink(true);
            setTimeout(() => {
                //setShrink(false);
                setExpand(true);
            }, 500);
        } catch (err) {
            console.error(err);
            setStatus("error");
        }
    };
    return (
        <JitterDiv scale={2} className="fill-all">
            <div className={`${styles.formContainer} ${shake ? "error" : shrink ? "yay" : ""}`}>
                {!expand ? (
                    <form className={`${styles.ContactForm} ${shrink ? "shrunk" : ""}`} onSubmit={submit}>
                        <h1 className={`${styles.formTitle} `}>{title}</h1>
                        <div className={`${styles.sender} `}>
                            <div className={`${styles.inputLabel} `}>
                                <div className={`${styles.label} `}>Name: *</div>
                                <div className={`${styles.label} `}>E-mail: *</div>
                                <div className={`${styles.label} `}>Phone:</div>
                                <div className={`${styles.label} `}>Subject: *</div>
                            </div>
                            <div className={`${styles.inputs} `}>
                                <input
                                    className={`${styles.inputBox} `}
                                    name="name"
                                    value={name}
                                    type="text"
                                    placeholder="Enter Name (Required)"
                                    onChange={(e) => setName(e.target.value)}
                                ></input>
                                <input
                                    className={`${styles.inputBox} `}
                                    name="email"
                                    value={email}
                                    type="text"
                                    placeholder="Enter E-mail (Required)"
                                    onChange={(e) => setEmail(e.target.value)}
                                ></input>
                                <input
                                    className={`${styles.inputBox} `}
                                    name="phone"
                                    value={phone}
                                    type="text"
                                    placeholder="Enter Phone Number"
                                    onChange={(e) => setPhone(e.target.value)}
                                ></input>
                                <input
                                    className={`${styles.inputBox} `}
                                    name="subject"
                                    value={subject}
                                    type="text"
                                    placeholder="[Subject] (Required)"
                                    onChange={(e) => setSubject(e.target.value)}
                                ></input>
                            </div>
                        </div>
                        <h1 className={`${styles.messageLabel} `}>Message: *</h1>
                        <div className={`${styles.status} `}>
                            <span> Status: </span>{" "}
                            {status === "idle" && <span className={`${styles.idle}`}> Ready for Message!</span>}
                            {status === "success" && <span className={`${styles.sucess}`}> Message sent!</span>}
                            {status === "error" && (
                                <>
                                    {" "}
                                    <span className={`${styles.error}`}>You are missing the following:</span>
                                    <p className={`${styles.error}`}> {errorMessage}</p>
                                </>
                            )}
                        </div>
                        <div className={`${styles.messageBox} `}>
                            <textarea
                                className={`${styles.textarea} `}
                                name="message"
                                value={message}
                                placeholder="[Message] (Required)"
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </div>
                        <div className={`${styles.bcontainer} `}>
                            <div className={`${styles.buttons} `}>
                                <CyberBtn
                                    title="Submit"
                                    subtitle="Message Me"
                                    hue={38.2}
                                    type="submit"
                                    disabled={status === "sending"}
                                    //onClick={submit}
                                />
                                <CyberBtn
                                    title="Clear"
                                    subtitle="Job Offers"
                                    hue={0}
                                    type="reset"
                                    onClick={() => clear()}
                                />
                            </div>
                        </div>
                    </form>
                ) : (
                    <div className={`${styles.sucessContainer} btn-grow`} onClick={clear}>
                        <div className={`${styles.sucessBox} ${expand ? "expand" : ""}`}>
                            <div className={`${styles.check}`} ref={sucessGlitch.ref}>
                                <img src={check} />
                            </div>
                            <JitterDiv scale={2} className={`${styles.sendAgain}`}>
                                Message Sent!
                            </JitterDiv>
                            <JitterDiv scale={2} className={`${styles.sendAgain}`}>
                                Click to Send Another Message
                            </JitterDiv>
                        </div>
                    </div>
                )}
            </div>
        </JitterDiv>
    );
}

export default ContactForm;
