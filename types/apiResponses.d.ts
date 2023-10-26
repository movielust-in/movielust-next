import { MovieResult, TvResult } from './tmdb';

export interface Avatar {
  id: number;
  link: string;
}

export interface AvatarResponse {
  avatars: Avatar[];
}

export interface IMDBRating {
  imdb_id: string;
  rating: number;
  vote_count: number;
}

export interface ImdbRating {
  id: string;
  rating: number;
  vote_count: number;
}

export interface ImdbRatingsRes {
  result: boolean;
  results: ImdbRating[];
}

export interface Magnet {
  magnet?: string;
  torrent?: string;
  quality?: string;
  size?: string;
}

export interface ShowMagnet extends Magnet {
  episode: number;
}

export interface MagnetResponse {
  results: Magnet[];
}

export interface HomeMovies {
  TRM: MovieResult[];
  latestMovies: MovieResult[];
  popularSeries: TvResult[];
  latestSeries: TvResult[];
  trendingToday: MovieResult[];
}
