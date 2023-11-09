'use client';

import {
  useState,
  useEffect,
  useCallback,
  useRef,
  BaseSyntheticEvent,
  MutableRefObject,
  useMemo,
} from 'react';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

import { image } from '../../lib/tmdb/Urls';
import search from '../../lib/tmdb/search';
import { useLockBodyScroll } from '../../hooks';
import { Content } from '../../types/tmdb';
import { detailLink } from '../../utils';

import styles from './search.module.scss';

const Titles = {
  movie: 'Movies',
  tv: 'TV Shows and Series',
  person: 'People',
};

let clearSearch: Function | null = null;

function saveDataToLocalStorage(data: any, cb: Function) {
  let a = [];
  a = JSON.parse(localStorage.getItem('Search') as string) || [];
  if (a.includes(data)) {
    localStorage.setItem('Search', JSON.stringify(a));
  } else {
    a = [data, ...a];
    if (a.length > 5) a.length = 5;
    cb(a);
    localStorage.setItem('Search', JSON.stringify(a));
  }
}

function Search({ show }: { show: boolean }) {
  const inputRef = useRef<HTMLInputElement>();
  const router = useRouter();
  const cLocation = useRef<string>();
  const pathname = usePathname();

  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearch] = useState('');
  const [movies, setMovies] = useState<Content[]>();
  const [shows, setShows] = useState<Content[]>();
  const [people, setPeople] = useState<Content[]>();

  useEffect(() => {
    if (!pathname) return;
    cLocation.current = pathname;
  }, [pathname]);

  /// ///////////////////////////////////////////////////////////////////  Recent Search   //////////////////////////////////////////////////////////////////////////////////////////
  const parentRef = useRef<HTMLDivElement>();

  const [recentsearch, setRecent] = useState(
    JSON.parse(localStorage.getItem('Search') || '[]')
  );

  const setRecentSearch = (recents: any) => setRecent(recents);

  const isEmpty = useMemo(
    () =>
      !recentsearch ||
      recentsearch.length === 0 ||
      recentsearch.filter((data: string) =>
        data.toLowerCase().startsWith(searchQuery.toLowerCase())
      ).length === 0,
    [recentsearch, searchQuery]
  );

  const changeHandler = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    setSearch(e.target.value);
    // isClickedOutside(false);
  };

  const clearsearch = () => {
    window.localStorage.removeItem('Search');
    setRecent(undefined);
  };

  const escape = useCallback(
    (e: KeyboardEvent) => {
      if (e.keyCode === 27) {
        if (searchQuery === '') {
          window.removeEventListener('keydown', escape);
          router.push(
            cLocation.current as string
            // { replace: true }
          );
        } else {
          setSearch('');
        }
      }
    },
    [searchQuery, router]
  );

  const hide = () => {
    window.removeEventListener('keydown', escape);
    router.push(
      cLocation.current as string
      // { replace: true }
    );
  };

  clearSearch = () => {
    setSearch('');
  };

  useLockBodyScroll(show);

  useEffect(() => {
    if (show) inputRef.current?.focus();
  }, [show]);

  useEffect(() => {
    window.addEventListener('keydown', escape);
    return () => {
      window.removeEventListener('keydown', escape);
    };
  }, [escape]);

  useEffect(() => {
    if (searchQuery === '') {
      setMovies(undefined);
      setShows(undefined);
      setPeople(undefined);
      return () => {};
    }

    const handleChange = async (searchInput: string) => {
      setLoading(true);
      const query = searchInput;
      const setEmpty = () => {
        setMovies(undefined);
        setShows(undefined);
        setPeople(undefined);
      };

      if (!query || query.length === 0) {
        setEmpty();
        return () => {};
      }
      const data = await search(query);
      const { results } = data;

      if (results) {
        setShows(
          results.filter(
            (result) =>
              result.media_type === 'tv' && result.poster_path !== null
          )
        );
        setPeople(
          results.filter(
            (result) =>
              result.media_type === 'person' && result.profile_path !== null
          )
        );
        setMovies(
          results.filter(
            (result) =>
              result.media_type === 'movie' &&
              result.poster_path !== null &&
              result.release_date &&
              result.release_date.slice(0, 4) <= '2023'
          )
        );
      } else {
        setEmpty();
      }

      setLoading(false);

      return () => {};
    };

    const timeout = setTimeout(() => {
      handleChange(searchQuery);
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  const [weightage, setWeightage] = useState({
    movies: 1,
    people: 1,
    shows: 1,
  });

  useEffect(() => {
    const movieWeight =
      movies &&
      movies.reduce((prev, curr) => prev + curr.popularity! || 0, 0) /
        movies.length;
    const showsWeight =
      shows &&
      shows.reduce((prev, curr) => prev + curr.popularity! || 0, 0) /
        shows.length;
    const peopleWeight =
      people &&
      people.reduce((prev, curr) => prev + curr.popularity! || 0, 0) /
        people.length;

    const weightArray = [movieWeight, showsWeight, peopleWeight];

    weightArray.sort((a, b) => b! - a!);

    setWeightage({
      movies: weightArray.indexOf(movieWeight) + 1,
      shows: weightArray.indexOf(showsWeight) + 1,
      people: weightArray.indexOf(peopleWeight) + 1,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movies]);

  if (!show) return null;

  return (
    <div className={styles.Container}>
      <div className={styles.SearchBarContainer}>
        <div className={styles.SearchInputContainer}>
          <div className={styles.CancelContainer}>
            <FaArrowLeft
              className={styles.Cancel}
              onClick={hide}
              role="presentation"
            />
          </div>
          <input
            className={styles.Input}
            placeholder="Search movies, TV shows or people"
            // onFocus={expandContainer}
            ref={inputRef as MutableRefObject<HTMLInputElement>}
            type="search"
            value={searchQuery}
            onChange={changeHandler}
            list="search-input"
            id="search-input"
            name="search-input"
          />

          <datalist id="search-input">
            <option value="taste">test</option>
          </datalist>
        </div>

        {/* Recent Search */}
        <div
          className={styles.SearchContent}
          ref={parentRef as MutableRefObject<HTMLDivElement>}
        >
          {!isEmpty && (
            <>
              <div className={styles.RecentSearchHeader}>
                <h3 className={styles.Header}>Recent Search</h3>{' '}
                <p
                  className={styles.Clear}
                  role="presentation"
                  onClick={() => {
                    clearsearch();
                  }}
                >
                  Clear
                </p>
              </div>

              {recentsearch
                .filter((data: string) =>
                  data.toLowerCase().startsWith(searchQuery.toLowerCase())
                )
                .map((data: string) => (
                  <div
                    className={styles.RecentsearchContainer}
                    role="presentation"
                    key={data}
                    onClick={() => {
                      setSearch(data);
                    }}
                  >
                    <div className={styles.Name}>{data}</div>
                  </div>
                ))}
            </>
          )}
        </div>
      </div>

      {/* Results for search */}

      {loading ? (
        <div className={styles.Loading}>
          <Image
            src="/images/ghost.png"
            width={60}
            height={60}
            unoptimized
            alt="loading"
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
          Getting results...
        </div>
      ) : (
        <div className={styles.Results}>
          {movies && movies.length > 0 && (
            <ResultSection
              data={movies}
              weight={weightage.movies}
              type="movie"
              cb={setRecentSearch}
            />
          )}
          {shows && shows.length > 0 && (
            <ResultSection
              data={shows}
              weight={weightage.shows}
              type="tv"
              cb={setRecentSearch}
            />
          )}
          {people && people.length > 0 && (
            <ResultSection
              data={people}
              weight={weightage.people}
              type="person"
              cb={setRecentSearch}
            />
          )}
        </div>
      )}
    </div>
  );
}

/// //////////////////////////////////////////////////////// The Cards for movie, people, tv    ////////////////////////////////////////////////////////////

interface CardProps {
  data: any;
  type: string;
  weight: any;
  cb: Function;
}

function ResultSection({ data, type, weight, cb }: CardProps) {
  const router = useRouter();
  return (
    <div className={styles.Section} style={{ order: weight }}>
      <div className={styles.SectionTitle}>
        {Titles[type as keyof typeof Titles]}
      </div>
      <ul className={styles.Sub}>
        {data.map(
          (content: {
            id: string;
            title?: string;
            name?: string;
            poster_path?: string;
            profile_path?: string;
            release_date: string;
          }) => (
            <li
              className={styles.ResultCard}
              role="presentation"
              key={content.id}
              onClick={() => {
                if (typeof clearSearch === 'function') clearSearch();
                router.replace(
                  type === 'movie' || type === 'tv'
                    ? detailLink(
                        type,
                        parseInt(content.id, 10),
                        content.title! || content.name!
                      )
                    : `/person/${content.id}`
                );

                saveDataToLocalStorage(content.title || content.name, cb);
              }}
            >
              {(type === 'person'
                ? content.profile_path
                : content.poster_path) && (
                <Image
                  alt="People"
                  width={65}
                  height={100}
                  unoptimized
                  src={image(
                    92,
                    type === 'person'
                      ? content.profile_path || ''
                      : content.poster_path || ''
                  )}
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                  }}
                />
              )}
              <div className={styles.Text}>
                <div>{type === 'movie' ? content.title : content.name}</div>

                {type === 'movie' ? (
                  <div className={styles.Release}>
                    {content.release_date.split('-')[0]}
                  </div>
                ) : null}
              </div>
            </li>
          )
        )}
      </ul>
    </div>
  );
}

export default Search;
