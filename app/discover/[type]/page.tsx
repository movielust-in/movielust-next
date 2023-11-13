'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useParams } from 'next/navigation';
// import { FaTimes } from 'react-icons/fa';

import { DISCOVER_MOVIES, image } from '../../../lib/tmdb/Urls';
import Wrap from '../../../components/CarouselSlices/Wrap';
import { detailLink } from '../../../utils';
import getGenreName from '../../../utils/getGenreName';
import useObserver from '../../../hooks/useObserver';
import Loading from '../../../components/UI/Loading';
import styles from '../../../styles/scroller.module.scss';
import { tmdbFetch } from '../../../lib/tmdb/tmdb-fetch';

import SortBy from './Filters/SortBy';
import GenreFilter from './Filters/GenreFilter';

const genFilterParams = (filters: Record<string, any>) => {
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

  const [filters, setFilters] = useState<{
    genres?: string | null;
    sortBy?: string;
  }>({
    sortBy: sortBy || 'popularity.desc',
    genres,
  });

  const [data, setData] = useState<Record<number, any>>({});
  useEffect(() => {
    if (filters.genres !== genres || filters.sortBy !== sortBy) {
      setFilters({ sortBy: sortBy || 'popularity.desc', genres });
      setData({});
    }
  }, [filters.genres, filters.sortBy, genres, sortBy]);

  const [page, setPage] = useState(1);

  const loadMore = () => setPage((s) => s + 1);

  const observerRef = useObserver(() => {
    loadMore();
  });

  const [totalPages, setTotalPages] = useState(1);

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoading || data[page]) return;
    setLoading(true);
    const getKey = () => {
      const params = genFilterParams(filters);

      return `${DISCOVER_MOVIES(type)}&${new URLSearchParams({
        ...params,
        page: `${page}`,
      })}`;
    };

    tmdbFetch(getKey()).then((results) => {
      setData((state) => ({ ...state, [page]: results.results }));
      setTotalPages(results.total_pages);
      setLoading(false);
    });
  }, [page, data, filters, type, isLoading]);

  const results = useMemo(
    () =>
      Object.values(data).map((_page) => _page.map((content: any) => content)),
    [data]
  );

  if (isLoading && !results.length) <Loading />;
  if (!isLoading && !results.length) return <div>Empty</div>;

  return (
    <div className={styles.Container}>
      <div className={styles.Filters}>
        {type === 'movie' && <SortBy />}
        <GenreFilter type={type} />
      </div>

      {results.length > 0 && (
        <>
          <div className={styles.CardContainer}>
            {results?.map((x) =>
              x.map((movie: any) => (
                <Link
                  prefetch={false}
                  key={movie.id}
                  href={detailLink(
                    type,
                    movie.id!,
                    movie.title || movie.name || movie.original_name || ''
                  )}
                >
                  <div className={styles.Card} style={{ width: '150px' }}>
                    <Wrap
                      src={image(200, movie.poster_path!)}
                      showCard
                      alt={
                        movie.title || movie.name || movie.original_name || ''
                      }
                      title={movie.title! || movie.name || movie.original_name}
                      backdrop={movie.backdrop_path!}
                      description={movie.overview!}
                      genres={
                        movie.genre_ids?.map((id: any) =>
                          getGenreName(id, type)
                        ) || []
                      }
                    />
                  </div>
                </Link>
              ))
            )}
          </div>
          {totalPages > page && (
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
          {page > 1 && page >= totalPages && (
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
