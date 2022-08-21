import { useEffect } from "react";
import styled from "@emotion/styled";
import Helmet from "next/head";

import { useDispatch } from "../redux";

import TrendingCarousel from "../components/Carousels/HomeCarousel";
import Footer from "../components/UI/Footer";
import Movies from "../components/Movies/HomeMovies";

import { setCurrentPage } from "../redux/reducers/nav.reducer";
import { GetStaticProps, GetStaticPropsContext } from "next";
import { fetchTrending, fetchTrendingToday } from "../helpers/tmdb/trending";
import {
  fetchBollywood,
  fetchExternalIds,
  fetchGujarati,
  fetchSouth,
  fetchTRM,
  fetchUpcomingMovies,
} from "../helpers/tmdb/movies";
import { fetchIMDBRatings } from "../helpers/imdb";
import { MovieResult, TvResult } from "../types/tmdb";
import {
  fetchLatestSeries,
  fetchPopularSeries,
  fetchTopRatedAnimes,
} from "../helpers/tmdb/series";
import { HomeMovies } from "../types/apiResponses";

interface HomeProps {
  trendingMovies: (MovieResult & { imdb_rating?: number })[];
  homeMovies: HomeMovies;
}

function Home({ trendingMovies, homeMovies }: HomeProps) {
  const dispatch = useDispatch();

  console.log({ trendingMovies, homeMovies });

  useEffect(() => {
    document.title = "Home - Movielust | Latest Movies and TV Shows";
    dispatch(setCurrentPage("home"));
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Home - Movielust</title>
      </Helmet>
      <Container>
        <TrendingCarousel movies={trendingMovies} />
        <Movies movies={homeMovies} />
      </Container>
    </>
  );
}

export default Home;

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const movies = await fetchTrending();

  if (!(movies && movies.results)) return;

  const externalIdsRes = await Promise.all(
    movies.results.map((movie) => fetchExternalIds(movie.id!, "movie"))
  );

  const imdbIds = externalIdsRes.map(
    (external_id) => external_id.imdb_id as string
  );

  const ratingsRes = await fetchIMDBRatings(imdbIds);

  const ratings = ratingsRes.data.results;

  const trendingMovies = movies.results!.map((movie, index) => ({
    ...movie,
    imdb_rating: ratings[index].rating,
  }));

  const homeMovies = await Promise.all([
    fetchTRM(),
    fetchUpcomingMovies(),
    fetchPopularSeries(),
    fetchBollywood(),
    fetchSouth(),
    fetchLatestSeries(),
    fetchTrendingToday(),
    fetchTopRatedAnimes(),
    fetchGujarati(),
  ]).then((results) => ({
    TRM: results[0],
    latestMovies: results[1],
    popularSeries: results[2],
    bollywood: results[3],
    southIndian: results[4],
    latestSeries: results[5],
    trendingToday: results[6],
    topAnimes: results[7],
    gujarati: results[8],
  }));

  return {
    props: {
      trendingMovies,
      homeMovies,
    },
    // regenrate every 3 days
    revalidate: 259200,
  };
};

const Container = styled.div`
  position: relative;
  min-height: calc(100vh - 65px);
  margin-bottom: 20px;
  overflow-x: hidden;
  overflow-y: hidden;
  @media (max-width: 724px) {
    padding: 10px calc(3.5vw + 5px);
  }
`;
