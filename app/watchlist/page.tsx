'use client';

import { useEffect, useState } from 'react';
import Head from 'next/head';

import { useSession } from 'next-auth/react';

import { fetchWatchlist, removeFromWL } from '../../helpers/user/watchlist';

import LoginRedirect from '../../components/UI/LoginRedirect';
import Loading from '../../components/UI/Loading';

import styles from './watchlist.module.scss';

import WatchlistItems from '../../components/ContentItem/ContentItem';
import { MovieResult, TvResult } from '../../types/tmdb';

function Watchlist() {
  const [view, setView] = useState<'movie' | 'tv'>('movie');

  const [watchlist, setWatchlist] = useState<{
    movies: MovieResult[];
    series: TvResult[];
  }>({ movies: [], series: [] });

  const [isLoading, setIsLoading] = useState(false);

  const { data, status } = useSession();

  const token = data?.user.accessToken;

  // const isAuthenticated = useSelector((state) => state.user.isLoggedIn);

  const remove = async (id: number) => {
    if (!token) return;

    try {
      const res = await removeFromWL(id, view, token);
      if (res === true) {
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
    if (token) {
      setIsLoading(true);
      fetchWatchlist(token)
        .then((result) => {
          setWatchlist(result);
        })
        .finally(() => setIsLoading(false));
    }
  }, [token]);

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
