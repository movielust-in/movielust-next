import React, { useState, useEffect, useRef, useMemo, memo } from "react";
import styled from "@emotion/styled";
import { useSelector } from "../../redux";
import MovieCarousel from "../Carousels/MovieCarousel";
import ShowAllButton from "../CarouselSlices/ShowAllButton";

// import {
//   fetchTRM,
//   fetchUpcomingMovies,
//   fetchBollywood,
//   fetchSouth,
//   fetchGujarati,
// } from "../../helpers/tmdb/movies";

// import {
//   fetchPopularSeries,
//   fetchLatestSeries,
//   fetchTopRatedAnimes,
// } from "../../helpers/tmdb/series";

// import { fetchTrendingToday } from "../../helpers/tmdb/trending";

// import { setHomeMovies } from "../../redux/reducers/movie.reducer";

import { LoadingGhost } from "../../assets";
import Image from "next/image";
import { HomeMovies } from "../../types/apiResponses";

import styles from "./HomeMovies.module.scss";

const RecentCarousel = React.lazy(() => import("../Carousels/RecentCarousel"));

const TOTAL_NO_CAROUSELS = 9;

interface MoviesProps {
  movies: HomeMovies;
}

function Movies({ movies }: MoviesProps) {
  // const dispatch = useDispatch();

  // const movies = useSelector((state) => state.movie.homeMovies);

  const isAuthenticated = useSelector((state) => state.user.isLoggedIn);

  // useEffect(() => {
  //   const fetchAll = async () => {
  //     setIsLoading(true);
  //     Promise.all([
  //       fetchTRM(),
  //       fetchUpcomingMovies(),
  //       fetchPopularSeries(),
  //       fetchBollywood(),
  //       fetchSouth(),
  //       fetchLatestSeries(),
  //       fetchTrendingToday(),
  //       fetchTopRatedAnimes(),
  //       fetchGujarati(),
  //     ]).then((results) => {
  //       const homeMovies = {
  //         TRM: results[0],
  //         latestMovies: results[1],
  //         popularSeries: results[2],
  //         bollywood: results[3],
  //         southIndian: results[4],
  //         latestSeries: results[5],
  //         trendingToday: results[6],
  //         topAnimes: results[7],
  //         gujarati: results[8],
  //         set: true,
  //       };

  //       dispatch(setHomeMovies(homeMovies));

  //       setIsLoading(false);
  //       const date = new Date();
  //       const obj = {
  //         homeMovies,
  //         exp: date.setHours(date.getHours() + 23),
  //       };
  //       localStorage.homeMovies = JSON.stringify(obj);
  //     });
  //   };

  //   if (!movies.set) {
  //     if (localStorage.homeMovies !== undefined) {
  //       const obj = JSON.parse(localStorage.homeMovies);
  //       const { exp } = obj;
  //       if (new Date() > new Date(exp)) fetchAll();
  //       else dispatch(setHomeMovies(obj.homeMovies));
  //     } else {
  //       fetchAll();
  //     }
  //   } else {
  //     setIsLoading(false);
  //   }
  // }, [movies.set, dispatch]);

  const ref = useRef(null);

  const [page, setPage] = useState(2);

  const options = { root: null, rootMargin: "20px", threshold: 1.0 };

  const handleObserver = (entities: any[]) => {
    const target = entities[0];
    if (target.isIntersecting) {
      if (TOTAL_NO_CAROUSELS > page) {
        setPage((currPage) => currPage + 6);
      }
    }
  };

  const loadMore = () => {
    setPage((currPage) => currPage + 6);
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
          <div className={styles.Header}>Latest & Trending</div>
        </div>
        <MovieCarousel movies={movies.trendingToday} type="combined" />
      </div>,

      <div className={styles.CarouselContainer} key="latestmovies">
        <div className={styles.Title}>
          <div className={styles.Header}>Latest Movies</div>
        </div>
        <MovieCarousel movies={movies.latestMovies} type="movie" />
      </div>,

      <div className={styles.CarouselContainer} key="latestshows">
        <div className={styles.Title}>
          <div className={styles.Header}> Trending Shows</div>
        </div>
        <MovieCarousel movies={movies.latestSeries} type="tv" />
      </div>,

      <div className={styles.CarouselContainer} key="toprated">
        <div className={styles.Title}>
          <div className={styles.Header}>Top Rated Movies</div>
          <ShowAllButton link="/showall/movie/TopRated" label="See all" />
        </div>
        <MovieCarousel movies={movies.TRM} type="movie" />
      </div>,

      <div className={styles.CarouselContainer} key="bollywood">
        <div className={styles.Title}>
          <div className={styles.Header}>Bollywood Movies</div>
          <ShowAllButton link="/showall/movie/Bollywood" label="See all" />
        </div>
        <MovieCarousel movies={movies.bollywood} type="movie" />
      </div>,

      <div className={styles.CarouselContainer} key="southIndian">
        <div className={styles.Title}>
          <div className={styles.Header}>South Indian Movies</div>
          <ShowAllButton link="/showall/movie/SouthIndian" label="See all" />
        </div>
        <MovieCarousel movies={movies.southIndian} type="movie" />
      </div>,

      <div className={styles.CarouselContainer} key="gujarati">
        <div className={styles.Title}>
          <div className={styles.Header}>Gujarati Movies</div>
          <ShowAllButton link="/showall/movie/Gujarati" label="See all" />
        </div>

        <MovieCarousel movies={movies.gujarati} type="movie" />
      </div>,

      <div className={styles.CarouselContainer} key="popshows">
        <div className={styles.Title}>
          <div className={styles.Header}>Popular Shows</div>
          <ShowAllButton link="/showall/tv/PopularSeries" label="See all" />
        </div>
        <MovieCarousel movies={movies.popularSeries} type="tv" />
      </div>,

      <div className={styles.CarouselContainer} key="animes">
        <div className={styles.Title}>
          <div className={styles.Header}>Top Rated Animes</div>
          <ShowAllButton link="/showall/tv/anime" label="See all" />
        </div>
        <MovieCarousel movies={movies.topAnimes} type="tv" />
      </div>,
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
        <button className={styles.Trigger} ref={ref} onClick={loadMore}>
          Loading...
        </button>
      )}
    </div>
  );
}

export default memo(Movies);
