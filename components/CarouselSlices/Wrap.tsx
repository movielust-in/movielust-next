import Image from "next/image";
import { MouseEventHandler, useState } from "react";
import { image } from "../../helpers/Urls";

import ErroredImage from "../../assets/images/placeholder-image.png";
import { Genre } from "../../types/tmdb";

import styles from "./Wrap.module.scss";

interface WrapPros {
  src: string;
  alt: string;
  title?: string;
  description?: string;
  backdrop?: string;
  genres?: Genre[];
  showCard?: boolean;
}

Wrap.defaultProps = {
  title: null,
  description: null,
  backdrop: null,
  genres: [],
  showCard: false,
};

enum Directions {
  LEFT = "LEFT",
  RIGHT = "RIGHT",
  UP = "UP",
  DOWN = "DOWN",
}

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

function Wrap({
  src,
  alt,
  title,
  description,
  backdrop,
  genres,
  showCard,
}: WrapPros) {
  const [loading, setLoading] = useState(true);
  const [opacity, setOpacity] = useState(0);
  const [imgSrc, setImgSrc] = useState(src);

  const onLoad = () => {
    setLoading(false);
    setOpacity(1);
  };

  const onError = () => {
    setLoading(false);
    setImgSrc(ErroredImage.src);
  };

  const [direction, setDirection] = useState({
    x: Directions.RIGHT,
    h: Directions.UP,
  });

  const [cardRef, setCardRef] = useState<any>(null);

  const handleMouseOver: MouseEventHandler<HTMLDivElement> = (e) => {
    if (!showCard) return;

    const { id }: { id: string } = e.target as any;

    const wrapDimnes = (e.target as any).getBoundingClientRect();

    if (id.startsWith("card")) return;

    const cardDimens: DOMRect = cardRef.getBoundingClientRect();

    if (wrapDimnes.x + wrapDimnes.width + 300 + 50 <= window.innerWidth) {
      setDirection((current) => ({ ...current, x: Directions.RIGHT }));
    } else {
      setDirection((current) => ({ ...current, x: Directions.LEFT }));
    }

    // if (!cardRef) return;

    // if (cardDimens.y + cardDimens.height >= window.innerHeight) {
    //   setDirection((current) => ({ ...current, h: Directions.UP }));
    // } else if (cardDimens.y < 100)
    //   setDirection((current) => ({ ...current, h: Directions.DOWN }));
    // else {
    //   setDirection((current) => ({ ...current, h: Directions.UP }));
    // }
  };

  const toBase64 = (str: string) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);

  return src ? (
    <div
      className={styles.wrapper}
      onMouseOver={handleMouseOver}
      onFocus={handleMouseOver as any}
    >
      {/* Poster */}
      <Image
        className={styles.image}
        placeholder="blur"
        src={imgSrc}
        alt={alt || "no alt"}
        onLoad={onLoad}
        style={{ opacity }}
        onError={onError}
        loading="lazy"
        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(150, 220))}`}
        width={150}
        height={220}
      />
      {/* Hover Card */}
      {showCard ? (
        <div
          style={
            backdrop ? { backgroundImage: `url(${image(200, backdrop)})` } : {}
          }
          className={`${styles.card} ${
            direction.x === Directions.RIGHT
              ? styles.card_right
              : styles.card_left
          } ${
            direction.h === Directions.UP ? styles.card_top : styles.card_bottom
          }`}
          ref={setCardRef}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          id="card"
        >
          {/* all element in this div should have a id starting with 'card'  */}

          <div className={styles.title} id="card_title">
            {title}
          </div>
          <div className={styles.genres} id="card_genres">
            {genres?.map((genre) => (
              <span key={genre.id} id="card_genre_span">
                {genre.name}
              </span>
            ))}
          </div>

          <div className={styles.description} id="card_desc">
            {description}
          </div>
        </div>
      ) : null}
    </div>
  ) : null;
}

export default Wrap;
