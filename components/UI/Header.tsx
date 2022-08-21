/* eslint-disable no-nested-ternary */
import { useState, useEffect, KeyboardEvent, lazy } from "react";

import styled from "@emotion/styled";
import { css } from "@emotion/react";

// import ReactGA from "react-ga";

import { motion } from "framer-motion";

import Link from "next/link";

import { useRouter } from "next/router";

import {
  MdPlaylistPlay as WatchlistIcon,
  MdLocalMovies as MoviesIcon,
  MdKeyboardArrowLeft as LeftArrow,
} from "react-icons/md";

import { FaHome as HomeIcon } from "react-icons/fa";

import { AiFillPlaySquare as SeriesIcon } from "react-icons/ai";

import { BiSearchAlt as SearchIcon } from "react-icons/bi";

import { useSelector } from "../../redux";

import { useEventListener, useScroll } from "../../hooks";

import { LoginImage, MovielustLogo } from "../../assets";

import Spinner from "./Spinner";

const Search = lazy(() => import("../Search/Search"));
interface HeaderProps {
  isOnline: boolean;
}

function Header({ isOnline }: HeaderProps) {
  const router = useRouter();

  const hash = router.asPath.split("#")[1];

  const [searchView, setSearchView] = useState(false);

  const user = useSelector((state) => state.user);

  const scrollValue = useScroll(200);

  const [scroll, setScroll] = useState(0);

  useEffect(() => setScroll(scrollValue || 0), [scrollValue]);

  useEffect(() => {
    if (hash && hash.includes("search")) {
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

    const reactGATimeout = setTimeout(() => {
      // ReactGA.pageview(router.pathname + location.search + hash);
    }, 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(reactGATimeout);
    };
  }, [hash, router]);

  const showSearch = () => {
    if (hash && hash.includes("search")) {
      router.push(
        router.pathname + location.search + hash.replace("search", "")
      );
    } else if (hash && hash.includes("#")) {
      router.push(`${router.pathname + location.search + hash}search`);
    } else {
      router.push(`${router.pathname + location.search}#search`);
    }
  };

  const slash = (e: KeyboardEvent) => e.key === "/" && showSearch();

  useEventListener("keydown", slash);

  return (
    <>
      <NavBar
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        fixed={hash && hash.includes("search")}
        opacity={
          (!hash || (!hash.includes("search") && !hash.includes("player"))
            ? scroll / 100
            : 1) || 0
        }
      >
        {true || window.matchMedia("(display-mode: standalone)").matches ? (
          <Back onClick={() => router.back()} />
        ) : null}

        <Link href="/" className="header_logo">
          <a>
            <Logo
              src={MovielustLogo.src}
              alt="Movielust Logo"
              className="header_logo"
            />
          </a>
        </Link>

        <NavMenu>
          <Link href="/">
            <a>
              <HomeIcon />
              <Title active={router.pathname === "/"}>Home</Title>
            </a>
          </Link>
          <Link href="/watchlist">
            <a>
              <WatchlistIcon />
              <Title active={router.pathname === "/watchlist"}>Watchlist</Title>
            </a>
          </Link>

          <Link href="/discover/movies">
            <a>
              <MoviesIcon />
              <Title active={router.pathname === "/discover/movies"}>
                Movies
              </Title>
            </a>
          </Link>

          <Link href="/discover/shows">
            <a>
              <SeriesIcon />
              <Title active={router.pathname === "/discover/series"}>
                Shows
              </Title>
            </a>
          </Link>
        </NavMenu>

        {isOnline ? null : <Offline>No internet!</Offline>}

        <SearchIconContainer onClick={showSearch}>
          <SearchIcon size={20} />
        </SearchIconContainer>

        <StatusContainer>
          {user.isLoggedIn ? (
            <UserImg
              alt="avatar"
              role="presentation"
              src={user.avatar as string}
              onClick={() => {
                router.push("/account");
              }}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = LoginImage.src;
              }}
            />
          ) : !user.isLoggingIn ? (
            <LoginPromt
              onClick={() => {
                router.push(`/signin?redirectto=${router.pathname}`);
              }}
            >
              LOGIN
            </LoginPromt>
          ) : (
            <Spinner width={30} />
          )}
        </StatusContainer>
      </NavBar>

      {searchView ? <Search show={searchView} /> : null}
    </>
  );
}

