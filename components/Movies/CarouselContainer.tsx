import React, { memo, useEffect, useState } from 'react';

import LoadingCarousel from '../Carousels/LoadingCarousel';
import MovieCarousel from '../Carousels/MovieCarousel';
import ShowAllButton from '../CarouselSlices/ShowAllButton';
import { tmdbFetch } from '../../lib/tmdb/tmdb-fetch';

import styles from './HomeMovies.module.scss';
import { Carousel } from './HomeType';

const CarouselContainer = ({ url, title, showAll, type }: Carousel) => {
  const [content, setContent] = useState([]);

  useEffect(() => {
    if (!url) return;
    if (content && content.length) return;
    tmdbFetch(url).then((res) => setContent(res.results));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return (
    <div className={styles.CarouselContainer} key="popshows">
      <div className={styles.Title}>
        <p className={styles.Header}>{title}</p>
        {showAll ? (
          <ShowAllButton link={`/showall/${showAll}`} label="See all" />
        ) : null}
      </div>
      {content && content.length ? (
        <MovieCarousel movies={content} type={type} />
      ) : (
        <LoadingCarousel />
      )}
    </div>
  );
};

export default memo(CarouselContainer);
