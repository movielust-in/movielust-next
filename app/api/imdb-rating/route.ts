import { getImdbRatingFromDB } from '../../../helpers/server-only/_imdb';
import { catchAsync } from '../apiHandler';

export const GET = catchAsync(async (request) => {
  const { searchParams } = new URL(request!.url);
  let imdbId: string | string[] | null = searchParams.get('imdbId');

  if (!imdbId)
    return new Response(
      JSON.stringify({
        status: 'error',
        message: 'Bad Request!',
        error: 'Missing IMDB id in parameter.',
      }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

  imdbId = (imdbId as string).split(',');

  const data = await getImdbRatingFromDB(imdbId);
  return Response.json({ status: 'success', data: data.documents });
});
