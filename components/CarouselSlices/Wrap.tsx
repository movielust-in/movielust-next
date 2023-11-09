'use client';

import Image from 'next/image';
import { MouseEventHandler, SyntheticEvent, useState } from 'react';

import { image } from '../../lib/tmdb/Urls';
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
  genres = [],
  showCard = false,
}: WrapPros) {
  const [direction, setDirection] = useState({
    x: Directions.RIGHT,
    h: Directions.UP,
  });

  if (!src) return null;

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
  };

  const handleImageError = ({
    currentTarget,
  }: SyntheticEvent<HTMLImageElement, Event>) => {
    currentTarget.onerror = null;
    currentTarget.src = '/images/placeholder-image.png';
  };

  return (
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
          src={src}
          alt={alt || 'no alt'}
          onError={handleImageError}
          blurDataURL="/images/placeholder-image.png"
          unoptimized
          fill
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
  );
}

export default Wrap;
