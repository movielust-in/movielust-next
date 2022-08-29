import axios from 'axios';
import React, { useState, useEffect, memo } from 'react';

import { Content, Genre } from '../../types/tmdb';
import MovieCarousel from '../Carousels/MovieCarousel';

import styles from './Detail.module.scss';

interface SimilarMoviesProps {
  id: string;
  type: string;
  title: string;
  toBeFiltered: any[];
  genres: Genre[];
}

function SimilarMovies({
  id,
  type,
  title,
  toBeFiltered,
  genres,
}: SimilarMoviesProps) {
  const [similar, setSimilar] = useState<Array<Content | undefined>>();

  useEffect(() => {
    axios
      .get<{ results: Content[] }>(
        `/api/similar/${id}/${type}/${genres
          .map((genre) => genre.id)
          .join(',')}`
      )
      .then((response) => {
        if (type === 'movie' && toBeFiltered?.length) {
          setSimilar(
            response.data.results
              .filter(
                (movie) =>
                  !toBeFiltered.find((filtered) => filtered.id === movie!.id)!
              )!
              .slice(0, 21)!
          );
        } else {
          setSimilar(response.data.results.slice(0, 21));
        }
      });

    return () => {
      setSimilar(undefined);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genres, id, type]);

  return (
    <div className={styles.similarContainer}>
      {similar && similar.length > 0 ? (
        <MovieCarousel
          title={title}
          type={type}
          movies={similar}
          showCard={false}
        />
      ) : null}
    </div>
  );
}

export default memo(
  SimilarMovies,
  (prev, curr) => prev.id === curr.id && prev.type === curr.type
);
