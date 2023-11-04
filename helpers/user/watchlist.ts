import axios from 'axios';
import { toast } from 'react-toastify';
import { SERVER_URI } from '../../config';
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

export const addToWatchlist = (id: number, type: string) =>
  new Promise((resolve, reject) => {
    const token = localStorage.getItem('movielust_user');

    if (id && type && token && token !== '') {
      axios
        .post(
          `${SERVER_URI}/user/watchlist/add`,
          {
            content_id: id,
            type,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (response.status === 201 && response.data.success === true) {
            resolve('Added to watchlist.');
          } else if (
            response.status === 202 &&
            response.data.message === 'Already Exists'
          ) {
            resolve('Already in watchlist');
          } else {
            resolve('Something went wrong!');
          }
        })
        .catch((error) => {
          reject(error);
        });
    } else {
      reject();
    }
  });

export const removeFromWL = (id: string | number, type: string) =>
  new Promise((resolve, reject) => {
    axios
      .delete(`${SERVER_URI}/user/watchlist`, {
        data: { content_id: id, type },
      })
      .then((response) => {
        if (response.status === 200) {
          toast('Removed from Watchlist');
          resolve(true);
        } else {
          reject();
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
