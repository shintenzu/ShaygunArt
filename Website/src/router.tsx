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
import { useState } from "react";
import type { PowerState } from "./interfaces/Types";

export default function Layout() {
    const [power, setPower] = useState<PowerState>("idle");
    const activate = () => setPower("on");
    const location = useLocation();
    const outlet = useOutlet();

    return (
        <>
            <DesktopMainMenu />
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0, x: -80 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 80 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
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

export const router = createBrowserRouter([
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
