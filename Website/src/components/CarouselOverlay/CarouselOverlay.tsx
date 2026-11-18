import { createPortal } from "react-dom";
import styles from "./CarouselOverlay.module.scss";
import { useDeck } from "../../hooks/DeckContext";

import { type ComponentPropsWithRef, type ReactNode } from "react";
import CardCarousel from "../Cardcarousel/CardCarousel";
import redX from "../../icons/Resume/RedX.png";
import whiteX from "../../icons/Resume/WhiteX.png";
import splash from "../../images/HomeSplash.png";
import blueCheck from "../../icons/Resume/BlueCheck.png";
//import styles from "./CardCarousel.module.scss";

interface CarouselOverlayProps extends ComponentPropsWithRef<"div"> {}

function CarouselOverlay({
    // All props are received from parent CardCarousel
    className = "",
    ...props
}: CarouselOverlayProps) {
    const { visibility, setVisibility, deck, deckIndex } = useDeck();
    console.log("overlay visibility:", visibility);
    const src = deck[deckIndex];
    console.log("cards" + src);
    if (!visibility || !src) return null;

    return createPortal(
        <>
            {visibility && (
                <div className={`${styles.container}`}>
                    <div className={`${styles.CarouselOverlay}`}>
                        <div
                            className={`${styles.close} btn-grow`}
                            onClick={() => {
                                setVisibility(false);
                            }}
                        >
                            <img src={whiteX} />
                        </div>
                        {/* Image display, shows image in large format above carousel */}
                        <div className={`${styles.display}`}>
                            <div className={`${styles.imageBox}`}>
                                {src != undefined || src != null ? <img src={src} /> : ""}
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
                            </div>
                        </div>

                        {/* Card Carousel Display at bottom, tracks with original carousel. Updates once closed */}
                        <div className={`${styles.gallery}`}>
                            <CardCarousel
                                gallery={deck}
                                startIndex={deckIndex}
                                className={className}
                                flat={true}
                                visible={8}
                                spread={280}
                                cardSize={"9dvw"}
                            ></CardCarousel>
                        </div>
                    </div>
                </div>
            )}
            ;
        </>,
        document.body,
    );
}

export default CarouselOverlay;
