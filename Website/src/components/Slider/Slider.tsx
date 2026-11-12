import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import "./Slider.scss";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, Draggable);
}

const DEFAULT_IMAGES: string[] = [1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7].map(
    (n) => `https://assets.codepen.io/16327/portrait-number-0${n}.png`,
);

interface SliderProps {
    /** Image URLs for the cards (needs enough items to fill the loop; 14 works well) */
    images?: string[];
    /**
     * Time between each card's start in the loop. 1 / spacing is roughly how many
     * cards are in motion at once: 0.2 -> about 5 visible, 0.1 -> about 10.
     */
    spacing?: number;
    /**
     * How far (in % of a card's width) the outer cards travel from the center.
     * Smaller = the left and right cards sit closer to the middle card.
     */
    spread?: number;
    /** Scale of the outermost cards (1 = same size as the center card) */
    edgeScale?: number;
    /**
     * false (default): a self-contained slider you move with the buttons or by dragging.
     *                  Safe to place inside any panel or layout.
     * true:            the original demo behavior. Pins the gallery to the viewport
     *                  and scrubs it with the WINDOW scroll bar (needs a full page).
     */
    scrollDriven?: boolean;
    /** Only used when scrollDriven is true: px of scrolling the pin lasts */
    scrollLength?: number;
}

/**
 * Builds a timeline that loops forever by scrubbing the playhead of a longer
 * "raw" sequence, so the first and last cards blend with no visible jump.
 */
function buildSeamlessLoop(
    items: Element[],
    spacing: number,
    animateFunc: (element: Element) => gsap.core.Timeline,
): gsap.core.Timeline {
    const overlap = Math.ceil(1 / spacing); // extra animations on each side for the wrap-around
    const startTime = items.length * spacing + 0.5; // where on rawSequence the loop begins
    const loopTime = (items.length + overlap) * spacing + 1; // where it loops back from
    const rawSequence = gsap.timeline({ paused: true }); // all the "real" animations
    const seamlessLoop = gsap.timeline({ paused: true, repeat: -1 }); // scrubs rawSequence
    const total = items.length + overlap * 2;

    for (let i = 0; i < total; i++) {
        const index = i % items.length;
        const time = i * spacing;
        rawSequence.add(animateFunc(items[index]), time);
        if (i <= items.length) seamlessLoop.add("label" + i, time);
    }

    rawSequence.time(startTime);
    seamlessLoop
        .to(rawSequence, {
            time: loopTime,
            duration: loopTime - startTime,
            ease: "none",
        })
        .fromTo(
            rawSequence,
            { time: overlap * spacing + 1 },
            {
                time: startTime,
                duration: startTime - (overlap * spacing + 1),
                immediateRender: false,
                ease: "none",
            },
        );
    return seamlessLoop;
}

