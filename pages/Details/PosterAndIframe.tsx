import { CommonData } from './DetailTypes';
import { TWO_EMBED } from '../../config';

import styles from './Detail.module.scss';

interface PosterAndIframeProps {
    commonData: CommonData | undefined;
    showMovie: boolean;
    trailerKey: string | undefined;
    iframeLoaded: () => void;
    id: string;
}

function PosterAndIframe({
    id,
    showMovie,
    commonData,
    trailerKey,
    iframeLoaded,
}: PosterAndIframeProps) {
    return (
        <div className={styles.TopContainer}>
            {commonData && commonData.poster && (
                <div
                    className={styles.Poster}
                    style={{
                        display: trailerKey || showMovie ? '' : 'flex',
                    }}
                >
                    <img
                        alt="movie_poster"
                        src={`https://image.tmdb.org/t/p/w300/${commonData.poster}`}
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
                                ? `${TWO_EMBED}/${id}`
                                : `https://www.youtube.com/embed/${trailerKey}`
                        }
                        onLoad={iframeLoaded}
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
