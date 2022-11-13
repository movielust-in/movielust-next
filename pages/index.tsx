import Script from 'next/script';
import Movies from '../components/Movies/HomeMovies';
import TrendingCarousel from '../components/Carousels/HomeCarousel';
import { fetchTrending, fetchTrendingToday } from '../helpers/tmdb/trending';

import {
  fetchExternalIds,
  // fetchExternalIds,
  fetchTRM,
  fetchUpcomingMovies,
} from '../helpers/tmdb/movies';

// import { fetchIMDBRatings } from '../helpers/imdb';
import { MovieResult } from '../types/tmdb';
import { fetchLatestSeries, fetchPopularSeries } from '../helpers/tmdb/series';
import { HomeMovies } from '../types/apiResponses';
import styles from '../styles/index.module.scss';
import Meta from '../components/Meta';
import { dashedTitle } from '../utils';
import { fetchIMDBRatings } from '../helpers/imdb';

interface HomeProps {
  trendingMovies: (MovieResult & { imdb_rating?: number })[];
  homeMovies: HomeMovies; 
}

function Home({ trendingMovies, homeMovies }: HomeProps) {

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
          url: `https://movielust.in/movie/${movie.id}/${dashedTitle(
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
        url="https://movielust.in"
        image="/favicon/android-icon-192x192.png"
      />

      <Script
        type="application/ld+json"
        id="structered-json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structeredData) }}
      />
      <div className={`${styles.container} header_padding`}>

        <TrendingCarousel movies={trendingMovies} />
        <Movies movies={homeMovies} />
      </div>
    </>
  );
}

export default Home;

// SSR LOGIC
export const getStaticProps = async () => {
  const movies = await fetchTrending();

  if (!(movies && movies.results)) return {};

  const externalIdsRes = await Promise.all(
    movies.results.map((movie) => fetchExternalIds(movie.id!, 'movie'))
  );

  const imdbIds = externalIdsRes.map(
    (externalId) => externalId.imdb_id as string
  );

  const  ratingsRes = await fetchIMDBRatings(imdbIds)
  const ratings =  ratingsRes.data.results;

  const trendingMovies = movies.results!.map((movie,index) => (
    {
    ...movie,
    imdb_rating:ratings[index].rating,
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

  return {
    props: {
      trendingMovies,
      homeMovies,
    },
    // regenrate every 3 days
    revalidate: 259200,
  };
};
