import { IRecentsResponse } from '../../../types/api-responses';
import { MovieResult, TvResult } from '../../../types/tmdb';
import { SHALLOW_DETAIL } from '../../tmdb/Urls';
import { tmdbFetch } from '../../tmdb/tmdb-fetch';
import { get } from '../api-fetch';

export const fetchRecents = async (): Promise<
  Array<
    MovieResult | (TvResult & { show_name: string; show_id: string | number })
  >
> => {
  const json = await get<IRecentsResponse>('/api/user/recents', {
    cache: 'no-store',
  });

  const rawList = json.data.recents;

  if (rawList.length > 0) {
    let watchedList = await Promise.all(
      rawList.map((content) => {
        const url =
          content.type === 'movie'
            ? `${SHALLOW_DETAIL(content.content_id, 'movie')}`
            : `/tv/${content.content_id}/season/${content.season}/episode/${content.episode}?language=en-US`;
        return tmdbFetch(url);
      })
    );

    watchedList = watchedList.map((content, index) => {
      const zip = { ...content, media_type: rawList[index].type };
      if (rawList[index].type === 'tv') {
        zip.show_name = (rawList[index] as any).name;
        zip.show_id = rawList[index].content_id;
      }
      return zip;
    });
    return watchedList;
  }
  return [];
};
