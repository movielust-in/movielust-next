/* eslint-disable no-console */
import axios from 'axios';
import { IMDBRating, ImdbRatingsRes } from '../types/apiResponses';

export const fetchIMDBRating = (imdb_id: string): Promise<IMDBRating> =>
  new Promise((resolve, reject) => {
    (async () => {
      try {
        const res = await axios.get(`/api/imdb-rating?imdbId=${imdb_id}`);
        if (res.status !== 200) {
          reject();
        }
        resolve(res.data[0]);
      } catch (err) {
        reject();
      }
    })();
  });

export const fetchIMDBRatings = (ids: string[]) =>
  axios.get<ImdbRatingsRes>(`/api/imdb-rating?imdbId=${ids.join(',')}`);
