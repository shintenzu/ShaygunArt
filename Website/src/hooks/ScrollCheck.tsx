import { useState, useEffect } from "react";

export function ScrollCheck(threshold: number): boolean {
    const [isScrolled, setIsScrolled] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > threshold && !isScrolled) {
                setIsScrolled(true);
            } else if (currentScrollY <= threshold && isScrolled) {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        // Check initial position on mount
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isScrolled, threshold]);

    return isScrolled;
}
