import { BsFillBookmarkCheckFill } from 'react-icons/bs';
import { MdPlaylistAdd } from 'react-icons/md';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';

import styles from '../Detail.module.scss';
import { DetailResponse } from '../../../../../types/tmdb';

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
      const body = JSON.stringify({
        content_id: contentData.id,
        type,
      });

      const addRes = await fetch('/api/user/watchlist', {
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const res = await addRes.json();

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
    fetch(
      `/api/user/watchlist/check-presence?content_id=${contentData.id}&type=${type}`
    )
      .then((res) => res.json())
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
        {presentInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
        <BsFillBookmarkCheckFill />
        <div className={styles.HoverMessage}>Add to Watchlist</div>
      </span>
    );

  return (
    <button type="button" className={styles.AddButton} onClick={addToWatchlist}>
      Add to Watchlist
      <MdPlaylistAdd />
      <div className={styles.HoverMessage}>Add to Watchlist</div>
    </button>
  );
};

export default WatchlistButton;
