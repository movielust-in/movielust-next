import { getServerSession } from 'next-auth';

import { SHALLOW_DETAIL } from '../tmdb/Urls';
import dbConnect from '../databse';
import authOptions from '../../app/api/auth/[...nextauth]/authOptions';
import { User } from '../../models/User';
import { MovieResult, TvResult } from '../../types/tmdb';
import { tmdbFetch } from '../tmdb/tmdb-fetch';

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
      tmdbFetch(`${SHALLOW_DETAIL(result.content_id, result.type)}`)
    );

    const data = await Promise.all(contentToFetch);

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
