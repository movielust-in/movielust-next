import { Genre } from '../../types/tmdb';

export enum TYPE {
  MOVIE = 'movie',
  TV = 'tv',
}

export const TMDB_BASE_PATH = 'https://api.themoviedb.org/3';

export const SORT_OPTIONS = [
  { label: 'Most Popular', value: 'popularity.desc' },
  { label: 'Top Rated', value: 'vote_average.desc' },
  { label: 'Vote Count', value: 'vote_count.desc' },
  { label: 'Latest Releases', value: 'release_date.desc' },
  { label: 'Highest Grossing', value: 'revenue.desc' },
];

export const MOVIE_GENRES: Genre[] = [
  { id: 28, name: 'Action' },
  { id: 16, name: 'Animation' },
  { id: 12, name: 'Adventure' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
  { id: 878, name: 'Science Fiction' },
  { id: 53, name: 'Thriller' },
];

export const MOVIE_GENRES_OBJ: Record<number, string> = {
  28: 'Action',
  16: 'Animation',
  12: 'Adventure',
  35: 'Comedy',
  80: 'Crime',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  10752: 'War',
  37: 'Western',
  878: 'Science Fiction',
  53: 'Thriller',
};

export const TV_GENRES: Genre[] = [
  { id: 10759, name: 'Action & Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 10762, name: 'Kids' },
  { id: 10763, name: 'News' },
  { id: 9648, name: 'Mystery' },
  { id: 10764, name: 'Reality' },
  { id: 37, name: 'Western' },
  { id: 10765, name: 'Sci-Fi & Fantasy' },
  { id: 10766, name: 'Soap' },
  { id: 10767, name: 'Talk' },
  { id: 10768, name: 'War & Politics' },
];

export const TV_GENRE_OBJ: Record<number, string> = {
  10759: 'Action & Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  10762: 'Kids',
  10763: 'News',
  9648: 'Mystery',
  10764: 'Reality',
  37: 'Western',
  10765: 'Sci-Fi & Fantasy',
  10766: 'Soap',
  10767: 'Talk',
  10768: 'War & Politics',
};
