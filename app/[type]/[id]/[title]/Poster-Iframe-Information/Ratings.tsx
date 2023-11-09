/* eslint-disable @next/next/no-img-element */
import { FaStar } from 'react-icons/fa';

import styles from '../Detail.module.scss';
import {
  DetailResponse,
  MovieExternalIdsResponse,
} from '../../../../../types/tmdb';
import { ImdbRating } from '../../../../../types/api-responses';

interface Props {
  IMDBRating?: ImdbRating;
  contentData: DetailResponse;
  externalIds?: MovieExternalIdsResponse;
  type: string;
}

const openImdbRatingCharts = (movieImdbId: string) => {
  const IMDB = `https://www.imdb.com/title/${movieImdbId}/ratings`;
  window.open(IMDB, '_blank');
};

const Ratings = ({ IMDBRating, contentData, externalIds, type }: Props) => {
  if (!IMDBRating && !contentData.vote_average) return null;

  if (type === 'movie' && IMDBRating && IMDBRating.rating > 0)
    return (
      <div className={styles.Rating}>
        <FaStar size="20px" color="rgba(255,255,0,0.8)" />
        <span
          role="presentation"
          className={styles.IMDBRatings}
          onClick={() =>
            externalIds && openImdbRatingCharts(externalIds.imdb_id!)
          }
        >
          {IMDBRating.rating} ({IMDBRating.vote_count.toLocaleString()} votes)
          &nbsp;&nbsp;
          <img
            width="30px"
            src="https://m.media-amazon.com/images/G/01/IMDb/BG_rectangle._CB1509060989_SY230_SX307_AL_.png"
            alt="TMDB"
          />{' '}
        </span>
      </div>
    );

  return (
    <div className={styles.Rating}>
      <FaStar size="20px" color="rgba(255,255,0,0.8)" />

      <span>
        {contentData.vote_average} ({contentData.vote_count?.toLocaleString()}{' '}
        votes)
        {'   '}
        <img
          width="30px"
          src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
          alt="TMDB"
        />
      </span>
    </div>
  );
};

export default Ratings;
