'use client';

import { useState } from 'react';
import Image from 'next/image';

import styles from '../../styles/personCard.module.scss';
import Shimmer from '../UI/Shimmer';

interface WrapPros {
  src: string;
  title: string;
  alt: string;
  role?: string;
}

function PersonCard({ title, src, alt, role }: WrapPros) {
  const [loading, setLoading] = useState(true);
  // const [opacity, setOpacity] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);

  const onLoad = () => {
    setLoading(false);
    // setOpacity(true);
  };

  const onError = () => {
    setLoading(false);
    setImgSrc('/images/placeholder-image.png');
  };

  return src ? (
    <div className={styles.Wrapper}>
      {/* {loading && (
        <Loading>
          <Image src={ColorSpinner} alt="loading" />
        </Loading>
      )} */}
      <Image
        className={styles.Photo}
        width={200}
        height={300}
        blurDataURL={Shimmer(200, 300)}
        unoptimized
        placeholder="blur"
        src={imgSrc}
        alt={alt || 'no alt'}
        onLoad={onLoad}
        // opaque={opacity}
        onError={onError}
        loading="lazy"
        style={{
          maxWidth: '100%',
          height: 'auto',
        }}
      />
      {!loading && title && (
        <div className={styles.Information}>
          {title && (
            <h3 className={styles.Title}>
              {title}
              {role ? <> as {role}</> : null}
            </h3>
          )}
        </div>
      )}
    </div>
  ) : null;
}

export default PersonCard;

// const Title = styled.h3`
//   color: rgba(255, 255, 255, 0.8);
//   font-size: 1rem;
//   margin: 0;
//   padding: 0;
//   text-align: center;
//   text-size-adjust: auto;
//   @media (orientation: landscape) and (min-width: 600px) and (max-width: 896px) {
//     font-size: 10px;
//   }
//   @media (max-width: 724px) {
//     font-size: 0.7rem;
//   }
// `;

// const Information = styled.div<{ extend: number }>`
//   align-items: center;
//   flex-direction: column;
//   justify-content: center;
//   mix-blend-mode: luminosity;
//   padding: 5px;
//   width: 100%;

//   @media (max-width: 724px) {
//     bottom: auto;
//     width: auto;
//     height: auto;
//     white-space: wrap;
//     max-width: 70%;
//     h3 {
//       font-size: ${(props) => (props.extend > 20 ? '0.5rem' : '0.7rem')};
//     }
//   }
// `;

// const Wrapper = styled.div`
//   position: relative;
//   display: flex;
//   flex: 1;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   background-color: #090c14;
//   border: transparent;
//   cursor: pointer;
//   border-radius: 8px;
//   min-height: 220px;
//   overflow: hidden;
//   transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;

//   &:active {
//     transform: scale(0.95);
//   }

//   width: 90%;

//   @media (max-width: 620px) {
//     min-height: 60px;
//   }
//   @media (max-width: 724px) {
//     min-height: 100px;
//     &:hover {
//       transform: none;
//     }
//   }
//   @media (max-width: 920px) {
//     min-height: 120px;
//   }
//   @media (max-width: 1320px) {
//     min-height: 130px;
//   }
// `;

// const Loading = styled.div`
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translateX(-50%) translateY(-50%);

//   img {
//     height: 50px;
//     opacity: 0.5;
//     width: 50px;
//   }
// `;

// interface PhotoProps {
//   opaque: boolean;
// }

// const Photo = styled(Image)<PhotoProps>`
//   min-height: 100%;
//   object-fit: contain;
//   opacity: ${(props) => (props.opaque ? 1 : 0)};
//   pointer-events: none !important;
//   transform: ${(props) => (props.opaque ? 'scale(1)' : 'scale(0.8)')};
//   transition: all 400ms ease;
//   border-radius: 8px;
//   width: 100%;
// `;
