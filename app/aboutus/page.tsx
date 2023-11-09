import Image from 'next/image';
import { Metadata } from 'next';

import styles from './aboutus.module.scss';

export const metadata: Metadata = {
  title: 'Movielust - About Us',
  description: 'See more about movielust here.',
};

function Aboutus() {
  return (
    <div className={styles.Container}>
      <h3>About Us</h3>
      <ul className={styles.Notice}>
        <li>
          <p>
            This website is result of project for educational research and is
            not for commercial purposes.We are building Movie Recommendation
            Webapp for user to find entertainment content relavent to their
            taste so user can get best recommendation.
          </p>
        </li>
        <li>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <a href="https://www.themoviedb.org/">
              <Image
                width={40}
                height={20}
                src="/images/svgs/tmdb_attr.svg"
                unoptimized
                alt="YTS logo"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </a>
            <a href="https://en.wikipedia.org/wiki/YIFY">
              <Image
                width={40}
                height={20}
                src="/images/yts_logo.png"
                unoptimized
                alt="YTS logo"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </a>
          </div>

          <p>
            This product uses the TMDB API but is not endorsed or certified by
            TMDB.We do not claim the ownership of data and images on this
            website. All the data and images are sourced from TMDB and YTS.
          </p>
        </li>
        <li>
          <p>
            Reach us at
            <a className={styles.Mail} href="mailto:support@movielust.store">
              <b> support@movielust.store</b>
            </a>
          </p>
        </li>
      </ul>
    </div>
  );
}

export default Aboutus;
