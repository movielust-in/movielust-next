import Head from "next/head";
import { GetStaticPropsContext } from "next";

import Movies from "../components/Movies/HomeMovies";
import TrendingCarousel from "../components/Carousels/HomeCarousel";

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

import { MovieResult } from "../types/tmdb";

import {
  fetchLatestSeries,
  fetchPopularSeries,
  fetchTopRatedAnimes,
} from "../helpers/tmdb/series";

import { HomeMovies } from "../types/apiResponses";

import styles from "../styles/index.module.scss";

interface HomeProps {
  trendingMovies: (MovieResult & { imdb_rating?: number })[];
  homeMovies: HomeMovies;
}

function Home({ trendingMovies, homeMovies }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home - Movielust</title>
      </Head>
      <div className={styles.container}>
        <TrendingCarousel movies={trendingMovies} />
        <Movies movies={homeMovies} />
      </div>
    </>
  );
}

export default Home;

// SSR LOGIC
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
