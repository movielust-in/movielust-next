'use client';

/* eslint-disable @next/next/no-img-element */

// !!! TODO:Move the cast data fetching and filtering logic to serverless.

import { useEffect, useState, useRef, MutableRefObject } from 'react';
import { useParams } from 'next/navigation';

import Loading from '../../../../../components/UI/Loading';
import Scroller from '../../../../../components/UI/Scroller';

import styles from './allCast.module.scss';

function ShowAllCasts() {
  const backgroundRef = useRef<HTMLImageElement>();

  const params = useParams();

  const { type, id }: any = params;

  const [isLoading, setIsLoading] = useState(true);
  const [backdrop, setBackdrop] = useState<any>();
  const [tvcast, setTvCast] = useState<any>();
  const [title, setTitle] = useState<any>();

  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/tv/aggregateCredits/?id=${id}&type=${type}`)
      .then((res) => res.json())
      .then(({ data }) => {
        setBackdrop(data.details.backdrop_path);
        setTvCast(data.aggregateCredits.cast);
        setTitle(data.details.name);
        setIsLoading(false);
      });
  }, [id, type]);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={styles.Container}>
          <div className={styles.Background}>
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
          </div>
          <h1
            className={styles.Title}
            data-text={`Cast of ${title}`}
          >{`Cast of ${title}`}</h1>
          <Scroller
            movies={tvcast}
            total={{
              results: tvcast.length,
              pages: Math.floor(tvcast.length / 20),
            }}
            type="cast"
          />
        </div>
      )}
    </div>
  );
}

export default ShowAllCasts;
