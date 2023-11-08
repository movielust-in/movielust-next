export const fetchMovieMagnets = (imdb_id: string, tmdb_id: string | number) =>
  fetch(`/api/torrents/movie?imdb_id=${imdb_id}&tmdb_id=${tmdb_id}`).then(
    (res) => res.json()
  );
