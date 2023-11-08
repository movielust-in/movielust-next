import { MovieExternalIdsResponse } from '../../types/tmdb';

import { tmdbFetch } from './tmdb-fetch';
import { EXTERNAL_IDS } from './Urls';

export const fetchExternalIds = (id: number, type: 'movie' | 'tv') =>
  tmdbFetch<MovieExternalIdsResponse>(EXTERNAL_IDS(id, type));
