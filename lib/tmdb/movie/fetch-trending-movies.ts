import { getImdbRatingFromDB } from '../../../helpers/server-only/_imdb';
import { TrendingMovieResponse } from '../../../types/tmdb';
import { TYPE } from '../constants';
import { fetchExternalIds } from '../external-ids';
import { tmdbFetch } from '../tmdb-fetch';
import { Weekly_Trending_Movies } from '../Urls';

export const fetchTrendingMovies = async (): Promise<
  TrendingMovieResponse & { imdb_rating: number | Number }
> => {
  const movies = await tmdbFetch<TrendingMovieResponse>(Weekly_Trending_Movies);
  if (!(movies && movies.results)) {
    return {} as any;
  }

  const externalIdsRes = await Promise.all(
    movies.results.map((movie) => fetchExternalIds(movie.id!, TYPE.MOVIE))
  );

  const imdbIds = externalIdsRes.map(
    (externalId) => externalId.imdb_id as string
  );

  const ratingsRes = await getImdbRatingFromDB(imdbIds);
  const ratings = ratingsRes.documents;

  const trendingMovies: any = movies.results?.map((movie, index) => ({
    ...movie,
    imdb_rating:
      ratings.find((rating) => rating.imdb_id === imdbIds[index])?.rating || 0,
  }));

  return trendingMovies;
};
