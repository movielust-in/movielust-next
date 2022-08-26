import Link from 'next/link';

import { useRouter } from 'next/router';

import {
  MdPlaylistPlay as WatchlistIcon,
  MdLocalMovies as MovieIcon,
} from 'react-icons/md';

import { FaHome as HomeIcon } from 'react-icons/fa';

import { AiFillPlaySquare as SeriesIcon } from 'react-icons/ai';

import { BiSearchAlt as SearchIcon } from 'react-icons/bi';

import styles from '../../styles/footerTabs.module.scss';

function FooterTabs() {
  const router = useRouter();

  const hash = router.asPath.split('#')[1];

  const showSearch = () => {
    if (hash && hash === '#search') {
      router.push(window.location.pathname);
    } else {
      router.push(`${window.location.pathname}#search`);
    }
  };

  return (
    <div className={styles.Footer}>
      <div className={styles.Item}>
        <Link href="/">
          <a>
            <HomeIcon
              size="22px"
              color={router.pathname === '/' ? 'red' : 'white'}
            />
            <h5>Home</h5>
          </a>
        </Link>
      </div>
      <div className={styles.Item}>
        <Link href="/watchlist">
          <a>
            <WatchlistIcon
              size="22px"
              color={router.pathname === '/watchlist' ? 'red' : 'white'}
            />
            {/* <Image src={WatchlistIcon} alt="Watchlist" /> */}
            <h5>Watchlist</h5>
          </a>
        </Link>
      </div>
      <div className={styles.Item} role="presentation" onClick={showSearch}>
        <SearchIcon
          size="28px"
          color={hash && hash.includes('search') ? 'red' : 'white'}
        />
      </div>
      <div className={styles.Item}>
        <Link href="/discover/movies">
          <a>
            <MovieIcon
              size="22px"
              color={router.pathname === '/discover/movies' ? 'red' : 'white'}
            />
            {/* <Image src={MovieIcon} alt="Movies" /> */}
            <h5>Movies</h5>
          </a>
        </Link>
      </div>
      <div className={styles.Item}>
        <Link href="/discover/shows">
          <a>
            <SeriesIcon
              size="21px"
              color={router.pathname === '/discover/shows' ? 'red' : 'white'}
            />
            <h5>Shows</h5>
          </a>
        </Link>
      </div>
    </div>
  );
}

export default FooterTabs;
