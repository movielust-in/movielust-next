/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-nested-ternary */
import { memo, useState } from 'react';
import dynamic from 'next/dynamic';
import Nimage from 'next/image';
import { SwiperSlide } from 'swiper/react';

import Carousel from './Carousel';
import Shimmer from '../UI/Shimmer';

import carouselStyles from '../../styles/carousel.module.scss';
import imageCarouselStyles from '../../styles/imageCarousel.module.scss';

const ImageModal = dynamic(() => import('../Modal/ImageModal'));
const PeopleModal = dynamic(() => import('../Modal/PeopleModal'));

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
        <div className={imageCarouselStyles.Container}>
          {title && (
            <div className={carouselStyles.Title}>
              <h2>{title}</h2>
            </div>
          )}
          <Carousel carosel_id="image_slider">
            {images &&
              images
                .filter((movie: any) => movie !== null)
                .map((movie: any, index: number) => (
                  <SwiperSlide key={movie.file_path}>
                    <div
                      className={imageCarouselStyles.Wrapper}
                      role="presentation"
                      onClick={() => {
                        setIndex(index);
                        setOpen(true);
                      }}
                    >
                      <Nimage
                        width={200}
                        height={300}
                        blurDataURL={Shimmer(200, 120)}
                        placeholder="blur"
                        src={`https://image.tmdb.org/t/p/w200/${movie.file_path}`}
                        alt={movie.id}
                      />
                    </div>
                  </SwiperSlide>
                ))}
          </Carousel>
        </div>
      ) : null}

      {open && images && (type === 'movie' || type === 'tv') ? (
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
