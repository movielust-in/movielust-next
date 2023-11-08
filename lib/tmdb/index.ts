import { tmdbFetch } from './tmdb-fetch';

export const getContentDetails = (id: string | number, type: 'movie' | 'tv') =>
  tmdbFetch(`/${type}/${id}`, {
    append_to_response: ['videos', 'credits'].toString(),
  });

export const getVideosByLanguage = (
  id: string | number,
  type: 'movie' | 'tv',
  language: string
) => tmdbFetch(`/${type}/${id}/videos?&language=${language}`);
