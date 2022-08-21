import React, { useCallback, useRef, useState } from "react";
import { Swiper } from "swiper/react";
import { Navigation, FreeMode } from "swiper";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

import styles from "../../styles/carousel.module.scss";

interface CaroselProps {
  children: React.ReactNode;
  carosel_id?: string;
  breakPoints?: Record<number, Record<"slidesPerView", number>>;
}

Carousel.defaultProps = {
  carosel_id: "",
  breakPoints: {
    1024: {
      slidesPerView: 7,
      as: "sdasd",
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
  const prevRef = useRef();
  const nextRef = useRef();
  const [showPrev, setPrev] = useState(false);
  const [showNext, setNext] = useState(true);
  const [hideNav, setNav] = useState(false);

  const onInit = useCallback((swiper: any) => {
    setTimeout(() => {
      const breakPoint = swiper.currentBreakpoint;
      const nSlides = swiper.slides ? swiper.slides.length : 0;
      if ((breakPoint === "1024" || breakPoint === "424") && nSlides <= 7) {
        setNav(true);
      } else if (breakPoint === "0" && nSlides <= 3) setNav(true);
    }, 100);
    if (!swiper.allowSlideNext) setNext(false);
    if (swiper && swiper.params && swiper.params.navigation) {
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
    }
    swiper.navigation.destroy();
    swiper.navigation.init();
    swiper.navigation.update();
  }, []);

  const onSlideChange = (swiper: any) => {
    if (swiper.isBeginning || swiper.activeIndex === 0) setPrev(false);
    if (swiper.isEnd) setNext(false);
    else setNext(true);
    if (swiper.activeIndex > 0) setPrev(true);
  };

  return (
    <Swiper
      freeMode
      id={carosel_id}
      spaceBetween={10}
      slidesPerGroup={3}
      onBeforeInit={onInit}
      breakpoints={breakPoints}
      onSlideChange={onSlideChange}
      modules={[Navigation, FreeMode]}
      navigation={{
        prevEl: prevRef.current,
        nextEl: nextRef.current,
      }}
      className="swiper_carousel"
    >
      {children}
      {/* Prev Button */}
      <div
        ref={prevRef as any}
        className={`${styles.nav} ${styles.prev} ${
          hideNav ? styles.display_none : null
        } ${showPrev ? styles.nav_active : styles.nav_disabled}`}
      >
        <FaAngleLeft />
      </div>
      {/* Next Button */}
      <div
        ref={nextRef as any}
        className={`${styles.nav} ${styles.next} ${
          hideNav ? styles.display_none : null
        } ${showNext ? styles.nav_active : styles.nav_disabled}`}
      >
        <FaAngleRight />
      </div>
    </Swiper>
  );
}

export default Carousel;
