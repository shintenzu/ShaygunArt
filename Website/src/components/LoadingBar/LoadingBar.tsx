import { useEffect, useRef, useState } from "react";
import "./LoadingBar.scss";
import CRTTV from "./../CRTTV/CRTTV";

interface LoadingBarProps {
    /** Image URLs to preload and count toward progress */
    assets?: string[];
    /** Called the moment loading hits 100% (as the fade-out starts) */
    onLoaded?: () => void;
    /** Called after the fade-out finishes and the bar is removed */
    onComplete?: () => void;
}

function preloadImage(src: string): Promise<void> {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => resolve(); // a failed image shouldn't block the site
        img.src = src;
    });
}

/** Returns real progress (0..1) based on the page load, fonts and your assets */
function useLoadProgress(assets: string[]): number {
    const [progress, setProgress] = useState(0);
    const assetKey = assets.join("|");

    useEffect(() => {
        const urls = assetKey ? assetKey.split("|") : [];
        const total = urls.length + 2; // + window "load" + fonts
        const done = new Set<string>(); // a Set keeps this safe in StrictMode
        let cancelled = false;

        const mark = (key: string) => {
            if (cancelled) return;
            done.add(key);
            setProgress(done.size / total);
        };

        const onLoad = () => mark("window");
        if (document.readyState === "complete") onLoad();
        else window.addEventListener("load", onLoad, { once: true });

        document.fonts.ready.then(() => mark("fonts"));
        urls.forEach((src) => preloadImage(src).then(() => mark(src)));

        return () => {
            cancelled = true;
            window.removeEventListener("load", onLoad);
        };
    }, [assetKey]);

    return progress;
}

export default function LoadingBar({ assets = [], onLoaded, onComplete }: LoadingBarProps) {
    const target = useLoadProgress(assets);
    const [display, setDisplay] = useState(0); // smoothed 0..1
    const [fading, setFading] = useState(false);
    const [visible, setVisible] = useState(true);
    const startRef = useRef(performance.now());
    const targetRef = useRef(0);
    targetRef.current = target;

    // Keep the latest callbacks in refs so inline functions don't re-trigger effects
    const onLoadedRef = useRef(onLoaded);
    const onCompleteRef = useRef(onComplete);
    onLoadedRef.current = onLoaded;
    onCompleteRef.current = onComplete;

    // Ease the displayed value toward the real value so the bar moves smoothly
    useEffect(() => {
        let frame = 0;
        const loop = () => {
            setDisplay((d) => {
                const next = d + (targetRef.current - d) * 0.08;
                return targetRef.current - next < 0.001 ? targetRef.current : next;
            });
            frame = requestAnimationFrame(loop);
        };
        frame = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(frame);
    }, []);

    // Fade out once we've actually reached 100%
    const finished = display >= 1;
    useEffect(() => {
        if (!finished) return;
        setFading(true);
        onLoadedRef.current?.();
        const t = window.setTimeout(() => {
            setVisible(false);
            onCompleteRef.current?.();
        }, 1000);
        return () => window.clearTimeout(t);
    }, [finished]);

    if (!visible) return null;

    const percent = Math.round(display * 100);
    const elapsed = (performance.now() - startRef.current) / 1000;
    const remaining = display > 0.05 && display < 1 ? Math.max(0, (elapsed / display) * (1 - display)) : null;

    return (
        <div>
            {/* <div className={`loading-box${fading ? "loading-box-fad" : ""}`}>
                <CRTTV
                    label="AV-2"
                    items={["Video", "Audio", "Settings"]}
                ></CRTTV>
            </div> */}

            <div
                className={`loading-bar${fading ? " loading-bar--fade" : ""}`}
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={percent}
            >
                <span className="header">Loading ShayGun Art</span>
                <div className="loading-bar__track">
                    <div className="loading-bar__fill" style={{ transform: `scaleX(${display})` }} />
                </div>
                <div className="loading-bar__meta">
                    <span>{percent}%</span>

                    <span>{remaining === null ? "" : `~${Math.ceil(remaining)}s left`}</span>
                </div>
            </div>
        </div>
    );
}
