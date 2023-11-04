import tmdbClient from '../tmdbClient';
import {
  AllResponse,
  CollectionInfoResponse,
  DiscoverMovieResponse,
  MovieExternalIdsResponse,
  MovieResult,
} from '../../types/tmdb';
import { getAll } from '../Get';
import {
  COLLECTION,
  BOLLYWOOD,
  ALLBOLLYWOOD,
  SOUTH,
  SOUTHALL,
  GUJARATI,
  GUJARATIALL,
  TRM,
  UPCOMING_MOVIES,
  movieWithGenre,
  EXTERNAL_IDS,
  COMPANYMOVIES,
  COMPANYMOVIESTOP,
  CASTMOVIES,
  _DISCOVER_MOVIES,
} from '../Urls';
import { Filters } from '../../types/requestData';

import fetchAllPages from './fetchAllPages';


export const discoverMovie = (filters: Filters, page: number) => {
  let params: {} = {
    page,
    with_genres: filters.genres.join(','),
    sort_by: filters.sortBy,
  };

  if (filters.sortBy === 'vote_average.desc')
    params = {
      ...params,
      'vote_count.gte': filters.genres.length ? 1500 : 1500,
    };
  else if (filters.sortBy === 'release_date.desc')
    params = {
      ...params,
      'release_date.lte': new Date(),
      'vote_count.gte': 50,
    };

  return tmdbClient.get<DiscoverMovieResponse>(_DISCOVER_MOVIES, { params });
};

export const fetchCollection = (
  collectionId: string
): Promise<CollectionInfoResponse> =>
  new Promise((resolve, reject) => {
    tmdbClient
      .get<CollectionInfoResponse>(COLLECTION(collectionId))
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const fetchBollywood = () =>
  new Promise<MovieResult[]>((resolve, reject) => {
    tmdbClient
      .get(BOLLYWOOD)
      .then((response) => {
        resolve(response.data.results);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const fetchSouth = () =>
  new Promise<MovieResult[]>((resolve, reject) => {
    tmdbClient
      .get(SOUTH)
      .then((response) => {
        resolve(response.data.results);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const fetchGujarati = () =>
  new Promise<MovieResult[]>((resolve, reject) => {
    tmdbClient
      .get(GUJARATI)
      .then((response) => {
        resolve(response.data.results);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const fetchTRM = () =>
  new Promise<MovieResult[]>((resolve) => {
    getAll([TRM(1), TRM(2), TRM(3), TRM(4), TRM(5)], tmdbClient).then(
      (response) => {
        const results = [
          ...response[0].data.results,
          ...response[1].data.results,
          ...response[2].data.results,
          ...response[3].data.results,
          ...response[4].data.results,
        ];

        resolve(
          results
            .sort((a, b) => b.popularity - a.popularity)
            .filter((movie) => movie.vote_count > 8000)
            .slice(0, 20)
        );
      }
    );
  });

export const fetchUpcomingMovies = () =>
  new Promise<MovieResult[]>((resolve, reject) => {
    tmdbClient
      .get(UPCOMING_MOVIES)
      .then((movie) => {
        const { results } = movie.data;
        resolve(results);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const fetchMoviesOfAllGenres = () =>
  new Promise((resolve) => {
    getAll(
      [
        movieWithGenre(28),
        movieWithGenre(35),
        movieWithGenre(12),
        movieWithGenre(16),
        movieWithGenre(80),
        movieWithGenre(99),
        movieWithGenre(18),
        movieWithGenre(10751),
        movieWithGenre(14),
        movieWithGenre(36),
        movieWithGenre(27),
        movieWithGenre(10402),
        movieWithGenre(9648),
        movieWithGenre(10749),
        movieWithGenre(878),
        movieWithGenre(10770),
        movieWithGenre(53),
        movieWithGenre(10752),
        movieWithGenre(37),
      ],
      tmdbClient
    ).then((response) => {
      resolve(response);
    });
  });

export const fetchExternalIds = (
  id: string | number,
  type: string
): Promise<MovieExternalIdsResponse> =>
  new Promise((resolve, reject) => {
    (async () => {
      try {
        const res = await tmdbClient.get<MovieExternalIdsResponse>(
          EXTERNAL_IDS(id, type)
        );
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    })();
  });

export const CompaniesTopImages = (
  id: string | number
): Promise<MovieResult[]> =>
  new Promise((resolve, reject) => {
    (async () => {
      try {
        const res = await tmdbClient.get(COMPANYMOVIESTOP(id));
        if (res.status !== 200) reject();
        resolve(res.data.results);
      } catch (err) {
        reject();
      }
    })();
  });

// Production Company Movies
export const fetchCompanyMovies = (
  id: string | number
): Promise<AllResponse<MovieResult[]>> =>
  fetchAllPages((page: number) => COMPANYMOVIES(id, page));

// All South Movies
export const fetchallSouth = () =>
  fetchAllPages((page: number) => SOUTHALL(page));

// Person All Movies
export const fetchCastMovies = (
  id: string | number
): Promise<AllResponse<MovieResult[]>> =>
  fetchAllPages((page: number) => CASTMOVIES(id, page));

// All Top Rated Movies
export const fetchallTRM = () => fetchAllPages((page: number) => TRM(page));

// All Bollywood Movies
export const fetchallBollywood = (): Promise<AllResponse<MovieResult[]>> =>
  fetchAllPages((page: number) => ALLBOLLYWOOD(page));

// All Gujarati Movies
export const fetchallGujarati = () =>
  fetchAllPages((page: number) => GUJARATIALL(page));
