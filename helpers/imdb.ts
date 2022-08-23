import axios from 'axios';
import { IMDBRating, ImdbRatingsRes } from '../types/apiResponses';
import { IMDB_RATING, IMDB_RATINGS } from './Urls';

export const fetchIMDBRating = (imdb_id: string): Promise<IMDBRating> =>
  new Promise((resolve, reject) => {
    (async () => {
      try {
        const res = await axios.get(IMDB_RATING(imdb_id));
        if (res.status !== 200) {
          reject();
        }
        resolve(res.data);
      } catch (err) {
        reject();
      }
    })();
  });

export const fetchIMDBRatings = (ids: string[]) =>
  axios.get<ImdbRatingsRes>(IMDB_RATINGS(ids));
