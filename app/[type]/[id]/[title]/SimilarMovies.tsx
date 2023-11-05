import React, { Suspense, memo } from 'react';
import { headers } from 'next/headers';

import { Genre } from '../../../../types/tmdb';
import MovieCarousel from '../../../../components/Carousels/MovieCarousel';

import styles from './Detail.module.scss';

interface SimilarMoviesProps {
  id: string;
  type: string;
  title: string;
  lang: string;
  toBeFiltered: any[];
  genres: Genre[];
}

const getSimilarContent = async (
  id: string,
  type: String,
  genres: Genre[],
  lang: string
) => {
  let host = headers().get('host');

  if (host === 'localhost') host = '127.0.0.1';
  const protocal = process?.env.NODE_ENV === 'development' ? 'http' : 'https';

  const url = `${protocal}:/${host}/api/similar/?id=${id}&type=${type}&genres=${genres
    .map((genre) => genre.id)
    .join(',')}&lang=${lang}`;

  const res = await fetch(url);

  const {
    data: { results },
  } = await res.json();

  return results;
};

async function SimilarMovies({
  id,
  type,
  title,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  toBeFiltered,
  lang,
  genres,
}: SimilarMoviesProps) {
  const similar = await getSimilarContent(id, type, genres, lang);

  return (
    <Suspense fallback={<div>Loading....</div>}>
      {similar && similar.length > 0 ? (
        <div className={styles.similarContainer}>
          <MovieCarousel
            title={title}
            type={type}
            movies={similar}
            showCard={false}
          />
        </div>
      ) : null}
    </Suspense>
  );
}

export default memo(
  SimilarMovies,
  (prev, curr) => prev.id === curr.id && prev.type === curr.type
);
