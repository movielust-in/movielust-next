/* eslint-disable import/no-mutable-exports */
import { Genre } from './types/tmdb';

export const TMDB_KEY = '2a7d4498c790ee971ae3369d0327d57c';

const env = process.env.NODE_ENV

let SERVER_URI: string;
let SERVER_URI_PY: string;

if (env === "production") {
  SERVER_URI_PY = 'https://movielust-py-api.onrender.com/v1';
  SERVER_URI = 'https://movielust-node-api.onrender.com';
} else {
  SERVER_URI = 'http://localhost:3001';
  SERVER_URI_PY = 'http://127.0.0.1:5000/v1';
}

export { SERVER_URI, SERVER_URI_PY };

export const TWO_EMBED = 'https://2embed.cc';

export const WEBTOR_URL =
  'https://cdn.jsdelivr.net/npm/@webtor/embed-sdk-js/dist/index.min.js';

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

export const FULL_MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
