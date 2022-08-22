/* eslint-disable no-nested-ternary */
import { useState, useEffect, useRef, BaseSyntheticEvent, memo } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import {
  FaAngleDown,
  FaAngleUp,
  FaDownload,
  FaPlay,
  FaStop,
} from 'react-icons/fa';

import Image from 'next/image';
import { useRouter } from 'next/router';
// import ReactGA from "react-ga";

import { useDispatch, useSelector } from '../../redux';
import Spinner from '../UI/Spinner';
import { image } from '../../helpers/Urls';
import { addWatched } from '../../helpers/user';
import { fetchSeason } from '../../helpers/tmdb/series';
import { fetchShowMagnets } from '../../helpers/torrent';

import { FULL_MONTHS, TWO_EMBED } from '../../config';
import { LoadingGhost } from '../../assets';

import { markRecentStale } from '../../redux/reducers/recent.reducer';
import { TvSeasonResponse } from '../../types/tmdb';

export interface SeasonsProps {
  id: string;
  title: string;
  totalSeasons: number;
  setSeasonMagnets: Function;
}

function Seasons({ id, title, totalSeasons, setSeasonMagnets }: SeasonsProps) {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [season, setSeason] = useState(0);
  const [seasons, setSeasons] = useState<
    Record<string | number, TvSeasonResponse | boolean>
  >({
    empty: true,
  });
  const [showEpisode, setEpisode] = useState<number>();
  const [magnets, setMagnets] = useState<any>({ empty: true });
  const [gettingTorrents, setGettingTorrents] = useState(false);
  const [gettingEpisodes, setGettingEpisodes] = useState(false);
  const [playEpisode, tooglePlay] = useState(false);
  const [iframeLoading, setFrameLoading] = useState(false);
  const isAuthenticated = useSelector((state) => state.user.isLoggedIn);

  const [currEpisodeMag, setCurrEpisode] = useState([]);

  const dispatch = useDispatch();

  const episodeRef = useRef();

  const s = router.query.s as string;
  const e = router.query.e as string;

  if (
    s &&
    s !== undefined &&
    !Number.isNaN(s) &&
    parseInt(s, 10) <= totalSeasons &&
    parseInt(season.toString(), 10) !== parseInt(s, 10)
  ) {
    setSeason(parseInt(s, 10));
    setShow(true);
  }

  const getAir = (Release: string) => {
    // get air date
    const bDate = new Date(Release);
    const Releasedse = `${
      FULL_MONTHS[bDate.getMonth()]
    }, ${bDate.getDate()} ${bDate.getFullYear()}`;
    return (new Date() < bDate ? 'Air date: ' : 'Aired: ') + Releasedse;
  };

  const toggle = (index: any) => {
    router.push(
      `/tv/${id}/${title
        .split(' ')
        .join('-')
        .toLowerCase()}?s=${season}&e=${index}`,
      undefined,
      { shallow: true }
    );
    if (showEpisode === index) {
      return setEpisode(undefined);
    }
    return setEpisode(index);
  };

  useEffect(() => {
    (async () => {
      if (season === 0 || season in seasons) return;
      try {
        setGettingEpisodes(true);
        const data = await fetchSeason(id, season);

        if (data && data.season_number) {
          setSeasons((state: any) => {
            const obj = { ...state, empty: false };
            obj[data.season_number as number] = data;
            return obj;
          });

          if (
            e &&
            !Number.isNaN(e) &&
            data.episodes!.some(
              (episode) => episode.episode_number === parseInt(e, 10)
            )
          ) {
            setEpisode(parseInt(e, 10));
          }

          setGettingEpisodes(false);

          setGettingTorrents(true);

          const downloads = await fetchShowMagnets(
            id,
            title,
            season,
            data.episodes!.length
          );

          setMagnets((state: any) => {
            const obj = { ...state, empty: false };
            obj[data.season_number!] = downloads;
            return obj;
          });

          setGettingTorrents(false);
        }
      } catch (err) {
        setGettingTorrents(false);
      } finally {
        setGettingTorrents(false);
      }
    })();
  }, [id, season, s, e, seasons, title]);

  const changeSeason = (episodeChangeEvent: BaseSyntheticEvent) => {
    const seasonNumber = parseInt(episodeChangeEvent.target.value, 10);
    router.push(
      `/tv/${id}/${title.split(' ').join('-').toLowerCase()}?s=${
        seasonNumber + 1
      }&e=0`,
      undefined,
      { shallow: true }
    );
    if (seasonNumber === -1) {
      setShow(false);
      return;
    }
    setSeason(seasonNumber + 1);
    if (seasonNumber + 1 === season) setShow((state) => !state);
    else if (!show) setShow(true);
  };

  const onEpisodePlay = (episode: any) => {
    setSeasonMagnets(
      episode.magnet || episode.torrent,
      magnets,
      episode.episode,
      season,
      currEpisodeMag
    );
    router.push(
      `${window.location.pathname}?m=${episode.magnet || episode.torrent}&q=${
        episode.quality
      }#player`,
      undefined,
      { shallow: true }
    );
  };

  const iframeLoaded = () => {
    setFrameLoading(false);
  };

  const playEmbed = (episode: any, path: string) => {
    tooglePlay((state) => !state);
    setFrameLoading(true);
    setTimeout(() => {
      if (path === window.location.pathname) {
        if (isAuthenticated) {
          addWatched({
            content_id: id,
            type: 'tv',
            timeStamp: new Date(),
            season,
            episode: episode.episode_number,
          });
          dispatch(markRecentStale());
        }
      }
    }, 1.5 * 60 * 1000);
    // ReactGA.event({
    //   category: "Show",
    //   action: "Play Episode",
    //   label: `${title} S${season} E${episode.episode_number}`,
    // });
  };

  return (
    <Container>
      <Header>
        <p>Seasons</p>
      </Header>
      {/* All Season tab */}
      <SelectSeason>
        {Array.from(Array(totalSeasons).keys()).map((seasonNumber) => (
          <SeasonTab
            key={seasonNumber}
            active={seasonNumber + 1 === season && show}
            value={seasonNumber}
            onClick={changeSeason}
          >
            {seasonNumber + 1}
          </SeasonTab>
        ))}
      </SelectSeason>

      {gettingEpisodes && (
        <GettingSeries>
          <Spinner />
        </GettingSeries>
      )}
      {/* Open season to view all episode */}
      {!seasons.empty && (
        <SeasonView>
          {show &&
            season in seasons &&
            (seasons[season] as TvSeasonResponse).episodes!.map((episode) => (
              <EpisodeContainer
                key={episode.id}
                ref={
                  (showEpisode === episode.episode_number
                    ? episodeRef
                    : null) as any
                }
              >
                <Episode>
                  <EpisodeTitle
                    role="presentation"
                    onClick={() => {
                      toggle(episode.episode_number);
                      tooglePlay(false);
                    }}
                  >
                    <div>
                      {showEpisode === episode.episode_number ? (
                        <EpisodeToggler>
                          <FaAngleUp />
                        </EpisodeToggler>
                      ) : (
                        <EpisodeToggler>
                          <FaAngleDown />
                        </EpisodeToggler>
                      )}
                    </div>
                    Episode :{` ${episode.episode_number}`}
                    {' - '}
                    {` ${episode.name}`}{' '}
                  </EpisodeTitle>
                </Episode>

                {showEpisode === episode.episode_number && (
                  <EpisodeContent
                    // animate={{ maxHeight: [0, 500] }}
                    // transition={{ duration: 0.4 }}
                    ref={episodeRef as any}
                    onLoad={() => {
                      setCurrEpisode(
                        magnets[season][episode.episode_number! - 1]
                      );
                      const rect =
                        (episodeRef.current as unknown as HTMLElement)!.getBoundingClientRect();
                      if (
                        !(
                          rect.top >= 0 &&
                          rect.left >= 0 &&
                          rect.bottom <=
                            (window.innerHeight ||
                              document.documentElement.clientHeight) &&
                          rect.right <=
                            (window.innerWidth ||
                              document.documentElement.clientWidth)
                        )
                      ) {
                        const offset = 120;
                        const bodyRect =
                          document.body.getBoundingClientRect().top;
                        const elementPos = rect.top - bodyRect;
                        const scrolloffset = elementPos - offset;
                        window.scrollTo({
                          top: scrolloffset,
                          // @ts-ignore
                          behaviour: 'smooth',
                        });
                      }
                    }}
                  >
                    <Section>
                      {!playEpisode ? (
                        episode.still_path ? (
                          <Thumbnail
                            src={image(500, episode.still_path)}
                            alt={episode.name}
                          />
                        ) : null
                      ) : (
                        <YouTube>
                          <iframe
                            width="640px"
                            height="360px"
                            allowFullScreen
                            onLoad={iframeLoaded}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            title={`Season ${season} Episode ${episode.episode_number}`}
                            src={`${TWO_EMBED}/${episode.id}`}
                          />
                        </YouTube>
                      )}

                      <EpisodeOverview>
                        <EpisodeDescription>
                          {episode.overview}
                        </EpisodeDescription>
                        {episode.air_date && (
                          <Aired>{getAir(episode.air_date)}</Aired>
                        )}
                        {/* Loading while Getting torrents */}
                        {gettingTorrents === true && (
                          <TorrentDownload>
                            <FaDownload />
                            <Image
                              src={LoadingGhost}
                              alt="loading"
                              width="30"
                            />
                          </TorrentDownload>
                        )}
                        {showEpisode === episode.episode_number && (
                          <ContentOptions>
                            {new Date() >=
                            new Date(episode.air_date as string) ? (
                              // Button for 2embed
                              <PlayMovie
                                role="presentation"
                                onClick={() =>
                                  playEmbed(episode, window.location.pathname)
                                }
                                loading={iframeLoading && playEpisode}
                              >
                                {!playEpisode ? <FaPlay /> : <FaStop />}
                                {iframeLoading && playEpisode ? (
                                  <Spinner />
                                ) : null}
                              </PlayMovie>
                            ) : null}

                            {!magnets.empty && season in magnets && (
                              <TorLinks>
                                {/* For direct magnet download */}
                                <TorrentDownload>
                                  {magnets[season][
                                    episode.episode_number! - 1
                                  ] !== undefined &&
                                    magnets[season][
                                      episode.episode_number! - 1
                                    ].map((currEpi: any) => (
                                      <Download
                                        key={currEpi.magnet || currEpi.torrent}
                                        href={currEpi.magnet || currEpi.torrent}
                                      >
                                        <FaDownload />
                                        {`${currEpi.quality} ${currEpi.type}`}
                                      </Download>
                                    ))}
                                </TorrentDownload>
                                {/* to play direct magnet with webtor */}

                                <TorrentPlay>
                                  {magnets[season][
                                    episode.episode_number! - 1
                                  ] !== undefined &&
                                    magnets[season][
                                      episode.episode_number! - 1
                                    ].map((currEpi: any) => (
                                      <Play
                                        key={currEpi.magnet || currEpi.torrent}
                                        onClick={() => onEpisodePlay(currEpi)}
                                      >
                                        <FaPlay />
                                        <span>
                                          {`${currEpi.quality} ${currEpi.type}`}
                                        </span>
                                      </Play>
                                    ))}
                                </TorrentPlay>
                              </TorLinks>
                            )}
                          </ContentOptions>
                        )}
                      </EpisodeOverview>
                    </Section>
                  </EpisodeContent>
                )}
              </EpisodeContainer>
            ))}
        </SeasonView>
      )}
    </Container>
  );
}

