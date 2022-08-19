/* eslint-disable no-nested-ternary */
import {
  useState,
  useEffect,
  useRef,
  useCallback,
  memo,
  lazy,
  LazyExoticComponent,
} from "react";

// import ReactGA from "react-ga";

import { toast } from "react-toastify";

import { useRouter } from "next/router";

import { useSelector, useDispatch } from "../../redux";

import ImageCrousel from "../../components/Carousels/ImageCrousel";

import { addWatched } from "../../api/user";

import { fetchDetails } from "../../api/tmdb";

import { fetchMagnets } from "../../api/torrent";

import { fetchIMDBRating } from "../../api/imdb";

import {
  fetchTvExternalIds,
  fetchTvImages as fetchImages,
  fetchAllTvCast,
} from "../../api/tmdb/series";

import { fetchCollection, fetchExternalIds } from "../../api/tmdb/movies";

import { addToWatchlist } from "../../api/user/watchlist";

import { VIDEO } from "../../api/Urls";

// import { Cast, Movie, Similar, Loading } from '../../components';

import CastCarousel from "../../components/Carousels/CastCarousel";
import MovieCarousel from "../../components/Carousels/MovieCarousel";
import SimilarCarousel from "../../components/Movies/SimilarMovies";
import Loading from "../../components/UI/Loading";

import { FULL_MONTHS } from "../../config";

import ProductionCompanies from "../../components/Carousels/ProductionCompanies";

import { useLockBodyScroll } from "../../hooks";

import { markRecentStale } from "../../redux/reducers/recent.reducer";

import {
  DetailResponse,
  MovieExternalIdsResponse,
  MovieResult,
  ShowResponse,
  TvImagesResponse,
  Video,
} from "../../types/tmdb";

import { Magnet } from "../../types/apiResponses";

import tmdbClient from "../../api/tmdbClient";

import "../../assets/fonts/Bariol/bariol.css";

import {
  addMovieToWatchlist,
  addShowToWatchlist,
} from "../../redux/reducers/watchlist.reducer";
import InformationComponent from "./Information";
import DetailHelmet from "./DetailHelmet";
import Background from "./BackgroundImage";
import PosterAndIframe from "./PosterAndIframe";
import { CommonData, ImdbRating } from "./DetailTypes";

import styles from "./Detail.module.scss";

let PlayerModal: LazyExoticComponent<any>;

const Seasons = lazy(() => import("../../components/Shows/Seasons"));

