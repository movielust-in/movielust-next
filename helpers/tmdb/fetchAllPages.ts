import { AllResponse } from "../../types/tmdb";
import { getAll } from "../Get";
import tmdbClient from "../tmdbClient";

const fetchAllPages = <T = any>(
  urlGen: (page: number) => string,
  maxPages = 20
): Promise<AllResponse<T[]>> =>
  new Promise((resolve) => {
    let movies: any = [];
    let total_pages: number;
    let total_results: number;

    tmdbClient
      .get(urlGen(1))
      .then((response) => {
        movies = response.data.results;
        total_pages = response.data.total_pages;
        total_results = response.data.total_results;
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
          getAll(
            Array.from(
              { length: total_pages > maxPages ? maxPages : total_pages },
              (_, i) => urlGen(i + 1)
            ),
            tmdbClient
          )
            .then((results) => {
              movies = [];
              results.forEach((result) => {
                movies = [...movies, ...result.data.results];
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
