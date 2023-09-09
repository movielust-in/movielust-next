import React from 'react';
import Image from "next/image";

import styles from './formContainer.module.scss';

interface FormerProps {
  children: React.ReactNode;
}

function FormContainer({ children }: FormerProps) {
  return (
    <div className={styles.Container}>
      <div className={styles.Contact}>
        <div className={styles.SEO}>
          Movielust is the exclusive home for your favourite movies and TV
          series online or stream right to your device{' '}
        </div>
        <div className={styles.Info}>
          <h2>Welcome to Movielust</h2>
          <Image
            width={240}
            height={200}
            src="https://ik.imagekit.io/movielust/logo_uIeABdFs3.webp"
            unoptimized
            alt="logo"
            style={{
              maxWidth: "100%",
              height: "auto"
            }} />
          <p>A New Experience for your movie lust</p>
        </div>
        <div className={styles.FormContainer}>{children}</div>
      </div>
    </div>
  );
}
export default FormContainer;
