export const TMDB_KEY = '2a7d4498c790ee971ae3369d0327d57c';

export const SERVER_URI =
  process.env.NODE_ENV === 'production'
    ? 'https://movielust-api-xnzw.onrender.com'
    : 'http://localhost:3001';

export const TWO_EMBED = 'https://2embed.cc';

export const TMDB_BASE_PATH = 'https://api.themoviedb.org/3';

export const SORT_OPTIONS = [
  { label: 'Most Popular', value: 'popularity.desc' },
  { label: 'Top Rated', value: 'vote_average.desc' },
  { label: 'Vote Count', value: 'vote_count.desc' },
  { label: 'Latest Releases', value: 'release_date.desc' },
  { label: 'Highest Grossing', value: 'revenue.desc' },
];

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
