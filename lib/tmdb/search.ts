import { SearchMultiResponse } from '../../types/tmdb';

import { tmdbFetch } from './tmdb-fetch';

const URL = (query: string) =>
  `/search/multi?&query=${query}&include_adult=false`;

const search = (query: string): Promise<SearchMultiResponse> =>
  tmdbFetch<SearchMultiResponse>(URL(query));

export default search;
