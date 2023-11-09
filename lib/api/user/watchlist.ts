import {
  ApiResonse,
  CheckPresenceInWatchlistResponse,
  WatchlistItem,
} from '../../../types/api-responses';
import { delate, get, post } from '../api-fetch';

export const addtoWatchlist = (watchlistItem: WatchlistItem) =>
  post<WatchlistItem, ApiResonse>('/api/user/watchlist', watchlistItem);

export const checkPresenceInWatchlist = (
  id: string | number,
  type: 'movie' | 'tv'
) =>
  get<CheckPresenceInWatchlistResponse>(
    `/api/user/watchlist/check-presence?content_id=${id}&type=${type}`
  );

export const removeFromWatchlist = (
  id: string | number,
  type: 'movie' | 'tv'
) => delate<ApiResonse>(`/api/user/watchlist?content_id=${id}&type=${type}`);
