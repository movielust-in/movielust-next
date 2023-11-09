import { useState } from 'react';
import NextImage from 'next/image';

import Shimmer from '../UI/Shimmer';
import styles from '../../styles/hWrap.module.scss';

interface WrapPros {
  src: string;
  title: string;
  alt: string;
  rating?: number;
}

function WrapH({ src, alt, title, rating }: WrapPros) {
  const [loading, setLoading] = useState(true);
  const [imgSrc, setImgSrc] = useState(src);

  const onLoad = () => {
    setLoading(false);
  };

  const onError = () => {
    setLoading(false);
    setImgSrc("/images/placeholder-image-h.png'");
  };

  return src ? (
    <div className={styles.Wrapper}>
      <NextImage
        width={400}
        height={210}
        src={imgSrc}
        alt={alt || 'no alt'}
        className={styles.Image}
        onLoad={onLoad}
        blurDataURL={Shimmer(400, 210)}
        placeholder="blur"
        onError={onError}
        loading="lazy"
        unoptimized
        style={{
          maxWidth: '100%',
          height: 'auto',
        }}
      />
      {!loading && (rating || title) && (
        <div className={styles.Information}>
          {title && <h3 className={styles.WrapText}>{title}</h3>}
          {rating && (
            <h3 className={styles.WrapText}>
              Rating:
              {rating}
            </h3>
          )}
        </div>
      )}
    </div>
  ) : null;
}

export default WrapH;
