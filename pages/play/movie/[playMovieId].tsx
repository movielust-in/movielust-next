/* eslint-disable react/default-props-match-prop-types */
import { useRouter } from 'next/router';
import Script from 'next/script';
import React, { useEffect, useRef, useState } from 'react';
import BackgroundComp from '../../../components/Details/BackgroundImage';
import InformationComponent from '../../../components/Details/Information';
import { WebtorFeatures } from '../../../components/MagnetPlayerConfig';
import tmdbClient from '../../../helpers/tmdbClient';
import { fetchMagnetsfromYTSapi } from '../../../helpers/torrent';
import { image, SHALLOW_DETAIL } from '../../../helpers/Urls';

import styles from '../../../styles/play.module.scss';
import { Magnet } from '../../../types/apiResponses';
import { Genre, MovieResponse } from '../../../types/tmdb';

// interface WebtorEvent {
//   name: string;
//   data: any;
//   player: any;
// }

// eslint-disable-next-line no-undef
type windowWithWebtor = Window & typeof globalThis & { webtor: any };

const Play = () => {
  // const [playerEvents, setPlayerEvents] = useState<any>();

  const [loaded] = useState(true);

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

  const [mags, setMags] = useState<{ magnets: Magnet[]; fetched: boolean }>({
    magnets: [],
    fetched: false,
  });

  const tmdbId = router.query.playMovieId as string;

  const magSrc = router.query.m as string | undefined;

  const quality = router.query.q as string;

  useEffect(() => {
    if (
      (!info.backdrop || !info.title || !info.poster) &&
      !info.fetched &&
      tmdbId
    ) {
      tmdbClient
        .get<MovieResponse>(SHALLOW_DETAIL(tmdbId, 'movie'))
        .then(
          ({
            data: {
              backdrop_path,
              poster_path,
              imdb_id,
              title: t,
              overview,
              genres,
              original_language,
            },
          }) => {
            setInfo({
              backdrop: backdrop_path,
              poster: image(200, poster_path!),
              imdbId: imdb_id,
              title: t,
              overview,
              genres,
              langauge: original_language,
              fetched: true,
            });
          }
        );
    }
  }, [info, tmdbId]);

  useEffect(() => {
    if ((mags.magnets && mags.magnets.length) || !info.imdbId || !tmdbId)
      return;
    fetchMagnetsfromYTSapi(info.imdbId, tmdbId).then((res) => {
      setMags({ fetched: true, magnets: res.data.results });
    });
  }, [info.imdbId, mags, tmdbId]);

  const added = useRef(false);

  const playerContainerRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (added.current) return;

    if (!loaded || !magSrc) return;

    if (!info.poster && !info.fetched) return;

    added.current = true;

    (window as windowWithWebtor).webtor = new (
      window as windowWithWebtor
    ).webtor.constructor();
    (window as windowWithWebtor).webtor.push({
      id: 'player',
      title: info.title,
      imdbId: info.imdbId,
      width: '100%',
      height: window.matchMedia('(max-width: 724px)').matches
        ? '300px'
        : '450px',
      magnet: magSrc,
      poster: image(1280, info.backdrop!),
      lang: 'en',
      features: WebtorFeatures,
    });
  }, [info, loaded, magSrc]);

  return (
    <div className={styles.container}>
      <BackgroundComp backdrop={info.backdrop} />

      {/* Webtor Script */}
      <Script
        src="https://cdn.jsdelivr.net/npm/@webtor/embed-sdk-js/dist/index.min.js"
        strategy="afterInteractive"
      />

      {/* Webtor Player Container */}
      <div className={styles.player_container}>
        <div id="player" ref={playerContainerRef as any} />
        <select
          className={styles.quality_dropdown}
          onChange={(e) => {
            added.current = false;
            if (playerContainerRef.current) {
              playerContainerRef.current.innerHTML = '';
            }
            router.push(`/play/${tmdbId}?${e.target.value}`);
          }}
        >
          {mags.magnets &&
            mags.magnets.length > 0 &&
            mags.magnets.map((magnet) => (
              <option
                key={magnet.quality}
                value={`m=${magnet.magnet}&q=${magnet.quality}`}
                selected={quality === magnet.quality}
              >
                {magnet.quality}
              </option>
            ))}
        </select>
      </div>

      <div className={styles.rest_container}>
        <InformationComponent
          purpose="player"
          type="movie"
          releaseDate=""
          loadingMovieIframe={false}
          playMovie={() => { }}
          showMovie={false}
          magnets={[]}
          runtime=""
          releaseYear=""
          released={false}
          location={router}
          commonData={{
            id: tmdbId,
            title: info.title!,
            backdrop: info.backdrop,
            poster: info.poster,
            overview: info.overview,
            genres: info.genres,
            genreString:
              info?.genres?.map((genre: Genre) => genre.name).join(', ') || '',
            original_language: info.langauge,
            imdbId: info.imdbId,
          }}
        />
      </div>
    </div>
  );
};

export default Play;
