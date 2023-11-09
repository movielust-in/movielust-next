import { Model, Schema, model, models } from 'mongoose';

import { MovieTorrent } from '../types/movie-torrents';

interface IMovieTorrent {
  tmdb_id: number;
  imdb_id: string;
  torrents: Array<MovieTorrent>;
}

const movieTorrentSchema = new Schema<IMovieTorrent>({
  tmdb_id: { type: Number, required: true },
  imdb_id: { type: String, required: true },
  torrents: [
    {
      url: String,
      hash: String,
      quality: String,
      type: { type: String },
      is_repack: String,
      video_codec: String,
      bit_depth: String,
      audio_channels: String,
      seeds: Number,
      peers: Number,
      size: String,
      size_bytes: Number,
      date_uploaded: String,
      date_uploaded_unix: String,
      magnet: { type: String, required: true },
    },
  ],
});

export const MovieTorrents: Model<IMovieTorrent> =
  models.MovieTorrents ||
  model('MovieTorrents', movieTorrentSchema, 'movie_torrents');
