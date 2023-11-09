import { useState, useCallback, useRef } from 'react';
import ReactModal from 'react-modal';
import NextImage from 'next/image';
import styled from '@emotion/styled';
import { FaAngleLeft, FaAngleRight, FaExpand, FaTimes } from 'react-icons/fa';

import { useEventListener, useSwipeEvent } from '../../hooks';

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
    transform: 'translate(-50%, -50%)',
    zIndex: 999999999999,
    padding: 0,
    overflow: 'hidden',
  },
};

interface ModalProps {
  imagess?: string[];
  onClose: Function;
  at?: number;
}

// ReactModal.setAppElement("#root");

function Modal({
  imagess = [
    'https://image.tmdb.org/t/p/original/1953j0QEbtN17WFFTnJHIm6bn6I.jpg',
  ],
  onClose,
  at = 0,
}: ModalProps) {
  const [index, setState] = useState(at || 0);
  const [loading, setLoading] = useState(true);

  const imgRef = useRef();

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
      if (e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'Escape') {
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
        (imgRef.current as any).requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  };

  return (
    <ReactModal isOpen onRequestClose={onClose as any} style={customStyles}>
      <Container ref={imgRef as any}>
        {loading && (
          <Loader>
            <NextImage
              src="/images/svgs/player_loading.svg"
              width={40}
              height={40}
              unoptimized
              alt="loading"
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
          </Loader>
        )}
        <Image
          onDoubleClick={fullScreen}
          extends={90}
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
        <Cross className="cross" role="presentation" onClick={onClose as any}>
          <FaTimes />
        </Cross>
      </Container>
    </ReactModal>
  );
}

export default Modal;

const Image = styled.img<{ extends: number }>`
  height: ${(props) => (props.extends === 90 ? '35%' : '25%')};
  object-fit: contain;
  position: relative;
  user-select: none;
  &:fullscreen,
  &:-webkit-full-screen {
    height: 100%;
    object-fit: fill;
  }
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
  position: relative;
  width: 80vw;
  @media (max-width: 724px) {
    flex-direction: column;
    width: 90vw;
  }
  &:fullscreen,
  &:-webkit-full-screen {
    width: 100vw;
    height: 100vh;
    .cross {
      font-size: 3rem;
      position: absolute;
      right: 80px;
    }
    img {
      height: 100%;
      object-fit: contain;
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
  img {
    width: 60px;
  }
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
