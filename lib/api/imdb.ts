import { ImdbRatingResponse } from '../../types/api-responses';

import { get } from './api-fetch';

export const fetchIMDBRating = (imdb_id: string): Promise<ImdbRatingResponse> =>
  get(`/api/imdb-rating?imdbId=${imdb_id}`);

export const fetchIMDBRatings = (ids: string[]) =>
  get(`/api/imdb-rating?imdbId=${ids.join(',')}`);
