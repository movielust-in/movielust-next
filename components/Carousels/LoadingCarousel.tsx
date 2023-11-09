import { useMemo } from 'react';
import Image from 'next/image';
import { SwiperSlide } from 'swiper/react';

import Shimmer from '../UI/Shimmer';
import styles from '../../styles/carousel.module.scss';

import Carousel from './Carousel';

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
          <Image
            alt=""
            width={150}
            height={220}
            src={shimmer}
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            alt=""
            width={150}
            height={220}
            src={shimmer}
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            alt=""
            width={150}
            height={220}
            src={shimmer}
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            alt=""
            width={150}
            height={220}
            src={shimmer}
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            alt=""
            width={150}
            height={220}
            src={shimmer}
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            alt=""
            width={150}
            height={220}
            src={shimmer}
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            alt=""
            width={150}
            height={220}
            src={shimmer}
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            alt=""
            width={150}
            height={220}
            src={shimmer}
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            alt=""
            width={150}
            height={220}
            src={shimmer}
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        </SwiperSlide>
      </Carousel>
    </div>
  );
}

export default LoadingCarousel;
