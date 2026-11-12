import type { FC } from "react";
import styles from "./Gallery.module.scss";

interface GalleryProps {}

const Gallery: FC<GalleryProps> = () => (
    <div className={`${styles.Gallery} `}>Gallery Component</div>
);

export default Gallery;
