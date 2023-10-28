'use client';

/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-nested-ternary */
import { useState } from 'react';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

import { MdPlaylistAdd } from 'react-icons/md';
import { FaDownload, FaPlay, FaStar, FaStop, FaShareAlt } from 'react-icons/fa';

import Social from '../../../../components/External/Social';
// import ShareOptions from '../ShareOptions';

import { image } from '../../../../helpers/Urls';

import { ImdbRating } from './DetailTypes';
import { Magnet } from '../../../../types/apiResponses';
import { DetailResponse, MovieExternalIdsResponse } from '../../../../types/tmdb';

import styles from './Detail.module.scss';

const Spinner = dynamic(() => import('../../../../components/UI/Spinner'));

const openImdbRatingCharts = (movieImdbId: string) => {
  const IMDB = `https://www.imdb.com/title/${movieImdbId}/ratings`;
  window.open(IMDB, '_blank');
};

interface InformationComponentProps {
  purpose?: string;
  type: string;
  contentData: DetailResponse;
  togglePlayer: (movieTitle: string, path: string) => void;
  iframeLoading: boolean;
  showMovie: boolean;
  IMDBRating?: ImdbRating;
  magnets: Magnet[] | undefined;
  externalIds?: MovieExternalIdsResponse | undefined;
  addToWatchlsit?: () => any;
}

const playButtonMsg = (isMovieShown: boolean) =>
  isMovieShown ? 'Play Trailer' : 'Play Movie';

export default function InformationComponent({
  purpose,
  type,
  contentData,
  togglePlayer: playMovie,
  iframeLoading,
  showMovie,
  IMDBRating,
  magnets,
  externalIds,
  addToWatchlsit,
}: InformationComponentProps) {
  const [loadingShareImg, setLoadingShareImg] = useState(false);

  const pathname = usePathname();

  const share = async () => {
    if (navigator.share && contentData?.poster_path) {
      setLoadingShareImg(true);
      const imageBlob = await fetch(image(200, contentData?.poster_path)).then(
        (res) => {
          setLoadingShareImg(false);
          return res.blob();
        }
      );

      navigator
        .share({
          title: contentData?.title,
          text: `Check out ${contentData?.title} on Movielust.\n`,
          url: window.location.href,
          files: [
            new File(
              [imageBlob],
              `${(contentData?.title! || contentData.name!)
                .split(' ')
                .join('-')}.png`,
              {
                type: imageBlob.type,
              }
            ),
          ],
        })
        .catch(() => {});
    }
  };

  return (
    <div
      // style={{
      //   backgroundColor: `rgba(${domColor[0]}, ${domColor[1]}, ${domColor[2]}, 0.3)`,
      // }}
      className={styles.Information}
      style={{
        maxWidth: purpose ? '100vw' : '78vw',
      }}
    >
      <div className={styles.Controls}>
        {type === 'movie' &&
          contentData.release_date &&
          new Date() > new Date(contentData.release_date) &&
          contentData && (
            <span
              role="presentation"
              style={{
                width: iframeLoading ? '80px' : '120px',
              }}
              className={styles.PlayMovie}
              onClick={() =>
                playMovie(
                  contentData.title || contentData.name!,
                  pathname as string
                )
              } // !!!
            >
              {!showMovie ? <FaPlay /> : <FaStop />}
              {!iframeLoading ? (
                playButtonMsg(showMovie)
              ) : (
                <Spinner width={20} height={20} />
              )}
            </span>
          )}
        {addToWatchlsit ? (
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
        ) : null}

        {/* ShareButton for Whatsapp,FB */}

        {loadingShareImg ? (
          <Image
            src="PlayerSpinner"
            alt="loading"
            className={styles.ShareButton}
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        ) : (
          <FaShareAlt className={styles.ShareButton} onClick={share}>
            <div className={styles.HoverMessage}>Share</div>
          </FaShareAlt>
        )}
      </div>
      <div className={styles.Title}>
        <h2>{contentData!.title}</h2>{' '}
        {contentData.release_date?.split(' ')[-1] || null}
      </div>
      {/* Ratings */}
      {IMDBRating || contentData?.vote_average ? (
        <div className={styles.Rating}>
          {IMDBRating?.rating || contentData?.vote_average ? (
            <FaStar size="20px" color="rgba(255,255,0,0.8)" />
          ) : // <img width={20} src={FaStar} alt="star" />
          null}
          {IMDBRating && IMDBRating.rating > 0 ? (
            <span
              role="presentation"
              className={styles.IMDBRatings}
              onClick={() =>
                externalIds && openImdbRatingCharts(externalIds.imdb_id!)
              }
            >
              {IMDBRating.rating} ({IMDBRating.vote_count.toLocaleString()}{' '}
              votes) &nbsp;&nbsp;
              <img
                width="30px"
                src="https://m.media-amazon.com/images/G/01/IMDb/BG_rectangle._CB1509060989_SY230_SX307_AL_.png"
                alt="TMDB"
              />{' '}
            </span>
          ) : contentData?.vote_average ? (
            <span>
              {contentData.vote_average} (
              {contentData.vote_count?.toLocaleString()} votes)
              {'   '}
              <img
                width="30px"
                src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
                alt="TMDB"
              />
            </span>
          ) : null}
        </div>
      ) : null}
      {/* Ratings end */}
      {/* Genres and Release Date */}

            <div className={styles.SubTitle}>
          {contentData.runtime && contentData.runtime !== '0 hrs 0 mins'
            ? contentData.runtime
            : null}
          <br /> {contentData?.genres?.map((genre) => genre.name).join(' | ')}
          {type === 'movie' &&
            (contentData.release_date ? (
              <div className={styles.SubTitle}>
                {contentData.released ? 'Released: ' : 'Releasing: '}{' '}
                {contentData.release_date}
              </div>
            ) : null)}
        </div>
      

      {type === 'movie' && magnets?.length ? (
        <div className={styles.ContentOptions}>
          <FaDownload />
          {magnets!.map((magnet) => (
            <div key={magnet.magnet}>
              <a href={magnet.magnet} download>
                {magnet.quality}
                &nbsp;(
                {magnet.size})
              </a>
            </div>
          ))}
        </div>
      ) : null}
      {externalIds ? (
        <Social
          externalIds={externalIds as MovieExternalIdsResponse}
          type="title"
          title={contentData?.title}
        />
      ) : null}
      {contentData && contentData.overview ? (
        <div
          className={styles.Description}
          style={{
            maxWidth: purpose ? '100vw' : '77vw',
          }}
        >
          {contentData.overview}
        </div>
      ) : null}
    </div>
  );
}
