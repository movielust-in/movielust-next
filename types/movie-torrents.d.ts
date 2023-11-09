/**
 * Torrent object recieved in  YTS Response.
 * Does not contain "magnet"
 */
export interface YTSTorrent {
  url: string;
  hash: string;
  quality: string;
  type: string;
  is_repack: string;
  video_codec: string;
  bit_depth: string;
  audio_channels: string;
  seeds: number;
  peers: number;
  size: string;
  size_bytes: number;
  date_uploaded: string;
  date_uploaded_unix: string;
}

export interface MovieTorrent extends YTSTorrent {
  magnet: string;
}

export interface MovieTorrentResponse {
  status: 'success' | 'error';
  message?: string;
  data?: {
    torrents: MovieTorrent[];
  };
  error?: any;
}

export interface YTSMovieResponse {
  status: string;
  status_message: string;
  data?: {
    movie?: {
      id?: number;
      url?: string;
      imdb_code?: string;
      title?: string;
      title_english?: string;
      title_long?: string;
      slug?: string;
      year?: number;
      rating?: number;
      runtime?: number;
      genres?: Array<string>;
      like_count?: number;
      description_intro?: string;
      description_full?: string;
      yt_trailer_code?: string;
      language?: string;
      mpa_rating?: string;
      background_image?: string;
      background_image_original?: string;
      small_cover_image?: string;
      medium_cover_image?: string;
      large_cover_image?: string;
      torrents?: Array<YTSTorrent>;
      date_uploaded?: string;
      date_uploaded_unix?: string;
    };
  };
  '@meta'?: {
    server_time: number;
    server_timezone: string;
    api_version: 2;
    execution_time: string;
  };
}
