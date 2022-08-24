import { useMemo } from 'react';
import Image from 'next/image';
import { SwiperSlide } from 'swiper/react';

import Carousel from './Carousel';
import Shimmer from '../UI/Shimmer';

import styles from '../../styles/carousel.module.scss';

function LoadingCarousel({ title }: { title?: string }) {
  const shimmer = useMemo(() => Shimmer(150, 220), []);

  return (
    <div>
      {title ? (
        <div className={styles.Title}>
          <h2>{title}</h2>
        </div>
      ) : null}
      <Carousel carosel_id="movie_slider">
        <SwiperSlide>
          <Image width={150} height={220} src={shimmer} />
        </SwiperSlide>
        <SwiperSlide>
          <Image width={150} height={220} src={shimmer} />
        </SwiperSlide>
        <SwiperSlide>
          <Image width={150} height={220} src={shimmer} />
        </SwiperSlide>
        <SwiperSlide>
          <Image width={150} height={220} src={shimmer} />
        </SwiperSlide>
        <SwiperSlide>
          <Image width={150} height={220} src={shimmer} />
        </SwiperSlide>
        <SwiperSlide>
          <Image width={150} height={220} src={shimmer} />
        </SwiperSlide>
        <SwiperSlide>
          <Image width={150} height={220} src={shimmer} />
        </SwiperSlide>
        <SwiperSlide>
          <Image width={150} height={220} src={shimmer} />
        </SwiperSlide>
        <SwiperSlide>
          <Image width={150} height={220} src={shimmer} />
        </SwiperSlide>
      </Carousel>
    </div>
  );
}

export default LoadingCarousel;