function Detail() {
  const navigate = useRouter();
  const dispatch = useDispatch();
  const router = useRouter();

  const type = router.query["type"] as string;
  const id = router.query["id"] as string;
  const mag = router.query["m"] as string;

  const hash = router.asPath.split("#")[1];

  const isAuthenticated = useSelector((state) => state.user.isLoggedIn);

  const [playable, setPlayable] = useState(false);
  const [playerMag, setPlayerMag] = useState("");

  useEffect(() => {
    if ((type !== "movie" && type !== "tv") || Number.isNaN(id)) {
      navigate.push("/");
    }

    if (type === "tv")
      PlayerModal = lazy(() => import("../../components/Player/ShowPlayer"));
    else
      PlayerModal = lazy(() => import("../../components/Player/MoviePlayer"));

    if (mag !== null) {
      setPlayerMag(mag);
      setPlayable(true);
    }
  }, [type, id, navigate, router]);

  const playWebtor = (magnet: Magnet) => {
    if (hash.includes("#")) {
      navigate.push(
        `${router.pathname}?m=${magnet.magnet}&q=${magnet.quality}${hash}player`
      );
    } else {
      navigate.push(
        `${router.pathname}?m=${magnet.magnet}&q=${magnet.quality}#player`
      );
    }
    if (magnet.magnet) setPlayerMag(magnet.magnet);
  };

  const [commonData, setCommonData] = useState<CommonData>();
  const [collection, setCollection] = useState<MovieResult[]>([]);
  const [collectionTitle, setCollectionTitle] = useState("");
  const [tvCredits, setTvCredits] = useState([]);
  const [externalIds, setExternalids] = useState<MovieExternalIdsResponse>();
  const [isLoading, setIsLoading] = useState(true);
  const [IMDBRating, setIMDBRating] = useState<ImdbRating>({
    rating: 0,
    votes: 0,
  });
  const [magnets, setMagnets] = useState<Magnet[]>();
  const [released, setReleased] = useState(true);
  const [releaseDate, setReleaseDate] = useState<string>();
  const [releaseYear, setReleaseYear] = useState<string>();
  const [episodeMag, setEpisodeMagnets] = useState([]);
  const [runtime, setRuntime] = useState<string>();
  const [totalSeasons, setTotalSeasons] = useState(0);
  const [trailerKey, setTrailerKey] = useState<string>();
  const [images, setImages] = useState<TvImagesResponse>();
  const [seasonMags, setSeasonMags] = useState<any>([]);
  const [loadingMovieIframe, setMovieIframeLoading] = useState(false);
  const [domColor, setDomColor] = useState([]);
  const [showMovie, toogleMovie] = useState(false);
  const [episodeToPlay, setEpitoPlay] = useState(0);
  const [seasonToPlay, setSeaToPlay] = useState(0);
  const [loading, setLoading] = useState(false);

  useLockBodyScroll(hash.includes("player"));

  const setTrailer = useCallback(
    (videos: Video[], lang: string) => {
      (async () => {
        let vids = videos;
        if (vids.length <= 0) {
          const res = await tmdbClient.get(VIDEO(id!, type!, lang));
          vids = res.data.results;
          if (vids.length > 0) {
            const officialVideos = vids.filter(
              (video) => video.official === true && video.type === "Trailer"
            );
            setTrailerKey(
              officialVideos.length > 0
                ? officialVideos[officialVideos.length - 1].key
                : vids[0].key
            );
          } else {
            setTrailerKey(undefined);
          }
        } else {
          const officialVideos = vids.filter(
            (video) => video.official === true && video.type === "Trailer"
          );
          setTrailerKey(
            officialVideos.length > 0
              ? officialVideos[officialVideos.length - 1].key
              : videos[0].key
          );
        }
      })();
    },
    [type, id]
  );

  const setMovieRuntime = (time: number) => {
    time /= 60;
    const timeString = `${Math.floor(time)} hrs ${-Math.round(
      time - Math.floor(time) * 10
    )} mins`;
    setRuntime(timeString);
  };

  const setCollections = (collections: { id: string }) => {
    if (!collections) {
      setCollection([]);
      setCollectionTitle("");
      return;
    }
    fetchCollection(collections.id).then((collectionRes) => {
      setCollection(collectionRes.parts as MovieResult[]);
      setCollectionTitle(collectionRes.name as string);
    });
  };

  const setMovieReleaseDate = (release_date: string) => {
    if (!release_date) return;
    const relDate = new Date(release_date);

    if (relDate > new Date()) {
      setReleased(false);
    }
    setReleaseDate(
      `${
        FULL_MONTHS[relDate.getMonth()]
      }, ${relDate.getDate()} ${relDate.getFullYear()}`
    );
  };

  const setMovie = useCallback(
    (data: DetailResponse) => {
      setMovieReleaseDate(data.release_date!);
      if (data.belongs_to_collection)
        setCollections(data.belongs_to_collection);
      if (data.runtime) setMovieRuntime(data.runtime);

      if (data.release_date) setReleaseYear(data.release_date?.slice(0, 4));

      fetchExternalIds(id!).then((ids) => {
        setExternalids(ids);
      });

      fetchImages(id!, type!).then((tvImage) => {
        setImages(tvImage);
      });

      setIsLoading(false);
    },
    [type, id]
  );

  const setSeries = useCallback(
    (data: ShowResponse) => {
      const numberOfSeasons = data.number_of_seasons;

      fetchAllTvCast(id!, numberOfSeasons as number).then((fullTVCast) => {
        setTvCredits(fullTVCast.results);
      });

      if (data.id) {
        fetchTvExternalIds(data.id).then((ids) => {
          setExternalids(ids);
        });
        fetchImages(data.id, type!).then((tvImage) => {
          setImages(tvImage);
        });
      }

      if (numberOfSeasons! > 1) setRuntime(`${numberOfSeasons} Seasons`);
      else setRuntime("1 Season");
      const firstYear = data.first_air_date!.slice(0, 4);
      const lastYear = data.last_air_date?.slice(0, 4) || firstYear;

      if (firstYear === lastYear) setReleaseYear(lastYear);
      else setReleaseYear(`${firstYear}-${lastYear}`);
      setTotalSeasons(data.number_of_seasons!);
      setIsLoading(false);
    },
    [type, id]
  );

  const called = useRef(false);

  const locationUrl = useRouter();

  useEffect(() => {
    if (commonData?.id === id) return;
    called.current = false;
    // eslint-disable-next-line
  }, [locationUrl]);

  useEffect(() => {
    if (called.current) return;

    called.current = true;

    (async () => {
      setMagnets([]);
      toogleMovie(false);
      setLoading(true);
      setIMDBRating({ rating: 0, votes: 0 });
      setCollection([]);

      const data = await fetchDetails(id!, type!);

      setCommonData({
        id: data.id!,
        title: (data.title || data.name)!,
        backdrop: data.backdrop_path,
        poster: data.poster_path,
        overview: data.overview,
        prodCompanies: data.production_companies,
        cast: data.credits.cast,
        tmdbRating: data.vote_average,
        voteCount: data.vote_count,
        genres: data.genres,
        genreString: data.genres?.map((genre) => genre.name).join(", "),
        original_language: data.original_language,
        imdbId: data.imdb_id,
      });

      if (type === "movie") setMovie(data);
      else setSeries(data);

      setTrailer(data.videos.results!, data.original_language!);

      if (type === "movie" && released) {
        fetchIMDBRating(data.imdb_id!).then((imdbRatings) => {
          setIMDBRating({
            votes: imdbRatings.votes,
            rating: parseFloat(imdbRatings.rating.toString()),
          });
        });

        fetchMagnets(
          id!,
          data.title!,
          new Date(data.release_date!).getFullYear()
        )
          .then((res) => {
            setMagnets(res.results);
            // sets default magnet for player incase someone access player directly with url
            if (res.results.length > 0) {
              setPlayerMag(res.results[0].magnet!);
            }
            setPlayable(true);
          })
          .catch(() => {
            setMagnets([]);
          });
      }
      setLoading(false);
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, id]);

  const addToWatchlsit = useCallback(async () => {
    if (!isAuthenticated) {
      toast("Login to access watchlist!");
      return;
    }
    try {
      await addToWatchlist(parseInt(id!, 10), type!);

      const data = {
        id,
        type,
        title: commonData?.title,
        overview: commonData?.overview,
        poster_path: commonData?.poster,
      };

      if (type === "movie") dispatch(addMovieToWatchlist(data));
      else dispatch(addShowToWatchlist(data));

      toast("Added to Watchlist");
    } catch (err: any) {
      if (err && err.response && err.response.statusText) {
        toast("Already in Watchlist!");
        return;
      }
      toast("Something went wrong!");
    }
  }, [
    commonData?.overview,
    commonData?.poster,
    commonData?.title,
    dispatch,
    id,
    isAuthenticated,
    type,
  ]);

  const iframeLoaded = () => {
    setMovieIframeLoading(false);
  };

  const setSeasonMagnets = (
    mag: string,
    magArr: string[],
    episodeNumber: number,
    seasonNum: number,
    episodeMagnets: []
  ) => {
    setPlayerMag(mag);
    setSeasonMags(magArr);
    setEpitoPlay(episodeNumber);
    setSeaToPlay(seasonNum);
    setPlayable(true);
    setEpisodeMagnets(episodeMagnets);
  };

  const closePlayerModal = useCallback(() => {
    navigate.push(router.pathname + hash.replace("player", ""));
  }, [navigate, hash, router.pathname]);

  const playMovie = (movieTitle: string, path: string) => {
    toogleMovie((state) => !state);
    setMovieIframeLoading(true);

    setTimeout(() => {
      if (path === window.location.pathname) {
        if (isAuthenticated) {
          addWatched({
            content_id: id!,
            type: type!,
            timeStamp: new Date(),
          });
          dispatch(markRecentStale());
        }
      }
    }, 2 * 60 * 1000);

    //   ReactGA.event({
    //     category: "Movie",
    //     action: "Play Movie",
    //     label: movieTitle,
    //   });
    // };

    return !isLoading ? (
      <>
        <DetailHelmet commonData={commonData} />

        <Background setDomColor={setDomColor} backdrop={commonData?.backdrop} />

        {loading ? <Loading /> : null}

        <div className={styles.Container}>
          <PosterAndIframe
            id={id!}
            trailerKey={trailerKey}
            showMovie={showMovie}
            commonData={commonData}
            iframeLoaded={iframeLoaded}
          />

          <InformationComponent
            domColor={domColor}
            type={type!}
            commonData={commonData}
            releaseDate={releaseDate}
            releaseYear={releaseYear}
            playMovie={playMovie}
            loadingMovieIframe={loadingMovieIframe}
            showMovie={showMovie}
            IMDBRating={IMDBRating}
            magnets={magnets}
            runtime={runtime}
            externalIds={externalIds}
            released={released}
            addToWatchlsit={addToWatchlsit}
            playWebtor={playWebtor}
            location={router}
          />

          {collection &&
          collection.filter((movie) => movie.poster_path !== null).length >
            1 ? (
            <div
              style={{
                backgroundColor: `rgba(${domColor[0]}, ${domColor[1]}, ${domColor[2]}, 0.3)`,
              }}
              className={styles.Collection}
            >
              <MovieCarousel
                type={type!}
                movies={collection}
                title={collectionTitle}
                showCard={false}
              />
            </div>
          ) : null}

          {type === "tv" && commonData && commonData.title && (
            <Seasons
              id={id!}
              title={commonData.title}
              totalSeasons={totalSeasons}
              setSeasonMagnets={setSeasonMagnets}
            />
          )}

          {/* Cast */}
          {type === "movie" &&
            commonData?.cast &&
            commonData?.cast!.length !== 0 && (
              <CastCarousel
                cast={commonData?.cast}
                title="Featured Cast"
                type="movie"
                dom={domColor}
              />
            )}

          {tvCredits.length !== 0 && (
            <CastCarousel
              cast={tvCredits}
              contentTitle={commonData?.title}
              title={
                commonData?.genres
                  ?.map((genreObj) => genreObj.name)
                  .includes("Animation")
                  ? "Voice Actors"
                  : "Featured Cast"
              }
              type="tv"
              id={id}
              dom={domColor}
            />
          )}

          {/* IMAGES */}
          {images && images.backdrops && images.backdrops!.length !== 0 && (
            <ImageCrousel
              images={images}
              type={type!}
              title="Images"
              dom={domColor}
            />
          )}

          {/* Production */}
          {commonData?.prodCompanies &&
            commonData?.prodCompanies.length > 0 && (
              <ProductionCompanies
                data={commonData?.prodCompanies}
                title="Production"
                dom={domColor}
              />
            )}

          {/* Similar Movies */}
          {commonData?.genres?.length !== 0 && (
            <SimilarCarousel
              id={id!}
              type={type!}
              title={
                type === "movie" ? "Movies you may like" : "Shows you may like"
              }
              genres={commonData?.genres}
              toBeFiltered={collection}
              dom={domColor}
            />
          )}
        </div>

        {type === "movie" &&
        hash.includes("player") &&
        playable &&
        playerMag !== "" ? (
          <PlayerModal
            title={`${commonData?.title} (${releaseYear})`}
            magnet={playerMag}
            magnets={magnets}
            genres={commonData?.genres}
            collection={collection}
            rating={IMDBRating || commonData?.tmdbRating}
            poster={`https://image.tmdb.org/t/p/w1280/${commonData?.backdrop}`}
            onClose={closePlayerModal}
          />
        ) : null}

        {type === "tv" && hash.includes("player") && playable ? (
          <PlayerModal
            title={commonData?.title}
            episode={episodeToPlay}
            season={seasonToPlay}
            poster={`https://image.tmdb.org/t/p/w1280/${commonData?.backdrop}`}
            magnets={seasonMags}
            episodemag={episodeMag}
          />
        ) : null}
      </>
    ) : (
      <Loading />
    );
  };
}
export default memo(Detail as any);
