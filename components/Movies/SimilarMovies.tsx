import React, { useState, useEffect, memo } from 'react';
import styled from '@emotion/styled';

import { fetchSimilar } from '../../helpers/tmdb';
import { Content } from '../../types/tmdb';
import MovieCarousel from '../Carousels/MovieCarousel';

interface SimilarMoviesProps {
  id: string;
  type: string;
  title: string;
  toBeFiltered: any[];
  genres: any;
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
    fetchSimilar(id, type, genres).then((response) => {
      if (type === 'movie' && toBeFiltered?.length) {
        setSimilar(
          response!
            .filter(
              (movie) =>
                !toBeFiltered.find((filtered) => filtered.id === movie!.id)!
            )!
            .slice(0, 21)!
        );
      } else {
        setSimilar(response.slice(0, 21));
      }
    });
    return () => {
      setSimilar(undefined);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genres, id, toBeFiltered, type]);

  return (
    <Container>
      {similar && similar.length > 0 ? (
        <MovieCarousel
          title={title}
          type={type}
          movies={similar}
          showCard={false}
        />
      ) : null}
    </Container>
  );
}

export default memo(
  SimilarMovies,
  (prev, curr) => prev.id === curr.id && prev.type === curr.type
);

const Container = styled.div`
  border-radius: 15px;
  box-shadow: 5px 3px 30px black;
  margin-top: 10px;
  padding: 10px;
  position: relative;
  overflow: hidden;
  @media (max-width: 724px) {
    overflow: hidden;
    padding: 5px;
    margin: 5px 0 15px 0;
  }
`;
