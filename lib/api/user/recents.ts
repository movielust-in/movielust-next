import { IRecentItem } from '../../../types/api-responses';
import { put } from '../api-fetch';

export const addToRecents = (recentItem: IRecentItem) =>
  put('/api/user/recents', recentItem);
