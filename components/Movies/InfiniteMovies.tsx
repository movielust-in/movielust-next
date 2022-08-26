import React, { useMemo } from 'react';
import { Carousel } from './HomeType';
import {
  BOLLYWOOD,
  GUJARATI,
  movieWithGenre,
  seriesWithGenre,
  SOUTH,
  TR_ANIME,
} from '../../helpers/Urls';
import CarouselContainer from './CarouselContainer';
import { useDispatch, useSelector } from '../../redux/store';
import LoadingCarousel from '../Carousels/LoadingCarousel';
import useObserver from '../../hooks/useObserver';
import { nextPage } from '../../redux/reducers/infiniteHome.reducer';

import styles from './HomeMovies.module.scss';
import { MOVIE_GENRES, TV_GENRES } from '../../config';

const FixCarousels: Carousel[] = [
  {
    id: 'anime',
    type: 'tv',
    url: TR_ANIME,
    title: 'Top Rated Anime',
    showAll: 'tv/anime,',
  },
  {
    id: 'bollywood',
    type: 'movie',
    url: BOLLYWOOD,
    title: 'Bollywood Movies',
    showAll: 'movie/Bollywood',
  },
  {
    id: 'south',
    type: 'movie',
    url: SOUTH,
    title: 'South Indian Movies',
    showAll: 'movie/SouthIndian',
  },
  {
    id: 'gujarati',
    type: 'movie',
    url: GUJARATI,
    title: 'Gujarati Movies',
    showAll: 'movie/Gujarati',
  },
];

const InfiniteMovies = () => {
  const { currPage } = useSelector((state) => state.home);

  const Carousels = useMemo(
    () => [
      ...FixCarousels,
      ...TV_GENRES.map((genre, index) => [
        {
          id: `${MOVIE_GENRES[index].name}_MOVIE`,
          type: 'movie',
          url: movieWithGenre(MOVIE_GENRES[index].id!),
          title: `${MOVIE_GENRES[index].name} Movies`,
        },
        {
          id: `${genre.name}_TV`,
          type: 'tv',
          url: seriesWithGenre(genre.id!),
          title: `${genre.name} Shows`,
        },
      ]).flat(),
      ...MOVIE_GENRES.slice(TV_GENRES.length).map((genre) => ({
        id: `${genre.name}_MOVIE`,
        type: 'movie',
        url: movieWithGenre(genre.id!),
        title: `${genre.name} Movies`,
      })),
    ],
    []
  ) as Carousel[];

  const dispatch = useDispatch();

  const setTrigger = useObserver(() => dispatch(nextPage()), {
    threshold: [0.25, 1],
  });

  return (
    <div>
      {Carousels.slice(0, currPage).map((carousel) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <CarouselContainer {...carousel} key={carousel.id} />
      ))}

      {Carousels.length > currPage ? (
        <div ref={setTrigger} className={styles.CarouselContainer}>
          <div className={styles.Title}>
            <p className={styles.Header}>Loading...</p>
          </div>
          <LoadingCarousel />
        </div>
      ) : null}
    </div>
  );
};

export default InfiniteMovies;
