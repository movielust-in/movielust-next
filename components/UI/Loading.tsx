/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import { useState, useEffect } from 'react';

import styles from '../../styles/loading.module.scss';

interface LoadingProps {
  delay?: number;
}

Loading.defaultProps = {
  delay: 250,
};

function Loading({ delay }: LoadingProps) {
  const [message, setMessage] = useState('Coming Up...');

  const [show, setShow] = useState(false);

  let interval: any;

  const timer = () => {
    let count = 1;
    interval = setInterval(() => {
      count += 1;
      switch (count) {
        case 5:
          setMessage('Almost there......');
          break;
        case 10:
          setMessage("It's taking time please wait...");
          break;
        case 30:
          setMessage("Sometimes it's better to let go... :(");
          break;
        default:
          break;
      }
    }, 1000);
  };

  useEffect(() => {
    timer();
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true);
    }, delay);
    return () => {
      clearTimeout(timeout);
    };
  }, [delay]);

  return show ? (
    <div className={styles.container}>
      <Image
        src="https://ik.imagekit.io/movielust/ghost_1-kuGMRZo.webp"
        alt="loading"
        width="60px"
        height="60px"
      />
      <p>{message}</p>
    </div>
  ) : null;
}

export default Loading;
