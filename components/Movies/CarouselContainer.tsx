import React, { memo, useEffect } from 'react';
import tmdbClient from '../../helpers/tmdbClient';
import { addContent } from '../../redux/reducers/infiniteHome.reducer';
import { useDispatch, useSelector } from '../../redux/store';
import LoadingCarousel from '../Carousels/LoadingCarousel';
import MovieCarousel from '../Carousels/MovieCarousel';
import ShowAllButton from '../CarouselSlices/ShowAllButton';

import styles from './HomeMovies.module.scss';
import { Carousel } from './HomeType';

const CarouselContainer = ({ id, url, title, showAll, type }: Carousel) => {
  const content = useSelector((state) => state.home[type][id]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!url) return;
    if (content && content.length) return;
    tmdbClient
      .get(url)
      .then((res) =>
        dispatch(addContent({ id, type, content: res.data.results }))
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, url]);

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
