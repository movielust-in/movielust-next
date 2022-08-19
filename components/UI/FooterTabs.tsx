import styled from "@emotion/styled";

import Link from "next/link";

import { useRouter as useNavigate } from "next/router";

import {
  MdPlaylistPlay as WatchlistIcon,
  MdLocalMovies as MovieIcon,
} from "react-icons/md";

import { FaHome as HomeIcon } from "react-icons/fa";

import { AiFillPlaySquare as SeriesIcon } from "react-icons/ai";

import { BiSearchAlt as SearchIcon } from "react-icons/bi";

function FooterTabs() {
  const router = useNavigate();

  const hash = router.asPath.split("#")[1];

  const showSearch = () => {
    if (hash && hash === "#search") {
      router.push(window.location.pathname);
    } else {
      router.push(`${window.location.pathname}#search`);
    }
  };

  return (
    <Footer>
      <Item>
        <Link href="/">
          <a>
            <HomeIcon
              size="22px"
              color={router.pathname === "/" ? "red" : "white"}
            />
            <h5>Home</h5>
          </a>
        </Link>
      </Item>
      <Item>
        <Link href="/watchlist">
          <a>
            <WatchlistIcon
              size="22px"
              color={router.pathname === "/watchlist" ? "red" : "white"}
            />
            {/* <Image src={WatchlistIcon} alt="Watchlist" /> */}
            <h5>Watchlist</h5>
          </a>
        </Link>
      </Item>
      <Item role="presentation" onClick={showSearch}>
        <SearchIcon
          size="28px"
          color={hash.includes("search") ? "red" : "white"}
        />
      </Item>
      <Item>
        <Link href="/discover/movies">
          <a>
            <MovieIcon
              size="22px"
              color={router.pathname === "/discover/movies" ? "red" : "white"}
            />
            {/* <Image src={MovieIcon} alt="Movies" /> */}
            <h5>Movies</h5>
          </a>
        </Link>
      </Item>
      <Item>
        <Link href="/discover/series">
          <a>
            <SeriesIcon
              size="21px"
              color={router.pathname === "/discover/series" ? "red" : "white"}
            />
            <h5>Shows</h5>
          </a>
        </Link>
      </Item>
    </Footer>
  );
}

export default FooterTabs;

const Footer = styled.div`
  background-color: #090c14;
  bottom: 0;
  display: flex;
  height: 60px;
  justify-content: space-around;
  left: 0;
  margin-bottom: -2px;
  position: fixed;
  width: 100%;
  z-index: 10000 !important;
  @media (min-width: 724px) {
    display: none;
  }
`;

const Item = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
  font-size: 10px;
  font-weight: 100;
  letter-spacing: 1px;
  a {
    align-items: center;
    color: inherit;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-decoration: none;

    h5 {
      margin: 0;
    }

    svg {
      font-size: 2px;
      font-weight: 100;
    }
  }
`;

// const Image = styled.img`
//     width: 30px;
// `;
