import { addToWatchlist } from './addToWatchlist';
import { deleteFromWatchlist } from './deleteFromWatchlist';
import { fetchWatchlist } from './fetchWatchlist';

export const GET = fetchWatchlist;
export const POST = addToWatchlist;
export const DELETE = deleteFromWatchlist;
