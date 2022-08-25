import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect, useMemo, useRef, useState } from 'react';
import { WebtorFeatures } from '../../../../../../../components/MagnetPlayerConfig';
import { BackgroundImage } from '../../../../../../../components/UI';
import tmdbClient from '../../../../../../../helpers/tmdbClient';
import { fetchShowMagnets } from '../../../../../../../helpers/torrent';
import { image, SHALLOW_DETAIL } from '../../../../../../../helpers/Urls';

import styles from '../../../../../../../styles/play.module.scss';
import { ShowMagnet } from '../../../../../../../types/apiResponses';
import { Genre, TvResult } from '../../../../../../../types/tmdb';

// eslint-disable-next-line no-undef
type windowWithWebtor = Window & typeof globalThis & { webtor: any };

const PlayShow = () => {
  const router = useRouter();

  const [info, setInfo] = useState<{
    backdrop?: string;
    poster?: string;
    title?: string;
    imdbId?: string;
    overview?: string;
    genres?: Genre[];
    langauge?: string;
    fetched: boolean;
  }>({
    fetched: false,
  });

  const {
    playShowId: id,
    name,
    season,
    episode,
    totalEpisode,
    m: magnet,
    q: quality,
  } = router.query as {
    playShowId: string;
    name: string;
    season: string;
    episode: string;
    totalEpisode: string;
    m: string;
    q: string;
  };

  useEffect(() => {
    if (
      (!info.backdrop || !info.title || !info.poster) &&
      !info.fetched &&
      id
    ) {
      tmdbClient
        .get<TvResult>(SHALLOW_DETAIL(id, 'tv'))
        .then(
          ({
            data: {
              backdrop_path,
              poster_path,
              name: t,
              overview,
              original_language,
            },
          }) => {
            setInfo({
              backdrop: backdrop_path,
              poster: image(200, poster_path!),
              title: t,
              overview,
              langauge: original_language,
              fetched: true,
            });
          }
        );
    }
  }, [info, id]);

  const [seasonMagnets, setAllMagnets] = useState<ShowMagnet[][]>([]);

  useEffect(() => {
    fetchShowMagnets(id, name, season, parseInt(totalEpisode, 10)).then((res) =>
      setAllMagnets(res)
    );
  }, [id, name, season, totalEpisode]);

  const added = useRef(false);

  const playerContainerRef = useRef<HTMLDivElement>();

  const episodeMags = useMemo(
    () =>
      seasonMagnets && seasonMagnets.length
        ? seasonMagnets
            .map(
              (episodeMagnets) =>
                episodeMagnets.find(
                  (episodeMagnet) =>
                    (episodeMagnet.magnet &&
                      episodeMagnet.quality === '1080p') ||
                    episodeMagnet.quality === '1080p' ||
                    (episodeMagnet.magnet &&
                      episodeMagnet.quality === '720p') ||
                    episodeMagnet.quality === '720p'
                ) || episodeMagnets[0]
            )
            .filter((episodeMagnet) => episodeMagnet)
        : [],
    [seasonMagnets]
  );

  useEffect(() => {
    if (added.current) return;

    if (!magnet) return;

    if (!info.poster && !info.fetched) return;

    added.current = true;

    (window as windowWithWebtor).webtor = new (
      window as windowWithWebtor
    ).webtor.constructor();
    (window as windowWithWebtor).webtor.push({
      id: 'player',
      title: info.title,
      width: '100%',
      height: window.matchMedia('(max-width: 724px)').matches
        ? '300px'
        : '450px',
      magnet,
      poster: image(1280, info.backdrop!),
      lang: 'en',
      features: WebtorFeatures,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [magnet, quality]);

  return (
    <div className={styles.container}>
      <Head>
        <title>{info.title ? `Play ${info.title}` : 'Play'}</title>
      </Head>

      {info.backdrop ? (
        <BackgroundImage src={image(780, info.backdrop)} />
      ) : null}

      <Script
        src="https://cdn.jsdelivr.net/npm/@webtor/embed-sdk-js/dist/index.min.js"
        strategy="afterInteractive"
      />

      <div>
        <div className={styles.top_portion}>
          <div
            className={`${styles.player_container} ${styles.player_container_show}`}
          >
            <div id="player" ref={playerContainerRef as any} />
          </div>
          <div className={styles.episodeContainer}>
            {episodeMags.map((mag) => (
              <button
                type="button"
                className={styles.episodeSelector}
                onClick={() => {
                  if (playerContainerRef.current)
                    playerContainerRef.current.innerHTML = '';

                  added.current = false;

                  router.replace(
                    `/play/show/${name}/${season}/${
                      mag.episode
                    }/${totalEpisode}/${id}?m=${mag.magnet || mag.torrent}&q=${
                      mag.quality
                    }`,
                    undefined,
                    { shallow: true }
                  );
                }}
              >
                {mag.episode}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.qualityBar}>
          {seasonMagnets &&
            seasonMagnets.length &&
            seasonMagnets[parseInt(episode, 10) - 1].map((mag) => (
              <button
                type="button"
                className={styles.qualitySelector}
                onClick={() => {
                  if (playerContainerRef.current)
                    playerContainerRef.current.innerHTML = '';

                  added.current = false;

                  router.replace(
                    `/play/show/${name}/${season}/${
                      mag.episode
                    }/${totalEpisode}/${id}?m=${mag.magnet || mag.torrent}&q=${
                      mag.quality
                    }`
                  );
                }}
              >
                {`${mag.quality} ${mag.magnet ? 'magnet' : 'torrent'}`}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PlayShow;
