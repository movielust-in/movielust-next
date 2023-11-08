import { SHALLOW_DETAIL } from '../../../../lib/tmdb/Urls';
import { tmdbFetch } from '../../../../lib/tmdb/tmdb-fetch';
import { catchAsync } from '../../apiHandler';

/* eslint-disable import/prefer-default-export */

export const GET = catchAsync(async (request) => {
  const { searchParams } = new URL(request!.url);
  const id = searchParams.get('id');
  const type = searchParams.get('type');

  if (!id || !type)
    return new Response(
      JSON.stringify({ status: 'error', message: 'Bad Request!' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );

  const details = await tmdbFetch(`${SHALLOW_DETAIL(id, type)}`);

  const pickedDetails = (({
    name,
    backdrop_path,
    genres,
    homepage,
    poster_path,
  }) => ({
    id,
    name,
    backdrop_path,
    genres,
    homepage,
    poster_path,
  }))(details);

  const aggregateCredits = await tmdbFetch(`/tv/${id}/aggregate_credits`);

  return Response.json({
    status: 'success',
    data: { details: pickedDetails, aggregateCredits },
  });
});
