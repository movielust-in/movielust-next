'use client';

/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react';
import Link from 'next/link';

import styles from '../../styles/scroller.module.scss';
import Wrap from '../CarouselSlices/Wrap';
import PersonCard from '../CarouselSlices/PersonCard';
import { detailLink } from '../../utils';
import getGenreName from '../../utils/getGenreName';
import useObserver from '../../hooks/useObserver';

interface ScrollerProps {
  movies: any[];
  total: { pages: number; results: number };
  type: string;
}

function Scroller({ movies, total, type }: ScrollerProps) {
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const setTrigger = useObserver(() => setPage((currPage) => currPage + 1));

  const loadMore = () => {
    setLoadingMore(true);
    setPage((currPage) => currPage + 1);
  };

  useEffect(() => {
    setPage(1);
  }, [movies]);

  return (
    <div className={styles.Container}>
      <div className={styles.CardContainer}>
        {total.results > 0 &&
          movies.slice(0, page * 20 - 1).map((movie) => (
            <div className={styles.Card} key={movie.id}>
              {type === 'cast' ? (
                <Link prefetch={false} href={`/person/${movie.id}`}>
                  <PersonCard
                    title={`${movie.name}`}
                    key={movie.id}
                    alt={movie.name}
                    src={`https://image.tmdb.org/t/p/w185/${movie.profile_path}`}
                    // hover
                    role={movie.roles
                      .map((role: any) => role.character)
                      .join(' / ')}
                  />
                </Link>
              ) : (
                <Link
                  prefetch={false}
                  href={detailLink(type, movie.id, movie.title || movie.name)}
                >
                  <Wrap
                    alt={movie.title || movie.name}
                    title={movie.title || movie.name}
                    key={movie.id}
                    src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                    backdrop={movie.backdrop_path!}
                    description={movie.overview!}
                    showCard
                    genres={
                      movie.genre_ids?.map((id: number) =>
                        getGenreName(id, 'movie')
                      ) || []
                    }
                  />
                </Link>
              )}
            </div>
          ))}
      </div>
      {total.pages > page && loadingMore && (
        <div>
          <img
            src="https://ik.imagekit.io/movielust/ghost_1-kuGMRZo.webp"
            alt="loading"
            width="60px"
            height="60px"
          />
        </div>
      )}
      {total.pages > page && (
        <button
          type="button"
          className={styles.Trigger}
          ref={setTrigger}
          onClick={loadMore}
        >
          Loading more results...
        </button>
      )}
      {page > 1 && page >= total.pages && movies.length > 0 && (
        <div className={styles.Info}>Yay! You have scrolled all.</div>
      )}
    </div>
  );
}

export default Scroller;
