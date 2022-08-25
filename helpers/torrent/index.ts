import axios from 'axios';
import { MagnetResponse, ShowMagnet } from '../../types/apiResponses';
import { get } from '../Get';

import { SHOW_MAGNETS, MAGNET, YTS_API_TORRENTS } from '../Urls';

export const fetchShowMagnets = (
  id: string | number,
  show_name: string,
  season: string | number,
  total_episodes: number
) =>
  new Promise<ShowMagnet[][]>((resolve, reject) => {
    (async () => {
      try {
        const res = await get(
          SHOW_MAGNETS(id, show_name, season, total_episodes)
        );
        if (res.status !== 200) reject();
        if (res.data.success === false) reject();
        resolve(res.data.results);
      } catch {
        reject();
      }
    })();
  });

export const fetchMagnets = (
  id: string | number,
  title: string,
  year: string | number
): Promise<MagnetResponse> =>
  new Promise((resolve, reject) => {
    axios
      .get<MagnetResponse>(MAGNET(id, title, year))
      .then((response) => {
        resolve(response.data);
      })
      .catch(() => {
        reject();
      });
  });

export const fetchMagnetsfromYTSapi = (
  imdb_id: string,
  tmdb_id: string | number
) => axios.get(YTS_API_TORRENTS(tmdb_id, imdb_id));
