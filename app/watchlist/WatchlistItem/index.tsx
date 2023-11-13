'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { detailLink } from '../../../utils';
import { removeFromWatchlist } from '../../../lib/api/user/watchlist';

import styles from './contentItem.module.scss';

interface WatchlistItemProps {
  id: number;
  title: string;
  overview: string;
  posterPath: string;
  type: string;
}

function WatchlistItem({
  id,
  title,
  overview,
  type,
  posterPath,
}: WatchlistItemProps) {
  const { refresh } = useRouter();

  const remove = async (_id: number, _type: string) => {
    try {
      await removeFromWatchlist(_id, _type as 'movie' | 'tv');

      refresh();
    } catch (err) {
      // console.log('hm...', err);
    }
  };
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
          {overview ? `${overview?.split(' ').splice(0, 25).join(' ')} ..` : ''}
        </p>
        <Link
          prefetch={false}
          href={detailLink(type, id, title)}
          className={styles.ViewButton}
        >
          View
        </Link>
      </div>
    </li>
  );
}

export default WatchlistItem;
