'use client';

/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';
import { Navigation, Autoplay } from 'swiper';
import Link from 'next/link';
import StarRatings from 'react-star-ratings';
import { Swiper, SwiperSlide } from 'swiper/react';

// import { Loading } from '..';

import Loading from '../UI/Loading';
import { image } from '../../lib/tmdb/Urls';
import { MovieResult } from '../../types/tmdb';
import { detailLink } from '../../utils';
import styles from '../../styles/prodctuion_img_slider.module.scss';

interface ProductionImageSliderPros {
  data: MovieResult[];
}

function ProductionImageSlider({ data }: ProductionImageSliderPros) {
  const [isLoading, setIsLoading] = useState(true);
  const [company, setcompany] = useState<any>([]);

  useEffect(() => {
    setIsLoading(true);
    setcompany(data);
    setIsLoading(false);
  }, [data]);

  return isLoading ? (
    <Loading />
  ) : (
    company && (
      <Swiper
        loop
        id="production_slider"
        className={styles.StyledSwiper}
        modules={[Navigation, Autoplay]}
        navigation={false}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
        }}
      >
        {company
          .filter((movie: MovieResult) => movie.backdrop_path !== null)
          .map(
            (
              movie: MovieResult & { imdb_rating: number; file_path: string }
            ) => (
              <SwiperSlide key={movie.file_path!}>
                <Link
                  href={detailLink('movie', movie.id!, movie.title!)}
                  prefetch={false}
                >
                  <div className={styles.Wrap}>
                    <div>
                      <span>{movie.title}</span>
                      <p className={styles.Overview}>
                        {movie.overview!.slice(0, 200)}.
                      </p>
                      {movie.imdb_rating! ? (
                        <StarRatings
                          rating={movie.imdb_rating!}
                          numberOfStars={10}
                          starRatedColor="gold"
                          starEmptyColor="gray"
                          starDimension="16px"
                        />
                      ) : movie.vote_average ? (
                        <StarRatings
                          rating={movie.vote_average}
                          numberOfStars={10}
                          starRatedColor="gold"
                          starEmptyColor="gray"
                          starDimension="16px"
                        />
                      ) : null}

                      {movie.imdb_rating! ? (
                        <h5>
                          Rating:
                          {movie.imdb_rating!}
                          /10
                        </h5>
                      ) : movie.vote_average ? (
                        <h5>
                          Rating:
                          {movie.vote_average}
                          /10
                        </h5>
                      ) : null}
                    </div>

                    <picture>
                      <source
                        media="(max-width:300px)"
                        srcSet={image(300, movie.backdrop_path!)}
                      />
                      <source
                        media="(max-width:780px)"
                        srcSet={image(780, movie.backdrop_path!)}
                      />
                      <source
                        media="(max-width:1280px)"
                        srcSet={image(780, movie.backdrop_path!)}
                      />
                      <img
                        src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`}
                        alt={movie.title}
                      />
                    </picture>
                  </div>
                </Link>
              </SwiperSlide>
            )
          )}
      </Swiper>
    )
  );
}

export default ProductionImageSlider;
