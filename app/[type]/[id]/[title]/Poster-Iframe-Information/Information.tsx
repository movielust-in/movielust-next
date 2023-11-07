'use client';

/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { FaDownload, FaPlay, FaStop, FaShareAlt } from 'react-icons/fa';

import Social from '../../../../../components/External/Social';
import { image } from '../../../../../helpers/Urls';
import { Magnet } from '../../../../../types/apiResponses';
import {
  DetailResponse,
  MovieExternalIdsResponse,
} from '../../../../../types/tmdb';
import { ImdbRating } from '../DetailTypes';
import styles from '../Detail.module.scss';

import WatchlistButton from './WatchlistButton';
import Ratings from './Ratings';

const Spinner = dynamic(() => import('../../../../../components/UI/Spinner'));

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
}

const playButtonMsg = (isMovieShown: boolean) =>
  isMovieShown ? 'Play Trailer' : 'Play Movie';

export default function InformationComponent({
  purpose,
  type,
  contentData,
  togglePlayer,
  iframeLoading,
  showMovie,
  IMDBRating,
  magnets,
  externalIds,
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
                togglePlayer(
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

        <WatchlistButton contentData={contentData} type={type} />

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
        <h2>{contentData!.title || contentData!.name}</h2>{' '}
        {contentData.release_date?.split(' ')[-1] || null}
      </div>

      <Ratings
        IMDBRating={IMDBRating}
        contentData={contentData}
        externalIds={externalIds}
        type={type}
      />

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
          title={contentData?.title || contentData?.name}
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
