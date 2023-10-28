'use client';

/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react';

import styles from '../../styles/loading.module.scss';

interface LoadingProps {
  delay?: number;
}



function Loading({ delay =250}: LoadingProps) {
  const [message, setMessage] = useState('Coming Up...');

  const [show, setShow] = useState(false);

  useEffect(() => {
    let count = 1;

    const interval = setInterval(() => {
      count += 1;
      switch (count) {
        case 5:
          setMessage('Almost there......');
          break;
        case 10:
          setMessage("It's taking time please wait...");
          break;
        case 50:
          setMessage("Sometimes it's better to let go... :(");
          break;
        default:
          break;
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  return show ? (
    <div className={styles.container}>
      <img
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
