import {
    useEffect,
    useRef,
    //useState
} from "react";
import "./CRTTV.scss";

type PowerState = "idle" | "on" | "off";

export interface CRTTVProps {
    /** Text shown in the top-left corner of the screen */
    label?: string;
    /** Menu entries */
    items?: string[];
    power: PowerState;
    setPower: (state: PowerState) => void; // takes a value, returns nothing
}

//const DEFAULT_ITEMS: string[] = ["Picture", "Sound", "About", "Contact"];
const GLITCH_LAYERS = 5; // original pen clones the "AV-1" span 4 extra times

// Fill the canvas with random grayscale-alpha noise
function drawSnow(ctx: CanvasRenderingContext2D): void {
    const { width, height } = ctx.canvas;
    const imageData = ctx.createImageData(width, height);
    const buf = new Uint32Array(imageData.data.buffer);
    for (let i = 0; i < buf.length; i++) {
        buf[i] = ((255 * Math.random()) | 0) << 24;
    }
    ctx.putImageData(imageData, 0, 0);
}

export default function CRTTV({
    // label = "AV-1",
    // items = DEFAULT_ITEMS,
    //power1 = "idle",
    //setPower1 = () =>{},
    power,
    setPower,
}: CRTTVProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    //const [power, setPower] = useState<PowerState>("idle");
    //const [activeIndex, setActiveIndex] = useState<number>(0);

    // Size the canvas once on mount (same math as the original pen)
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ww = window.innerWidth;
        canvas.width = ww / 3;
        canvas.height = (ww * 0.5625) / 3;
    }, []);

    // Power on after 1s
    useEffect(() => {
        const t = window.setTimeout(() => setPower("on"), 500);
        return () => window.clearTimeout(t);
    }, []);

    // Run the static animation while the TV is on
    useEffect(() => {
        if (power !== "on") return;
        const ctx = canvasRef.current?.getContext("2d");
        if (!ctx) return;

        let frame = 0;
        const loop = () => {
            drawSnow(ctx);
            frame = requestAnimationFrame(loop);
        };
        loop();
        return () => cancelAnimationFrame(frame);
    }, [power]);

    // Arrow key menu navigation
    // useEffect(() => {
    //     const onKeyDown = (e: KeyboardEvent) => {
    //         if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
    //         e.preventDefault();
    //         setActiveIndex((i) =>
    //             e.key === "ArrowUp"
    //                 ? Math.max(0, i - 1)
    //                 : Math.min(items.length - 1, i + 1),
    //         );
    //     };
    //     window.addEventListener("keydown", onKeyDown);
    //     return () => window.removeEventListener("keydown", onKeyDown);
    // }, [items.length]);

    return (
        <main className={`crt-tv scanlines ${power === "idle" ? "" : power}`}>
            <div className="screen">
                <canvas ref={canvasRef} className="picture" />
                <div className="overlay">
                    <div className="text">
                        {Array.from({ length: GLITCH_LAYERS }, (_, i) => (
                            <span key={i}></span>
                        ))}
                    </div>

                    {/* <div className="menu">
                        <header>Main Menu</header>
                        <ul>
                            {items.map((item, i) => (
                                <li
                                    key={item}
                                    className={
                                        i === activeIndex ? "active" : undefined
                                    }
                                >
                                    <a
                                        href="#"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <footer>
                            <div className="key">
                                Exit: <span>1</span>
                            </div>
                            <div className="key">
                                Select: <span>2</span>
                            </div>
                        </footer>
                    </div> */}
                </div>
            </div>
        </main>
    );
}
