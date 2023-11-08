import { TMDB_BASE_PATH } from '../../config';

const TMDB_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjA3MjdhZmZhY2NkMjM3ZjdlNmE3MGZhMDI5ZGM5ZSIsInN1YiI6IjYxNjVjNWQxM2E5NjUwMDA0MzQ0MDQ0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.W2ZsZ9RnvVfkgf7BPOciB5dgElw_4aTDReDe4Hs4PLM' as const;

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
