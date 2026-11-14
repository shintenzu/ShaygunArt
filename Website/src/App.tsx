import "./App.scss";
import { useState, useEffect } from "react";
import { RouterProvider } from "react-router";
import CRTTV from "./components/CRTTV/CRTTV";
import LoadingBar from "./components/LoadingBar/LoadingBar";
import LetterGlitch from "./components/LetterGlitch/LetterGlitch";
//import { router } from "./router";
// src/router.tsx
import "./App.scss";
import { createBrowserRouter } from "react-router";
import { useLocation, useOutlet } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import DesktopMainMenu from "./components/DesktopMainMenu/DesktopMainMenu";
import reactLogo from "./images/React.png";
//import Layout from "./Layout";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Resume from "./pages/Resume/Resume";
import Portfolio from "./pages/Portfolio/Portfolio";
import Contact from "./pages/Contact/Contact";
import Project from "./pages/Project/Project";
import Process from "./pages/Process/Process";
//import { useState } from "react";
import type { PowerState } from "./interfaces/Types";
import { PowerContext } from "./hooks/PowerContext";
import { ScrollCheck } from "./hooks/ScrollCheck";
import { createHashRouter } from "react-router";

export function Layout() {
    // const activate = () => setPower("on");
    //const [power, setPower] = useState<PowerState>("idle");
    const location = useLocation();
    const outlet = useOutlet();
    const scrolled = ScrollCheck(30);

    return (
        <>
            {!scrolled ? <DesktopMainMenu float={false} /> : <DesktopMainMenu float={true} />}
            <AnimatePresence mode="sync" initial={false}>
                {/* <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    className="fill"
                > */}
                <motion.div
                    key={location.pathname}
                    animate={{
                        opacity: [0, 1],
                        transition: { duration: 1.5, times: [0, 0.5] },
                    }}
                    className="fill"
                >
                    {outlet}
                    <div className="footer">
                        © 2026 Segun Olowofoyeku. Created with <span className="react"> ReactJS </span>
                        <img src={reactLogo} />
                    </div>
                </motion.div>
            </AnimatePresence>
        </>
    );
}

export const router = createHashRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <div>404 Not Found</div>,
        children: [
            { index: true, element: <Home /> },
            { path: "About", element: <About /> },
            { path: "Resume", element: <Resume /> },
            { path: "Portfolio", element: <Portfolio /> },
            { path: "Contact", element: <Contact /> },
            { path: "Project", element: <Project /> },
            { path: "Process", element: <Process title="" /> },
        ],
    },
]);

export default function App() {
    const [loaded, setLoaded] = useState(false); // Hook to check if page is loaded
    const ASSETS = ["/images/*", "/icons/*"]; // items list for page loading
    const [power, setPower] = useState<PowerState>("idle");
    return (
        <PowerContext.Provider value={{ power, setPower }}>
            <div className="gradient">
                <div
                    className={`loading-box ${loaded && power == "on" ? "loading-box-fade-fast" : "loading-box-show-fast"}`}
                >
                    <CRTTV
                        label="AV-2"
                        items={["Video", "Audio", "Settings"]}
                        power={power}
                        setPower={setPower}
                    ></CRTTV>
                </div>
                <LoadingBar assets={ASSETS} onLoaded={() => setLoaded(true)} />

                {loaded && (
                    <>
                        <div className="container">
                            <LetterGlitch
                                glitchColors={["#f2000d", "#00defe", "#ffba41", "#ececec"]}
                                baseColor="#821b1b"
                                characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789"
                                fontSize={12}
                                spacing={0.6}
                                density={0.62}
                                baseOpacity={0.16}
                                glitchAmount={0.5}
                                speed={0.8}
                                flow={0.54}
                                smooth
                                interactive
                                cursorRadius={85}
                                clickEffect="tear"
                                edgeFade={0.07}
                                centerFade={0.54}
                                intro
                                lightMode
                            />
                        </div>
                        <div className="main-container">
                            <RouterProvider router={router}></RouterProvider>
                        </div>
                    </>
                )}
            </div>
        </PowerContext.Provider>
    );
}