export default Header;

const NavBar = styled(motion.nav)<{ fixed: string | boolean; opacity: number }>`
  align-items: center;
  background-blend-mode: lighten;
  display: flex;
  height: 50px;
  justify-content: space-between;
  left: 0;
  padding: 0 40px;
  position: fixed;
  top: 0;
  user-select: none;
  width: 100%;
  z-index: 1001;
  /* transition: all 500ms ease; */

  @media (min-width: 724px) {
    ${({ opacity }) => css`
      background-color: rgba(3, 29, 48, ${opacity});
      background-image: linear-gradient(
        315deg,
        rgba(9, 12, 20, ${opacity}) 0%,
        rgba(3, 29, 48, ${opacity}) 79%
      );
    `}
  }

  @media (max-width: 724px), (max-width: 870px) {
    position: relative;
    height: 55px;
    padding: 0 20px;
    background-color: rgba(3, 29, 48, 1);
    background-image: linear-gradient(
      315deg,
      rgba(9, 12, 20, 1) 0%,
      rgba(3, 29, 48, 1) 79%
    );
  }

  @media (max-width: 724px) and (display-mode: standalone),
    (max-width: 870px) and (display-mode: standalone) {
    position: fixed;
    height: 55px;
    padding: 0 20px;
    background-color: rgba(3, 29, 48, 1);
    background-image: linear-gradient(
      315deg,
      rgba(9, 12, 20, 1) 0%,
      rgba(3, 29, 48, 1) 79%
    );
  }
`;

const Logo = styled.img`
  cursor: pointer;
  object-fit: contain;
  padding: 5px;
  width: 65px;
  @media (max-width: 724px) {
    width: 60px;
  }
`;

const NavMenu = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  padding: 0 30px;
  transition: all 0.5s;
  a {
    align-items: center;
    color: white;
    cursor: pointer;
    display: flex;
    padding: 0 12px;
    text-decoration: none;
    img {
      height: 20px;
    }
    svg {
      height: 20px;
    }
    &:hover {
      span:after {
        opacity: 1;
        transform: scaleX(1.1) scaleY(1);
      }
    }
  }
  @media (max-width: 724px) {
    display: none;
  }
`;

const Title = styled.h1<{ active: boolean }>`
  font-size: 13px;
  letter-spacing: 1.42px;
  position: relative;
  vertical-align: middle;

  &:after {
    background: white;
    bottom: -6px;
    content: "";
    height: 2px;
    left: 0;
    position: absolute;
    right: 0;
    transform-origin: left center;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;

    ${({ active }) =>
      active
        ? css`
            opacity: 1;
            transform: scaleX(1.3) scaleY(0.5) translateX(-10px);
          `
        : css`
            opacity: 0;
            transform: scaleX(0);
          `};
  }
`;

const UserImg = styled.img`
  border-radius: 40%;
  cursor: pointer;
  display: flex;
  height: 40px;
  transition: all 300ms linear;
  width: 40px;
`;

const StatusContainer = styled.div`
  padding: 10px;
`;

const Offline = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 0, 0, 0.8);
  border: 1px solid red;
  border-radius: 6px;
  padding: 5px 10px;
`;

const LoginPromt = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  margin: 2px;
`;

const SearchIconContainer = styled(LoginPromt)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  height: 100%;

  @media (max-width: 724px) {
    display: none;
  }
`;

const Back = styled(LeftArrow)`
  cursor: pointer;
  margin-right: 8px;
  transform: scale(1.6);
`;
