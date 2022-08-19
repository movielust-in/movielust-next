/* eslint-disable no-nested-ternary */
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Navigation, Autoplay } from "swiper";
import Link from "next/link";
import StarRatings from "react-star-ratings";
import { Swiper, SwiperSlide } from "swiper/react";

// import { Loading } from '..';

import Loading from "../UI/Loading";

import { image } from "../../api/Urls";
// import { CompaniesTopImages } from '../../api/tmdb/movies';

import { MovieResult } from "../../types/tmdb";
import { detailLink } from "../../utils";

interface ProductionImageSliderPros {
  data: [];
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
      <StyledSwiper
        loop
        id="production_slider"
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
                <Link href={detailLink("movie", movie.id!, movie.title!)}>
                  <a>
                    <Wrap>
                      <div>
                        <span>{movie.title}</span>
                        <Overview>{movie.overview!.slice(0, 200)}.</Overview>
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
                    </Wrap>
                  </a>
                </Link>
              </SwiperSlide>
            )
          )}
      </StyledSwiper>
    )
  );
}

export default ProductionImageSlider;

const StyledSwiper = styled(Swiper)`
  min-height: 250px;
  transition: all 200ms ease;
  user-select: none;
  width: 100%;
  @media (max-width: 724px) {
    min-height: 150px;
  }
`;

const Wrap = styled.div`
  background: linear-gradient(
    to left,
    rgba(42, 159, 255, 0) 0%,
    rgba(9, 12, 20, 1) 76%,
    rgba(9, 12, 20, 1) 100%
  );
  background-blend-mode: multiply;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  user-select: none;
  width: 100%;
  div {
    align-self: center;
    color: white;
    flex: 1;
    font-weight: 300;
    text-align: center;
    text-decoration: none;
    z-index: 1;
    @media (max-width: 724px) {
      font-size: 10px;
    }
  }

  picture {
    float: right;
    height: 580px;
    width: 75%;
    z-index: -100;
  }

  img {
    opacity: 0.8;
    width: 100%;
    z-index: -100;
  }

  span {
    font-family: "Roboto", sans-serif;
    font-size: 25px;
    font-weight: 500;
  }

  @media (max-width: 724px) {
    background: linear-gradient(
      to bottom,
      rgba(42, 159, 255, 0) 0%,
      rgba(9, 12, 20, 1) 94%,
      rgba(9, 12, 20, 1) 100%
    );
    flex-direction: column-reverse;
    picture {
      width: 100%;
      border-radius: 5px;
      height: 200px;
    }
    img {
      border-radius: 5px;
      width: 100%;
      height: 200px;
    }
    div {
      position: absolute;
    }
    span {
      background: RGBA(9, 12, 20, 0.85);
      margin: auto;
      padding: 0 5px 0 5px;
      font-size: 15px;
      border-radius: 5px;
    }
  }
`;

const Overview = styled.p`
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.5px;
  padding: 0 40px 0 40px;
  text-align: justify;
  @media (max-width: 724px) {
    display: none;
  }
`;
