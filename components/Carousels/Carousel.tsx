import React, { useCallback, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Swiper } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

interface CaroselProps {
    children: React.ReactNode;
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
    const prevRef = useRef();
    const nextRef = useRef();
    const [showPrev, setPrev] = useState(false);
    const [showNext, setNext] = useState(true);
    const [hideNav, setNav] = useState(false);

    const onInit = useCallback((swiper: any) => {
        setTimeout(() => {
            const breakPoint = swiper.currentBreakpoint;
            const nSlides = swiper.slides ? swiper.slides.length : 0;
            if ((breakPoint === '1024' || breakPoint === '424') && nSlides <= 7) {
                setNav(true);
            } else if (breakPoint === '0' && nSlides <= 3) setNav(true);
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
            <Prev show={showPrev} disable={hideNav} ref={prevRef as any}>
                <FaAngleLeft />
            </Prev>
            <Next show={showNext} disable={hideNav} ref={nextRef as any}>
                <FaAngleRight />
            </Next>
        </Swiper>
    );
}

export default Carousel;

interface NavProps {
    disable: boolean;
    show: boolean;
}

const Nav = styled.div<NavProps>`
    align-items: center;
    color: white;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    font-size: 40px;
    height: 100%;
    justify-content: center;
    position: absolute;
    top: 0;
    width: 40px;
    z-index: 100000;

    &:hover {
        background-color: rgba(50, 50, 50, 0.3);
    }
    @media (max-width: 724px) {
        width: 30px;
        font-size: 30px;
    }
`;

const Prev = styled(Nav)`
    border-radius: 6px 0 0 6px;
    color: ${(props) => (props.show ? 'white' : 'gray')};
    display: ${(props) => (props.disable ? 'none' : 'auto')};
    opacity: ${(props) => (props.show ? '1' : '0.6')};
`;

const Next = styled(Nav)`
    border-radius: 0 6px 6px 0;
    color: ${(props) => (props.show ? 'white' : 'gray')};
    display: ${(props) => (props.disable ? 'none' : 'auto')};
    left: 95.2%;
    opacity: ${(props) => (props.show ? '1' : '0.6')};
    @media (max-width: 724px) {
        left: 89%;
    }
`;
