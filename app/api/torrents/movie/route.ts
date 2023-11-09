import { ZodError, z } from 'zod';

import { catchAsync } from '../../apiHandler';
import { MovieTorrents } from '../../../../models/Movie_Torrents';
import { YTSMovieResponse } from '../../../../types/movie-torrents';

import { magnetFromHash } from './magnet-from-hash';

const YTS_Movie_Api = 'https://yts.mx/api/v2/movie_details.json';

const validationSchema = z
  .object({
    imdb_id: z.string(),
    tmdb_id: z.coerce.number().positive('Valid TMDB Id not provided.'),
  })
  .required();

export const dynamic = 'force-dynamic';

export const GET = catchAsync(
  async (request) => {
    try {
      const { searchParams } = new URL(request!.url);

      const imdb_idParam = searchParams.get('imdb_id');
      const tmdb_idParam = searchParams.get('tmdb_id');

      const { tmdb_id, imdb_id } = validationSchema.parse({
        imdb_id: imdb_idParam,
        tmdb_id: tmdb_idParam,
      });

      const existsInDB = await MovieTorrents.findOne({ tmdb_id });

      if (existsInDB) {
        return Response.json({
          status: 'success',
          data: { torrents: existsInDB.torrents },
        });
      }

      const res = await fetch(`${YTS_Movie_Api}?imdb_id=${imdb_id}`);

      if (!res.ok) {
        return Response.json(
          {
            status: 'error',
            message: res.statusText || '',
            error: 'YTS Error',
          },
          { status: res.status }
        );
      }

      const json: YTSMovieResponse = await res.json();

      const movie = json?.data?.movie;

      const torrents = movie?.torrents;

      if (!torrents || torrents.length <= 0) {
        return Response.json(
          {
            status: 'error',
            message: 'Not found!',
            error: 'Empty',
            data: { torrents: [] },
          },
          { status: 404 }
        );
      }

      const torrentsWithMagnets = torrents.map(
        ({ hash, quality, ...rest }) => ({
          hash,
          quality,
          magnet: magnetFromHash(hash, movie.title!, quality),
          ...rest,
        })
      );

      const torrentInDB = new MovieTorrents({
        imdb_id,
        tmdb_id,
        torrents: torrentsWithMagnets,
      });

      await torrentInDB.save();

      return Response.json({
        status: 'success',
        data: { torrents: torrentsWithMagnets },
      });
    } catch (err) {
      if (err instanceof ZodError) {
        throw err;
      }

      return Response.json(
        {
          status: 'error',
          message: 'Not found!',
          error: err instanceof Error ? err?.message : '',
        },
        { status: 404 }
      );
    }
  },
  { db: true }
);
