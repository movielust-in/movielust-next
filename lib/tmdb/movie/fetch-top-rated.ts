// import { MovieResult, MovieResultsResponse } from '../../../types/tmdb';
// import { tmdbFetch } from '../tmdb-fetch';
// import { Top_Rated_Movies } from '../urls';

// export const fetchTopRatedMovies = async () => {
//   const promiseArr = Array.from({ length: 5 }, (_, i) =>
//     tmdbFetch<MovieResultsResponse>(Top_Rated_Movies, {
//       page: `${i + 1}`,
//       language: 'en-US',
//     })
//   );

//   const res = await Promise.all(promiseArr);

//   const movies: MovieResult[] = ([] as MovieResult[])
//     .concat(...res.map((a) => a.results!))
//     .filter((movie) => movie.vote_count! > 8000)
//     .sort((a, b) => b.popularity! - a.popularity!)
//     .slice(0, 20);

//   return movies;
// };
