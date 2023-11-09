export interface ApiResonse {
  status: 'success' | 'error';
  message?: string;
  data?: any;
  error?: any;
}

export interface ImdbRating {
  imdb_id: string;
  rating: number;
  vote_count: number;
}

export interface ImdbRatingResponse extends ApiResonse {
  data?: ImdbRating[];
}

export type IRecentItem =
  | {
      content_id: string | number;
      type: 'movie';
    }
  | {
      name: string;
      content_id: string | number;
      type: 'tv';
      season: number;
      episode: number;
    };

export interface IRecentsResponse extends ApiResonse {
  data: {
    recents: IRecentItem[];
  };
}

export interface WatchlistItem {
  content_id: number;
  type: 'movie' | 'tv';
}

export interface CheckPresenceInWatchlistResponse extends ApiResonse {
  data: {
    present?: boolean;
  };
}
