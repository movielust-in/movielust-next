import { SERVER_URI } from '../config';

const newDate = new Date();
let date: number | string = newDate.getDate();
let month: number | string = newDate.getMonth() + 1;
const year = newDate.getFullYear();

if (date < 10) date = `0${date}`;

if (month < 10) month = `0${month}`;

// ---------------------------------------------- H O M E P A G E -------------------------------------------------------------------------------------
const TRM = (page: number) => `movie/top_rated?&language=en-US&page=${page}`;

const UPCOMING_MOVIES = `movie/upcoming?&language=en-US&page=1`;

const POPULRAR_SERIES = (page: number) =>
  `tv/popular?&language=en-US&page=${page}`;

const ALLPOPULRAR_SERIES = (page: number) =>
  `discover/tv?&language=en-US&sort_by=popularity.desc&page=${page}`;

const BOLLYWOOD = `discover/movie?&region=IN&with_original_language=hi&primary_release_date.lte=${year}-${month}-${date}&sort_by=primary_release_date.desc`;

const ALLBOLLYWOOD = (page: number) =>
  `discover/movie?&sort_by=release_date.desc&page=${page}&with_original_language=hi`;

const SOUTH = `discover/movie?&with_original_language=te&sort_by=primary_release_date.desc&primary_release_date.lte=${year}-${month}-${date}`;

const GUJARATI = `discover/movie?&with_original_language=gu&sort_by=primary_release_date.desc&primary_release_date.lte=${year}-${month}-${date}`;

const GUJARATIALL = (page: number) =>
  `discover/movie?&with_original_language=gu&language=gu&page=${page}&sort_by=popularity.desc`;

const SOUTHALL = (page: number) =>
  `discover/movie?&with_original_language=te&language=te&page=${page}&sort_by=popularity.desc`;

const LATEST_SHOWS = `trending/tv/week`;

const TRENDINGTODAY = `trending/all/week`;

const TR_ANIME = `discover/tv?with_keywords=210024&with_original_language=ja&sort_by=vote_count.desc&vote_count.gte=1000`;

const ANIME = (page: number) =>
  `discover/tv?with_keywords=210024&with_original_language=ja&sort_by=vote_count.desc&vote_count.gte=100&page=${page}`;

// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------- D E T A I L    P A G E -------------------------------------------------------------------------------------

const DETAIL = (id: string | number, type: string) =>
  `${type}/${id}?append_to_response=videos,credits`;

const SHALLOW_DETAIL = (id: string, type: string) => `${type}/${id}`;

const EXTERNAL_IDS = (id: string | number, type: string) =>
  `${type}/${id}/external_ids`;

const TVEXTERNAL_IDS = (id: string | number) =>
  `tv/${id}/external_ids?&language=en-US`;

const EPISODE_DETAIL = (
  id: string | number,
  season: string | number,
  episode: string | number
) => `tv/${id}/season/${season}/episode/${episode}`;

const GETALLTVCAST = (id: string | number, season: string | number) =>
  `tv/${id}/season/${season}/aggregate_credits`;

// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const movieWithGenre = (genreId: string | number) =>
  `discover/movie?&with_genres=${genreId}`;

const seriesWithGenre = (genreId: string | number) =>
  `discover/tv?&with_genres=${genreId}`;

const SIMILAR = (id: string | number, type: string, page: string | number) =>
  `${type}/${id}/similar?&language=en-US&page=${page}`;

const PERSON = (
  id: string | number
) => `person/${id}?&language=en-US&append_to_response=images,external_ids
`;

const PERSONMOVIES = (id: string | number) =>
  `person/${id}/movie_credits?&language=en-US`;

const TRENDING = `trending/movie/week`;

const POPULAR = `person/popular?&language=en-US&page=1`;

const PERSON_IMAGES = (id: string | number) => `person/${id}/images`;

const VIDEO = (id: string | number, type: string, lang: string | number) =>
  `${type}/${id}/videos?&language=${lang}`;

const DISCOVER = (page: string | number, type: string, genre: number[]) => {
  let baseUrl = `discover/${type}?&language=en-US&sort_by=vote_count.desc&page=${page}`;
  if (genre.length < 0) return baseUrl;
  baseUrl += `&with_genres=${genre.join(',')}`;
  return baseUrl;
};

export const DISCOVER_MOVIES = 'discover/movie?&language=en-US';

const GETCAST = (id: string | number, type: string) => `${type}/${id}/credits`;

const COLLECTION = (id: string | number) => `collection/${id}?&language=en-US`;

const image = (width: string | number, src: string) =>
  `https://image.tmdb.org/t/p/w${width}${src}`;

const PEOPLE_EXTERNALIDS = (id: string | number) =>
  `person/${id}/external_ids?&language=en-US`;

const SEARCH_MOVIE = (query: string) => `search/movie?&query=${query}`;

const SEARCH_TV = (query: string) => `search/tv?&query=${query}`;

const SEARCH_PERSON = (query: string) => `search/person?&query=${query}`;

const SEARCH = (query: string) =>
  `search/multi?&query=${query}&include_adult=false`;

const TVIMAGES = (id: string | number, type: string) => `${type}/${id}/images`;

const WATCH_PROVIDERS = (id: string | number, type: string) =>
  `${type}/${id}/watch/providers`;

const SEASON = (id: string | number, season: string | number) =>
  `tv/${id}/season/${season}?&language=en-US`;

const TAGGED_IMG = (id: string | number) =>
  `person/${id}/tagged_images?&language=en-US&page=1`;

