'use client';

import { useState } from 'react';
import Image from 'next/image';

import { useEventListener } from '../../hooks';
import scrollToTop from '../../utils/scrollToTop';
import styles from '../../styles/scrollToTop.module.scss';

export default function ScrollTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEventListener('scroll', toggleVisibility);

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`${styles.ScrollTopContainer} ${
        isVisible ? styles.visible : null
      }`}
    >
      <Image
        width={50}
        height={50}
        src="/images/up.webp"
        alt="Scroll to top"
        unoptimized
        style={{
          maxWidth: '100%',
          height: 'auto',
        }}
      />
    </button>
  );
}
