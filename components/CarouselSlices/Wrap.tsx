import Image from 'next/image';
import { MouseEventHandler, useState } from 'react';
import { image } from '../../helpers/Urls';

import { Genre } from '../../types/tmdb';

import styles from '../../styles/Wrap.module.scss';

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
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  UP = 'UP',
  DOWN = 'DOWN',
}

function Wrap({
  src,
  alt,
  title,
  description,
  backdrop,
  genres,
  showCard,
}: WrapPros) {
  const [imgSrc, setImgSrc] = useState(src);

  const onError = () => {
    setImgSrc('/images/placeholder-image.png');
  };

  const [direction, setDirection] = useState({
    x: Directions.RIGHT,
    h: Directions.UP,
  });

  const handleMouseOver: MouseEventHandler<HTMLDivElement> = (e) => {
    if (!showCard) return;

    const { id }: { id: string } = e.target as any;

    const wrapDimnes = (e.target as any).getBoundingClientRect();

    if (id.startsWith('card')) return;

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

  return src ? (
    <div
      className={styles.wrapper}
      onMouseOver={handleMouseOver}
      onFocus={handleMouseOver as any}
    >
      {/* Poster */}

      <div className={styles.imageContainer}>
        <Image
          className={styles.image}
          placeholder="blur"
          src={imgSrc}
          alt={alt || 'no alt'}
          onError={onError}
          loading="lazy"
          blurDataURL="/images/placeholder-image.png"
          unoptimized
          layout="fill"
          style={{ borderRadius: '6px' }}
        />
      </div>
      {/* Hover Card */}
      {showCard ? (
        <div
          role="presentation"
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
          // ref={setCardRef}
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
