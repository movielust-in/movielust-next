'use client';

import React, { useState, memo } from 'react';
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';

import MovieCarousel from '../Carousels/MovieCarousel';
import ShowAllButton from '../CarouselSlices/ShowAllButton';
import useObserver from '../../hooks/useObserver';
import { MovieResult, TvResult } from '../../types/tmdb';
import Tooltip from '../Movie-Card-Tooltip/CardTooltip';

import styles from './HomeMovies.module.scss';

const RecentCarousel = dynamic(() => import('../Carousels/RecentCarousel'));
const InfiniteMovies = dynamic(() => import('./InfiniteMovies'));

interface IHomeMovies {
  TRM: MovieResult[];
  latestMovies: MovieResult[];
  popularSeries: TvResult[];
  latestSeries: TvResult[];
  trendingToday: MovieResult[];
}

interface MoviesProps {
  movies: IHomeMovies;
}

function Movies({ movies }: MoviesProps) {
  const [showInfinite, setShowInfinite] = useState(false);

  const observer = useObserver(() => setShowInfinite(true), { threshold: 0.1 });

  const { status } = useSession();

  return (
    <div className={styles.Container}>
      <Tooltip />

      {status === 'authenticated' ? <RecentCarousel /> : null}

      <div className={styles.CarouselContainer} key="trending">
        <div className={styles.Title}>
          <p className={styles.Header}>Latest & Trending</p>
        </div>
        <MovieCarousel movies={movies.trendingToday} type="combined" />
      </div>

      <div className={styles.CarouselContainer} key="latestmovies">
        <div className={styles.Title}>
          <p className={styles.Header}>Latest Movies</p>
        </div>
        <MovieCarousel movies={movies.latestMovies} type="movie" />
      </div>

      <div className={styles.CarouselContainer} key="latestshows">
        <div className={styles.Title}>
          <p className={styles.Header}> Trending Shows</p>
        </div>
        <MovieCarousel movies={movies.latestSeries} type="tv" />
      </div>

      <div className={styles.CarouselContainer} key="toprated">
        <div className={styles.Title}>
          <p className={styles.Header}>Top Rated Movies</p>
          <ShowAllButton link="/showall/movie/TopRated" label="See all" />
        </div>
        <MovieCarousel movies={movies.TRM} type="movie" />
      </div>

      <div className={styles.CarouselContainer} key="popularShows">
        <div className={styles.Title}>
          <p className={styles.Header}>Popular Shows</p>
          <ShowAllButton link="/showall/movie/PopularSeries" label="See all" />
        </div>
        <MovieCarousel movies={movies.popularSeries} type="tv" />
      </div>

      {showInfinite ? <InfiniteMovies /> : <div ref={observer} />}
    </div>
  );
}

export default memo(Movies);
