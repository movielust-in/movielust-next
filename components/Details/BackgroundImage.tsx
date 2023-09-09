import Image from "next/legacy/image";

import styles from './Detail.module.scss';

interface DetailBackgroundProps {
  // setDomColor: any;
  backdrop: string | undefined;
}

function BackgroundComp({ backdrop }: DetailBackgroundProps) {
  return (
    <div className={styles.Background}>
      <Image
        layout="fill"
        unoptimized
        alt="movieposter"
        src={
          backdrop
            ? `https://image.tmdb.org/t/p/w1280${backdrop}`
            : '/images/25559.webp'
        }
      />
    </div>
  );
}

export default BackgroundComp;
