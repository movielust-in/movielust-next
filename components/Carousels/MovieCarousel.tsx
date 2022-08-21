import Link from "next/link";
import { SwiperSlide } from "swiper/react";

import Carousel from "./Carousel";
import Wrap from "../CarouselSlices/Wrap";
import ShowAllButton from "../CarouselSlices/ShowAllButton";
import { detailLink } from "../../utils";
import getGenreName from "../../utils/getGenreName";

import styles from "../../styles/carousel.module.scss";

interface MovieCarouselInterface {
  movies: any[];
  title?: string;
  type: string;
  watchall?: string | number;
  showCard?: boolean;
}

MovieCarousel.defaultProps = {
  title: null,
  watchall: null,
  showCard: true,
};

function MovieCarousel({
  movies,
  title,
  type,
  watchall,
  showCard,
}: MovieCarouselInterface) {
  return (
    <>
      {title && (
        <div className={styles.Title}>
          <h2>{title}</h2>
          {watchall && (
            <ShowAllButton link={`/peoplemovies/${watchall}`} label="See all" />
          )}
        </div>
      )}
      {movies && movies.length > 0 && (
        <div>
          <Carousel carosel_id="movie_slider">
            {movies &&
              movies
                .filter((movie) => movie.poster_path !== null)
                .map((movie) => (
                  <SwiperSlide key={movie.id}>
                    <Link
                      href={detailLink(
                        type === "combined" ? movie.media_type : type,
                        movie.id,
                        movie.title || movie.name
                      )}
                    >
                      <a>
                        <Wrap
                          src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                          alt={movie.title || movie.name || ""}
                          title={movie.title || movie.name}
                          description={`${movie?.overview
                            ?.split(".")
                            .slice(0, 3)
                            .join(".")}.`}
                          backdrop={movie.backdrop_path}
                          showCard={showCard}
                          genres={
                            movie.genre_ids
                              ? movie.genre_ids
                                  .map((genre: number) =>
                                    type === "combined"
                                      ? getGenreName(genre, movie.media_type)
                                      : getGenreName(genre, type)
                                  )
                                  .filter((genre: any) => genre)
                              : []
                          }
                        />

                        {movie.character && (
                          <div className={styles.Detail}>
                            {movie.name}
                            <div>as {movie.character}</div>
                          </div>
                        )}
                      </a>
                    </Link>
                  </SwiperSlide>
                ))}
          </Carousel>
        </div>
      )}
    </>
  );
}

export default MovieCarousel;
