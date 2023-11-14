/* eslint-disable @next/next/no-img-element */
import { FaStar } from 'react-icons/fa';
import Image from 'next/image';

import styles from '../Detail.module.scss';
import {
  DetailResponse,
  MovieExternalIdsResponse,
} from '../../../../../types/tmdb';
import { ImdbRating } from '../../../../../types/api-responses';
import IMDBLogo from '../../../../../assets/images/imdb_logo_small.webp';

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
          <Image src={IMDBLogo} alt="Imdb ratings logo" />{' '}
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
          alt="TMDB ratings logo"
        />
      </span>
    </div>
  );
};

export default Ratings;