export default memo(Seasons);

const Container = styled.div`
  font-family: 'bariolregular', sans-serif;
`;

const Header = styled.div`
  p {
    font-size: 30px;
    font-weight: 650;
    letter-spacing: 1px;
    margin: 10px 0 5px 0;
  }
  @media (max-width: 724px) {
    p {
      font-size: 18px;
    }
  }
`;

const ContentOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  width: max-content;
`;

const SelectSeason = styled.div`
  background-color: rgba(1, 1, 1, 0.2);
  border: 1px solid grey;
  border-radius: 8px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-bottom: 0;
  max-width: 100%;
  width: max-content;
`;
const EpisodeDescription = styled.div`
  @media (max-width: 724px) {
    width: 85vw;
    padding: 0;
    margin: 0;
  }
`;
const TorrentDownload = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  /* @media (max-width: 724px) {
        font-size: 12px;
    } */
`;
const TorrentPlay = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  /* @media (max-width: 724px) {
        font-size: 12px;
    } */
`;

const TorLinks = styled.div`
  @media (max-width: 724px) {
    width: 85vw;
  }
`;
const Play = styled.button`
  align-items: center;
  background-color: rgba(200, 200, 200, 0.4);
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  display: flex;
  gap: 5px;
  margin: 0 2px 0 0;
  padding: 5px;
