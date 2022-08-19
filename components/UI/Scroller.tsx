import { useRef, useState, useEffect } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import Link from "next/link";
import { motion } from "framer-motion";

import Wrap from "../CarouselSlices/Wrap";

import PersonCard from "../CarouselSlices/PersonCard";

import { LoadingGhost } from "../../assets";
import { detailLink } from "../../utils";
import getGenreName from "../../utils/getGenreName";

interface ScrollerProps {
  movies: any[];
  total: { pages: number; results: number };
  type: string;
}

function Scroller({ movies, total, type }: ScrollerProps) {
  const ref = useRef(null);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const options = { root: null, rootMargin: "20px", threshold: 1.0 };

  // eslint-disable-next-line no-undef
  const handleObserver: IntersectionObserverCallback = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      if (total.pages > page) {
        setPage((currPage) => currPage + 1);
      }
    }
  };

  const attachObserver = () => {
    const observer = new IntersectionObserver(handleObserver, options);
    if (ref.current) {
      observer.observe(ref.current);
    }
  };

  setTimeout(attachObserver, 200);

  const loadMore = () => {
    setLoadingMore(true);
    setPage((currPage) => currPage + 1);
  };
  useEffect(() => {
    attachObserver();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setPage(1);
  }, [movies]);

  return (
    <Container>
      <CardContainer>
        {total.results > 0 &&
          movies.slice(0, page * 20 - 1).map((movie) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0.5 }}
              whileInView={{ opacity: 1 }}
            >
              <Card>
                {type === "cast" ? (
                  <Link href={`/person/${movie.id}`}>
                    <PersonCard
                      title={movie.name}
                      key={movie.id}
                      alt={movie.name}
                      src={`https://image.tmdb.org/t/p/w185/${movie.profile_path}`}
                      // hover
                      // role={movie.roles[0].character}
                    />
                  </Link>
                ) : (
                  <Link
                    href={detailLink(type, movie.id, movie.title || movie.name)}
                  >
                    <Wrap
                      alt={movie.title || movie.name}
                      title={movie.title || movie.name}
                      // rating={movie.vote_average}
                      key={movie.id}
                      src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}
                      backdrop={movie.backdrop_path!}
                      description={movie.overview!}
                      showCard
                      genres={
                        movie.genre_ids?.map((id: number) =>
                          getGenreName(id, "movie")
                        ) || []
                      }
                      // hover
                    />
                  </Link>
                )}
              </Card>
            </motion.div>
          ))}
      </CardContainer>
      {total.pages > page && loadingMore && (
        <Loading>
          <img src={LoadingGhost} alt="loading" />
        </Loading>
      )}
      {total.pages > page && (
        <Trigger ref={ref} onClick={loadMore}>
          <img src={LoadingGhost} alt="loading" />
          Loading more results
        </Trigger>
      )}
      {page > 1 && page >= total.pages && movies.length > 0 && (
        <Info>Yay! You have scrolled all.</Info>
      )}
    </Container>
  );
}

export default Scroller;

const Container = styled.div`
  align-items: flex-start;
  display: flex row;
  justify-content: start;
`;

const CardContainer = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  @media (max-width: 724px) {
    justify-content: space-between;
    padding: 0;
    width: 100%;
  }
`;

const slideIn = keyframes`
from{transform:translateX(100%);}
to{transform:translateX(0);}
`;

const Card = styled.div`
  /* flex: 0 1 calc(20%-1em); */
  animation: ${slideIn} 500ms ease linear;
  margin: 10px;
  width: 150px;
  @media (max-width: 724px) {
    width: 120px;
    margin: 15px 0;
  }

  @media (max-width: 360px) {
    width: 160px;
    margin: 15px 0;
  }
  @media (orientation: landscape) and (min-width: 600px) and (max-width: 896px) {
    width: 150px;
    margin: 15px 0;
  }
  @media (orientation: landscape) and (min-width: 320px) and (max-width: 480px) {
    width: 100px;
    margin: 15px 0;
  }
`;
const Loading = styled.div`
  display: flex;
  justify-content: center;
`;

const Trigger = styled.button`
  align-items: center;
  background-color: transparent;
  border: none;
  color: white;
  display: flex;
  flex-direction: column;
  font-weight: 400;
  justify-content: center;
  margin-bottom: 15px;
  padding: 7px 11px;
  text-align: center;
  width: 100%;
  img {
    width: 100px;
  }

  @media (max-width: 724px) {
    font-size: 15px;
  }
`;

const Info = styled.div`
  color: white;
  font-size: 2rem;
  font-weight: 900;
  letter-spacing: 1.2px;
  padding: 30px;
  text-align: center;
  width: 100%;
`;
