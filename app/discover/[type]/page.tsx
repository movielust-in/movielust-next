'use client';

/* eslint-disable no-nested-ternary */

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useParams } from 'next/navigation';
// import { FaTimes } from 'react-icons/fa';
import useSWRInfinite from 'swr/infinite';

import { DISCOVER_MOVIES, image } from '../../../helpers/Urls';

// import SortBy from './Filters/SortBy';
// import GenreFilter from './Filters/GenreFilter';
import Wrap from '../../../components/CarouselSlices/Wrap';

import { Content } from '../../../types/tmdb';

import { TMDB_BASE_PATH, TMDB_KEY } from '../../../config';

import { detailLink } from '../../../utils';
import getGenreName from '../../../utils/getGenreName';

import useObserver from '../../../hooks/useObserver';
import Meta from '../../../components/Meta';
import styles from '../../../styles/scroller.module.scss';
import Loading from '../../../components/UI/Loading';

const fetcher = (key: any) =>
  fetch(key[0] + new URLSearchParams({ ...key[1], page: key[2] + 1 })).then(
    (res) => res.json()
  );

const genParams = (filters: Record<string, any>) => {
  let params: Record<string, any> = {
    sort_by: filters.sortBy,
  };

  if (filters.genres) params.with_genres = filters.genres;

  if (filters.sortBy === 'vote_average.desc') {
    params = {
      ...params,
      'vote_count.gte': filters?.genres?.length ? 1000 : 1500,
    };
  } else if (filters.sortBy === 'release_date.desc') {
    const date = new Date();
    let month: string | number = date.getMonth();
    month = month < 10 ? `0${month}` : month;
    let day: string | number = date.getDate();
    day = day < 10 ? `0${day}` : day;

    params = {
      ...params,
      'release_date.lte': `${date.getFullYear()}-${month}-${day}`,
      'vote_count.gte': 50,
    };
  }
  return params;
};

function Movie() {
  const searchParams = useSearchParams();

  const { type: typeParam } = useParams() as { type: string };

  const type = typeParam === 'movies' ? 'movie' : 'tv';

  const genres = searchParams?.get('genres');
  const sortBy = searchParams?.get('sortBy');

  const filters: { genres?: string | null; sortBy?: string } = {
    sortBy: sortBy || 'popularity.desc',
    genres,
  };

  const getKey = (page: number, previousData: any) => {
    if (previousData && !previousData.results.length) {
      return null;
    }
    const params = genParams(filters);

    return [
      `${TMDB_BASE_PATH}/${DISCOVER_MOVIES(type)}&api_key=${TMDB_KEY}&`,
      params,
      page,
    ];
  };

  const { isLoading, data, error, size, setSize } = useSWRInfinite<{
    results: Content;
    total_pages: number;
    total_results: number;
  }>(getKey, fetcher, {
    initialSize: 1,
    revalidateOnFocus: false,
    // revalidateFirstPage: false,
  });

  const loadMore = () => setSize((s) => s + 1);

  const observerRef = useObserver(() => {
    loadMore();
  });

  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (totalPages) return;
    if (data && data[0].total_pages) setTotalPages(data[0].total_pages);
  }, [data, totalPages]);

  const movies: Content[] = useMemo(() => {
    const temp = data?.map((r: any) => r.results!);
    return temp ? [].concat(...(temp as any)) : [];
  }, [data]);

  // const resetPage = () => setSize(0);

  if (error) return <div>Errored!!</div>;

  const isEmpty = !movies.length;

  return (
    <div className={styles.Container}>
      <Meta
        title="Movies"
        description="Discover a vast collection of Movies on Movielust."
        url="https://movie-lust.vercel.app/discover/movies"
      />

      {/* <div className={styles.Filters}>
        {type === 'movie' && (
          <SortBy
          // resetPage={() => {
          //   setSize(0);
          //   mutate([]);
          // }}
          />
        )}
        <GenreFilter type={type} />
      </div> */}

      {isLoading ? (
        <Loading />
      ) : isEmpty ? (
        <div>Empty</div>
      ) : (
        <>
          <div className={styles.CardContainer}>
            {movies?.map((movie) => (
              <Link
                key={movie.id}
                href={detailLink(
                  type,
                  movie.id!,
                  movie.title! || movie.name || movie.original_name || ''
                )}
              >
                <div className={styles.Card} style={{ width: '150px' }}>
                  <Wrap
                    src={image(200, movie.poster_path!)}
                    showCard
                    alt={
                      movie.title! || movie.name || movie.original_name || ''
                    }
                    title={movie.title! || movie.name || movie.original_name}
                    backdrop={movie.backdrop_path!}
                    description={movie.overview!}
                    genres={
                      movie.genre_ids?.map((id) => getGenreName(id, type)) || []
                    }
                  />
                </div>
              </Link>
            ))}
          </div>
          {totalPages > size && (
            <button
              type="button"
              className={styles.Trigger}
              ref={observerRef}
              onClick={loadMore}
            >
              {/*  */}
              <p style={{ textAlign: 'center' }}>
                <b>Loading...</b>
              </p>
            </button>
          )}
          {size > 1 && size >= totalPages && (
            <div className={styles.Info}>Yay! You have scrolled it all.</div>
          )}
        </>
      )}
    </div>
  );
}

export default Movie;

// !!! Genre bar pending

// <div className={styles.Filters}>
//   <SortBy type="movie" />
//   <GenreFilter type="movie" />
// </div>
// <div className={styles.GenreBar}>
//   {filters.genres.map((id) => (
//     // eslint-disable-next-line react/jsx-key
//     <div
//       className={styles.GenreBubble}
//       style={{
//         border: '1px solid silver',
//         padding: '5px',
//         borderRadius: '10px',
//         margin: '2px',
//         fontWeight: '500',
//         backgroundColor: '#0E2F44',
//       }}
//     >
//       <span>{MOVIE_GENRES.find((genre) => id === genre.id)!.name}</span>
//       {/* <FaTimes onClick={() => addOrRemoveGenreIdFromFilter(id)} /> */}
//     </div>
//   ))}
// </div>
