import { getImdbRatingFromDB } from '../../../helpers/server-only/_imdb';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
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
  if (!process.env.MONGO_DATA_API_KEY)
    return new Response(
      JSON.stringify({ status: 'error', message: 'Internal Serer Error!' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

  imdbId = (imdbId as string).split(',');

  try {
    const data = await getImdbRatingFromDB(imdbId);
    return Response.json(data.documents);
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: 'success',
        message: 'Something Went wrong',
        error,
      }),
      {
        status: 500,
        statusText: 'Internal Server Error',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
