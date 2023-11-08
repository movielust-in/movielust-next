import { MOVIE_GENRES_OBJ, TV_GENRE_OBJ } from '../lib/tmdb/constants';
import { Genre } from '../types/tmdb';

export default function getGenreName(id: number, type: string): Genre {
  return type === 'movie'
    ? { id, name: MOVIE_GENRES_OBJ[id] }
    : { id, name: TV_GENRE_OBJ[id] };
}
