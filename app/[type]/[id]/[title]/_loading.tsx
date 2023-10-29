import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import styles from './Detail.module.scss';

import 'react-loading-skeleton/dist/skeleton.css';

const LoadingUI = () => (
  <div className={styles.Container}>
    <div className={styles.TopContainer}>
      <SkeletonTheme
        borderRadius={20}
        inline
        baseColor="grey"
        highlightColor="white"
      >
        <div className={styles.Poster}>
          <div
            style={{
              display: 'block',
              flex: 1,
              height: '100%',
              width: '100%',
              backgroundColor: 'red',
            }}
          >
            <Skeleton
              //   style={{
              //     display: 'block',
              //     flex: 1,
              //     alignItems: 'stretch',
              //   }}
              width="100%"
              height="100%"
            />
          </div>
        </div>
        {/* <div className= {styles.YouTube}>
          <div
            style={{
              display: 'block',
              flex: 1,
              height: '100%',
              width: '100%',
              maxWidth: '100%',
              maxHeight: '100%',
            }}
          >
            <Skeleton
              style={{ maxWidth: '100%', maxHeight: '100%' }}
              height={400}
              width={720}
            />
          </div>
        </div> */}
      </SkeletonTheme>
    </div>
  </div>
);

export default LoadingUI;
