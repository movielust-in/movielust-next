import {
  Cast as CastType,
  Genre,
  ProductionCompany,
} from '../../../../types/tmdb';

export interface CommonData {
  id: string | number;
  title: string;
  backdrop?: string;
  poster?: string;
  overview?: string;
  prodCompanies?: ProductionCompany[];
  cast?: CastType[];
  tmdbRating?: number;
  voteCount?: number;
  genres?: Genre[];
  genreString?: string;
  original_language?: string;
  imdbId?: string;
}
