import styles from "./CarouselOverlay.module.scss";

import {
    //useCallback,
    //useEffect,
    //useRef,
    //useState,
    // type CSSProperties,
    // type KeyboardEvent,
    // type MouseEvent,    // type PointerEvent,
    type ReactNode,
} from "react";
//import styles from "./CardCarousel.module.scss";

interface CarouselOverlayProps {
    item: ReactNode;
    items?: ReactNode[];
    /** How many cards are visible at once (odd numbers look best) */
    visible?: number;
    /** How far (in % of a card's width) the outermost visible cards sit from the center */
    spread?: number;
    /** Scale of the outermost visible cards (1 = same size as the center card) */
    edgeScale?: number;
    /** Which item starts in the center */
    startIndex?: number;
    className?: string;
    flatten?: boolean;
    show?: boolean;
}

function CarouselOverlay({
    // All props are received from parent CardCarousel
    item,
    //items,
    // visible,
    // spread,
    // edgeScale,
    // startIndex,
    // className,
    show = true,
    //flatten = true,
}: CarouselOverlayProps) {
    return (
        <>
            {show && (
                <div className={`${styles.CarouselOverlay}`}>
                    {/* Image display, shows image in large format above carousel */}
                    <div className={`${styles.display}`}> {item}</div>

                    {/* Card Carousel Display at bottom, tracks with original carousel. Updates once closed */}
                    {/* <div className={`${styles.gallery}`}>
                        <CardCarousel
                            items={items}
                            spread={spread}
                            edgeScale={edgeScale}
                            startIndex={startIndex}
                            className={className}
                            flatten={true}
                        ></CardCarousel>
                    </div> */}
                </div>
            )}
        </>
    );
}

export default CarouselOverlay;
