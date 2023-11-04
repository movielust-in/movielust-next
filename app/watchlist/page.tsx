'use client';

import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useSession } from 'next-auth/react';

import { fetchWatchlist } from '../../helpers/user/watchlist';
import LoginRedirect from '../../components/UI/LoginRedirect';
import Loading from '../../components/UI/Loading';
import WatchlistItems from '../../components/ContentItem/ContentItem';
import { MovieResult, TvResult } from '../../types/tmdb';

import styles from './watchlist.module.scss';

function Watchlist() {
  const [view, setView] = useState<'movie' | 'tv'>('movie');

  const [watchlist, setWatchlist] = useState<{
    movies: MovieResult[];
    series: TvResult[];
  }>({ movies: [], series: [] });

  const [isLoading, setIsLoading] = useState(false);

  const { status } = useSession();

  // const isAuthenticated = useSelector((state) => state.user.isLoggedIn);

  const remove = async (id: number) => {
    if (status !== 'authenticated') return;

    try {
      const res = await fetch(
        `/api/user/watchlist?content_id=${id}&type=${view}`,
        {
          method: 'DELETE',
        }
      );
      // const data = await res.json();
      // console.log(data);
      if (res.status === 200) {
        // dispatch(removeFromWatchlist({ id, view }));
        const filtered = watchlist[
          view === 'movie' ? 'movies' : 'series'
        ].filter((c) => c.id !== id);

        setWatchlist((state) => ({
          ...state,
          [view === 'movie' ? 'movies' : 'series']: filtered,
        }));
      }
    } catch (err) {
      // console.log('hm...', err);
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      setIsLoading(true);
      fetchWatchlist()
        .then((result) => {
          setWatchlist(result);
        })
        .finally(() => setIsLoading(false));
    }
  }, [status]);

  if (status === 'loading') return <Loading />;

  return (
    <>
      <Head>
        <title>Watchlist - Movielust</title>
        <meta
          name="description"
          content="Add you favourite movies and shows to watchlist."
        />
      </Head>
      {status === 'authenticated' ? (
        <div className={styles.Container}>
          <div className={styles.SwitchBox}>
            <button
              className={styles.Switch}
              type="button"
              onClick={() => setView('movie')}
              style={{
                fontWeight: view === 'movie' ? 800 : 600,
                // border: view === 'movie' ? '2px solid silver' : '1px solid silver',
                opacity: view === 'movie' ? 1 : 0.8,
              }}
            >
              Movies
            </button>
            <button
              className={styles.Switch}
              type="button"
              onClick={() => setView('tv')}
              style={{
                fontWeight: view === 'tv' ? 800 : 600,
                // border: view === 'tv' ? '2px solid silver' : '1px solid silver',
                opacity: view === 'tv' ? 1 : 0.8,
              }}
            >
              Series
            </button>
          </div>

          {isLoading ? (
            <Loading />
          ) : (
            <div className={styles.List}>
              {watchlist[view === 'movie' ? 'movies' : 'series'].length ? (
                watchlist[view === 'movie' ? 'movies' : 'series'].map(
                  (movie) => (
                    <WatchlistItems
                      key={movie.id}
                      id={movie.id!}
                      title={(movie as any).title || (movie as any).name}
                      overview={movie.overview!}
                      posterPath={movie.poster_path!}
                      remove={remove}
                      type={view}
                    />
                  )
                )
              ) : (
                <h1 className={styles.Lonely}>It feels quite lonely here...</h1>
              )}
            </div>
          )}
        </div>
      ) : (
        <LoginRedirect afterLoginRedirectTo="/watchlist" />
      )}
    </>
  );
}

export default Watchlist;