`;

const Download = styled.a`
  align-items: center;
  background-color: rgba(200, 200, 200, 0.4);
  border-radius: 5px;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  gap: 5px;
  margin: 0 2px 2px 0;
  padding: 5px;
`;

const PlayMovie = styled.span<{ loading: boolean }>`
  background-color: rgba(200, 200, 200, 0.4);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  color: white;
  cursor: pointer;
  margin-right: 10px;
  padding: 5px 8px;
  transition: all 200ms ease;
  white-space: nowrap;
  width: ${(props) => (props.loading ? '75px' : '40px')};
  img {
    vertical-align: middle;
    width: 30px;
  }
  svg {
    font-size: 20px;
    vertical-align: middle;
  }
  @media (max-width: 724px) {
    /* margin: 0 0 10px 0; */
  }
`;

const YouTube = styled.div`
  iframe {
    border: none;
    border-radius: 8px 0 0 8px;
  }
  @media (max-width: 870px) {
    iframe {
      width: 50vw;
    }
  }
  @media (max-width: 724px) {
    width: 100%;
    iframe {
      height: 260px !important;
      width: 100%;
      border-radius: 8px 8px 0 0;
    }
  }
`;

const SeasonTab = styled.button<{ active: boolean }>`
  align-items: center;
  background: ${(props) =>
    props.active ? 'rgba(1, 1, 1, 1)' : 'rgba(1, 1, 1, 0.6)'};
  border: ${(props) => (props.active ? '3px solid silver' : 'none')};
  border-radius: 8px;
  color: white;
  cursor: pointer;
  display: flex;
  flex: 1 1 auto;
  font-size: 15px;
  height: 40px;
  justify-content: center;
  margin: 5px;
  max-width: 100px;
  padding: 8px;
  transition: border 100ms ease;
  transition: all 200ms ease;
  width: 50px;

  &:hover {
    background: rgba(1, 1, 1, 0.9);
    font-size: 15.3px;
  }

  &:active {
    background: rgba(1, 1, 1, 1);
    font-size: 14px;
  }
