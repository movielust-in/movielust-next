import type { NextApiRequest, NextApiResponse } from 'next';
import { getAll } from '../../../../../helpers/Get';
import tmdbClient from '../../../../../helpers/tmdbClient';
import { SIMILAR } from '../../../../../helpers/Urls';
import { Content } from '../../../../../types/tmdb';

export default function SimilarMovies(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string;
  const type = req.query.type as string;
  const genreIds = (req.query.genres as string)
    .split(',')
    .map((g) => parseInt(g, 10));

  if (!id || !type || !genreIds)
    return {
      results: [],
    };

  res.setHeader('Cache-Control', 'public, max-age=31536000');

  const similar: Content[] = [];
  let vagueSimilar: Array<Content | undefined> = [];

  getAll<any>(
    Array.from({ length: 10 }, (_, i) => i + 1).map((page) =>
      SIMILAR(id, type, page)
    ),
    tmdbClient
  )
    .then((response) => {
      // response is array containg 10 results each result contains 20 movies
      response.forEach((score) => {
        // results is array containing 20 movies
        const { results } = score.data;
        results?.forEach((movie: any) => {
          // checking if all genre ids are present
          if (genreIds.every((genre) => movie?.genre_ids?.includes(genre))) {
            similar.push(movie);
          } else {
            vagueSimilar.push(movie);
          }
        });
      });
    })
    .then(() => {
      const filtered = Array.from(new Set(similar.map((movie) => movie.id)))
        .map((cur_id) => similar.find((movie) => movie.id === cur_id))
        .filter((movie) => movie?.id !== parseInt(id as string, 10))
        .sort(
          (chinki: any, minki: any) => minki.vote_count - chinki.vote_count
        );

      if (filtered.length < 20) {
        vagueSimilar = Array.from(
          new Set(vagueSimilar.map((movie) => movie?.id))
        )
          .map((cur_id) => vagueSimilar.find((movie) => movie?.id === cur_id))
          .filter((movie) => movie?.id !== parseInt(id as string, 10))
          .sort(
            (chinki: any, minki: any) => minki.vote_count - chinki.vote_count
          );

        res.send({
          results: [
            ...filtered,
            ...vagueSimilar.slice(1, 21 - filtered.length),
          ],
        });
      } else res.send({ results: filtered });
    })
    .catch(() => {
      res.status(500);
      res.send({ error: true });
    });
}
