import { TMDB_BASE_PATH, TMDB_KEY } from '../../../../config';
import { SHALLOW_DETAIL } from '../../../../helpers/Urls';
import { DetailResponse } from '../../../../types/tmdb';

/* eslint-disable import/prefer-default-export */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const type = searchParams.get('type');

  if (!id || !type) return new Response('Bad Request!', { status: 400 });

  const detailRes = await fetch(
    `${TMDB_BASE_PATH}/${SHALLOW_DETAIL(id, type)}?api_key=${TMDB_KEY}`,
    { cache: 'force-cache' }
  );

  const details: DetailResponse = await detailRes.json();

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

  const creditsRes = await fetch(
    `${TMDB_BASE_PATH}/tv/${id}/aggregate_credits?api_key=${TMDB_KEY}`,
    { cache: 'force-cache' }
  );

  const aggregateCredits = await creditsRes.json();

  return Response.json({ details: pickedDetails, aggregateCredits });
}
