'use client';

/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';
import {
  MdPlaylistPlay as WatchlistIcon,
  MdLocalMovies as MoviesIcon,
  MdKeyboardArrowLeft as LeftArrow,
} from 'react-icons/md';
import { FaHome as HomeIcon } from 'react-icons/fa';
import { AiFillPlaySquare as SeriesIcon } from 'react-icons/ai';
import { BiSearchAlt as SearchIcon } from 'react-icons/bi';

import { useScroll } from '../../hooks';
import styles from '../../styles/header.module.scss';
import { Bariol } from '../../fonts/Bariol';
import Logo from '../../assets/images/header_logo.webp';

const Search = dynamic(() => import('../Search/Search'));

function Header() {
  const { data, status } = useSession();

  const user = data?.user;

  const [searchView, setSearchView] = useState(false);

  const scrollValue = useScroll(200);

  const [scroll, setScroll] = useState(0);

  useEffect(() => setScroll(scrollValue || 0), [scrollValue]);

  useEffect(() => {
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
  }, []);

  const showSearch = () => setSearchView((state) => !state);

  const transparentOrGradient =
    scroll >= 20 || searchView ? styles.gradient : styles.transparent;

  return (
    <>
      <nav
        className={`${styles.Navbar} ${transparentOrGradient} ${Bariol.className}`}
      >
        <LeftArrow
          className={styles.Back}
          onClick={() => setSearchView(false)}
        />

        <Link prefetch={false} href="/" className={styles.LogoContainer}>
          <Image
            src={Logo}
            width={50}
            alt="Movielust Logo"
            unoptimized
            className={styles.Logo}
          />
        </Link>

        <div className={styles.NavMenu}>
          <Link prefetch={false} href="/">
            <HomeIcon />
            <h1 className={styles.Title}>Home</h1>
          </Link>
          <Link prefetch={false} href="/watchlist">
            <WatchlistIcon />
            <h1 className={styles.Title}>Watchlist</h1>
          </Link>

          <Link prefetch={false} href="/discover/movies">
            <MoviesIcon />
            <h1 className={styles.Title}>Movies</h1>
          </Link>

          <Link prefetch={false} href="/discover/shows">
            <SeriesIcon />
            <h1 className={styles.Title}>Shows</h1>
          </Link>
        </div>

        <button
          type="button"
          className={`${styles.LoginPrompt} ${styles.SearchIconContainer}`}
          onClick={showSearch}
        >
          <SearchIcon size={20} />
        </button>

        <div className={styles.StatusContainer}>
          {status === 'authenticated' && user ? (
            <Link href="/account" prefetch={false}>
              <img
                className={styles.UserImg}
                alt="avatar"
                role="presentation"
                src={user.image as string}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = 'LoginImage.src';
                }}
              />
            </Link>
          ) : null}

          {status === 'loading' ? (
            <img
              alt="loading"
              src="/images/svgs/spinning-tail.svg"
              height={20}
              width={20}
            />
          ) : null}

          {status === 'unauthenticated' ? (
            <Link
              className={styles.LoginPrompt}
              href="/signin"
              prefetch={false}
            >
              LOGIN
            </Link>
          ) : null}
        </div>
      </nav>
      {searchView ? <Search show={searchView} /> : null}
    </>
  );
}

export default Header;
