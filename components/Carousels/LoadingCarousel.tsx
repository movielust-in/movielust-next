import { useMemo } from 'react';
import Image from 'next/image';
import { SwiperSlide } from 'swiper/react';

import Carousel from './Carousel';
import Shimmer from '../UI/Shimmer';

import styles from '../../styles/carousel.module.scss';

function LoadingCarousel() {
  const shimmer = useMemo(() => Shimmer(150, 220), []);

  return (
    <div>
      <div className={styles.Title}>
        <h2>Loading...</h2>
      </div>
      <div>
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
    </div>
  );
}

export default LoadingCarousel;
