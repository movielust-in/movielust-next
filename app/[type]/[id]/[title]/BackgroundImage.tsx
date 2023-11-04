import Image from 'next/image';

import styles from './Detail.module.scss';

interface DetailBackgroundProps {
  backdrop: string | undefined;
}

function BackgroundComp({ backdrop }: DetailBackgroundProps) {
  return (
    <div className={styles.Background}>
      <Image
        unoptimized
        alt="movieposter"
        src={
          backdrop
            ? `https://image.tmdb.org/t/p/w1280${backdrop}`
            : '/images/25559.webp'
        }
        fill
        sizes="100vw"
      />
    </div>
  );
}

export default BackgroundComp;
