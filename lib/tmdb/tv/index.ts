import {
  DiscoverMovieResponse,
  DiscoverTvResponse,
  TvImagesResponse,
  TvSeasonResponse,
  TvResult,
  TvResultsResponse,
} from '../../../types/tmdb';
import {
  Content_Images,
  SEASON,
  ALLPOPULRAR_SERIES,
  ANIME,
  DISCOVER,
  Popular_Shows,
  Weekly_Trending_Shows,
} from '../Urls';
import { tmdbFetch } from '../tmdb-fetch';
import fetchAllPages from '../fetchAllPages';

export { fetchCompleteShowCast } from './fetch-complete-show-cast';

export const fetchImages = (
  id: string | number,
  type: string
): Promise<TvImagesResponse> => tmdbFetch(Content_Images(id, type));

export const fetchSeason = (
  id: string,
  seasonNumber: number
): Promise<TvSeasonResponse> => tmdbFetch(SEASON(id, seasonNumber));

export const fetchAllPopularSeries = () =>
  fetchAllPages((page: number) => ALLPOPULRAR_SERIES(page));

export const fetchAllAnimes = () =>
  fetchAllPages((page: number) => ANIME(page));

export const discover = (
  genre: number[],
  type: string
): Promise<DiscoverMovieResponse & DiscoverTvResponse> =>
  fetchAllPages((page: number) => DISCOVER(page, type, genre)) as any;

export const fetchTrendingShows = () => tmdbFetch(Weekly_Trending_Shows);

export const fetchPopularShows = async () => {
  const promiseArr = Array.from({ length: 5 }, (_, i) =>
    tmdbFetch<TvResultsResponse>(Popular_Shows, {
      page: `${i + 1}`,
      language: 'en-US',
    })
  );

  const res = await Promise.all(promiseArr);

  const shows: TvResult[] = ([] as TvResult[])
    .concat(...res.map((a) => a.results!))
    .sort((a, b) => b.popularity! - a.popularity!)
    .slice(0, 20);

  return shows;
};
