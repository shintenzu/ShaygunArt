import { useCallback, useEffect, useState } from "react";

/**
 * Sets --fade-top and --fade-bottom on a scroll container as it scrolls.
 * topPct / bottomPct: maximum fade sizes (% of the container height)
 * ramp: how many px of scrolling it takes for a fade to reach full size
 *
 * Uses a callback ref, so it also works when the element is rendered
 * later (conditional rendering, delayed mounts, etc.).
 */
export function useScrollFade<T extends HTMLElement>(topPct = 20, bottomPct = 30, ramp = 64) {
    const [el, setEl] = useState<T | null>(null);
    const ref = useCallback((node: T | null) => setEl(node), []);

    useEffect(() => {
        if (!el) return;

        const update = () => {
            const max = el.scrollHeight - el.clientHeight;
            if (max <= 0) {
                // nothing to scroll: no fades at all
                el.style.setProperty("--fade-top", "0%");
                el.style.setProperty("--fade-bottom", "0%");
                return;
            }
            const top = Math.min(1, el.scrollTop / ramp);
            const bottom = Math.min(1, (max - el.scrollTop) / ramp);
            el.style.setProperty("--fade-top", `${top * topPct}%`);
            el.style.setProperty("--fade-bottom", `${bottom * bottomPct}%`);
        };

        update();
        el.addEventListener("scroll", update, { passive: true });
        const ro = new ResizeObserver(update);
        ro.observe(el);
        if (el.firstElementChild) ro.observe(el.firstElementChild);

        return () => {
            el.removeEventListener("scroll", update);
            ro.disconnect();
        };
    }, [el, topPct, bottomPct, ramp]);

    return ref;
}
