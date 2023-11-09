import { ProductionCompany } from '../../types/tmdb';

import { COMPANIES } from './Urls';
import { tmdbFetch } from './tmdb-fetch';

export const fetchCompanies = (id: string): Promise<ProductionCompany> =>
  tmdbFetch<ProductionCompany>(COMPANIES(id));
