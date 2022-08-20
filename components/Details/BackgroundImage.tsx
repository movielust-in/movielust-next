/* eslint-disable @next/next/no-img-element */
import { useRef, MutableRefObject } from "react";
// @ts-ignore
// import ColorThief from "colorthief";

import styles from "./Detail.module.scss";

// const colorThief = new ColorThief();

interface DetailBackgroundProps {
  // setDomColor: any;
  backdrop: string | undefined;
}

function BackgroundComp({ backdrop }: DetailBackgroundProps) {
  const backgroundRef = useRef<HTMLImageElement>();

  return (
    <div className={styles.Background}>
      <img
        ref={backgroundRef as MutableRefObject<HTMLImageElement>}
        alt="movieposter"
        crossOrigin="anonymous"
        src={
          backdrop
            ? `https://image.tmdb.org/t/p/w1280${backdrop}?no-cache`
            : "/images/25559.webp"
        }
        // onLoad={() => setDomColor(colorThief.getColor(backgroundRef.current))}
      />
    </div>
  );
}

export default BackgroundComp;
