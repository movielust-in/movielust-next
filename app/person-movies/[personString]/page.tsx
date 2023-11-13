'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import useSWRInfinite from 'swr/infinite';
import { useParams } from 'next/navigation';

import { Discover_with_Cast, image } from '../../../lib/tmdb/Urls';
import Wrap from '../../../components/CarouselSlices/Wrap';
import { detailLink } from '../../../utils';
import getGenreName from '../../../utils/getGenreName';
import useObserver from '../../../hooks/useObserver';
import { DiscoverMovieResponse, MovieResult } from '../../../types/tmdb';
import scrollerStyles from '../../../styles/scroller.module.scss';
import { tmdbFetch } from '../../../lib/tmdb/tmdb-fetch';

import styles from './personMovies.module.scss';

const fetcher = (key: string) => tmdbFetch(key);

function Movie() {
  const params = useParams<{ personString: string }>();

  const splited = params!.personString!.split('-');

  const personID = splited[0];

  let personName;

  if (splited.length > 1) {
    splited.shift();
    personName = splited.join(' ');
  }

  const getKey = (pageIndex: number) =>
    Discover_with_Cast(personID, pageIndex + 1);

  const { data, size, setSize } = useSWRInfinite<DiscoverMovieResponse>(
    getKey,
    fetcher,
    {
      initialSize: 1,
    }
  );

  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (totalPages) return;
    if (data && data[0].total_pages) {
      setTotalPages(data[0].total_pages);
    }
  }, [data, totalPages]);

  const loadMore = () => setSize((s) => s + 1);

  const observerRef = useObserver(() => {
    loadMore();
  });

  if (!data) return null;

  const temp = data.map((r) => r.results!);
  const movies: MovieResult[] = temp ? [].concat(...(temp as any)) : [];

  return (
    <div className={scrollerStyles.Container}>
      {personName ? (
        <h1 className={styles.title}>Movies starring {personName}</h1>
      ) : null}

      <div className={scrollerStyles.CardContainer}>
        {movies?.map((movie) => (
          <Link
            prefetch={false}
            key={movie.id}
            href={detailLink('movie', movie.id!, movie.title!)}
          >
            <div className={scrollerStyles.Card} style={{ width: '150px' }}>
              <Wrap
                src={image(200, movie.poster_path!)}
                showCard
                alt={movie.title!}
                title={movie.title!}
                backdrop={movie.backdrop_path!}
                description={movie.overview!}
                genres={
                  movie.genre_ids?.map((id) => getGenreName(id, 'movie')) || []
                }
              />
            </div>
          </Link>
        ))}
      </div>
      {totalPages > size && (
        <button
          type="button"
          className={scrollerStyles.Trigger}
          ref={observerRef}
          onClick={loadMore}
        >
          <p style={{ textAlign: 'center' }}>
            <b>Loading...</b>
          </p>
        </button>
      )}
      {size > 1 && size >= totalPages ? (
        <div className={scrollerStyles.Info}>
          Yay! You have scrolled it all.
        </div>
      ) : null}
    </div>
  );
}

export default Movie;
