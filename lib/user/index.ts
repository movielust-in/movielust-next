import { SHALLOW_DETAIL } from '../tmdb/Urls';
import { tmdbFetch } from '../tmdb/tmdb-fetch';

export const fetchWatched = async () => {
  const res = await fetch('/api/user/recents', { cache: 'no-store' });
  const json = await res.json();

  const rawList = json.data.recents;

  if (rawList.length > 0) {
    let watchedList = await Promise.all(
      rawList.map(
        (content: {
          content_id: string;
          type: 'movie' | 'tv';
          season?: number;
          episode?: number;
        }) => {
          const url =
            content.type === 'movie'
              ? `${SHALLOW_DETAIL(content.content_id, 'movie')}`
              : `/tv/${content.content_id}/season/${content.season}/episode/${content.episode}?language=en-US`;
          return tmdbFetch(url);
        }
      )
    );

    watchedList = watchedList.map((content, index) => {
      const zip = { ...content, media_type: rawList[index].type };
      zip.show_name = rawList[index].name;
      zip.show_id = rawList[index].content_id;
      return zip;
    });
    return watchedList;
  }
  return [];
};
