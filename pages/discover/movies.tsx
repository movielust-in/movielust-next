import { useEffect } from 'react';
import Link from 'next/link';
import { FaTimes } from 'react-icons/fa';

import { discoverMovie } from '../../helpers/tmdb/movies';
import { image } from '../../helpers/Urls';

import SortBy from '../../components/Filters/SortBy';
import GenreFilter from '../../components/Filters/GenreFilter';
import Wrap from '../../components/CarouselSlices/Wrap';

import { useDispatch, useSelector } from '../../redux/store';
import { MovieResult } from '../../types/tmdb';

import { MOVIE_GENRES } from '../../config';

import {
  addMovies,
  incrementPage,
  resetMovies,
  setTotalPages as setTotalPagesStore,
  toggleMovieGenreId,
} from '../../redux/reducers/movie.reducer';
import { detailLink } from '../../utils';
import getGenreName from '../../utils/getGenreName';

import styles from '../../styles/scroller.module.scss';
import useObserver from '../../hooks/useObserver';
import Meta from '../../components/Meta';

function Movie() {
  const dispatch = useDispatch();

  // actions

  const reset = () => dispatch(resetMovies());

  const incrementCurrentPage = () => dispatch(incrementPage());

  const setTotalPages = (pages: number) => dispatch(setTotalPagesStore(pages));

  const setData = (movies: { page: number; results: MovieResult[] }) =>
    dispatch(addMovies(movies));

  const page = useSelector((state) => state.movie.page);

  const filters = useSelector((state) => state.movie.filters);

  const data = useSelector((state) => state.movie.results);

  const totalPages = useSelector((state) => state.movie.totalPages);

  const observerRef = useObserver(() => {
    incrementCurrentPage();
  });

  useEffect(() => {
    if (Object.prototype.hasOwnProperty.call(data, page)) return;
    (async () => {
      const res = await discoverMovie(filters, page);
      setData({ page, results: res.data.results! });
      setTotalPages(res.data.total_pages!);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, data, page]);

  const loadMore = () => incrementCurrentPage();

  const addOrRemoveGenreIdFromFilter = (id: number) => {
    reset();
    dispatch(toggleMovieGenreId(id));
  };

  return (
    <div className={styles.Container}>
      <Meta
        title="Movies"
        description="Discover a vast collection of Movies on Movielust."
        url="https://movielust.in/discover/movies"
      />
      <div className={styles.Filters}>
        <SortBy type="movie" />
        <GenreFilter type="movie" />
      </div>
      <div className={styles.GenreBar}>
        {filters.genres.map((id) => (
          // eslint-disable-next-line react/jsx-key
          <div
            className={styles.GenreBubble}
            style={{
              border: '1px solid silver',
              padding: '5px',
              borderRadius: '10px',
              margin: '2px',
              fontWeight: '500',
              backgroundColor: '#0E2F44',
            }}
          >
            <span>{MOVIE_GENRES.find((genre) => id === genre.id)!.name}</span>
            <FaTimes onClick={() => addOrRemoveGenreIdFromFilter(id)} />
          </div>
        ))}
      </div>
      <div className={styles.CardContainer}>
        {Object.values(data).map((results) =>
          results.map((movie) => (
            <Link
              key={movie.id}
              href={detailLink('movie', movie.id!, movie.title!)}
            >
              <a>
                <div className={styles.Card} style={{ width: '150px' }}>
                  <Wrap
                    src={image(200, movie.poster_path!)}
                    showCard
                    alt={movie.title!}
                    title={movie.title!}
                    backdrop={movie.backdrop_path!}
                    description={movie.overview!}
                    genres={
                      movie.genre_ids?.map((id) => getGenreName(id, 'movie')) ||
                      []
                    }
                  />
                </div>
              </a>
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
          <p style={{ textAlign: 'center' }}>
            <b>Loading...</b>
          </p>
        </button>
      )}
      {page > 1 && page >= totalPages && (
        <div className={styles.Info}>Yay! You have scrolled it all.</div>
      )}
    </div>
  );
}

export default Movie;
