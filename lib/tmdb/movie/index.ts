import {
  AllResponse,
  CollectionInfoResponse,
  MovieResult,
  MovieResultsResponse,
} from '../../../types/tmdb';
import {
  Collection,
  Discover_Bollywood,
  Discover_South,
  Discover_Gujarati,
  Top_Rated_Movies_No_Page,
  Discover_with_Companies,
  Discover_with_Company_Top,
  Discover_with_Cast,
  Upcoming_Movies,
  Weekly_Trending_All,
  Top_Rated_Movies,
} from '../Urls';
import { tmdbFetch } from '../tmdb-fetch';
import fetchAllPages from '../fetchAllPages';

export const fetchMovieCollection = (
  collectionId: string
): Promise<CollectionInfoResponse> =>
  tmdbFetch<CollectionInfoResponse>(Collection(collectionId));

export const fetchCompaniesTopMovies = (
  id: string | number
): Promise<MovieResultsResponse> => tmdbFetch(Discover_with_Company_Top(id));

// Production Company Movies
export const fetchCompanyMovies = (
  id: string | number
): Promise<AllResponse<MovieResult[]>> =>
  fetchAllPages((page: number) => Discover_with_Companies(id, page));

// All South Movies
export const fetchallSouth = () =>
  fetchAllPages((page: number) => Discover_South(page));

// Person All Movies
export const fetchCastMovies = (
  id: string | number
): Promise<AllResponse<MovieResult[]>> =>
  fetchAllPages((page: number) => Discover_with_Cast(id, page));

// All Top Rated Movies
export const fetchallTRM = () =>
  fetchAllPages((page: number) => Top_Rated_Movies(page));

// All Bollywood Movies
export const fetchallBollywood = (): Promise<AllResponse<MovieResult[]>> =>
  fetchAllPages((page: number) => Discover_Bollywood(page));

// All Gujarati Movies
export const fetchallGujarati = () =>
  fetchAllPages((page: number) => Discover_Gujarati(page));

export { fetchTrendingMovies } from './fetch-trending-movies';

export const fetchUpcomingMovies = () =>
  tmdbFetch(Upcoming_Movies, { page: '1' });

export const fetchTrendingAll = () => tmdbFetch(Weekly_Trending_All);

export const fetchTopRatedMovies = async () => {
  const promiseArr = Array.from({ length: 5 }, (_, i) =>
    tmdbFetch<MovieResultsResponse>(Top_Rated_Movies_No_Page, {
      page: `${i + 1}`,
      language: 'en-US',
    })
  );

  const res = await Promise.all(promiseArr);

  const movies: MovieResult[] = ([] as MovieResult[])
    .concat(...res.map((a) => a.results!))
    .filter((movie) => movie.vote_count! > 8000)
    .sort((a, b) => b.popularity! - a.popularity!)
    .slice(0, 20);

  return movies;
};
