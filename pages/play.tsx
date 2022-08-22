/* eslint-disable react/default-props-match-prop-types */
import Script from 'next/script';
import React, { useEffect, useState } from 'react';
import BackgroundComp from '../components/Details/BackgroundImage';

import styles from '../styles/play.module.scss';

const srcMg =
  'magnet:?xt=urn:btih:85AA3E942CB7C04038B66E99791211DFC6A38FB7&dn=The+Gray+Man+%282022%29+%5B1080p%5D+%5BYTS.MX%5D&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2710%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.ch%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.cyberia.is%3A6969%2Fannounce&tr=http%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce';

interface PlayerProps {
  src: string;
  poster?: string;
  backdrop?: string;
  title: string;
  imdbId: string;
}

interface WebtorEvent {
  name: string;
  data: any;
  player: any;
}

// eslint-disable-next-line no-undef
type windowWithWebtor = Window & typeof globalThis & { webtor: any };

const Play = ({ src, poster, title, backdrop, imdbId }: PlayerProps) => {
  const [loaded, setLoaded] = useState(false);

  const [playerStatus] = useState<any>();

  useEffect(() => {
    console.log(playerStatus);
  }, [playerStatus]);

  useEffect(() => {
    if (!loaded) return;

    (window as windowWithWebtor).webtor =
      (window as windowWithWebtor).webtor || [];
    (window as windowWithWebtor).webtor.push({
      id: 'player',
      width: '100%',
      height: window.matchMedia('(max-width: 724px)').matches
        ? '300px'
        : '450px',
      magnet: src,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      on(_e: WebtorEvent) {},
      poster,
      title,
      imdbId,
      lang: 'en',
    });
  }, [loaded]);

  return (
    <div className={styles.container}>
      <BackgroundComp backdrop={backdrop} />
      <Script
        src="https://cdn.jsdelivr.net/npm/@webtor/embed-sdk-js/dist/index.min.js"
        strategy="afterInteractive"
        onLoad={() => setLoaded(true)}
      />

      <div className={styles.player_container}>
        <div id="player" />
      </div>
    </div>
  );
};

Play.defaultProps = {
  src: srcMg,
  backdrop:
    'https://image.tmdb.org/t/p/w1280/27Mj3rFYP3xqFy7lnz17vEd8Ms.jpg?no-cache',
  poster: 'https://image.tmdb.org/t/p/w300//8cXbitsS6dWQ5gfMTZdorpAAzEH.jpg',
  title: 'The Gray Man',
  imdbId: 'tt1649418',
};

export default Play;

// {/* <video
//   ref={setPlayerRef as any}
//   src={src}
//   data-title="The Gray Man"
//   width="100%"
//   height="500px"
//   poster="https://image.tmdb.org/t/p/w300//8cXbitsS6dWQ5gfMTZdorpAAzEH.jpg"
//   data-on={(e: any) => console.log("on", e)}
// /> */}
