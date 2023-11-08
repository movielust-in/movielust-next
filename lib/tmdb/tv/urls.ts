export const Popular_Shows = '/tv/popular';
export const Weekly_Trending_Shows = '/trending/tv/week' as const;
export const Top_Rated_Anime = `/discover/tv?with_keywords=210024&with_original_language=ja&sort_by=vote_count.desc&vote_count.gte=1000`;

export const seriesWithGenre = (genreId: string | number) =>
  `/discover/tv?&with_genres=${genreId}`;
