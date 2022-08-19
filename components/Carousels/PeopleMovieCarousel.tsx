import styled from "@emotion/styled";
import Link from "next/link";

import { SwiperSlide } from "swiper/react";
import Wrap from "../CarouselSlices/Wrap";
import Carousel from "./Carousel";
import ShowAllButton from "../CarouselSlices/ShowAllButton";
import { detailLink } from "../../utils";

interface PeopleMovieCarouselProps {
  movies: any[];
  title: string;
  type: string;
  watchall?: boolean;
}

PeopleMovieCarousel.defaultProps = {
  watchall: null,
};

function PeopleMovieCarousel({
  movies,
  title,
  type,
  watchall,
}: PeopleMovieCarouselProps) {
  return (
    <>
      {title && (
        <Title>
          <h2>{title}</h2>
          {watchall && (
            <ShowAllButton link={`/peoplemovies/${watchall}`} label="See all" />
          )}
        </Title>
      )}
      {movies && movies.length > 0 && (
        <Container>
          <Carousel carosel_id="movie_slider">
            {movies &&
              movies
                .filter(
                  (movie) =>
                    movie.poster_path !== null &&
                    (type !== "tv" ||
                      (!movie.character.includes("Self") &&
                        !movie.character.includes("Himself")))
                )
                .map((movie) => (
                  <SwiperSlide key={`${movie.id}-${movie.character}`}>
                    <Link
                      href={detailLink(
                        type === "combined" ? movie.media_type : type,
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
                        <Detail>
                          {movie.name}
                          <div>as {movie.character}</div>
                        </Detail>
                      )}
                    </Link>
                  </SwiperSlide>
                ))}
          </Carousel>
        </Container>
      )}
    </>
  );
}

export default PeopleMovieCarousel;

const Container = styled.div`
  user-select: none;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  z-index: -1;
  h2 {
    font-weight: bold;
    letter-spacing: 1px;
    margin: 0 0 15px 0;
    text-align: start;
  }
  p {
    cursor: pointer;
    font-weight: 700;
    margin-top: 1px;
    transition: color 1s, font-size 0.5s;
    &:hover {
      color: greenyellow;
      font-size: 20px;
      transition: all 1s, color 1s, font-size 0.5s;
    }
  }
  @media (orientation: landscape) and (min-width: 600px) and (max-width: 896px) {
    margin-bottom: 0;
    h2 {
      font-size: 20px;
    }
  }
  @media (max-width: 724px) {
    margin: 20px 0 10px 0;
    h2 {
      font-size: 20px;
      padding: 0;
      margin: 0;
    }
    p {
      font-size: 12px;
    }
  }
`;
const Detail = styled.div`
  font-size: 15px;
  color: white;
  margin-top: 6px;
  text-align: center;

  div {
    color: #a6a6a6;
    font-size: 14px;
  }

  @media (orientation: landscape) and (min-width: 600px) and (max-width: 896px) {
    margin: 0;
    padding: 0;
    div {
      font-size: 8px;
      margin: 0;
      padding: 0;
    }
  }

  @media (max-width: 724px) {
    font-size: 15px;
    div {
      font-size: 11px;
    }
  }
`;
