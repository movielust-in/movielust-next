import { Metadata } from 'next';

import { fetchContentOfWatchlist } from '../../lib/user/watchlist';

import View from './view';

export default async function Watchlist({
  searchParams,
}: {
  searchParams: { view?: 'movie' | 'tv' };
}) {
  const watchlist = await fetchContentOfWatchlist();

  let view = searchParams.view || 'movie';

  if (view !== 'movie' && view !== 'tv') view = 'movie';

  return <View watchlist={watchlist} view={view} />;
}

export const metadata: Metadata = {
  title: 'Watchlist',
  description: 'Add your favourite movies and shows to Watchlist.',
};
