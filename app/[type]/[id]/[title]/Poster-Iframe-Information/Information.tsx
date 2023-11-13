'use client';

/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { FaDownload, FaShareAlt } from 'react-icons/fa';

import Social from '../../../../../components/External/Social';
import { image } from '../../../../../lib/tmdb/Urls';
import {
  DetailResponse,
  MovieExternalIdsResponse,
} from '../../../../../types/tmdb';
import { ImdbRating } from '../../../../../types/api-responses';
import styles from '../Detail.module.scss';
import { nativeShare } from '../../../../../utils/share';
import { MovieTorrent } from '../../../../../types/movie-torrents';

import WatchlistButton from './WatchlistButton';
import Ratings from './Ratings';
import PlayButton from './PlayButton';
import MagnetTooltip from './Magnet-Tooltip';

interface InformationComponentProps {
  purpose?: string;
  type: string;
  contentData: DetailResponse;
  togglePlayer: any;
  iframeLoading: boolean;
  showMovie: boolean;
  IMDBRating?: ImdbRating;
  magnets?: MovieTorrent[];
  externalIds?: MovieExternalIdsResponse | undefined;
}

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
    setLoadingShareImg(true);
    await nativeShare({
      title: contentData.title! || contentData.name!,
      imageUrl: contentData?.poster_path
        ? image(200, contentData?.poster_path)
        : undefined,
    });
    setLoadingShareImg(false);
  };

  return (
    <div
      className={styles.Information}
      style={{
        maxWidth: purpose ? '100vw' : '78vw',
      }}
    >
      <div className={styles.Controls}>
        <PlayButton
          iframeLoading={iframeLoading}
          showMovie={showMovie}
          togglePlayer={togglePlayer}
          contentData={contentData}
          pathname={pathname}
        />

        <WatchlistButton contentData={contentData} type={type} />

        {/* ShareButton for Whatsapp,FB */}

        {loadingShareImg ? (
          <img
            src="/images/svgs/player_loading.svg"
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
        {type === 'movie' && contentData.release_date && (
          <div className={styles.SubTitle}>
            {contentData.released ? 'Released: ' : 'Releasing: '}{' '}
            {contentData.release_date}
          </div>
        )}
      </div>

      {type === 'movie' && magnets?.length ? (
        <div className={styles.ContentOptions}>
          <MagnetTooltip />
          <FaDownload />
          {magnets!.map((magnet) => (
            <div
              key={magnet.magnet}
              data-tooltip-id="magnet_tooltip"
              data-tooltip-content={magnet.magnet}
              data-tooltip-html={`<span>Seeds:  ${magnet.seeds}<br/>Peers:  ${magnet.peers}<br/>Channel:  ${magnet.audio_channels}<br/>Codec: ${magnet.video_codec}</span>`}
            >
              <a href={magnet.magnet} download>
                {magnet.quality}
                &nbsp;(
                {magnet.size})
              </a>
            </div>
          ))}
        </div>
      ) : null}

      <Social
        externalIds={externalIds as MovieExternalIdsResponse}
        type="title"
        title={contentData?.title || contentData?.name}
      />

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
