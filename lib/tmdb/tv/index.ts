import { tmdbFetch } from '../tmdb-fetch';
import { TvResult, TvResultsResponse } from '../../../types/tmdb';

import { Popular_Shows, Weekly_Trending_Shows } from './urls';

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
