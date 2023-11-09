/* eslint-disable @next/next/no-img-element */
import { TWO_EMBED } from '../../../../../config';
import styles from '../Detail.module.scss';

interface PosterAndIframeProps {
  poster?: string;
  showMovie: boolean;
  trailerKey?: string;
  onIframeLoad: () => void;
  id: string;
}

function PosterAndIframe({
  id,
  showMovie,
  poster,
  trailerKey,
  onIframeLoad,
}: PosterAndIframeProps) {
  return (
    <div className={styles.TopContainer}>
      {poster && (
        <div
          className={styles.Poster}
          style={{
            display: trailerKey || showMovie ? '' : 'flex',
          }}
        >
          <img
            // !!!
            alt="movie_poster"
            src={`https://image.tmdb.org/t/p/w300/${poster}`}
          />
        </div>
      )}
      {!(!showMovie && !trailerKey) ? (
        <div className={styles.YouTube}>
          <iframe
            width="720"
            height="405"
            src={
              showMovie
                ? `${TWO_EMBED}/embed/${id}`
                : `https://www.youtube-nocookie.com/embed/${trailerKey}`
            }
            onLoad={onIframeLoad}
            title="Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : null}
    </div>
  );
}

export default PosterAndIframe;
