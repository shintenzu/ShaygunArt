import styles from "./ContactForm.module.scss";
import { motion } from "motion/react";
import CyberBtn from "../CyberBtn/CyberBtn";
import JitterDiv from "../JitterDiv/JitterDiv";
import { useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

interface ContactFormProps {
    title: string;
}

function ContactForm({ title }: ContactFormProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<Status>("idle");

    const clear = () => {
        setName("");
        setEmail("");
        setPhone("");
        setSubject("");
        setMessage("");
        setStatus("idle");
    };

    const submit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name.trim() || !message.trim()) {
            setStatus("error");
            return;
        }
        setStatus("sending");
        try {
            const res = await fetch("http://localhost:8080/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, phone, subject, message }),
            });
            if (!res.ok) {
                throw new Error(`Server Responded $(res.status)`);
            }
            clear();
            setStatus("success");
        } catch (err) {
            console.error(err);
            setStatus("error");
        }
    };
    return (
        <JitterDiv scale={2} className="fill-all">
            <form className={`${styles.ContactForm} `} onSubmit={submit}>
                <h1 className={`${styles.formTitle} `}>{title}</h1>
                <div className={`${styles.sender} `}>
                    <div className={`${styles.inputLabel} `}>
                        <div className={`${styles.label} `}>Name: *</div>
                        <div className={`${styles.label} `}>E-mail:</div>
                        <div className={`${styles.label} `}>Phone:</div>
                        <div className={`${styles.label} `}>Subject:</div>
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
                            placeholder="[Subject]"
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
                        <span className={`${styles.error}`}> Something went wrong. Please try again.</span>
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
                        <CyberBtn title="Clear" subtitle="Job Offers" hue={0} type="reset" onClick={() => clear()} />
                    </div>
                </div>
            </form>
        </JitterDiv>
    );
}

export default ContactForm;