`;

const SeasonView = styled.div``;

const EpisodeContainer = styled.div`
  background-color: transparent;
  margin: auto;
`;

const Episode = styled.div``;

const EpisodeTitle = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 8px;
  color: #ffddcc;
  font-size: 16px;
  letter-spacing: 1px;
  margin-top: 2px;
  padding: 10px;
  position: relative;
  text-align: left;
  text-transform: uppercase;
  transition: all 100ms ease-in;
  width: 100%;
  z-index: 0;

  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
    cursor: pointer;
    font-size: 16.1px;
  }
  &:active {
    background-color: rgba(0, 0, 0, 0.55);
  }
  @media (max-width: 724px) {
    flex-direction: column;
    font-size: 12px;
    line-height: 2;
    &:hover {
      font-size: 12px;
    }
  }
  div {
    margin-left: 90%;
    position: absolute;
  }
`;
const EpisodeToggler = styled.button`
  background: transparent;
  border: none;
  color: white;
`;

const GettingSeries = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  img {
    width: 100px;
  }
`;

const fadeIn = keyframes`
from{opacity:0;}
to{opacity:1;}
`;

const EpisodeContent = styled.div`
  width: 100%;
  margin-top: 1px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  color: white;
  font-size: 14px;
  position: relative;
  display: flex;
  z-index: 0;
  animation: ${fadeIn} 200ms linear 1;
  @media (max-width: 724px) {
    font-size: 12px;
  }
`;

const Section = styled.div`
  display: flex;
  transition: all 100ms ease;

  @media (max-width: 724px) {
    display: block;
  }
`;

const Thumbnail = styled.img`
  border-radius: 8px 0 0 8px;
  transition: opacity 100ms linear;
  width: 50.1%;
  @media (max-width: 724px) {
    width: 90vw;
    margin-top: 0;
    border-radius: 8px 8px 0 0;
  }
`;

const EpisodeOverview = styled.div`
  letter-spacing: 1px;
  line-height: 1.5rem;
  margin-top: 30px;
  padding: 15px;
  text-align: justify;
  transition: all 0.2s ease;
  @media (max-width: 724px) {
    padding: 0px 10px;
    margin-top: 5px;
  }
`;

const Aired = styled.h3`
  margin: 0;
  padding: 0;
`;
