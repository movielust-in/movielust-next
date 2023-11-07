import { FaPlay, FaStop } from 'react-icons/fa';

import { DetailResponse } from '../../../../../types/tmdb';
import styles from '../Detail.module.scss';
import Spinner from '../../../../../components/UI/Spinner';

interface Props {
  iframeLoading: boolean;
  togglePlayer: any;
  showMovie: boolean;
  contentData: DetailResponse;
  pathname: string;
}

const playButtonMsg = (isMovieShown: boolean) =>
  isMovieShown ? 'Play Trailer' : 'Play Movie';

const PlayButton = ({
  iframeLoading,
  togglePlayer,
  showMovie,
  contentData,
  pathname,
}: Props) => {
  if (!contentData.release_date) return null;

  // don't show play button if release date is in future;
  if (new Date(contentData.release_date) > new Date()) return null;

  return (
    <span
      role="presentation"
      style={{
        width: iframeLoading ? '80px' : '120px',
      }}
      className={styles.PlayMovie}
      onClick={() =>
        togglePlayer(contentData.title || contentData.name!, pathname as string)
      } // !!!
    >
      {!showMovie ? <FaPlay /> : <FaStop />}
      {!iframeLoading ? (
        playButtonMsg(showMovie)
      ) : (
        <Spinner width={20} height={20} />
      )}
    </span>
  );
};

export default PlayButton;