const COMPANIES = (id: string | number) => `company/${id}`;

const COMPANIESIMAGES = (id: string | number) => `company/${id}/images`;

const COMPANYMOVIES = (id: string | number, page: string | number) =>
  `discover/movie?&language=en-US&sort_by=primary_release_date.desc&page=${page}&with_companies=${id}`;

const COMPANYMOVIESTOP = (id: string | number) =>
  `discover/movie?&language=en-US&sort_by=primary_release_date.desc&with_companies=${id}&vote_average.gte=6`;

const CASTMOVIES = (id: string | number, page: string | number) =>
  `discover/movie?&language=en-US&sort_by=primary_release_date.desc&with_people=${id}&page=${page}`;

const CASTTV = (id: string | number) =>
  `person/${id}/tv_credits?&language=en-US`;

const SHOW_MAGNETS = (
  id: string | number,
  showName: string,
  season: string | number,
  totalEpisodes: number
) => `${SERVER_URI}/torrent/show/${id}/${showName}/${season}/${totalEpisodes}`;

const AllAvatars = `${SERVER_URI}/avatar/getall`;

export const YTS_API_TORRENTS = (tmdb_id: string | number, imdb_id: string) =>
  `${SERVER_URI}/torrent/movie/yts/${imdb_id}/${tmdb_id}`;

const RESET_PASS = `${SERVER_URI}/auth/resetpass`;

const VERIFY_OTP = (
  email: string,
  otp: string | number,
  otp_type: string | number
) => `${SERVER_URI}/auth/verifyotp/${email}/${otp}/${otp_type}`;

const UPDATE_AVATAR = (avatarId: string | number) =>
  `${SERVER_URI}/user/update/avatar/${avatarId}`;

const GET_IMDB_RATING = (title: string, releaseYear: string | number) => {
  title = title.replace(/[&/\\#,+()$~%.'":*?<>{}]/g, '');
  const url = `${SERVER_URI}/movie/imdb-rating/${title
    .toLowerCase()
    .split(' ')
    .join('-')}-${releaseYear}`;
  return url;
};

const HINDI_TORRRENT = (
  id: string | number,
  title: string,
  releaseYear: string | number
) => {
  title = title
    .replace('-', '')
    .replace('  ', ' ')
    .replace(/[&/\\#,+()$~%.'":*?<>{}]/g, '');
  const url = `${SERVER_URI}/torrent/movie/hindi/${id}/${title
    .toLowerCase()
    .split(' ')
    .join('-')}-${releaseYear}`;
  return url;
};

const IMDB_RATING = (imdb_id: string) =>
  `${SERVER_URI}/movie/imdb-rating/${imdb_id}`;

const IMDB_RATINGS = (ids: string[]) =>
  `${SERVER_URI}/movie/imdb-ratings/${ids.join(',')}`;

const DELETE_USER = (id: string | number) => `${SERVER_URI}/user/delete/${id}`;

const ADD_TO_WATCHED = `${SERVER_URI}/user/watched/add`;

const FETCH_WATCHED = `${SERVER_URI}/user/watched/fetch`;

const RESET_OTP = `${SERVER_URI}/auth/resetotp`;

const VERIFYEMAIL_OTP = `${SERVER_URI}/auth/verifyemailotp`;

const MAGNET = (
  id: string | number,
  title: string,
  releaseYear: string | number
) => {
  title = title.replace(/[&/\\#,+()$~%.'":*?<>{}]/g, '');
  const url = `${SERVER_URI}/torrent/movie/${id}/${title
    .toLowerCase()
    .split(' ')
    .join('-')}-${releaseYear}`;

  return url;
};

const ALL_WATCHED = `${SERVER_URI}/v1/user/allwatched/fetch`;

export {
  ANIME,
  ADD_TO_WATCHED,
  FETCH_WATCHED,
  RESET_PASS,
  VIDEO,
  TR_ANIME,
  DETAIL,
  TRENDING,
  TRM,
  EPISODE_DETAIL,
  SHALLOW_DETAIL,
  UPCOMING_MOVIES,
  POPULRAR_SERIES,
  movieWithGenre,
  seriesWithGenre,
  SIMILAR,
  DISCOVER,
  COLLECTION,
  BOLLYWOOD,
  MAGNET,
  PERSON,
  PERSONMOVIES,
  PERSON_IMAGES,
  POPULAR,
  SOUTH,
  SEARCH_MOVIE,
  SEARCH_TV,
  SEARCH_PERSON,
  SEARCH,
  image,
  IMDB_RATING,
  IMDB_RATINGS,
  EXTERNAL_IDS,
  GUJARATI,
  SEASON,
  PEOPLE_EXTERNALIDS,
  TVEXTERNAL_IDS,
  SHOW_MAGNETS,
  TVIMAGES,
  ALL_WATCHED,
  WATCH_PROVIDERS,
  GET_IMDB_RATING,
  LATEST_SHOWS,
  TAGGED_IMG,
  RESET_OTP,
  VERIFYEMAIL_OTP,
  VERIFY_OTP,
  TRENDINGTODAY,
  COMPANIES,
  COMPANYMOVIES,
  COMPANIESIMAGES,
  COMPANYMOVIESTOP,
  CASTMOVIES,
  HINDI_TORRRENT,
  AllAvatars as Get_AVATARS,
  ALLPOPULRAR_SERIES,
  UPDATE_AVATAR,
  DELETE_USER,
  ALLBOLLYWOOD,
  SOUTHALL,
  GETCAST,
  CASTTV,
  GETALLTVCAST,
  GUJARATIALL,
};
