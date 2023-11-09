import { MovieResult, TvResult } from '../../types/tmdb';

import WatchlistItems from './WatchlistItem';
import styles from './watchlist.module.scss';
import Switch from './Switch';

interface Props {
  view: 'movie' | 'tv';
  watchlist: { movie: MovieResult[]; tv: TvResult[] };
}

function View({ view, watchlist }: Props) {
  return (
    <div className={styles.Container}>
      <div className={styles.SwitchBox}>
        <Switch view="movie" label="Movies" active={view === 'movie'} />
        <Switch view="tv" label="Shows" active={view === 'tv'} />
      </div>

      <div className={styles.List}>
        {watchlist[view].length ? (
          watchlist[view].map((movie) => (
            <WatchlistItems
              key={movie.id}
              id={movie.id!}
              title={(movie as any).title || (movie as any).name}
              overview={movie.overview!}
              posterPath={movie.poster_path!}
              type={view}
            />
          ))
        ) : (
          <h1 className={styles.Lonely}>It feels quite lonely here...</h1>
        )}
      </div>
    </div>
  );
}

export default View;
