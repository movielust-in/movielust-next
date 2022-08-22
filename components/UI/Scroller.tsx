import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import styles from '../../styles/scroller.module.scss';

import Wrap from '../CarouselSlices/Wrap';

import PersonCard from '../CarouselSlices/PersonCard';

import { LoadingGhost } from '../../assets';
import { detailLink } from '../../utils';
import getGenreName from '../../utils/getGenreName';

interface ScrollerProps {
  movies: any[];
  total: { pages: number; results: number };
  type: string;
}

function Scroller({ movies, total, type }: ScrollerProps) {
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const options = { root: null, rootMargin: '20px', threshold: 1.0 };

  // eslint-disable-next-line no-undef
  const handleObserver: IntersectionObserverCallback = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) setPage((currPage) => currPage + 1);
  };

  const observer = useRef<IntersectionObserver>();

  const loadMore = () => {
    setLoadingMore(true);
    setPage((currPage) => currPage + 1);
  };

  const [trigger, setTrigger] = useState<any>(null);

  useEffect(() => {
    if (!observer.current)
      observer.current = new IntersectionObserver(handleObserver, options);

    const currentObserver = observer.current;

    if (trigger) currentObserver.observe(trigger);

    return () => {
      if (trigger) currentObserver.unobserve(trigger);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  useEffect(() => {
    setPage(1);
  }, [movies]);

  return (
    <div className={styles.Container}>
      <div className={styles.CardContainer}>
        {total.results > 0 &&
          movies.slice(0, page * 20 - 1).map((movie) => (
            <div className={styles.Card} key={movie.id}>
              {type === 'cast' ? (
                <Link href={`/person/${movie.id}`}>
                  <a>
                    <PersonCard
                      title={movie.name}
                      key={movie.id}
                      alt={movie.name}
                      src={`https://image.tmdb.org/t/p/w185/${movie.profile_path}`}
                      // hover
                      // role={movie.roles[0].character}
                    />
                  </a>
                </Link>
              ) : (
                <Link
                  href={detailLink(type, movie.id, movie.title || movie.name)}
                >
                  <a>
                    <Wrap
                      alt={movie.title || movie.name}
                      title={movie.title || movie.name}
                      key={movie.id}
                      src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                      backdrop={movie.backdrop_path!}
                      description={movie.overview!}
                      showCard
                      genres={
                        movie.genre_ids?.map((id: number) =>
                          getGenreName(id, 'movie')
                        ) || []
                      }
                    />
                  </a>
                </Link>
              )}
            </div>
          ))}
      </div>
      {total.pages > page && loadingMore && (
        <div>
          <Image src={LoadingGhost} alt="loading" />
        </div>
      )}
      {total.pages > page && (
        <button
          type="button"
          className={styles.Trigger}
          ref={setTrigger}
          onClick={loadMore}
        >
          Loading more results...
        </button>
      )}
      {page > 1 && page >= total.pages && movies.length > 0 && (
        <div className={styles.Info}>Yay! You have scrolled all.</div>
      )}
    </div>
  );
}

export default Scroller;
