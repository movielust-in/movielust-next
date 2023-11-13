import { BsFillBookmarkCheckFill } from 'react-icons/bs';
import { PiListPlusFill } from 'react-icons/pi';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';

import styles from '../Detail.module.scss';
import { DetailResponse } from '../../../../../types/tmdb';
import {
  addtoWatchlist,
  checkPresenceInWatchlist,
} from '../../../../../lib/api/user/watchlist';

interface Props {
  contentData: DetailResponse;
  type: string;
}

const WatchlistButton = ({ contentData, type }: Props) => {
  const { status } = useSession();

  const [presentInWatchlist, setPresentInWatchlist] = useState<
    'loading' | 'absent' | 'present'
  >('loading');

  const addToWatchlist = useCallback(async () => {
    const toastId = toast.loading('Adding to watchlist..', {
      autoClose: false,
    });
    try {
      const res = await addtoWatchlist({
        content_id: contentData.id!,
        type,
      } as { content_id: number; type: 'movie' | 'tv' });

      setPresentInWatchlist('present');

      toast.update(toastId, {
        render: res.message,
        type: res.status === 'success' ? 'success' : 'info',
        isLoading: false,
        autoClose: 1500,
      });
    } catch (err) {
      toast.update(toastId, {
        render: err instanceof Error ? err.message! : 'Something went wrong!',
        type: 'error',
        isLoading: false,
        autoClose: 1500,
      });
    }
  }, [contentData.id, type]);

  useEffect(() => {
    if (status !== 'authenticated' || presentInWatchlist !== 'loading') return;
    checkPresenceInWatchlist(contentData.id!, type as 'movie' | 'tv')
      .then((res) =>
        setPresentInWatchlist(res.data.present ? 'present' : 'absent')
      )
      .catch(() => {});
  }, [contentData.id, presentInWatchlist, status, type]);

  if (status !== 'authenticated' || presentInWatchlist === 'loading')
    return null;

  if (presentInWatchlist === 'present')
    return (
      <span className={styles.AddButton}>
        <BsFillBookmarkCheckFill />
        In Watchlist
        <div className={styles.HoverMessage}>Add to Watchlist</div>
      </span>
    );

  return (
    <button type="button" className={styles.AddButton} onClick={addToWatchlist}>
      <PiListPlusFill size={18} />
      Add to Watchlist
      <div className={styles.HoverMessage}>Add to Watchlist</div>
    </button>
  );
};

export default WatchlistButton;
