import { useState } from 'react';
import Image from 'next/image';
import styled from '@emotion/styled';
import { useEventListener } from '../../hooks';
import scrollToTop from '../../utils/scrollToTop';

export default function ScrollTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEventListener('scroll', toggleVisibility);

  return (
    <ScrollTopContainer isVisible={isVisible}>
      <Image
        role="presentation"
        style={{ transform: isVisible ? 'translateY(0)' : 'translateY(150px)' }}
        onClick={scrollToTop}
        width={50}
        height={50}
        src="/images/up.png"
        alt="Go to top"
      />
    </ScrollTopContainer>
  );
}

const ScrollTopContainer = styled.div<{ isVisible: boolean }>`
  bottom: 0.7rem;
  cursor: pointer;
  position: fixed;
  right: 2rem;
  z-index: 2000;
  img {
    transition: all 500ms ease;
  }

  @media (max-width: 724px) {
    margin-bottom: 44px;
    img {
      height: 40px;
      width: 40px;
    }
  }
`;
