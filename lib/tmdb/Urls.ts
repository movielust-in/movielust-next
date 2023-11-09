import { SERVER_URI } from '../../config';

const newDate = new Date();
let date: number | string = newDate.getDate();
let month: number | string = newDate.getMonth() + 1;
export const year = newDate.getFullYear();

if (date < 10) date = `0${date}`;

if (month < 10) month = `0${month}`;

// ---------------------------------------------- H O M E P A G E -------------------------------------------------------------------------------------
export const Top_Rated_Movies = (page: number) =>
  `/movie/top_rated?&language=en-US&page=${page}`;

export const ALLPOPULRAR_SERIES = (page: number) =>
  `/discover/tv?&language=en-US&sort_by=popularity.desc&page=${page}`;

export const Discover_Bollywood = (page: number) =>
  `/discover/movie?&sort_by=release_date.desc&page=${page}&with_original_language=hi`;

export const Discover_Gujarati = (page: number) =>
  `/discover/movie?&with_original_language=gu&language=gu&page=${page}&sort_by=popularity.desc`;

export const Discover_South = (page: number) =>
  `/discover/movie?&with_original_language=te&language=te&page=${page}&sort_by=popularity.desc`;

export const ANIME = (page: number) =>
  `/discover/tv?with_keywords=210024&with_original_language=ja&sort_by=vote_count.desc&vote_count.gte=100&page=${page}`;

// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------- D E T A I L    P A G E -------------------------------------------------------------------------------------

export const DETAIL = (id: string | number, type: string) =>
  `/${type}/${id}?append_to_response=videos,credits`;

export const SHALLOW_DETAIL = (id: string | number, type: string) =>
  `/${type}/${id}`;

export const Aggregate_Credits = (
  id: string | number,
  season: string | number
) => `/tv/${id}/season/${season}/aggregate_credits`;

// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const SIMILAR = (
  id: string | number,
  type: string,
  page: string | number
) => `/${type}/${id}/similar?&language=en-US&page=${page}`;

export const Person_Details = (id: string | number) => `/person/${id}`;

export const Person_Movie_Credits = (id: string | number) =>
  `/person/${id}/movie_credits?&language=en-US`;

export const TRENDING = `/trending/movie/week`;

export const Popular_Person = `/person/popular?&language=en-US&page=1`;

export const DISCOVER = (
  page: string | number,
  type: string,
  genre: number[]
) => {
  let baseUrl = `/discover/${type}?&language=en-US&sort_by=vote_count.desc&page=${page}`;
  if (genre.length < 0) return baseUrl;
  baseUrl += `&with_genres=${genre.join(',')}`;
  return baseUrl;
};

export const DISCOVER_MOVIES = (type: string) =>
  `/discover/${type}?language=en-US`;

// eslint-disable-next-line no-underscore-dangle
export const Discover_Movies = `/discover/movie`;

export const Collection = (id: string | number) =>
  `/collection/${id}?&language=en-US`;

export const image = (width: string | number, src: string) =>
  `https://image.tmdb.org/t/p/w${width}${src}`;

export const Content_Images = (id: string | number, type: string) =>
  `/${type}/${id}/images`;

export const SEASON = (id: string | number, season: string | number) =>
  `/tv/${id}/season/${season}?&language=en-US`;

export const COMPANIES = (id: string | number) => `/company/${id}`;

export const Discover_with_Companies = (
  id: string | number,
  page: string | number
) =>
  `/discover/movie?&language=en-US&sort_by=primary_release_date.desc&page=${page}&with_companies=${id}`;

export const Discover_with_Company_Top = (id: string | number) =>
  `/discover/movie?&language=en-US&sort_by=primary_release_date.desc&with_companies=${id}&vote_average.gte=6`;

export const Discover_with_Cast = (
  id: string | number,
  page: string | number
) =>
  `/discover/movie?&language=en-US&sort_by=primary_release_date.desc&with_people=${id}&page=${page}`;

export const Person_Tv_Credits = (id: string | number) =>
  `/person/${id}/tv_credits?&language=en-US`;

// ------------------------------------- SERVER ------------------------------------------------------------------------

// ------------------Get Magnets-----------
export const SHOW_MAGNETS = (
  id: string | number,
  showName: string,
  season: string | number,
  totalEpisodes: number
) =>
  `${SERVER_URI}/flask/v1/torrent/show/${id}/${showName}/${season}/${totalEpisodes}`;

export const MAGNET = (
  id: string | number,
  title: string,
  releaseYear: string | number
) => {
  title = title.replace(/[&/\\#,+()$~%.'":*?<>{}]/g, '');
  const url = `${SERVER_URI}/flask/v1/torrent/movie/${id}/${title
    .toLowerCase()
    .split(' ')
    .join('-')}-${releaseYear}`;

  return url;
};

export const YTS_API_TORRENTS = (tmdb_id: string | number, imdb_id: string) =>
  `${SERVER_URI}/torrent/movie/yts/${imdb_id}/${tmdb_id}`;

export const Weekly_Trending_Movies = '/trending/movie/week' as const;

export const Weekly_Trending_All =
  '/trending/all/week?page=1&language=en-US`' as const;

export const Top_Rated_Movies_No_Page = `/movie/top_rated` as const;

export const Upcoming_Movies = '/movie/upcoming?&language=en-US&page=1';

export const Bollywood_Movies = `/discover/movie?&region=IN&with_original_language=hi&primary_release_date.lte=${year}-${month}-${date}&sort_by=primary_release_date.desc`;

export const South_Movies = `/discover/movie?&with_original_language=te&sort_by=primary_release_date.desc&primary_release_date.lte=${year}-${month}-${date}`;

export const Gujarati_Movies = `/discover/movie?&with_original_language=gu&sort_by=primary_release_date.desc&primary_release_date.lte=${year}-${month}-${date}`;

export const movieWithGenre = (genreId: string | number) =>
  `/discover/movie?&with_genres=${genreId}`;

export const EXTERNAL_IDS = (id: number | number, type: 'movie' | 'tv') =>
  `/${type}/${id}/external_ids`;

export const Popular_Shows = '/tv/popular';
export const Weekly_Trending_Shows = '/trending/tv/week' as const;
export const Top_Rated_Anime = `/discover/tv?with_keywords=210024&with_original_language=ja&sort_by=vote_count.desc&vote_count.gte=1000`;

export const seriesWithGenre = (genreId: string | number) =>
  `/discover/tv?&with_genres=${genreId}`;
