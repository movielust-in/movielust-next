import axios from 'axios';

import { SHALLOW_DETAIL, DELETE_USER } from '../Urls';
import { SERVER_URI, TMDB_BASE_PATH, TMDB_KEY } from '../../config';
import { ContactFormInterface } from '../../types/requestData';

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
      return zip;
    });
    return watchedList;
  }
  return [];
};

export const deleteUser = (id: string) =>
  new Promise((resolve, reject) => {
    (async () => {
      try {
        const token = localStorage.getItem('movielust_user');
        if (token) {
          const res = await axios.delete(DELETE_USER, {
            data: {
              user_id: id,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          resolve(res);
        } else {
          reject();
        }
      } catch {
        reject();
      }
    })();
  });

export const submitContactForm = (data: ContactFormInterface) =>
  axios.post(`${SERVER_URI}/submit-contact-us`, data);
