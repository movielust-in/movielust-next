import axios from 'axios';

import { Content, MovieResult, TvResult } from '../../types/tmdb';
import { getAll } from '../Get';
import tmdbClient from '../tmdbClient';
import { DETAIL } from '../Urls';

const fetchWatchlistRaw = (): Promise<Array<Content & { type: string }>> =>
  new Promise((resolve, reject) => {
    axios
      .get('/api/user/watchlist')
      .then((response) => {
        resolve(response.data.data.watchlist);
      })
      .catch((err) => reject(err));
  });

export const fetchWatchlist = async () =>
  new Promise<{ movies: MovieResult[]; series: TvResult[] }>(
    (resolve, reject) => {
      try {
        (async () => {
          const movies: any = [];
          const series: any = [];
          const rawWatchlist = await fetchWatchlistRaw();
          // console.log(rawWatchlist);
          rawWatchlist.forEach((result) =>
            result.type === 'movie' ? movies.push(result) : series.push(result)
          );

          const movieList = await getAll(
            movies.map((movie: { content_id: string; type: string }) =>
              DETAIL(movie.content_id, movie.type)
            ),
            tmdbClient
          );
          const seriesList = await getAll(
            series.map((show: { content_id: string; type: string }) =>
              DETAIL(show.content_id, show.type)
            ),
            tmdbClient
          );
          resolve({
            movies: movieList.map((movie) => movie.data),
            series: seriesList.map((show) => show.data),
          });
        })();
      } catch {
        reject();
      }
    }
  );
