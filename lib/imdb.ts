import { IMDBRating } from '../types/apiResponses';

export const fetchIMDBRating = (imdb_id: string): Promise<IMDBRating> =>
  fetch(`/api/imdb-rating?imdbId=${imdb_id}`).then((res) => res.json());

export const fetchIMDBRatings = (ids: string[]) =>
  fetch(`/api/imdb-rating?imdbId=${ids.join(',')}`).then((res) => res.json());
