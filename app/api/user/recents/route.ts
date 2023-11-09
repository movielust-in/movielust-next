import { addToRecents } from './add-to-recents';
import { fetchRecents } from './fetch-recents';
import { removeRecent } from './remove-recent';

export const GET = fetchRecents;
export const PUT = addToRecents;
export const DELETE = removeRecent;
