import React, { useState, useEffect, useRef, useMemo, memo } from 'react';

import Image from 'next/image';
import dynamic from 'next/dynamic';

import { useSelector } from '../../redux';
import MovieCarousel from '../Carousels/MovieCarousel';
import ShowAllButton from '../CarouselSlices/ShowAllButton';

import { LoadingGhost } from '../../assets';
import { HomeMovies } from '../../types/apiResponses';

import styles from './HomeMovies.module.scss';
import LoadingCarousel from '../Carousels/LoadingCarousel';

const RecentCarousel = dynamic(() => import('../Carousels/RecentCarousel'));

const TOTAL_NO_CAROUSELS = 5;

interface MoviesProps {
  movies: HomeMovies;
}

function Movies({ movies }: MoviesProps) {
  const isAuthenticated = useSelector((state) => state.user.isLoggedIn);

  const ref = useRef(null);

  const [page, setPage] = useState(2);

  const options = { root: null, rootMargin: '20px', threshold: 0.25 };

  const handleObserver = (entities: any[]) => {
    const target = entities[0];
    if (target.isIntersecting) {
      if (TOTAL_NO_CAROUSELS > page) {
        setPage((currPage) => currPage + 1);
      }
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, options);
    if (ref.current) {
      observer.observe(ref.current);
    }

    const currentRef = ref.current;

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  });

  const all = useMemo(
    () => [
      <div className={styles.CarouselContainer} key="trending">
        <div className={styles.Title}>
          <p className={styles.Header}>Latest & Trending</p>
        </div>
        <MovieCarousel movies={movies.trendingToday} type="combined" />
      </div>,

      <div className={styles.CarouselContainer} key="latestmovies">
        <div className={styles.Title}>
          <p className={styles.Header}>Latest Movies</p>
        </div>
        <MovieCarousel movies={movies.latestMovies} type="movie" />
      </div>,

      <div className={styles.CarouselContainer} key="latestshows">
        <div className={styles.Title}>
          <p className={styles.Header}> Trending Shows</p>
        </div>
        <MovieCarousel movies={movies.latestSeries} type="tv" />
      </div>,

      <div className={styles.CarouselContainer} key="toprated">
        <div className={styles.Title}>
          <p className={styles.Header}>Top Rated Movies</p>
          <ShowAllButton link="/showall/movie/TopRated" label="See all" />
        </div>
        <MovieCarousel movies={movies.TRM} type="movie" />
      </div>,

      // <div className={styles.CarouselContainer} key="bollywood">
      //   <div className={styles.Title}>
      //     <p className={styles.Header}>Bollywood Movies</p>
      //     <ShowAllButton link="/showall/movie/Bollywood" label="See all" />
      //   </div>
      //   <MovieCarousel movies={movies.bollywood} type="movie" />
      // </div>,

      // <div className={styles.CarouselContainer} key="southIndian">
      //   <div className={styles.Title}>
      //     <p className={styles.Header}>South Indian Movies</p>
      //     <ShowAllButton link="/showall/movie/SouthIndian" label="See all" />
      //   </div>
      //   <MovieCarousel movies={movies.southIndian} type="movie" />
      // </div>,

      // <div className={styles.CarouselContainer} key="gujarati">
      //   <div className={styles.Title}>
      //     <p className={styles.Header}>Gujarati Movies</p>
      //     <ShowAllButton link="/showall/movie/Gujarati" label="See all" />
      //   </div>

      //   <MovieCarousel movies={movies.gujarati} type="movie" />
      // </div>,

      <div className={styles.CarouselContainer} key="popshows">
        <div className={styles.Title}>
          <p className={styles.Header}>Popular Shows</p>
          <ShowAllButton link="/showall/tv/PopularSeries" label="See all" />
        </div>
        <MovieCarousel movies={movies.popularSeries} type="tv" />
      </div>,

      // <div className={styles.CarouselContainer} key="animes">
      //   <div className={styles.Title}>
      //     <p className={styles.Header}>Top Rated Animes</p>
      //     <ShowAllButton link="/showall/tv/anime" label="See all" />
      //   </div>
      //   <MovieCarousel movies={movies.topAnimes} type="tv" />
      // </div>,
    ],
    [movies]
  );

  return false ? (
    <div className={styles.LoadingContainer}>
      <Image src={LoadingGhost} alt="Ghost is coming..." />
      <p>Loading...</p>
    </div>
  ) : (
    <div className={styles.Container}>
      {isAuthenticated ? <RecentCarousel /> : null}

      {all.slice(0, page).map((carousel) => carousel)}

      {TOTAL_NO_CAROUSELS > page && (
        <div className={styles.CarouselContainer} ref={ref}>
          <LoadingCarousel />
        </div>
      )}
    </div>
  );
}

export default memo(Movies);
