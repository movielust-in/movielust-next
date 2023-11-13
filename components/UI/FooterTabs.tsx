'use client';

import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';
import {
  MdPlaylistPlay as WatchlistIcon,
  MdLocalMovies as MovieIcon,
} from 'react-icons/md';
import { FaHome as HomeIcon } from 'react-icons/fa';
import { AiFillPlaySquare as SeriesIcon } from 'react-icons/ai';
import { BiSearchAlt as SearchIcon } from 'react-icons/bi';
import { useEffect, useState } from 'react';

import styles from '../../styles/footerTabs.module.scss';

function FooterTabs() {
  const router = useRouter();

  const params = useParams();
  const pathname = usePathname();

  const [hash, setHash] = useState('');

  useEffect(() => {
    setHash(window.location.hash);
  }, [params]);

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
        <Link prefetch={false} href="/">
          <HomeIcon size="22px" color={pathname === '/' ? 'red' : 'white'} />
          <h5>Home</h5>
        </Link>
      </div>
      <div className={styles.Item}>
        <Link prefetch={false} href="/watchlist">
          <WatchlistIcon
            size="22px"
            color={pathname === '/watchlist' ? 'red' : 'white'}
          />
          {/* <Image src={WatchlistIcon} alt="Watchlist" /> */}
          <h5>Watchlist</h5>
        </Link>
      </div>
      <div className={styles.Item} role="presentation" onClick={showSearch}>
        <SearchIcon
          size="28px"
          color={hash && hash.includes('search') ? 'red' : 'white'}
        />
      </div>
      <div className={styles.Item}>
        <Link prefetch={false} href="/discover/movies">
          <MovieIcon
            size="22px"
            color={pathname === '/discover/movies' ? 'red' : 'white'}
          />
          {/* <Image src={MovieIcon} alt="Movies" /> */}
          <h5>Movies</h5>
        </Link>
      </div>
      <div className={styles.Item}>
        <Link prefetch={false} href="/discover/shows">
          <SeriesIcon
            size="21px"
            color={pathname === '/discover/shows' ? 'red' : 'white'}
          />
          <h5>Shows</h5>
        </Link>
      </div>
    </div>
  );
}

export default FooterTabs;
