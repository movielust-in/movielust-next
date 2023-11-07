import Script from 'next/script';
import { Metadata } from 'next';

import Movies from '../components/Movies/HomeMovies';
import HomeCarousel from '../components/Carousels/HomeCarousel';
import { fetchTrending, fetchTrendingToday } from '../helpers/tmdb/trending';
import {
  fetchExternalIds,
  fetchTRM,
  fetchUpcomingMovies,
} from '../helpers/tmdb/movies';
import { fetchLatestSeries, fetchPopularSeries } from '../helpers/tmdb/series';
import { HomeMovies } from '../types/apiResponses';
import styles from '../styles/index.module.scss';
import Meta from '../components/Meta';
import { dashedTitle } from '../utils';
import { getImdbRatingFromDB } from '../helpers/server-only/_imdb';

async function Home() {
  const { trendingMovies, homeMovies } = await getData();

  if (!homeMovies) return null;
  if (!trendingMovies) return null;

  const structeredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: trendingMovies
      .filter((content) => content.media_type === 'movie')
      .slice(0, 10)
      .map((movie, index) => ({
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
      <Meta
        title="Home"
        description="Movielust is India's largest free streaming platform that offers a wide variety of premium TV shows, movies, anime, documentaries and even more"
        url="https://movie-lust.vercel.app"
        image="/favicon/android-icon-192x192.png"
      />

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

// SSR LOGIC
async function getData() {
  const movies = await fetchTrending();

  if (!(movies && movies.results)) return {};

  const externalIdsRes = await Promise.all(
    movies.results.map((movie) => fetchExternalIds(movie.id!, 'movie'))
  );

  const imdbIds = externalIdsRes.map(
    (externalId) => externalId.imdb_id as string
  );

  const ratingsRes = await getImdbRatingFromDB(imdbIds);
  const ratings = ratingsRes.documents;

  const trendingMovies = movies.results!.map((movie, index) => ({
    ...movie,
    imdb_rating:
      ratings.find((rating) => rating.imdb_id === imdbIds[index])?.rating || 0,
  }));

  const homeMovies: HomeMovies = await Promise.all([
    fetchTRM(),
    fetchUpcomingMovies(),
    fetchPopularSeries(),
    fetchLatestSeries(),
    fetchTrendingToday(),
  ]).then((results) => ({
    TRM: results[0],
    latestMovies: results[1],
    popularSeries: results[2],
    latestSeries: results[3],
    trendingToday: results[4],
  }));

  return { trendingMovies, homeMovies };
}

export const metadata: Metadata = {
  title: 'Home | Movielust',
  description: 'Discover and found about Movies and Shows.',
};
