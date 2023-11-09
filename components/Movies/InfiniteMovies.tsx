import React, { useMemo, useState } from 'react';

import LoadingCarousel from '../Carousels/LoadingCarousel';
import useObserver from '../../hooks/useObserver';
import { MOVIE_GENRES, TV_GENRES } from '../../lib/tmdb/constants';
import {
  Bollywood_Movies,
  Gujarati_Movies,
  South_Movies,
  movieWithGenre,
  seriesWithGenre,
  Top_Rated_Anime,
} from '../../lib/tmdb/Urls';

import styles from './HomeMovies.module.scss';
import CarouselContainer from './CarouselContainer';
import { Carousel } from './HomeType';

const FixCarousels: Carousel[] = [
  {
    id: 'anime',
    type: 'tv',
    url: Top_Rated_Anime,
    title: 'Top Rated Anime',
    showAll: 'tv/anime,',
  },
  {
    id: 'bollywood',
    type: 'movie',
    url: Bollywood_Movies,
    title: 'Bollywood Movies',
    showAll: 'movie/Bollywood',
  },
  {
    id: 'south',
    type: 'movie',
    url: South_Movies,
    title: 'South Indian Movies',
    showAll: 'movie/SouthIndian',
  },
  {
    id: 'gujarati',
    type: 'movie',
    url: Gujarati_Movies,
    title: 'Gujarati Movies',
    showAll: 'movie/Gujarati',
  },
];

const InfiniteMovies = () => {
  const [currPage, setCurrPage] = useState(1);

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

  const setTrigger = useObserver(() => setCurrPage((page) => page + 1), {
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
