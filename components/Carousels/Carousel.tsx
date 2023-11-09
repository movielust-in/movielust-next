import { ReactNode } from 'react';
import { Swiper } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

import styles from '../../styles/carousel.module.scss';

interface CaroselProps {
  children: ReactNode;
  carosel_id?: string;
  breakPoints?: Record<number, Record<string, number>>;
}

const defaultBreakpoints = {
  1024: {
    slidesPerView: 7,
  },
  724: {
    slidesPerView: 6,
  },
  464: {
    slidesPerView: 5,
  },
  0: {
    slidesPerView: 3,
  },
};

function Carousel({
  children,
  carosel_id = '',
  breakPoints = defaultBreakpoints,
}: CaroselProps) {
  return (
    <Swiper
      freeMode
      id={carosel_id}
      spaceBetween={10}
      slidesPerGroup={3}
      breakpoints={breakPoints}
      className={styles.carousel}
      modules={[Navigation, FreeMode]}
      navigation={{
        prevEl: `.${styles.prev}`,
        nextEl: `.${styles.next}`,
        disabledClass: styles.nav_disabled,
        lockClass: styles.display_none,
      }}
    >
      {children}
      <div className={`${styles.nav} ${styles.prev}`}>
        <FaAngleLeft />
      </div>
      <div className={`${styles.nav} ${styles.next}`}>
        <FaAngleRight />
      </div>
    </Swiper>
  );
}

export default Carousel;
