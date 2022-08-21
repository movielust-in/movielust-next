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

import { ColorSpinner, LoadingGhost } from "../../assets";
import Image from "next/image";
import { HomeMovies } from "../../types/apiResponses";

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
      <CarouselContainer key="trending">
        <Header>Latest & Trending</Header>
        <MovieCarousel movies={movies.trendingToday} type="combined" />
      </CarouselContainer>,

      <CarouselContainer key="latestmovies">
        <Header>Latest Movies</Header>
        <MovieCarousel movies={movies.latestMovies} type="movie" />
      </CarouselContainer>,

      <CarouselContainer key="latestshows">
        <Header> Trending Shows</Header>
        <MovieCarousel movies={movies.latestSeries} type="tv" />
      </CarouselContainer>,

      <CarouselContainer key="toprated">
        <Title>
          <Header>Top Rated Movies</Header>
          <ShowAllButton link="/showall/movie/TopRated" label="See all" />
        </Title>
        <MovieCarousel movies={movies.TRM} type="movie" />
      </CarouselContainer>,

      <CarouselContainer key="bollywood">
        <Title>
          <Header>Bollywood Movies</Header>
          <ShowAllButton link="/showall/movie/Bollywood" label="See all" />
        </Title>
        <MovieCarousel movies={movies.bollywood} type="movie" />
      </CarouselContainer>,

      <CarouselContainer key="southIndian">
        <Title>
          <Header>South Indian Movies</Header>
          <ShowAllButton link="/showall/movie/SouthIndian" label="See all" />
        </Title>
        <MovieCarousel movies={movies.southIndian} type="movie" />
      </CarouselContainer>,

      <CarouselContainer key="gujarati">
        <Title>
          <Header>Gujarati Movies</Header>
          <ShowAllButton link="/showall/movie/Gujarati" label="See all" />
        </Title>

        <MovieCarousel movies={movies.gujarati} type="movie" />
      </CarouselContainer>,

      <CarouselContainer key="popshows">
        <Title>
          <Header>Popular Shows</Header>
          <ShowAllButton link="/showall/tv/PopularSeries" label="See all" />
        </Title>
        <MovieCarousel movies={movies.popularSeries} type="tv" />
      </CarouselContainer>,

      <CarouselContainer key="animes">
        <Title>
          <Header>Top Rated Animes</Header>
          <ShowAllButton link="/showall/tv/anime" label="See all" />
        </Title>
        <MovieCarousel movies={movies.topAnimes} type="tv" />
      </CarouselContainer>,
    ],
    [movies]
  );

  return false ? (
    <LoadingContainer>
      <Image src={LoadingGhost} alt="Ghost is coming..." />
      <p>Loading...</p>
    </LoadingContainer>
  ) : (
    <Container>
      {isAuthenticated ? <RecentCarousel /> : null}

      {all.slice(0, page).map((carousel) => carousel)}

      {TOTAL_NO_CAROUSELS > page && (
        <Trigger ref={ref} onClick={loadMore}>
          <ColorSpinner alt="loading" width="50px" />
        </Trigger>
      )}
    </Container>
  );
}

export default memo(Movies);

const Container = styled.div`
  @media (max-width: 724px) {
    h2 {
      font-size: 15px;
    }
  }
  @media (min-width: 724px) {
    padding: 0 calc(3vw);
  }
`;
const Header = styled.h2`
  font-weight: 500;
  font-size: 20px;
  text-transform: none;
  text-overflow: ellipsis;
  letter-spacing: 0.5px;
  overflow: hidden;

  @media (orientation: landscape) and (min-width: 600px) and (max-width: 896px) {
    margin: 5px 0 5px 0;
    padding: 0;
    font-size: 20px;
  }
`;

const CarouselContainer = styled.div`
  margin-top: 15px;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  z-index: -1;

  h2 {
    text-align: start;
  }
  p {
    cursor: pointer;
    font-weight: 700;
    margin-right: 20px;
    margin-top: 20px;
    transition: color 1s, font-size 0.5s;

    &:hover {
      color: greenyellow;
      transition: color 0.5s;
      transition: all 1s;
    }
  }
  @media (max-width: 724px) {
    margin: 30px 0 10px 0;
    h2 {
      font-size: 15px;
      padding: 0;
    }
    p {
      font-weight: 700;
      font-size: 12px;
      cursor: pointer;
      margin-top: 15px;
    }
    &:hover {
      transition: none;
    }
  }
  @media (orientation: landscape) and (min-width: 600px) and (max-width: 896px) {
    margin: 0;
    h2 {
      padding: 0;
      margin: 0;
    }
    p {
      font-weight: 500;
      font-size: 15px;
      cursor: pointer;
      margin-top: 0px;
    }
  }
`;

const LoadingContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  width: 100vw;
  img {
    filter: drop-shadow(0 0 50px #bbdefb);
  }
`;

const Trigger = styled.button`
  align-items: center;
  background-color: transparent;
  border: none;
  color: white;
  display: flex;
  flex-direction: column;
  font-size: 0;
  justify-content: center;
  margin-bottom: 15px;
  padding: 7px 11px;
  text-align: center;
  width: 100%;
  img {
    width: 100px;
  }

  @media (max-width: 724px) {
    font-size: 15px;
  }
`;
