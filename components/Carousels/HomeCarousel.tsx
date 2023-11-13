'use client';

import React from 'react';
// import StarRatings from 'react-star-ratings';
import Link from 'next/link';
import { Navigation, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { image } from '../../lib/tmdb/Urls';
import { detailLink } from '../../utils';
import { MovieResult } from '../../types/tmdb';
import styles from '../../styles/HomeCarousel.module.scss';

function ImgSlider({
  movies,
}: {
  movies: (MovieResult & { imdb_rating?: number })[];
}) {
  return (
    <Swiper
      className={styles.Swiper}
      loop
      id="image_slider"
      navigation={false}
      spaceBetween={0}
      slidesPerView={1}
      autoplay={{
        delay: 2000,
      }}
      scrollbar={{ draggable: true }}
      modules={[Navigation, Autoplay]}
    >
      {movies.map((movie: any) => (
        <SwiperSlide key={movie.id}>
          <Link
            href={detailLink('movie', movie.id, movie.title)}
            prefetch={false}
          >
            <div className={styles.Wrap}>
              <div>
                <span>{movie.title}</span>
                <br />

                <p className={styles.Overview}>
                  {movie.overview!.slice(0, 200)}.
                </p>

                {movie.imdb_rating ? (
                  <h5>
                    IMDB Rating :&nbsp;
                    {movie.imdb_rating.toFixed(1)} / 10
                  </h5>
                ) : null}

                {!movie.imdb_rating && movie.vote_average ? (
                  <h5>
                    TMDB Rating :&nbsp;
                    {movie.vote_average.toFixed(1)}
                    /10
                  </h5>
                ) : null}
              </div>

              <picture>
                <source
                  media="(max-width:300px)"
                  srcSet={image(300, movie.backdrop_path)}
                />
                <source
                  media="(max-width:400px)"
                  srcSet={image(400, movie.backdrop_path)}
                />
                <source
                  media="(max-width:500px)"
                  srcSet={image(500, movie.backdrop_path)}
                />
                <source
                  media="(max-width:780px)"
                  srcSet={image(780, movie.backdrop_path)}
                />
                <source
                  media="(max-width:1280px)"
                  srcSet={image(1280, movie.backdrop_path)}
                />
                <img
                  src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`}
                  alt={movie.title}
                />
              </picture>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default React.memo(ImgSlider);
