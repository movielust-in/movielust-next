'use client';

import {
  useState,
  useEffect,
  BaseSyntheticEvent,
  memo,
  useCallback,
} from 'react';
import { useSearchParams } from 'next/navigation';

import Spinner from '../../../../../components/UI/Spinner';
import { fetchSeason } from '../../../../../lib/tmdb/tv';
import { TWO_EMBED } from '../../../../../config';
import { TvSeasonResponse } from '../../../../../types/tmdb';
import { addToRecents } from '../../../../../lib/api/user/recents';

import styles from './seasons.module.scss';

export interface SeasonsProps {
  id: string;
  title: string;
  totalSeasons: number;
}

function Seasons({ id, title, totalSeasons }: SeasonsProps) {
  const [show, setShow] = useState(true);
  const [season, setSeason] = useState(0);
  const [seasons, setSeasons] = useState<
    Record<string | number, TvSeasonResponse | boolean>
  >({
    empty: true,
  });
  const [showEpisode, setEpisode] = useState<number | undefined>(1);
  const [gettingEpisodes, setGettingEpisodes] = useState(false);

  const searchParams = useSearchParams();
  const s = searchParams?.get('s') || '1';
  const e = searchParams?.get('e') || '1';

  useEffect(() => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeEpisode = (episodeNum: any) => {
    const newUrl = `/tv/${id}/${title
      .split(' ')
      .join('-')
      .toLowerCase()}?s=${season}&e=${episodeNum}`;
    window.history.replaceState(
      { ...window.history.state, as: newUrl, url: newUrl },
      '',
      newUrl
    );

    if (showEpisode === episodeNum) return;

    setEpisode(episodeNum);
  };

  useEffect(() => {
    if (id && season && showEpisode && title)
      addToRecents({
        name: title,
        content_id: id,
        type: 'tv',
        season,
        episode: showEpisode,
      });
  }, [id, season, showEpisode, title]);

  const fetchNewSeason = useCallback(
    async (newSeasonNumber = season) => {
      if (newSeasonNumber === 0 || newSeasonNumber in seasons) return;
      try {
        setGettingEpisodes(true);
        const data = await fetchSeason(id, newSeasonNumber);

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
        }
      } catch (err) {
        // setGettingTorrents(false);
      }
    },
    [e, id, season, seasons]
  );

  useEffect(() => {
    fetchNewSeason();
  }, [fetchNewSeason]);

  const changeSeason = async (episodeChangeEvent: BaseSyntheticEvent) => {
    const seasonNumber = parseInt(episodeChangeEvent.target.value, 10);
    setSeason(seasonNumber + 1);
    await fetchNewSeason(seasonNumber + 1);
    const newUrl = `/tv/${id}/${title.split(' ').join('-').toLowerCase()}?s=${
      seasonNumber + 1
    }&e=0`;

    window.history.replaceState(
      {
        ...window.history.state,
        as: newUrl,
        url: newUrl,
      },
      '',
      newUrl
    );

    if (seasonNumber === -1) {
      setShow(false);
    } else if (!show) setShow(true);
  };

  if (seasons.empty) return null;

  return (
    <div className={styles.Container}>
      <div className={styles.iframe_container}>
        <iframe
          width="640px"
          allowFullScreen
          // onLoad={iframeLoaded}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          title={`Season ${season} Episode ${'episode.episode_number'}`}
          src={`${TWO_EMBED}/embedtv/${id}&s=${season}&e=${showEpisode}`}
        />
      </div>
      <div className={styles.SeasonView}>
        <select
          className={styles.SelectSeason}
          onChange={changeSeason}
          value={season - 1}
        >
          {Array.from(Array(totalSeasons).keys()).map((seasonNumber) => (
            <option
              className={styles.SeasonTab}
              key={seasonNumber}
              value={seasonNumber}
            >
              Season {seasonNumber + 1}
            </option>
          ))}
        </select>
        <div className={styles.episode_section}>
          {gettingEpisodes && <Spinner height={40} width={40} />}
          {show &&
            season in seasons &&
            (seasons[season] as TvSeasonResponse).episodes!.map((episode) => (
              <div
                className={`${styles.Episode} ${
                  showEpisode === episode.episode_number
                    ? styles.Episode_active
                    : ''
                }`}
                key={episode.id}
                role="presentation"
                onClick={() => changeEpisode(episode.episode_number)}
              >
                {episode.episode_number}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default memo(Seasons);

// const fadeIn = keyframes`
// from{opacity:0;}
// to{opacity:1;}
// `;

// const EpisodeContent = styled.div`
//   margin-top: 1px;
//   background-color: rgba(0, 0, 0, 0.5);
//   border-radius: 8px;
//   color: white;
//   font-size: 14px;
//   position: relative;
//   display: flex;
//   z-index: 0;
//   animation: ${fadeIn} 200ms linear 1;
//   @media (max-width: 724px) {
//     font-size: 12px;
//   }
//   `;
//   const Header = styled.div`
//     p {
//       font-size: 30px;
//       font-weight: 650;
//       letter-spacing: 1px;
//       margin: 10px 0 5px 0;
//     }
//     @media (max-width: 724px) {
//       p {
//         font-size: 18px;
//       }
//     }
//   `;

//   const ContentOptions = styled.div`
//     display: flex;
//     flex-direction: column;
//     gap: 3px;
//     width: max-content;
//   `;
// const EpisodeDescription = styled.div`
//   @media (max-width: 724px) {
//     width: 85vw;
//     padding: 0;
//     margin: 0;
//   }
// `;

// const PlayMovie = styled.span<{ loading: boolean }>`
//   background-color: rgba(200, 200, 200, 0.4);
//   border: 2px solid rgba(255, 255, 255, 0.1);
//   border-radius: 5px;
//   color: white;
//   cursor: pointer;
//   margin-right: 10px;
//   padding: 5px 8px;
//   transition: all 200ms ease;
//   white-space: nowrap;
//   width: ${(props) => (props.loading ? '75px' : '40px')};
//   img {
//     vertical-align: middle;
//     width: 30px;
//   }
//   svg {
//     font-size: 20px;
//     vertical-align: middle;
//   }
//   @media (max-width: 724px) {
//     /* margin: 0 0 10px 0; */
//   }
// `;
// const EpisodeToggler = styled.button`
//   background: transparent;
//   border: none;
//   color: white;
// `;

// const GettingSeries = styled.div`
//   align-items: center;
//   display: flex;
//   justify-content: center;
//   img {
//     width: 100px;
//   }
// `;

// const Section = styled.div`
//   display: flex;
//   transition: all 100ms ease;

//   @media (max-width: 724px) {
//     display: block;
//   }
// `;

// const Thumbnail = styled.img`
//   border-radius: 8px 0 0 8px;
//   transition: opacity 100ms linear;
//   width: 50.1%;
//   @media (max-width: 724px) {
//     width: 90vw;
//     margin-top: 0;
//     border-radius: 8px 8px 0 0;
//   }
// `;

// const EpisodeOverview = styled.div`
//   letter-spacing: 1px;
//   line-height: 1.5rem;
//   margin-top: 30px;
//   padding: 15px;
//   text-align: justify;
//   transition: all 0.2s ease;
//   @media (max-width: 724px) {
//     padding: 0px 10px;
//     margin-top: 5px;
//   }
// `;

// const Aired = styled.h3`
//   margin: 0;
//   padding: 0;
// `;

/* {showEpisode === episode.episode_number && (
                    <EpisodeContent ref={episodeRef as any}>
                      <Section>
                        <EpisodeOverview>
                          <EpisodeDescription>
                            {episode.overview}
                          </EpisodeDescription>
                          {episode.air_date && (
                            <Aired>{getAirDateString(episode.air_date)}</Aired>
                          )}

                          {showEpisode === episode.episode_number && (
                            <ContentOptions>
                              {new Date() >
                              new Date(episode.air_date as string) ? (
                                // Button for 2embed
                                <PlayMovie
                                  role="presentation"
                                  onClick={() => playEmbed()}
                                  loading={iframeLoading && playEpisode}
                                >
                                  {!playEpisode ? <FaPlay /> : <FaStop />}
                                  {iframeLoading && playEpisode ? (
                                    <Spinner width={30} height={30} />
                                  ) : null}
                                </PlayMovie>
                              ) : null}
                            </ContentOptions>
                          )}
                        </EpisodeOverview>
                      </Section>
                    </EpisodeContent>
                  )} */

/* const getAirDateString = (Release: string) => {
  // get air date
  const bDate = new Date(Release);
  const released = `${
    FULL_MONTHS[bDate.getMonth()]
  }, ${bDate.getDate()} ${bDate.getFullYear()}`;
  return (new Date() < bDate ? 'Air date: ' : 'Aired On: ') + released;
}; */

/* const playEmbed = () => {
  tooglePlay((state) => !state);
  setFrameLoading(true);
}; */
