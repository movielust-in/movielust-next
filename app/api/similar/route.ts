import { TMDB_BASE_PATH, TMDB_KEY } from '../../../config';
import { SIMILAR } from '../../../helpers/Urls';
import { Content } from '../../../types/tmdb';
import { catchAsync } from '../apiHandler';

export const GET = catchAsync(async (request) => {
  const { searchParams }: any = new URL(request!.url);
  const id: string | undefined = searchParams.get('id');
  const type: string | undefined = searchParams.get('type');
  const genres: string | undefined = searchParams.get('genres');
  const lang: string | undefined = searchParams.get('lang');

  if (!id || !type || !genres || !lang)
    return new Response(
      JSON.stringify({ status: 'success', message: 'Bad Request' }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

  const genreIds = genres.split(',').map((a) => parseInt(a, 10));

  const PAGES_TO_FETCH = 10;

  const urlGen = (page: number) =>
    lang === 'en'
      ? `${TMDB_BASE_PATH}/${SIMILAR(id, type, page)}&api_key=${TMDB_KEY}`
      : `${TMDB_BASE_PATH}/discover/${type}/?with_original_language=${lang}&with_genres=${genres}&page=${page}&api_key=${TMDB_KEY}`;

  const promises = Array.from({ length: PAGES_TO_FETCH }, (_, i) =>
    fetch(urlGen(i + 1))
  );

  const promiseAllRes = await Promise.allSettled(promises);

  const settled = await Promise.all(
    promiseAllRes
      .filter((res) => res.status === 'fulfilled')
      .map((res: any) => res.value.json())
  );

  const results = [].concat(
    ...settled
      .map((r) => r.results)
      .sort((chinki: any, minki: any) => minki.vote_count - chinki.vote_count)
  );

  let similar: Content[] = [];
  const vaguelySimilar: Content[] = [];

  if (lang === 'en') {
    results.forEach((content: Content) => {
      if (genreIds.every((genreId) => content.genre_ids?.includes(genreId)))
        similar.push(content);
      else vaguelySimilar.push(content);
    });

    if (similar.length >= 20) similar.length = 20;
    else {
      similar = [...similar, ...vaguelySimilar.slice(1, 21 - similar.length)];
    }
  }

  return Response.json({
    status: 'success',
    data: {
      results: lang === 'en' ? similar : results.slice(0, 20),
    },
  });
});
