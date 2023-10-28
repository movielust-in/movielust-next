import Image from 'next/image';
import { InstagramIcon, TwitterIcon, FaceBookIcon, IMDBIcon } from '../../assets';
import { MovieExternalIdsResponse, TvExternalIdsResponse } from '../../types/tmdb';

import styles from './Social.module.scss';

interface SocialProps {
  externalIds: MovieExternalIdsResponse | TvExternalIdsResponse;
  type: string;
  name?: string;
  title?: string;
}

function Social({ externalIds, type, name, title }: SocialProps) {
  if (!externalIds) return null;

  const Instagram = `https://www.instagram.com/${externalIds.instagram_id}/`;
  const IMDB = `https://www.imdb.com/${type}/${externalIds.imdb_id}`;
  const Facebook = `https://www.facebook.com/${externalIds.facebook_id}`;
  const Twitter = `https://twitter.com/${externalIds.twitter_id}`;

  const Wikipedia = `https://en.wikipedia.org/wiki/${(title! || name!).replace(
    ' ',
    '_'
  )}`;

  return (
    <div className={styles.Socials}>
      {externalIds.instagram_id && (
        <div className={styles.SocialIcon}>
          <a href={Instagram} target="_blank" rel="noreferrer">
            <InstagramIcon width="25px" height="25px" />
          </a>
        </div>
      )}
      {externalIds.twitter_id && (
        <div className={styles.SocialIcon}>
          {' '}
          <a href={Twitter} target="_blank" rel="noreferrer">
            <TwitterIcon width="25px" height="25px" />
          </a>
        </div>
      )}
      {externalIds.facebook_id && (
        <div className={styles.SocialIcon}>
          <a href={Facebook} target="_blank" rel="noreferrer">
            <FaceBookIcon width="25px" height="25px" />
          </a>
        </div>
      )}
      {externalIds.imdb_id && (
        <div className={styles.SocialIcon}>
          <a href={IMDB} target="_blank" rel="noreferrer">
            <IMDBIcon width="25px" height="25px" />
          </a>
        </div>
      )}

      <div className={styles.WikiIcon}>
        <a href={Wikipedia} target="_blank" rel="noreferrer">
          <Image
            alt=""
            src="/images/svgs/wikipedia-logo.svg"
            width={25}
            height={25}
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        </a>
      </div>
    </div>
  );
}

export default Social;
