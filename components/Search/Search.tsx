/* eslint-disable no-nested-ternary */
import {
  useState,
  useEffect,
  useCallback,
  useRef,
  BaseSyntheticEvent,
  MutableRefObject,
  useMemo,
} from "react";
import styled from "@emotion/styled";
import { keyframes, css } from "@emotion/react";
import { useRouter as useNavigate } from "next/router";
import { FaArrowLeft } from "react-icons/fa";

import { image } from "../../api/Urls";

import search from "../../api/tmdb/search";

import { useLockBodyScroll } from "../../hooks";

import { Content } from "../../types/tmdb";

import { detailLink } from "../../utils";
import { LoadingGhost } from "../../assets";

const Titles = {
  movie: "Movies",
  tv: "TV Shows and Series",
  person: "People",
};

let clearSearch: Function | null = null;

function SaveDataToLocalStorage(data: any, cb: Function) {
  let a = [];
  a = JSON.parse(localStorage.getItem("Search") as string) || [];
  if (a.includes(data)) {
    localStorage.setItem("Search", JSON.stringify(a));
  } else {
    a = [data, ...a];
    if (a.length > 5) a.length = 5;
    cb(a);
    localStorage.setItem("Search", JSON.stringify(a));
  }
}

function Search({ show }: { show: boolean }) {
  const inputRef = useRef<HTMLInputElement>();
  const router = useNavigate();
  const cLocation = useRef<string>();

  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearch] = useState("");
  const [movies, setMovies] = useState<Content[]>();
  const [shows, setShows] = useState<Content[]>();
  const [people, setPeople] = useState<Content[]>();

  useEffect(() => {
    cLocation.current = router.pathname;
  }, [router]);

  /// ///////////////////////////////////////////////////////////////////  Recent Search   //////////////////////////////////////////////////////////////////////////////////////////
  const parentRef = useRef<HTMLDivElement>();

  const [recentsearch, setRecent] = useState(
    JSON.parse(localStorage.getItem("Search") || "[]")
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
    window.localStorage.removeItem("Search");
    setRecent(undefined);
  };

  // const [clickedoutside, isClickedOutside] = useState(false);

  // const handleClickOutside = (event: MouseEvent): any => {
  //     if (
  //         parentRef.current &&
  //         !(parentRef.current as HTMLDivElement).contains(event.target as Node)
  //     ) {
  //         isClickedOutside(true);
  //     }
  // };

  // useEffect(() => {
  //     document.addEventListener('click', handleClickOutside, false);
  //     return () => {
  //         document.removeEventListener('click', handleClickOutside, false);
  //     };
  // }, []);
  // const collapseContainer = () => {
  //     isClickedOutside(true);
  //     if (inputRef.current) inputRef.current.value = '';
  // };

  // useEffect(() => {
  //     if (clickedoutside) {
  //         collapseContainer();
  //     }
  // }, [clickedoutside]);

  // const expandContainer = () => {
  //     isClickedOutside(false);
  // };

  /// //////////////////////////////////////////////////////////////////////////////////////////

  const escape = useCallback(
    (e: KeyboardEvent) => {
      if (e.keyCode === 27) {
        if (searchQuery === "") {
          window.removeEventListener("keydown", escape);
          router.push(
            cLocation.current as string
            // { replace: true }
          );
        } else {
          setSearch("");
        }
      }
    },
    [searchQuery, router]
  );

  const hide = () => {
    window.removeEventListener("keydown", escape);
    router.push(
      cLocation.current as string
      // { replace: true }
    );
  };

  clearSearch = () => {
    setSearch("");
  };

  useLockBodyScroll(show);

  useEffect(() => {
    if (show) inputRef.current?.focus();
  }, [show]);

  useEffect(() => {
    window.addEventListener("keydown", escape);
    return () => {
      window.removeEventListener("keydown", escape);
    };
  }, [escape]);

  useEffect(() => {
    if (searchQuery === "") {
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
              result.media_type === "tv" && result.poster_path !== null
          )
        );
        setPeople(
          results.filter(
            (result) =>
              result.media_type === "person" && result.profile_path !== null
          )
        );
        setMovies(
          results.filter(
            (result) =>
              result.media_type === "movie" &&
              result.poster_path !== null &&
              result.release_date &&
              result.release_date.slice(0, 4) <= "2023"
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
    <Container>
      <SearchBarContainer>
        <SearchInputContainer>
          <CancelContainer>
            <Cancel onClick={hide} />
          </CancelContainer>
          <Input
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
        </SearchInputContainer>

        {/* Recent Search */}
        <SearchContent ref={parentRef as MutableRefObject<HTMLDivElement>}>
          {!isEmpty && (
            <>
              <RecentSearchHeader>
                <Header>Recent Search</Header>{" "}
                <Clear
                  role="presentation"
                  onClick={() => {
                    clearsearch();
                  }}
                >
                  Clear
                </Clear>
              </RecentSearchHeader>

              {recentsearch
                .filter((data: string) =>
                  data.toLowerCase().startsWith(searchQuery.toLowerCase())
                )
                .map((data: string) => (
                  <RecentsearchContainer
                    role="presentation"
                    key={data}
                    onClick={() => {
                      setSearch(data);
                    }}
                  >
                    <Name>{data}</Name>
                  </RecentsearchContainer>
                ))}
            </>
          )}
        </SearchContent>
      </SearchBarContainer>

      {/* Results for search */}

      {loading ? (
        <Loading>
          <img src={LoadingGhost} alt="loading" />
          Getting results...
        </Loading>
      ) : (
        <Results>
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
        </Results>
      )}
    </Container>
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
  const navigate = useNavigate();
  return (
    <Section weight={weight}>
      <SectionTitle>{Titles[type as keyof typeof Titles]}</SectionTitle>
      <Sub>
        {data.map(
          (content: {
            id: string;
            title?: string;
            name?: string;
            poster_path?: string;
            profile_path?: string;
            release_date: string;
          }) => (
            <ResultCard
              role="presentation"
              key={content.id}
              onClick={() => {
                if (typeof clearSearch === "function") clearSearch();
                navigate.push(
                  type === "movie"
                    ? detailLink(
                        "movie",
                        parseInt(content.id, 10),
                        content.title!
                      )
                    : type === "tv"
                    ? detailLink("tv", parseInt(content.id, 10), content.name!)
                    : `/person/${content.id}`
                  // { replace: true }
                );

                if (type === "movie") SaveDataToLocalStorage(content.title, cb);
                else SaveDataToLocalStorage(content.name, cb);
              }}
            >
              {(type === "person"
                ? content.profile_path
                : content.poster_path) && (
                <img
                  alt="People"
                  width="65"
                  src={image(
                    92,
                    type === "person"
                      ? content.profile_path || ""
                      : content.poster_path || ""
                  )}
                />
              )}
              <Text>
                <div>{type === "movie" ? content.title : content.name}</div>

                {type === "movie" ? (
                  <Release>{content.release_date.split("-")[0]}</Release>
                ) : null}
              </Text>
            </ResultCard>
          )
        )}
      </Sub>
    </Section>
  );
}

export default Search;

// --------------------------------------------------------------------------------------------------------------------------------------------
//  -----------------------------------------------------    Styling   -----------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------------------

const Scrollbar = css`
  &::-webkit-scrollbar {
    width: 0.2em;
  }

  &::-webkit-scrollbar:hover {
    width: 0.8em;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.1);

    height: 100vh;
  }

  &::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: grey;
    outline: 1px solid darkgrey;
  }

  &::-webkit-scrollbar-thumb:active {
    background-color: grey;
    outline: 2px solid darkgrey;
  }
`;

const fadeIn = keyframes`
from{opacity:0;}
to{opacity:1;}
`;

const Container = styled.div`
  animation: ${fadeIn} 200ms linear 1;
  background-color: #031d30;
  bottom: 0;
  margin-top: 45px;
  min-height: 100%;
  min-width: 100%;
  overflow-y: scroll;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 99999;
  ${Scrollbar};
  @media (max-width: 724px) {
    margin-top: 0px;
    margin-bottom: 50px;
  }
`;

const dropOn = keyframes`
from{
  transform:translateY(100%) ;
  opacity:0;
}
to{
  transform:translateY(0);
  opacity:1;
  }
`;

const SearchBarContainer = styled.div`
  animation: ${dropOn} 300ms ease-out 1;
  display: flex;
  flex: 1;
  flex-direction: column;
  transition: all 0.5s;
  @media (max-width: 724px) {
    background: transparent;
  }
`;
const SearchInputContainer = styled.div`
  align-items: center;
  animation: ${dropOn} 300ms ease-out 1;
  background-color: #031d30;
  display: flex;
  flex: 1;
  justify-content: center;
  position: fixed;
  width: 100%;
  @media (max-width: 724px) {
    /* background: transparent; */
  }
`;

const CancelContainer = styled.div`
  align-items: center;
  background-color: transparent;
  border-radius: 8px 0 0 8px;
  display: flex;
  height: max-content;
  justify-content: center;
  margin: 0;
  padding: 20.2px 10px;
  vertical-align: middle;
  width: max-content;

  @media (max-width: 724px) {
    border: none;
    margin-right: 0;
    margin-top: -2px;
    padding: 20px 10px;
    background-color: #031d30;
  }
`;

const Input = styled.input`
  background-color: transparent;
  text-align: center;
  border: none;
  border-radius: 0 8px 8px 0;
  color: rgba(255, 255, 255, 0.8);
  font-family: "Roboto", sans-serif;
  letter-spacing: 0.4px;
  font-size: 1.3rem;
  height: 57px;
  margin: 10px 0;
  outline: none;
  padding: 20px 10px 20px 5px;
  width: 50%;
  z-index: 9999999999;
  &:focus {
    outline: none;
    &::placeholder {
      opacity: 0;
    }
  }
  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
    transition: all 250ms ease-in-out;
    font-size: 1.3rem;
  }
  @media (max-width: 724px) {
    width: 85%;
    padding: 20px;
    /* margin: 5px 0; */
    border: none;
    font-size: 1rem;
    background-color: #031d30;
  }
`;

const RecentsearchContainer = styled.div`
  border-bottom: 2px solid #d8d8d852;
  cursor: pointer;
  display: flex;
  flex: 1;
  padding: 0 8px;
  width: 100%;
`;
const RecentSearchHeader = styled.div`
  border-bottom: 1px solid silver;
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
`;
const Header = styled.h3`
  display: inline-block;
  font-size: 16px;
  font-weight: bold;
  margin: 0 0 5px 10px;
  @media (max-width: 724px) {
    font-size: 10px;
  }
`;
const Clear = styled.p`
  color: silver;
  cursor: pointer;
  display: inline-block;
  font-size: 10px;
  margin-right: 10px;
  text-align: center;
  transition: color 1s;
  &:hover {
    color: greenyellow;
    transition: color 1s;
    transition: all 1s;
  }
  @media (max-width: 724px) {
    font-size: 8px;
    margin-top: 0;
  }
`;

const Name = styled.div`
  color: silver;
  display: flex;
  flex: 2;
  font-size: 15px;
  font-weight: 500;
  margin: 5px 5px 5px 10px;
  padding: 0;
  &:hover {
    color: #fff;
  }
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
`;

const Release = styled.div`
  flex-direction: column;
`;
const SectionTitle = styled.div`
  background-color: #090c14;
  background-image: linear-gradient(315deg, #090c14 0%, #031d30 79%);
  border: 0.1px solid rgba(192, 192, 192, 0.51);
  border-radius: 8px;
  font-family: Georgia, sans-serif;
  font-size: 20px;
  font-size: 16px;
  font-weight: bold;
  margin: 0 15px 0 15px;
  padding: 7px 15px;
  position: sticky;
  top: 70px;
  text-align: center;
  z-index: 10;

  @media (max-width: 724px) {
    position: relative;
    top: unset;
    font-size: 16px;
    margin: 0;
    padding: 10px 15px;
    width: 100%;
    text-align: center;
    border-radius: 8px;
  }
`;

const Results = styled.div`
  display: flex;
  flex: 1;
  margin-top: 10px;
  @media (max-width: 724px) {
    margin-top: 20px;
    flex-direction: column;
  }
`;

const ResultCard = styled.li`
  display: flex;
  align-items: center;
  animation: ${fadeIn} 200ms linear 1;
  background: linear-gradient(315deg, #090c14 0%, #031d30 79%);
  border: 2px solid rgba(192, 192, 192, 0.5);
  border-radius: 8px;
  cursor: pointer;
  margin: 8px 0;
  img {
    border-radius: 8px 0 0 8px;
    min-height: 75px;
    min-width: 50px;
  }
  div {
    font-weight: 600;
    margin-left: 5px;
  }
`;

const Sub = styled.ul`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  list-style-type: none;
  margin: 0 10px;
  padding: 5px 5px;
  @media (max-width: 724px) {
    justify-content: flex-start;
    margin: 20px 0;
    padding: 0;
    overflow-x: scroll;
  }
`;

const Cancel = styled(FaArrowLeft)`
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  display: flex;
  flex: 1;
  transform: scale(1.2);
  vertical-align: center;
`;

const Section = styled.div<{ weight: number }>`
  flex: 1;
  margin: 0 20px;
  min-height: calc(100vh - 145px);

  margin-bottom: 50px;

  @media (max-width: 724px) {
    order: ${(props) => props.weight};
    margin-bottom: 0;
    min-height: 0;
  }
`;

const SearchContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 55px;
  overflow-y: auto;
  padding: 1em;
  width: 55%;
  ${Scrollbar};
  @media (max-width: 724px) {
    width: 100%;
    height: 100%;
    margin-top: 40px;
  }
`;

const Loading = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80%;
`;
