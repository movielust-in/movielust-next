import { getServerSession } from 'next-auth';

import { SHALLOW_DETAIL } from '../../lib/tmdb/Urls';
import dbConnect from '../../lib/databse';
import authOptions from '../../app/api/auth/[...nextauth]/authOptions';
import { User } from '../../models/User';
import { TMDB_BASE_PATH, TMDB_KEY } from '../../config';
import { MovieResult, TvResult } from '../../types/tmdb';

const fetchWatchlist = async (): Promise<
  { content_id: string; type: string }[]
> => {
  'use server';

  await dbConnect();

  const session = await getServerSession(authOptions);

  if (!session) return [];

  const user = await User.findOne(
    { email: session.user.email },
    'watchlist -_id'
  );

  return user?.watchlist || [];
};

export const fetchContentOfWatchlist = async () => {
  try {
    const watchlist = await fetchWatchlist();

    const contentToFetch = watchlist.map((result) =>
      fetch(
        `${TMDB_BASE_PATH}/${SHALLOW_DETAIL(
          result.content_id,
          result.type
        )}&api_key=${TMDB_KEY}`,
        { cache: 'force-cache' }
      )
    );

    const allRes = await Promise.all(contentToFetch);

    const data = await Promise.all(allRes.map((res) => res.json()));

    const movie: MovieResult[] = [];
    const tv: TvResult[] = [];

    data.forEach((content) =>
      // because only movies have a "title" field
      // while tv shows have "name"
      content.title ? movie.push(content) : tv.push(content)
    );

    return {
      movie,
      tv,
    };
  } catch {
    return {
      movie: [],
      tv: [],
    };
  }
};
