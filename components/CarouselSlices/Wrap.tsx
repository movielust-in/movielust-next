'use client';

import Image from 'next/image';
import { SyntheticEvent, memo } from 'react';

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

function Wrap({
  src,
  alt,
  title,
  description,
  backdrop,
  genres = [],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  showCard = false,
}: WrapPros) {
  if (!src) return null;

  const handleImageError = ({
    currentTarget,
  }: SyntheticEvent<HTMLImageElement, Event>) => {
    currentTarget.onerror = null;
    currentTarget.src = '/images/placeholder-image.png';
  };

  return (
    <div
      className={`${styles.wrapper} ${styles.imageContainer}`}
      data-tooltip-id="movie_card_hover"
      data-tooltip-content={title}
      data-backdrop={backdrop}
      data-title={title}
      data-description={
        description && description?.length > 200
          ? `${description?.slice(0, 197)}...`
          : description
      }
      data-genres={genres?.map((g) => g.name).join(',')}
      data-tooltip-float
    >
      <Image
        className={styles.image}
        placeholder="blur"
        loading="lazy"
        src={src}
        alt={alt || 'no alt'}
        onError={handleImageError}
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPU0uKsBwABwQDepPdFVAAAAABJRU5ErkJggg==)"
        unoptimized
        fill
      />
    </div>
  );
}

export default memo(Wrap);
