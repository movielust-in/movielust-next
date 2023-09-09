import { ReactNode } from 'react';
import { Swiper } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

import styles from '../../styles/carousel.module.scss';

interface CaroselProps {
  children: ReactNode;
  carosel_id?: string;
  breakPoints?: Record<number, Record<'slidesPerView', number>>;
}

Carousel.defaultProps = {
  carosel_id: '',
  breakPoints: {
    1024: {
      slidesPerView: 7,
      as: 'sdasd',
    },
    464: {
      slidesPerView: 7,
    },
    0: {
      slidesPerView: 3,
    },
  },
};

function Carousel({ children, carosel_id, breakPoints }: CaroselProps) {
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
      {/* Prev Button */}
      <div className={`${styles.nav} ${styles.prev}`}>
        <FaAngleLeft />
      </div>
      {/* Next Button */}
      <div className={`${styles.nav} ${styles.next}`}>
        <FaAngleRight />
      </div>
    </Swiper>
  );
}

export default Carousel;
