/* eslint-disable no-nested-ternary */
import React, { useEffect, useRef } from "react";
import StarRatings from "react-star-ratings";
import Link from "next/link";
import { Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { useDispatch, useSelector } from "../../redux";
import { fetchTrending } from "../../helpers/tmdb/trending";
import { fetchExternalIds } from "../../helpers/tmdb/movies";
import { fetchIMDBRatings } from "../../helpers/imdb";
import { image } from "../../helpers/Urls";
import { setTrending } from "../../redux/reducers/movie.reducer";
import { detailLink } from "../../utils";

import styles from "./HomeCarousel.module.scss";

function ImgSlider() {
  const dispatch = useDispatch();

  const trendingMovies = useSelector((state) => state.movie.trending);

  const called = useRef(false);

  useEffect(() => {
    if (trendingMovies.length || called.current) return;

    const fetchData = async () => {
      called.current = true;

      const movies = await fetchTrending();

      dispatch(setTrending(movies.results));

      if (!(movies && movies.results)) return;

      const externalIdsRes = await Promise.all(
        movies.results.map((movie) => fetchExternalIds(movie.id!))
      );

      const imdbIds = externalIdsRes.map(
        (external_id) => external_id.imdb_id as string
      );

      const ratingsRes = await fetchIMDBRatings(imdbIds);

      const ratings = ratingsRes.data.results;

      const moviesWithImdbRating = movies.results!.map((movie, index) => ({
        ...movie,
        imdb_rating: ratings[index].rating,
      }));

      dispatch(setTrending(moviesWithImdbRating));
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Swiper
      className={styles.Swiper}
      loop
      id="image_slider"
      navigation={false}
      spaceBetween={0}
      slidesPerView={1}
      autoplay={{
        delay: 3000,
      }}
      scrollbar={{ draggable: true }}
      modules={[Navigation, Autoplay]}
    >
      {trendingMovies.map((movie: any) => (
        <SwiperSlide key={movie.id}>
          <Link href={detailLink("movie", movie.id, movie.title)}>
            <a>
              <div className={styles.Wrap}>
                <div>
                  <span>{movie.title}</span>
                  <br />

                  <p className={styles.Overview}>
                    {movie.overview!.slice(0, 200)}.
                  </p>

                  {movie.vote_average ? (
                    <StarRatings
                      rating={movie.imdb_rating || movie.vote_average}
                      numberOfStars={10}
                      starRatedColor="gold"
                      starEmptyColor="gray"
                      starDimension="16px"
                    />
                  ) : null}

                  {movie.imdb_rating ? (
                    <h5>
                      IMDB Rating :&nbsp;
                      {movie.imdb_rating.toFixed(1)}
                      /10
                    </h5>
                  ) : movie.vote_average ? (
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
            </a>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default React.memo(ImgSlider);
