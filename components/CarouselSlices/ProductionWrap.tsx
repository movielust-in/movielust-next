'use client';

import { useState } from 'react';
import Image from 'next/image';
// import ColorThief from 'colorthief';

// import Spinner from '../UI/Spinner';

// const colorThief = new ColorThief();

import styles from '../../styles/productionWrap.module.scss';

interface ProductionWrapProps {
  src: string;
  alt: string;
}

// const backgroundRef = useRef<HTMLImageElement>();

function ProductionWrap({ src, alt }: ProductionWrapProps) {
  // const [loading, setLoading] = useState(false);
  // const [opacity, setOpacity] = useState(true);
  const [imgSrc, setImgSrc] = useState(src);

  // const onLoad = () => {
  // setLoading(false);
  // setOpacity(true);
  // };

  const onError = () => {
    setImgSrc('https://ik.imagekit.io/movielust/logo_uIeABdFs3.webp');
  };

  return src ? (
    <div className={styles.Wrapper}>
      {/* {loading && (
        <Loading>
          <Spinner />
        </Loading>
      )} */}
      <Image
        className={styles.Photo}
        width={120}
        height={50}
        unoptimized
        src={imgSrc}
        alt={alt || 'no alt'}
        // onLoad={() => {
        //   onLoad();
        // }}
        // opaque={opacity}
        onError={onError}
        style={{
          maxWidth: '100%',
          height: 'auto',
        }}
      />
    </div>
  ) : null;
}

export default ProductionWrap;

// interface WrapperPros {
//   hover: boolean;
// }

// const Wrapper = styled.div<WrapperPros>`
//   align-items: center;
//   border: 1px solid rgba(249, 249, 249, 0.1);
//   border-radius: 6px;
//   cursor: pointer;
//   display: flex;
//   flex: 1;
//   height: 15vh;
//   justify-content: center;
//   overflow: hidden;
//   transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
//   width: 100%;

//   &:hover {
//     border-color: rgba(249, 249, 249, 0.8);
//     box-shadow: rgb(0, 0, 0, 0.29) 0px 20px 20px -20px,
//       rgb(0, 0, 0, 0.73) 0px 16px 10px -10px;
//     transform: ${(props) => (props.hover ? 'scale(1.2)' : 'none')};
//     z-index: 2;
//   }

//   &:active {
//     transform: scale(0.95);
//   }
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
//   align-items: center;
//   display: flex;
//   height: 100vh;
//   justify-content: center;
//   margin: 0;
//   position: absolute;
//   width: 100vw;

//   img {
//     height: 50px;
//     width: 50px;
//   }
// `;

// interface PhotoProps {
//   opaque: boolean;
// }

// const Photo = styled.img<PhotoProps>`
//   object-fit: contain;
//   opacity: ${(props) => (props.opaque ? 1 : 0)};
//   pointer-events: none !important;
//   transform: scale(${(props) => (props.opaque ? 1 : 0)});
//   transition: all 200ms ease;
//   width: 45%;
// `;
