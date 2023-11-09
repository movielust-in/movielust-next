import Script from 'next/script';
import { Metadata } from 'next';

import Movies from '../components/Movies/HomeMovies';
import HomeCarousel from '../components/Carousels/HomeCarousel';
import styles from '../styles/index.module.scss';
import { dashedTitle } from '../utils';
import { fetchTrendingMovies } from '../lib/tmdb/movie/fetch-trending-movies';
import { MovieResult } from '../types/tmdb';
import {
  fetchUpcomingMovies,
  fetchTopRatedMovies,
  fetchTrendingAll,
} from '../lib/tmdb/movie';
import { fetchPopularShows, fetchTrendingShows } from '../lib/tmdb/tv';

async function Home() {
  const { trendingMovies, homeMovies } = await getData();

  if (!homeMovies) return null;
  if (!trendingMovies) return null;

  const structeredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: trendingMovies
      .filter((content: any) => content.media_type === 'movie')
      .slice(0, 10)
      .map((movie: MovieResult, index: number) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Movie',
          url: `https://movie-lust.vercel.app/movie/${movie.id}/${dashedTitle(
            movie.title!
          )}`,
          name: movie.title,
          image: `https://image.tmdb.org/t/p/w200${movie.poster_path}`,
          dateCreated: movie.release_date,
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: movie.vote_average?.toString(),
            bestRating: '10',
            ratingCount: movie.vote_count?.toString(),
          },
        },
      })),
  };

  return (
    <>
      <Script
        type="application/ld+json"
        id="structered-json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structeredData) }}
      />
      <div className={`${styles.container} header_padding`}>
        <HomeCarousel movies={trendingMovies as any} />
        <Movies movies={homeMovies} />
      </div>
    </>
  );
}

export default Home;

async function getData() {
  const results = await Promise.all([
    fetchTrendingMovies(),
    fetchTopRatedMovies(),
    fetchUpcomingMovies(),
    fetchPopularShows(),
    fetchTrendingShows(),
    fetchTrendingAll(),
  ]);

  const trendingMovies: any = results[0];

  const homeMovies = {
    TRM: results[1],
    latestMovies: results[2].results,
    popularSeries: results[3],
    latestSeries: results[4].results,
    trendingToday: results[5].results,
  };

  return { trendingMovies, homeMovies };
}

export const metadata: Metadata = {
  title: 'Home | Movielust',
  description: 'Discover and found about Movies and Shows.',
};
