import { useRef, type ComponentPropsWithoutRef } from "react";

export default function ScrollFadeContainer({
    children,
    className = "",
    ...rest
}: ComponentPropsWithoutRef<"div">) {
    const contentRef = useRef<HTMLDivElement>(null);
    const scrollbarRef = useRef<HTMLDivElement>(null);

    const handleContentScroll = () => {
        if (contentRef.current && scrollbarRef.current) {
            scrollbarRef.current.scrollTop = contentRef.current.scrollTop;
        }
    };

    const handleScrollbarScroll = () => {
        if (contentRef.current && scrollbarRef.current) {
            contentRef.current.scrollTop = contentRef.current.scrollTop;
        }
    };

    return (
        /* Added overflow-hidden to the master grid frame to block sub-pixel layout shifts */
        <div
            className={`grid grid-cols-[1fr_12px] w-full overflow-hidden ${className}`}
            {...rest}
        >
            {/* COLUMN 1: Viewport Text Lane */}
            <div
                ref={contentRef}
                onScroll={handleContentScroll}
                /* Appended overflow-x-hidden to isolate the vertical scrolling vector */
                className="scroll-fade-engine overflow-y-auto overflow-x-hidden no-scrollbar h-full w-full"
            >
                {children}
            </div>
        </div>
    );
}
