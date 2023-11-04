'use client';

import Link from 'next/link';
import { SwiperSlide } from 'swiper/react';

import Wrap from '../CarouselSlices/Wrap';
import ShowAllButton from '../CarouselSlices/ShowAllButton';
import { detailLink } from '../../utils';
import styles from '../../styles/PeopleMovieCarousel.module.scss';

import Carousel from './Carousel';

interface PeopleMovieCarouselProps {
  movies: any[];
  title: string;
  type: string;
  watchall?: boolean;
}

function PeopleMovieCarousel({
  movies,
  title,
  type,
  watchall,
}: PeopleMovieCarouselProps) {
  return <>
    {title && (
      <div className={styles.Title}>
        <h2>{title}</h2>
        {watchall ? (
          <ShowAllButton link={`/person-movies/${watchall}`} label="See all" />
        ) : null}
      </div>
    )}
    {movies && movies.length > 0 && (
      <div className={styles.Container}>
        <Carousel carosel_id="movie_slider">
          {movies &&
            movies
              .filter(
                (movie) =>
                  movie.poster_path !== null &&
                  (type !== 'tv' ||
                    (!movie.character.includes('Self') &&
                      !movie.character.includes('Himself')))
              )
              .map((movie) => (
                <SwiperSlide key={`${movie.id}-${movie.character}`}>
                  <Link
                    prefetch={false}
                    href={detailLink(
                      type === 'combined' ? movie.media_type : type,
                      movie.id,
                      movie.title || movie.name
                    )}
                  >

                    <Wrap
                      src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                      alt={movie.title}
                      // hover={hover}
                    />
                    {movie.character && (
                      <div className={styles.Detail}>
                        {movie.name}
                        <div>as {movie.character}</div>
                      </div>
                    )}

                  </Link>
                </SwiperSlide>
              ))}
        </Carousel>
      </div>
    )}
  </>;
}

export default PeopleMovieCarousel;
