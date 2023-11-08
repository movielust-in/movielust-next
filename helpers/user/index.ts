import { SHALLOW_DETAIL } from '../../lib/tmdb/Urls';
import { TMDB_BASE_PATH, TMDB_KEY } from '../../config';

export const fetchWatched = async () => {
  const res = await fetch('/api/user/recents', { cache: 'no-store' });
  const json = await res.json();

  const rawList = json.data.recents;

  if (rawList.length > 0) {
    const allRes = await Promise.all(
      rawList.map(
        (content: {
          content_id: string;
          type: 'movie' | 'tv';
          season?: number;
          episode?: number;
        }) => {
          const url =
            content.type === 'movie'
              ? `${TMDB_BASE_PATH}/${SHALLOW_DETAIL(
                  content.content_id,
                  'movie'
                )}`
              : `${TMDB_BASE_PATH}/tv/${content.content_id}/season/${content.season}/episode/${content.episode}?language=en-US&api_key=${TMDB_KEY}`;
          return fetch(url, { cache: 'force-cache' });
        }
      )
    );

    let watchedList = await Promise.all(allRes.map((_res) => _res.json()));

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
