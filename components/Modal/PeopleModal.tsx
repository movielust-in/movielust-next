import { useState, useCallback, useRef, MutableRefObject } from 'react';
import styled from '@emotion/styled';
import { FaAngleLeft, FaAngleRight, FaExpand, FaTimes } from 'react-icons/fa';
import ReactModal from 'react-modal';

import Spinner from '../UI/Spinner';
import {
  useEventListener,
  useLockBodyScroll,
  useSwipeEvent,
} from '../../hooks';

interface PeopleModalProps {
  imagess?: string[];
  onClose: Function;
  at?: number;
}

const customStyles: ReactModal.Styles = {
  overlay: {
    backgroundColor: 'rgba(1,1,1,0.6)',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999999999999,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    // marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 999999999999,
    padding: 0,
    overflow: 'hidden',
  },
};

function PeopleModal({
  imagess = [
    'https://image.tmdb.org/t/p/original/1953j0QEbtN17WFFTnJHIm6bn6I.jpg',
  ],
  onClose,
  at = 0,
}: PeopleModalProps) {
  useLockBodyScroll();

  const [index, setState] = useState(at || 0);
  const [loading, setLoading] = useState(true);

  const imgRef = useRef<HTMLImageElement>();

  const images = imagess || [
    'https://image.tmdb.org/t/p/original/1953j0QEbtN17WFFTnJHIm6bn6I.jpg',
  ];

  const nextSlide = useCallback(() => {
    if (!loading) {
      setState((state) => {
        if (state < images.length - 1) {
          setLoading(true);
          return state + 1;
        }
        setLoading(true);
        return 0;
      });
    }
  }, [images.length, loading]);

  const prevSlide = useCallback(() => {
    if (!loading) {
      setState((state) => {
        if (state > 0) {
          setLoading(true);
          return state - 1;
        }
        setLoading(true);
        return images.length - 1;
      });
    }
  }, [images.length, loading]);

  const keyBoardNavigation = useCallback(
    (e: KeyboardEvent) => {
      if (e.keyCode === 39) {
        nextSlide();
      } else if (e.keyCode === 37) {
        prevSlide();
      } else if (e.keyCode === 27) {
        onClose();
      }
    },
    [nextSlide, prevSlide, onClose]
  );

  useEventListener('keydown', keyBoardNavigation);

  const loaded = () => {
    setLoading(false);
  };

  const tasks = {
    left: prevSlide,
    right: nextSlide,
  };

  useSwipeEvent(tasks, imgRef);

  const fullScreen = () => {
    if (imgRef.current) {
      if (document.fullscreenElement === null) {
        imgRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  };

  return (
    <ReactModal isOpen onRequestClose={onClose as any} style={customStyles}>
      <Container ref={imgRef as MutableRefObject<HTMLDivElement>}>
        {loading && (
          <Loader>
            <Spinner width={60} />
          </Loader>
        )}
        <Image
          id="image"
          onDoubleClick={fullScreen}
          src={images[index]}
          alt=""
          onLoad={loaded}
        />
        <Prev onClick={prevSlide}>
          <FaAngleLeft />
        </Prev>
        <Next onClick={nextSlide}>
          <FaAngleRight />
        </Next>
        <FullScreen onClick={fullScreen} />
        <Cross id="cross" role="presentation" onClick={onClose as any}>
          <FaTimes />
        </Cross>
      </Container>
    </ReactModal>
  );
}

export default PeopleModal;

const Image = styled.img`
  /* height: 720px; */
  width: 100%;
  object-fit: contain;
  user-select: none;
`;

const Cross = styled.div`
  cursor: pointer;
  font-size: 2rem;
  font-weight: 400;
  margin: 10px;
  padding: 5px;

  @media (max-width: 724px) {
    display: none;
  }
`;

const Container = styled.div`
  display: flex;
  /* justify-content: center; */
  /* align-items: center; */
  object-fit: contain;
  position: relative;
  width: 31vw;
  @media (max-width: 724px) {
    flex-direction: column;
    width: 100%;
  }
  &:fullscreen,
  &:-webkit-full-screen {
    width: 100vw;
    height: 100vh;
    #Cross {
      font-size: 3rem;
      position: absolute;
      right: 80px;
    }

    justify-content: center;
    #Image {
      object-fit: contain;
      width: 100%;
    }
  }
`;

const Loader = styled.div`
  align-items: center;
  background: rgba(1, 1, 1, 0.4);
  display: flex;
  height: 100%;
  justify-content: center;
  margin: auto;
  position: absolute;
  width: 100%;
  z-index: 1;
`;

const Nav = styled.button`
  align-items: center;
  background: rgba(1, 1, 1, 0.1);
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  font-size: 3.5rem;
  font-weight: 100;
  height: 100%;
  justify-content: center;

  padding: 10px;
  position: absolute;
  user-select: none;
  @media (max-width: 724px) {
    font-size: 2rem;
  }
`;

const Prev = styled(Nav)`
  left: 0;
`;
const Next = styled(Nav)`
  right: 0;
`;

const FullScreen = styled(FaExpand)`
  bottom: 50px;
  font-size: 1.2rem;
  position: absolute;
  right: 120px;
  @media (max-width: 724px) {
    right: 60px;
    bottom: 20px;
  }
`;
