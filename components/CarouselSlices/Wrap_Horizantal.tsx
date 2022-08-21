import { useState } from "react";
import styled from "@emotion/styled";
import NextImage from "next/image";
import { WrapText, Loading } from "./Wrap-Styled";
import Errored from "../../assets/images/placeholder-image-h.png";
import { ColorSpinner } from "../../assets";
import Shimmer from "../UI/Shimmer";

interface WrapPros {
  src: string;
  title: string;
  alt: string;
  hover?: boolean;
  rating?: number;
}

WrapH.defaultProps = {
  hover: false,
  rating: null,
};

function WrapH({ src, alt, hover, title, rating }: WrapPros) {
  const [loading, setLoading] = useState(true);
  const [imgSrc, setImgSrc] = useState(src);

  const onLoad = () => {
    setLoading(false);
  };

  const onError = () => {
    setLoading(false);
    setImgSrc(Errored.src);
  };

  return src ? (
    <Wrapper hover={hover} loading={loading.toString()}>
      <NextImage
        width={400}
        height={210}
        src={imgSrc}
        alt={alt || "no alt"}
        onLoad={onLoad}
        blurDataURL={Shimmer(400, 210)}
        placeholder="blur"
        onError={onError}
        loading="lazy"
      />
      {!loading && (rating || title) && (
        <Information extend={title.length || 0}>
          {title && <WrapText>{title}</WrapText>}
          {rating && (
            <WrapText>
              Rating:
              {rating}
            </WrapText>
          )}
        </Information>
      )}
    </Wrapper>
  ) : null;
}

export default WrapH;

const Information = styled.div<{ extend: number }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 12px 0px;
  width: 100%;
  @media (max-width: 724px) {
    white-space: wrap;
    h3 {
      font-size: ${(props) => (props.extend > 20 ? "0.5rem" : "0.7rem")};
    }
  }
`;

export const Image = styled.img<{ opaque: boolean }>`
  width: 100%;
  object-fit: contain;
  border-radius: 6px;
  opacity: ${(props) => (props.opaque ? 1 : 1)};
  pointer-events: none !important;
  transform: ${(props) => (props.opaque ? "scale(1)" : "scale(1))")};
  transition: all 500ms ease;
`;

const Wrapper = styled.div<{ hover?: boolean; loading: string }>`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
  min-height: 220px;
  overflow: hidden;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  width: 100%;

  img {
    border-bottom-right-radius: 0px !important;
    border-bottom-left-radius: 0px !important;
  }

  &:hover {
    border-color: rgba(249, 249, 249, 0.8);
    box-shadow: rgb(0, 0, 0, 0.29) 0px 20px 20px -20px,
      rgb(0, 0, 0, 0.73) 0px 16px 10px -10px;
    transform: ${(props) => (props.hover ? "scale(1.2)" : "none")};
    z-index: 2;
  }

  &:active {
    transform: scale(0.95);
  }
  @media (max-width: 620px) {
    min-height: 60px;
  }
  @media (max-width: 724px) {
    min-height: 100px;
    &:hover {
      transform: none;
    }
  }
  @media (max-width: 920px) {
    min-height: 120px;
  }
  @media (max-width: 1320px) {
    min-height: 130px;
  }
`;
