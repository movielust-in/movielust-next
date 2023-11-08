import { MovieExternalIdsResponse } from '../../types/tmdb';

import { TYPE } from './constants';
import { tmdbFetch } from './tmdb-fetch';
import { EXTERNAL_IDS } from './movie/urls';

export const fetchExternalIds = (id: number, type: TYPE) =>
  tmdbFetch<MovieExternalIdsResponse>(EXTERNAL_IDS(id, type));
