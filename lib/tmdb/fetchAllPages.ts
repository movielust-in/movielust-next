import { AllResponse } from '../../types/tmdb';

import { tmdbFetch } from './tmdb-fetch';

const fetchAllPages = async <T = any>(
  urlGen: (page: number) => string,
  maxPages = 20
): Promise<AllResponse<T[]>> =>
  new Promise((resolve) => {
    let movies: any = [];
    let total_pages: number;
    let total_results: number;

    tmdbFetch(urlGen(1))
      .then((response) => {
        movies = response.results;
        total_pages = response.total_pages;
        total_results = response.total_results;
      })
      .then(() => {
        if (total_results === 0) {
          resolve({
            total_results: 0,
            total_pages: 0,
            results: [],
          });
        } else if (total_pages === 1) {
          resolve({
            total_results,
            total_pages,
            results: movies,
          });
        } else {
          Promise.all(
            Array.from(
              { length: total_pages > maxPages ? maxPages : total_pages },
              (_, i) => tmdbFetch(urlGen(i + 1))
            )
          )
            .then((results) => {
              movies = [];
              results.forEach((result) => {
                movies = [...movies, ...result.results];
              });
            })
            .then(() => {
              resolve({
                total_results: movies.length,
                total_pages,
                results: movies,
              });
            });
        }
      });
  });

export default fetchAllPages;
