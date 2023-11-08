import { TMDB_BASE_PATH } from '../../config';

const TMDB_TOKEN = process.env.NEXT_PUBLIC_TMDB_TOKEN;

if (!TMDB_TOKEN) {
  throw new Error('NEXT_PUBLIC_TMDB_TOKEN not configured in env.');
}

export async function tmdbFetch<T = any>(
  endPoint: string,
  params?: Record<string, string>
) {
  let url = `${TMDB_BASE_PATH}${endPoint}`;

  if (params) {
    url = `${url}${url.includes('?') ? '&' : '?'}${new URLSearchParams(
      params
    )}`;
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TMDB_TOKEN}`,
    },
    cache: 'force-cache',
  });

  // if (url.includes('trending/all')) console.log(url, response);

  return handleResponse<T>(response);
}

async function handleResponse<T = any>(response: Response) {
  const data = await response.json();
  if (!response.ok) {
    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
  }
  return data as T;
}
