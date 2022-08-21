/* eslint-disable no-nested-ternary */
import { memo, useState } from "react";
import styled from "@emotion/styled";
import { SwiperSlide } from "swiper/react";
import Carousel from "./Carousel";

import ImageModal from "../Modal/ImageModal";
import PeopleModal from "../Modal/PeopleModal";

// const ImageModal = React.lazy(() => import('../Modal/ImageModal'));
// const PeopleModal = React.lazy(() => import('../Modal/PeopleModal'));

import styles from "../../styles/carousel.module.scss";
interface ImageCrouselProps {
  images: any;
  type: string;
  title?: string;
  dom?: any;
}

ImageCrousel.defaultProps = {
  title: null,
};

function ImageCrousel({ images, type, title, dom }: ImageCrouselProps) {
  const [open, setOpen] = useState(false);

  const closeModal = () => setOpen(false);

  const [modalIndex, setIndex] = useState(0);

  return (
    <>
      {images !== undefined && images.length > 0 ? (
        <Container>
          {title && (
            <div className={styles.Title}>
              <h2>{title}</h2>
            </div>
          )}
          <Carousel carosel_id="image_slider">
            {images &&
              images
                .filter((movie: any) => movie !== null)
                .map((movie: any, index: number) => (
                  <SwiperSlide key={movie.file_path}>
                    <Wrapper
                      role="presentation"
                      onClick={() => {
                        setIndex(index);
                        setOpen(true);
                      }}
                    >
                      <Photo
                        src={`https://image.tmdb.org/t/p/w200/${movie.file_path}`}
                        alt={movie.id}
                      />
                    </Wrapper>
                  </SwiperSlide>
                ))}
          </Carousel>
        </Container>
      ) : null}

      {open && images && (type === "movie" || type === "tv") ? (
        <ImageModal
          at={modalIndex}
          onClose={closeModal}
          imagess={images.map(
            (movie: any) =>
              `https://image.tmdb.org/t/p/w1280/${movie.file_path}`
          )}
        />
      ) : open ? (
        <PeopleModal
          at={modalIndex}
          onClose={closeModal}
          imagess={images.map(
            (movie: any) =>
              `https://image.tmdb.org/t/p/w1280/${movie.file_path}`
          )}
        />
      ) : null}
    </>
  );
}

export default memo(ImageCrousel);

const Container = styled.div`
  border-radius: 15px;
  box-shadow: 5px 3px 30px black;
  margin-top: 10px;
  overflow: hidden;
  padding: 10px;
  position: relative;
  user-select: none;
`;

const Photo = styled.img`
  object-fit: contain;
  pointer-events: none !important;
  transition: all 200ms ease;
  width: 100%;
  min-height: 120px;

  @media (max-width: 1200px) {
    min-height: 70px;
  }
  @media (max-width: 1200px) {
    min-height: 70px;
  }
  @media (max-width: 836px) {
    min-height: 50px;
  }
  @media (max-width: 500px) {
    min-height: 30px;
  }
`;

const Wrapper = styled.div`
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  flex: 1;
  justify-content: center;
  overflow: hidden;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  width: 100%;
  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 724px) {
    &:hover {
      transform: none;
    }
  }
`;
