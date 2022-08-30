/* eslint-disable @next/next/no-img-element */

import styles from '../../styles/backgroundImage.module.scss';

interface BackgroundImageProps {
  src: string;
}

function BackgroundImage({ src }: BackgroundImageProps) {
  return (
    <div className={styles.background}>
      <img src={src} alt="background poster" />
    </div>
  );
}

export default BackgroundImage;
