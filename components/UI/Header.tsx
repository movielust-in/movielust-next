'use client';

/* eslint-disable no-nested-ternary */
/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, KeyboardEvent } from 'react';

import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';
import { useParams, usePathname, useRouter } from 'next/navigation';

import {
  MdPlaylistPlay as WatchlistIcon,
  MdLocalMovies as MoviesIcon,
  MdKeyboardArrowLeft as LeftArrow,
} from 'react-icons/md';
import { FaHome as HomeIcon } from 'react-icons/fa';
import { AiFillPlaySquare as SeriesIcon } from 'react-icons/ai';
import { BiSearchAlt as SearchIcon } from 'react-icons/bi';

import { useEventListener, useScroll } from '../../hooks';

import styles from '../../styles/header.module.scss';

const Search = dynamic(() => import('../Search/Search'));

interface HeaderProps {
  isOnline: boolean;
}

function Header({ isOnline }: HeaderProps) {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const [hash, setHash] = useState('');

  const { data } = useSession();

  const user = data?.user;

  useEffect(() => {
    setHash(window.location.hash.split('#')[1]);
  }, [params]);

  // eslint-disable-next-line prefer-destructuring

  const [searchView, setSearchView] = useState(false);

  const scrollValue = useScroll(200);

  const [scroll, setScroll] = useState(0);

  useEffect(() => setScroll(scrollValue || 0), [scrollValue]);

  useEffect(() => {
    if (hash && hash.includes('search')) {
      setSearchView(true);
    } else {
      setSearchView(false);
    }

    const interval = setInterval(() => {
      const currentScroll =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;

      if (currentScroll > 200) {
        setScroll(201);
        clearInterval(interval);
      }
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [hash]);

  const showSearch = () => {
    if (hash && hash.includes('search')) {
      router.push(pathname + hash.replace('search', ''));
    } else if (hash && hash.includes('#')) {
      router.push(`${`${pathname}#${hash}`}search`);
    } else {
      router.push(`${pathname}#search`);
    }
  };

  const slash = (e: KeyboardEvent) => e.key === '/' && showSearch();

  useEventListener('keydown', slash);

  return (
    <>
      <nav
        className={`${styles.Navbar} ${
          // eslint-disable-next-line no-nested-ternary
          (!hash || (!hash.includes('search') && !hash.includes('player'))) &&
          !pathname?.includes('/play')
            ? scroll <= 20
              ? styles.transparent
              : styles.gradient
            : styles.gradient
        }`}
      >
        <LeftArrow className={styles.Back} onClick={() => router.back()} />

        <Link href="/" className={styles.LogoContainer}>
          <Image
            width={50}
            height={50}
            src="https://ik.imagekit.io/movielust/logo_uIeABdFs3.webp"
            alt="Movielust Logo"
            unoptimized
            className={styles.Logo}
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        </Link>

        <div className={styles.NavMenu}>
          <Link href="/">
            <HomeIcon />
            <h1 className={styles.Title}>
              {/* // active={router.pathname === "/"} */}
              Home
            </h1>
          </Link>
          <Link href="/watchlist">
            <WatchlistIcon />
            <h1
              className={styles.Title}
              // active={router.pathname === "/watchlist"}
            >
              Watchlist
            </h1>
          </Link>

          <Link href="/discover/movies">
            <MoviesIcon />
            <h1
              className={styles.Title}
              // active={router.pathname === "/discover/movies"}
            >
              Movies
            </h1>
          </Link>

          <Link href="/discover/shows">
            <SeriesIcon />
            <h1
              className={styles.Title}
              // active={router.pathname === "/discover/series"}
            >
              Shows
            </h1>
          </Link>
        </div>

        {isOnline ? null : <div className={styles.Offline}>No internet!</div>}

        <button
          type="button"
          className={`${styles.LoginPrompt} ${styles.SearchIconContainer}`}
          onClick={showSearch}
        >
          <SearchIcon size={20} />
        </button>

        <div className={styles.StatusContainer}>
          {user ? (
            <img
              className={styles.UserImg}
              alt="avatar"
              role="presentation"
              src={user.image as string}
              onClick={() => {
                router.push('/account');
              }}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = 'LoginImage.src';
              }}
            />
          ) : (
            <button
              type="button"
              className={styles.LoginPrompt}
              onClick={() => {
                router.push(`/signin?redirectto=${pathname}`);
              }}
            >
              LOGIN
            </button>
          )}
        </div>
      </nav>

      {searchView ? <Search show={searchView} /> : null}
    </>
  );
}

export default Header;
