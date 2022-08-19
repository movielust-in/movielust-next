import axios from '../tmdbClient';

import { TRENDING, TRENDINGTODAY } from '../Urls';

import { MixedResponse } from '../../types/tmdb';

export const fetchTrending = (): Promise<MixedResponse> =>
    new Promise((resolve, reject) => {
        axios
            .get<MixedResponse & { imdb_rating?: number }>(TRENDING)
            .then((response) => {
                resolve(response.data);
            })
            .catch((err) => {
                reject(err);
            });
    });

export const fetchTrendingToday = () =>
    new Promise((resolve, reject) => {
        (async () => {
            try {
                const res = await axios.get(TRENDINGTODAY);
                resolve(res.data.results);
            } catch {
                reject();
            }
        })();
    });
