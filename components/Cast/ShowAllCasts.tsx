/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, useRef, MutableRefObject } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { useRouter } from 'next/router';

import Loading from '../UI/Loading';
import Scroller from '../UI/Scroller';
import { fetchCompleteShowCast } from '../../lib/tmdb/tv';
import '../../styles/font.css';
import { ShowResponse } from '../../types/tmdb';
import { getContentDetails } from '../../lib/tmdb';

function ShowAllCasts() {
  const location = useRouter();
  const backgroundRef = useRef<HTMLImageElement>();
  const urlBreakdown = location.pathname.split('/');
  const type = urlBreakdown[2] as 'movie' | 'tv';
  const id = urlBreakdown[3];

  const [isLoading, setIsLoading] = useState(true);
  const [backdrop, setBackdrop] = useState<any>();
  const [tvcast, setTvCast] = useState<any>();
  const [title, settitle] = useState<any>();

  useEffect(() => {
    setIsLoading(true);
    const setSeries = (data: ShowResponse) => {
      const seasons = data.number_of_seasons;

      fetchCompleteShowCast(id, seasons as number).then((fullCast) => {
        setTvCast(fullCast);
        document.title = `${title}- Movielust`;
        setIsLoading(false);
      });
    };
    getContentDetails(id, type).then((data) => {
      settitle(data.name);

      setBackdrop(data.backdrop_path);
      setSeries(data);
    });
  }, [id, title, type]);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <Container>
          <Background>
            <img
              ref={backgroundRef as MutableRefObject<HTMLImageElement>}
              alt="movieposter"
              crossOrigin="anonymous"
              src={
                backdrop
                  ? `https://image.tmdb.org/t/p/w1280/${backdrop}`
                  : '/images/25559.webp'
              }
            />
          </Background>
          <Title data-text={`${title} cast`}>{`${title} cast`}</Title>
          <Scroller
            movies={tvcast.results}
            total={{
              results: tvcast.total_results,
              pages: tvcast.total_pages,
            }}
            type="cast"
          />
        </Container>
      )}
    </div>
  );
}

export default ShowAllCasts;

const Zooming = keyframes`
0%{transform:scale(1);}
50%{transform:scale(1.02);}
100%{transform:scale(1);}
`;

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  user-select: none;
  @media (max-width: 724px) {
    padding: 0 10px;
  }
`;

const Background = styled.div`
  animation: ${Zooming} 5s linear infinite;
  bottom: 0;
  left: 0;
  opacity: 0.2;
  position: fixed;
  right: 0;
  top: 0;
  z-index: -1;
  img {
    height: 100%;
    object-fit: cover;
    width: 100%;
  }
`;

const Title = styled.h1`
  -webkit-text-fill-color: transparent;
  background: linear-gradient(to right, #c0c0c0 0%, #50595b 100%);
  background-clip: text;
  color: #e4e5e6;
  font-family: 'Rubik', sans-serif;
  font-size: 6rem;
  margin-bottom: 0.5em;
  position: relative;
  text-transform: uppercase;

  &:before,
  &:after {
    content: attr(data-text);
    left: 0;
    position: absolute;
    top: 0;
  }

  &:before {
    text-shadow: -0.001em -0.001em 1px rgba(255, 255, 255, 0.15);
    z-index: -1;
  }

  &:after {
    mix-blend-mode: multiply;
    text-shadow: 10px 10px 10px rgba(0, 0, 0, 0.5),
      20px 20px 20px rgba(0, 0, 0, 0.4), 30px 30px 30px rgba(0, 0, 0, 0.1);
    z-index: -2;
  }

  @media (max-width: 724px) {
    margin-top: 30px;
    letter-spacing: 4px;
    font-size: 20px;
  }

  @media (orientation: landscape) and (min-width: 600px) and (max-width: 896px) {
    font-size: 60px;
    margin-top: 30px;
    margin-bottom: 0.2em;
  }
`;
