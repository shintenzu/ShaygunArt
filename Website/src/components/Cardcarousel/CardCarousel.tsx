import {
    useCallback,
    useEffect,
    useRef,
    useState,
    type CSSProperties,
    type KeyboardEvent,
    type MouseEvent,
    type PointerEvent,
    type ReactNode,
} from "react";
import styles from "./CardCarousel.module.scss";
import JitterDiv from "../JitterDiv/JitterDiv";
import CRTBox from "../CRTBox/CRTBox";
import left from "../../icons/common/left.png";
import right from "../../icons/common/right.png";
//import CarouselOverlay from "../CarouselOverlay/CarouselOverlay";
import { useDeck } from "../../hooks/DeckContext";
//import { distance } from "motion/react";

export interface CardCarouselProps {
    /** Anything you like: each item is rendered inside its own card */
    //items: ReactNode[];
    gallery: string[];
    /** How many cards are visible at once (odd numbers look best) */
    visible?: number;
    /** How far (in % of a card's width) the outermost visible cards sit from the center */
    spread?: number;
    /** Scale of the outermost visible cards (1 = same size as the center card) */
    edgeScale?: number;
    /** Which item starts in the center */
    startIndex?: number;
    className?: string;
    flat?: boolean;
    cardSize?: string;
}

interface DragState {
    x0: number; // where the press started
    pos0: number; // carousel position when the press started
    lastX: number;
    lastT: number;
    velocity: number; // in cards per second
    moved: boolean;
}

// CRT look for the card contents. Defined once, outside the component, so it
// isn't rebuilt on every frame of the drag/slide animation.
// This runs once per card, so it is kept light: the expensive layers
// (noise, flicker, sweep) are off, and outer glow is off because the card
// clips (overflow: hidden) anything that spills outside it.
const CRT_PROPS = {
    theme: "custom",
    enabled: true,
    enableScanlines: true,
    enableVignette: true,
    enableEdgeGlow: true,
    enableGlow: false,
    enableNoise: false,
    enableSweep: false,
    enableFlicker: false,
    enableGlitch: false,
    enableCurvature: false,
    enableGlare: false,
    tintText: false,
    scanlineColor: "#5e5050",
    scanlineOpacity: 0.1,
    scanlineThickness: 2,
    scanlineGap: 4,
    scanlineOrientation: "horizontal",
    vignetteIntensity: 0.5,
    edgeGlowColor: "#64555079",
    edgeGlowSize: 20,
} as const;

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
const mod = (v: number, n: number) => ((v % n) + n) % n;
/** Signed circular distance from the carousel position, e.g. -2 ... 0 ... 2 */
const wrapOffset = (raw: number, n: number) => mod(raw + n / 2, n) - n / 2;

