'use client';

import Link from 'next/link';

import { BackgroundImage } from '../components/UI';
import styles from '../styles/error.module.scss';

interface ErrorProps {
  error: Error & { digest?: string };
}

const Error = ({ error }: ErrorProps) => (
  <div className={styles.container}>
    <BackgroundImage src="/images/crash.webp" />
    <Link href="/" replace className={styles.homeButton}>
      Go Home
    </Link>
    <p className={styles.message}>
      An error has occured.
      <br />
      {error && error.message ? (
        <div className={styles['error-message']}>
          {error.name} : {error.message}
        </div>
      ) : null}
    </p>
  </div>
);

export default Error;
