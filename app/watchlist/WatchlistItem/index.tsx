'use client';

import Link from 'next/link';
import Image from 'next/image';

import { detailLink } from '../../../utils';

import styles from './contentItem.module.scss';

interface WatchlistItemProps {
  id: number;
  title: string;
  overview: string;
  posterPath: string;
  type: string;
}

const remove = async (id: number, type: string) => {
  try {
    await fetch(`/api/user/watchlist?content_id=${id}&type=${type}`, {
      method: 'DELETE',
    });
  } catch (err) {
    // console.log('hm...', err);
  }
};

function WatchlistItem({
  id,
  title,
  overview,
  type,
  posterPath,
}: WatchlistItemProps) {
  return (
    <li className={styles.Item}>
      <Image
        className={styles.Thumbnail}
        width={100}
        height={150}
        key={id}
        src={`https://image.tmdb.org/t/p/w154/${posterPath}`}
        alt={title}
        unoptimized
        style={{
          maxWidth: '100%',
          height: 'auto',
        }}
      />
      <div className={styles.Detail}>
        <div className={styles.Titlebar}>
          <div className={styles.Title}>{title} </div>
          <div
            className={styles.Plus}
            role="presentation"
            onClick={() => remove(id!, type)}
          >
            +
          </div>
        </div>
        <p className={styles.Overview}>
          {' '}
          {overview === ''
            ? ''
            : `${overview!.split(' ').splice(0, 25).join(' ')} ..`}
        </p>
        <Link href={detailLink(type, id, title)} className={styles.ViewButton}>
          View
        </Link>
      </div>
    </li>
  );
}

export default WatchlistItem;