export default function Slider({
    images = DEFAULT_IMAGES,
    spacing = 0.2,
    spread = 150,
    edgeScale = 0.6,
    scrollDriven = false,
    scrollLength = 3000,
}: SliderProps) {
    const galleryRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLUListElement>(null);
    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);
    const proxyRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const gallery = galleryRef.current;
        const cardsEl = cardsRef.current;
        const prevBtn = prevRef.current;
        const nextBtn = nextRef.current;
        const proxy = proxyRef.current;
        if (!gallery || !cardsEl || !prevBtn || !nextBtn || !proxy) return;

        const cleanups: Array<() => void> = [];

        const ctx = gsap.context(() => {
            const cards = Array.from(cardsEl.querySelectorAll("li"));
            if (!cards.length) return;
            gsap.set(cards, { xPercent: spread, opacity: 0, scale: edgeScale });

            const snapTime = gsap.utils.snap(spacing);

            // The animation each card gets (always 1 second long, which the loop math expects).
            // Cards drift from +spread to -spread, growing toward the middle and
            // shrinking toward the edges, and fade only in the first and last bit
            // so the outer cards stay visible.
            const animateFunc = (element: Element) => {
                const tl = gsap.timeline();
                tl.fromTo(
                    element,
                    { scale: edgeScale },
                    {
                        scale: 1,
                        zIndex: 100,
                        duration: 0.5,
                        yoyo: true,
                        repeat: 1,
                        ease: "power1.out",
                        immediateRender: false,
                    },
                )
                    .fromTo(
                        element,
                        { xPercent: spread },
                        {
                            xPercent: -spread,
                            duration: 1,
                            ease: "none",
                            immediateRender: false,
                        },
                        0,
                    )
                    .fromTo(
                        element,
                        { opacity: 0 },
                        {
                            opacity: 1,
                            duration: 0.12,
                            ease: "none",
                            immediateRender: false,
                        },
                        0,
                    )
                    .to(
                        element,
                        { opacity: 0, duration: 0.12, ease: "none" },
                        0.88,
                    );
                return tl;
            };

            const seamlessLoop = buildSeamlessLoop(cards, spacing, animateFunc);

            // proxy for the playhead: can go infinitely in either direction
            const playhead = { offset: 0 };
            const wrapTime = gsap.utils.wrap(0, seamlessLoop.duration());

            // reused tween that smoothly scrubs the loop toward scrub.vars.offset
            const scrub = gsap.to(playhead, {
                offset: 0,
                onUpdate() {
                    seamlessLoop.time(wrapTime(playhead.offset));
                },
                duration: 0.5,
                ease: "power3",
                paused: true,
            });

            // moves the slider to an offset (snapped to the nearest card)
            let goTo: (offset: number) => void;

            if (scrollDriven) {
                // ---- original behavior: pinned, driven by the window scroll ----
                let iteration = 0;

                const trigger = ScrollTrigger.create({
                    start: 0,
                    end: `+=${scrollLength}`,
                    pin: gallery,
                    onUpdate(self) {
                        const scroll = self.scroll();
                        if (scroll > self.end - 1) {
                            wrap(1, 2);
                        } else if (scroll < 1 && self.direction < 0) {
                            wrap(-1, self.end - 2);
                        } else {
                            scrub.vars.offset =
                                (iteration + self.progress) *
                                seamlessLoop.duration();
                            scrub.invalidate().restart();
                        }
                    },
                });

                const progressToScroll = (progress: number) =>
                    gsap.utils.clamp(
                        1,
                        trigger.end - 1,
                        gsap.utils.wrap(0, 1, progress) * trigger.end,
                    );

                function wrap(iterationDelta: number, scrollTo: number) {
                    iteration += iterationDelta;
                    trigger.scroll(scrollTo);
                    trigger.update(); // otherwise it waits one tick
                }

                function scrollToOffset(offset: number) {
                    const snappedTime = snapTime(offset);
                    const progress =
                        (snappedTime - seamlessLoop.duration() * iteration) /
                        seamlessLoop.duration();
                    const scroll = progressToScroll(progress);
                    if (progress >= 1 || progress < 0) {
                        wrap(Math.floor(progress), scroll);
                        return;
                    }
                    trigger.scroll(scroll);
                }

                goTo = scrollToOffset;

                // snap to the closest card when scrolling stops
                const onScrollEnd = () => scrollToOffset(scrub.vars.offset);
                ScrollTrigger.addEventListener("scrollEnd", onScrollEnd);
                cleanups.push(() =>
                    ScrollTrigger.removeEventListener("scrollEnd", onScrollEnd),
                );
            } else {
                // ---- embedded: no scrolling, just move the playhead ----
                goTo = (offset: number) => {
                    scrub.vars.offset = snapTime(offset);
                    scrub.invalidate().restart();
                };
            }

            // prev / next buttons
            const onNext = () => goTo(scrub.vars.offset + spacing);
            const onPrev = () => goTo(scrub.vars.offset - spacing);
            nextBtn.addEventListener("click", onNext);
            prevBtn.addEventListener("click", onPrev);
            cleanups.push(() => {
                nextBtn.removeEventListener("click", onNext);
                prevBtn.removeEventListener("click", onPrev);
            });

            // dragging (mobile friendly too)
            let startOffset = 0;
            const [draggable] = Draggable.create(proxy, {
                type: "x",
                trigger: cardsEl,
                onPress(e) {
                    startOffset = scrub.vars.offset;
                    // Draggable cancels the browser's default press behavior, which can
                    // stop :active from firing, so mirror it with a class we can style.
                    const li = (e.target as Element | null)?.closest("li");
                    li?.classList.add("seamless-pressed");
                },
                onRelease() {
                    cardsEl
                        .querySelectorAll(".seamless-pressed")
                        .forEach((el) =>
                            el.classList.remove("seamless-pressed"),
                        );
                },
                onDrag() {
                    scrub.vars.offset =
                        startOffset + (draggable.startX - draggable.x) * 0.001;
                    scrub.invalidate().restart();
                },
                onDragEnd() {
                    goTo(scrub.vars.offset);
                },
            });
            cleanups.push(() => draggable.kill());
        }, galleryRef);

        return () => {
            cleanups.forEach((fn) => fn());
            ctx.revert(); // kills tweens, timelines and ScrollTriggers, unpins the gallery
        };
    }, [spacing, spread, edgeScale, scrollLength, scrollDriven, images]);

    return (
        <>
            <div
                className={`seamless-gallery${scrollDriven ? "" : " seamless-gallery--embedded"}`}
                ref={galleryRef}
            >
                <ul className="seamless-cards" ref={cardsRef}>
                    {images.map((src, i) => (
                        <li
                            key={`${src}-${i}`}
                            style={{ backgroundImage: `url("${src}")` }}
                        />
                    ))}
                </ul>
                <div className="seamless-actions">
                    <button ref={prevRef}>Prev</button>
                    <button ref={nextRef}>Next</button>
                </div>
            </div>
            <div className="seamless-drag-proxy" ref={proxyRef} />
        </>
    );
}
