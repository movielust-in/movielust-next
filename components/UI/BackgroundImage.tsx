/* eslint-disable @next/next/no-img-element */
import styled from '@emotion/styled';

interface BackgroundImageProps {
  src: string;
}

function BackgroundImage({ src }: BackgroundImageProps) {
  return (
    <Background>
      <img src={src} alt="background poster" />
    </Background>
  );
}

export default BackgroundImage;

const Background = styled.div`
  bottom: 0;
  left: 0;
  opacity: 0.5;
  position: fixed;
  right: 0;
  top: 8vh;
  z-index: -1;

  img {
    height: 100%;
    object-fit: cover;
    width: 100%;
  }
`;
