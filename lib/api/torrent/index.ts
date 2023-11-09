import { MovieTorrentResponse } from '../../../types/movie-torrents';
import { get } from '../api-fetch';

export const fetchMovieMagnets = (imdb_id: string, tmdb_id: string | number) =>
  get<MovieTorrentResponse>(
    `/api/torrents/movie?imdb_id=${imdb_id}&tmdb_id=${tmdb_id}`
  );
