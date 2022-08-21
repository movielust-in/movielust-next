/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-nested-ternary */
import { useState } from "react";
import { MdPlaylistAdd } from "react-icons/md";
import { FaDownload, FaPlay, FaStar, FaStop, FaShareAlt } from "react-icons/fa";
import { motion } from "framer-motion";

// import { ShareOptions, Social } from '../../components';

import ShareOptions from "../../components/ShareOptions";
import Social from "../../components/Social";

import { CommonData, ImdbRating } from "./DetailTypes";
import { Magnet } from "../../types/apiResponses";
import { MovieExternalIdsResponse } from "../../types/tmdb";
import Spinner from "../../components/UI/Spinner";

import styles from "./Detail.module.scss";
import { image } from "../../helpers/Urls";
import { PlayerSpinner } from "../../assets";
import Image from "next/image";

const openImdbRatingCharts = (movieImdbId: string) => {
  const IMDB = `https://www.imdb.com/title/${movieImdbId}/ratings`;
  window.open(IMDB, "_blank");
};

interface InformationComponentProps {
  domColor?: any;
  type: string;
  commonData: CommonData | undefined;
  releaseDate: string | undefined;
  playMovie: (movieTitle: string, path: string) => void;
  loadingMovieIframe: boolean;
  showMovie: boolean;
  IMDBRating?: ImdbRating;
  magnets: Magnet[] | undefined;
  runtime: string | undefined;
  externalIds: MovieExternalIdsResponse | undefined;
  released: boolean;
  addToWatchlsit: () => any;
  releaseYear: string | undefined;
  playWebtor: (magnet: Magnet) => void;
  location: any;
}

const playButtonMsg = (isMovieShown: boolean) =>
  isMovieShown ? "Play Trailer" : "Play Movie";

export default function InformationComponent({
  domColor,
  type,
  commonData,
  releaseDate,
  playMovie,
  loadingMovieIframe,
  showMovie,
  IMDBRating,
  magnets,
  runtime,
  externalIds,
  released,
  addToWatchlsit,
  releaseYear,
  playWebtor,
  location,
}: InformationComponentProps) {
  const [showShareOptions, setShowShareOptions] = useState(false);

  const [loadingShareImg, setLoadingShareImg] = useState(false);

  const share = async () => {
    if (navigator.share) {
      setLoadingShareImg(true);
      const imageBlob = await fetch(image(200, commonData?.poster!)).then(
        (res) => {
          setLoadingShareImg(false);
          return res.blob();
        }
      );

      navigator
        .share({
          title: commonData?.title,
          text: `Check out ${commonData?.title} on Movielust.\n`,
          url: window.location.href,
          files: [
            new File(
              [imageBlob],
              `${commonData?.title.split(" ").join("-")}.png`,
              {
                type: imageBlob.type,
              }
            ),
          ],
        })
        .catch(() => {});
    } else setShowShareOptions((state) => !state);
  };

  return (
    <motion.div
      // style={{
      //   backgroundColor: `rgba(${domColor[0]}, ${domColor[1]}, ${domColor[2]}, 0.3)`,
      // }}
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={styles.Information}
    >
      <div className={styles.Controls}>
        {type === "movie" &&
          releaseDate &&
          new Date() > new Date(releaseDate) &&
          commonData && (
            <span
              role="presentation"
              style={{
                width: loadingMovieIframe ? "80px" : "120px",
              }}
              className={styles.PlayMovie}
              onClick={() => playMovie(commonData.title, location.pathname)}
            >
              {!showMovie ? <FaPlay /> : <FaStop />}
              {!loadingMovieIframe ? playButtonMsg(showMovie) : <Spinner />}
            </span>
          )}
        <button
          type="button"
          className={styles.AddButton}
          onClick={addToWatchlsit}
        >
          <span>
            <MdPlaylistAdd />
          </span>
          <div className={styles.HoverMessage}>Add to Watchlist</div>
        </button>

        {/* ShareButton for Whatsapp,FB */}

        {loadingShareImg ? (
          <Image
            src={PlayerSpinner}
            alt="loading"
            className={styles.ShareButton}
          />
        ) : (
          <FaShareAlt className={styles.ShareButton} onClick={share}>
            <div className={styles.HoverMessage}>Share</div>
          </FaShareAlt>
        )}

        <ShareOptions
          title={commonData!.title}
          type={type!}
          show={showShareOptions}
        />
      </div>

      <div className={styles.Title}>
        <h2>{commonData!.title}</h2> {releaseYear && <h4>({releaseYear})</h4>}
      </div>
      <div className={styles.Rating}>
        {IMDBRating?.rating || commonData?.tmdbRating ? (
          <FaStar size="20px" color="rgba(255,255,0,0.8)" />
        ) : // <img width={20} src={FaStar} alt="star" />
        null}
        {IMDBRating && IMDBRating.rating > 0 ? (
          <span
            role="presentation"
            className={styles.IMDBRatings}
            onClick={() => openImdbRatingCharts(externalIds!.imdb_id!)}
          >
            {IMDBRating.rating} ({IMDBRating.votes.toLocaleString()} votes)
            &nbsp;&nbsp;
            <img
              width="30px"
              src="https://m.media-amazon.com/images/G/01/IMDb/BG_rectangle._CB1509060989_SY230_SX307_AL_.png"
              alt="TMDB"
            />{" "}
          </span>
        ) : commonData?.tmdbRating ? (
          <span>
            {commonData.tmdbRating} ({commonData.voteCount?.toLocaleString()}{" "}
            votes)
            {"   "}
            <img
              width="30px"
              src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
              alt="TMDB"
            />
          </span>
        ) : null}
      </div>
      <div className={styles.SubTitle}>
        {runtime !== "0 hrs 0 mins" ? runtime : null}
        <br /> {commonData?.genreString}
        {type === "movie" && (
          <div className={styles.SubTitle}>
            {released ? "Released: " : "Releasing: "} {releaseDate}
          </div>
        )}
      </div>
      {type === "movie" && magnets!.length > 0 && (
        <>
          <div className={styles.ContentOptions}>
            <FaPlay />
            {magnets!.map((magnet) => (
              <div
                role="button"
                tabIndex={0}
                key={magnet.magnet}
                onClick={() => playWebtor(magnet)}
                onKeyDown={() => playWebtor(magnet)}
              >
                {magnet.quality}
              </div>
            ))}
          </div>
          <div className={styles.ContentOptions}>
            <FaDownload />
            {magnets!.map((magnet) => (
              <div key={magnet.magnet}>
                <a href={magnet.magnet}>
                  {magnet.quality}
                  &nbsp;(
                  {magnet.size})
                </a>
              </div>
            ))}
          </div>
        </>
      )}

      <Social
        externalIds={externalIds as MovieExternalIdsResponse}
        type="title"
        title={commonData?.title}
      />

      {commonData && commonData.overview ? (
        <div className={styles.Description}>{commonData.overview}</div>
      ) : null}
    </motion.div>
  );
}
