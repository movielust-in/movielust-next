import { AllResponse } from '../../../types/tmdb';
import { Aggregate_Credits } from '../Urls';
import { tmdbFetch } from '../tmdb-fetch';

export const fetchCompleteShowCast = (
  id: string | number,
  totalseason: number
): Promise<AllResponse> =>
  new Promise((resolve) => {
    tmdbFetch(Aggregate_Credits(id, 1)).then((response) => {
      let uniqueCast: any = [];
      let total_pages: number;
      const pageToFetch = totalseason;
      let casts = response.cast;

      total_pages = response.total_pages;
      const { total_results } = response;

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
          results: casts,
        });
      } else {
        total_pages = total_pages < pageToFetch ? total_pages : pageToFetch;
        Promise.all(
          Array.from({ length: total_pages }, (_, i) =>
            tmdbFetch(Aggregate_Credits(id, i + 1))
          )
        )
          .then((results) => {
            casts = [];
            uniqueCast = [];

            results.forEach((result) => {
              casts = [...casts, ...result.cast];
              const key = 'id';
              uniqueCast = Array.from(
                new Map(
                  casts.map((item: { [x: string]: any }) => [item[key], item])
                ).values()
              );
            });
            casts = casts.filter(
              (value: { id: any }, index: any, self: any[]) =>
                index === self.findIndex((t: { id: any }) => t.id === value.id)
            );
          })
          .then(() => {
            resolve({
              total_results: casts.length,
              total_pages,
              results: uniqueCast,
            });
          });
      }
    });
  });
