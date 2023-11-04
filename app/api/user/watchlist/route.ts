import { addToWatchlist } from './add-to-watchlist';
import { deleteFromWatchlist } from './delete-from-watchlits';
import { fetchWatchlist } from './fetch-watchlist';

export const GET = fetchWatchlist;
export const POST = addToWatchlist;
export const DELETE = deleteFromWatchlist;
