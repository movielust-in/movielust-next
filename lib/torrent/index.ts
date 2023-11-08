import { YTS_API_TORRENTS } from '../tmdb/Urls';

export const fetchMagnetsfromYTSapi = (
  imdb_id: string,
  tmdb_id: string | number
) => fetch(YTS_API_TORRENTS(tmdb_id, imdb_id)).then((res) => res.json());
