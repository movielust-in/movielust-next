import Image from 'next/image';

import {
  MovieExternalIdsResponse,
  TvExternalIdsResponse,
} from '../../types/tmdb';

import styles from './Social.module.scss';

interface SocialProps {
  externalIds?: MovieExternalIdsResponse | TvExternalIdsResponse;
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
            <Image
              alt="Instagram"
              src="/images/svgs/instagram.svg"
              width={25}
              height={25}
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
          </a>
        </div>
      )}
      {externalIds.twitter_id && (
        <div className={styles.SocialIcon}>
          {' '}
          <a href={Twitter} target="_blank" rel="noreferrer">
            <Image
              alt="Twitter"
              src="/images/svgs/twitter.svg"
              width={25}
              height={25}
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
          </a>
        </div>
      )}
      {externalIds.facebook_id && (
        <div className={styles.SocialIcon}>
          <a href={Facebook} target="_blank" rel="noreferrer">
            <Image
              alt="Facebook"
              src="/images/svgs/facebook.svg"
              width={25}
              height={25}
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
          </a>
        </div>
      )}
      {externalIds.imdb_id && (
        <div className={styles.SocialIcon}>
          <a href={IMDB} target="_blank" rel="noreferrer">
            <Image
              alt="IMDB"
              src="/images/svgs/imdb.svg"
              width={25}
              height={25}
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
          </a>
        </div>
      )}

      <div className={styles.WikiIcon}>
        <a href={Wikipedia} target="_blank" rel="noreferrer">
          <Image
            alt="WikiPedia"
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