export default function CardCarousel({
    gallery,
    visible = 5,
    spread = 150,
    edgeScale = 0.6,
    startIndex = 0,
    className = "",
    flat = false,
    cardSize = "18dvw",
}: CardCarouselProps) {
    // const BASE_IMAGES = Object.entries(galleryModules)
    //     .sort(([a], [b]) => a.localeCompare(b))
    //     .map(([, url]) => url); // already an array of URL strings

    // // Repeat the images until there are enough cards to fill the loop (~14)
    // const MIN_CARDS = 14;
    // const gallery = Array.from(
    //     { length: Math.max(MIN_CARDS, BASE_IMAGES.length) },
    //     (_, i) => BASE_IMAGES[i % BASE_IMAGES.length],
    // );

    const items = gallery.map((src, index) => (
        <div
            key={index}
            style={{
                backgroundImage: `url("${src}")`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
            }}
        />
    ));

    const { setItems, setIndex, setVisibility, visibility } = useDeck();

    const openDeck = (i: number) => {
        if (!flat) {
            setItems(gallery);
            setVisibility(true);
        }

        setIndex(i);
        console.log("Current Card:" + i + "Visible?" + visibility);
    };

    const n = items.length;
    const half = Math.floor(visible / 2);
    const step = half > 0 ? spread / half : 0; // % of card width between neighbours

    // `position` is a continuous number: 2.0 means card 2 is centered,
    // 2.5 means halfway between cards 2 and 3 (mid-drag or mid-slide).
    const [position, setPosition] = useState(startIndex);
    const [dragging, setDragging] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    const [flatten, setFlatten] = useState(flat);

    const posRef = useRef(startIndex); // always the latest position
    const targetRef = useRef(startIndex); // where the slide animation is heading
    const rafRef = useRef(0);
    const drag = useRef<DragState | null>(null);
    const swiped = useRef(false); // stops a drag from also counting as a click

    const setPos = (v: number) => {
        posRef.current = v;
        setPosition(v);
    };

    // Smoothly slides the position to a whole number (no animation library)
    const animateTo = useCallback(
        (target: number) => {
            cancelAnimationFrame(rafRef.current);
            targetRef.current = target;

            const reduce =
                typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

            const settle = () => {
                const settled = mod(targetRef.current, n); // keep numbers small
                posRef.current = settled;
                targetRef.current = settled;
                setPosition(settled);
                rafRef.current = 0;
            };

            if (reduce) {
                settle();
                return;
            }

            let last = performance.now();
            const loop = (now: number) => {
                const dt = Math.min(0.05, (now - last) / 1000);
                last = now;
                const diff = targetRef.current - posRef.current;
                if (Math.abs(diff) < 0.001) {
                    settle();
                    return;
                }
                // exponential ease-out: fast at first, gentle at the end
                setPos(posRef.current + diff * (1 - Math.exp(-dt / 0.12)));
                rafRef.current = requestAnimationFrame(loop);
            };
            rafRef.current = requestAnimationFrame(loop);
        },
        [n],
    );

    useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

    const go = (delta: number) => animateTo(Math.round(targetRef.current) + delta);

    // ---- dragging ----------------------------------------------------------

    const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
        if (e.pointerType === "mouse" && e.button !== 0) return;
        if ((e.target as HTMLElement).closest("button")) return; // let buttons click
        cancelAnimationFrame(rafRef.current); // grab the carousel mid-slide
        rafRef.current = 0;
        drag.current = {
            x0: e.clientX,
            pos0: posRef.current,
            lastX: e.clientX,
            lastT: performance.now(),
            velocity: 0,
            moved: false,
        };
    };

    const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
        const d = drag.current;
        if (!d) return;
        const dx = e.clientX - d.x0;

        if (!d.moved) {
            if (Math.abs(dx) < 6) return; // ignore tiny movements (it's a click)
            d.moved = true;
            setDragging(true);
            e.currentTarget.setPointerCapture(e.pointerId);
        }

        // how many pixels it takes to move by one whole card
        const card = e.currentTarget.querySelector<HTMLElement>("[data-card]");
        const unit = (step / 100) * (card?.offsetWidth ?? 1) || 1;

        const now = performance.now();
        const dt = Math.max(1, now - d.lastT) / 1000;
        const instant = -(e.clientX - d.lastX) / unit / dt;
        d.velocity = d.velocity * 0.7 + instant * 0.3;
        d.lastX = e.clientX;
        d.lastT = now;

        setPos(d.pos0 - dx / unit); // cards follow the pointer
    };

    const endDrag = (e: PointerEvent<HTMLDivElement>) => {
        const d = drag.current;
        drag.current = null;
        if (!d) return;

        if (!d.moved) {
            animateTo(targetRef.current); // it was only a press: resume any slide
            return;
        }

        setDragging(false);
        swiped.current = true;
        setTimeout(() => (swiped.current = false), 0);
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
            e.currentTarget.releasePointerCapture(e.pointerId);
        }

        // a quick flick keeps going a little; a held pointer just snaps
        const velocity = performance.now() - d.lastT > 100 ? 0 : d.velocity;
        const projected = posRef.current + clamp(velocity, -6, 6) * 0.12;
        animateTo(Math.round(projected));
    };

    const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
    };

    // Clicking a side card brings it to the center. This runs in the CAPTURE phase
    // on the carousel, so it still fires even if something inside the card (an image
    // component, a CRT overlay, a link) calls stopPropagation() on its own click.
    const onClickCapture = (e: MouseEvent<HTMLDivElement>) => {
        if (swiped.current) return; // that was the end of a drag, not a click
        const target = e.target as HTMLElement;
        // real controls (buttons, links, inputs) keep their own click behavior
        if (target.closest("button, a, input, textarea, select")) return;
        const card = target.closest<HTMLElement>("[data-card]");
        if (!card) return;
        const rel = Math.round(Number(card.dataset.offset));
        openDeck(Number(card.dataset.index));
        if (rel !== 0) {
            go(rel);
        } else {
            openDeck(Number(card.dataset.index));
        }
    };

    if (n === 0) return null;

    return (
        <>
            <div
                className={`${styles.carousel} ${dragging ? styles.dragging : ""} ${className}`.trim()}
                role="region"
                aria-roledescription="carousel"
                tabIndex={0}
                onKeyDown={onKeyDown}
                onClickCapture={onClickCapture}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
                onDragStart={(e) => e.preventDefault()}
                style={{ "--card-size": cardSize } as React.CSSProperties}
            >
                {items.map((item, i) => {
                    const offset = wrapOffset(i - position, n);
                    const distance = Math.abs(offset);
                    // 0 at the center, 1 at the outermost visible card
                    const t = half > 0 ? Math.min(distance, half) / half : 0;
                    // fully visible inside the range, fading out just past it
                    const opacity = clamp(half + 1 - distance, 0, 1);

                    const cardStyle = {
                        "--x": offset * step,
                        "--scale": 1 - t * (1 - edgeScale),
                        opacity,
                        zIndex: 100 - Math.round(distance),
                    } as CSSProperties;

                    const cardStyleFlat = {
                        "--x": offset * (step * 1.5),
                        "--scale": 1,
                        opacity,
                        zIndex: 100 - Math.round(distance),
                    } as CSSProperties;

                    return (
                        // The JitterDiv IS the card: it keeps the positioning, ring and
                        // drag logic. The CRT effect goes INSIDE it, around the content.

                        <JitterDiv
                            key={i}
                            data-card
                            data-hidden={opacity === 0 || undefined}
                            className={`${styles.card} ${distance < 0.5 ? styles.active : ""}`}
                            style={!flatten ? cardStyle : cardStyleFlat}
                            aria-hidden={opacity === 0}
                            data-offset={offset}
                            data-index={i}
                        >
                            <CRTBox {...CRT_PROPS} className={styles.crt} innerClassName={styles.crtInner}>
                                {item}
                                <div className={styles.caption}>
                                    <div className={styles.captionLeft}>
                                        <div>Title:</div>
                                        <div>Year:</div>
                                        <div>Medium:</div>
                                    </div>
                                    <div className={styles.captionRight}>
                                        <div>This is some awesome</div>
                                        <div>2015</div>
                                        <div>Digital Painting</div>
                                    </div>
                                </div>
                                <div className={styles.counter}>
                                    {i}/{items.length}
                                </div>
                            </CRTBox>
                        </JitterDiv>
                    );
                })}

                <div className={`${styles.actions}`}>
                    <JitterDiv className={`${styles.buttonContainer}`}>
                        <button type="button" onClick={() => go(-1)} className={`btn-grow`}>
                            <img src={left} />
                        </button>
                    </JitterDiv>
                    <JitterDiv className={`${styles.buttonContainer}`}>
                        <button type="button" onClick={() => go(1)} className={`btn-grow`}>
                            <img src={right} />
                        </button>
                    </JitterDiv>
                </div>
            </div>
        </>
    );
}
