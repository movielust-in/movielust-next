'use client';

import { useState } from 'react';

import styles from './Biography.module.scss';

const Biography = ({ bio }: { bio?: string }) => {
  const [expanded, setExpanded] = useState(false);

  if (!bio) return null;

  return (
    <div className={styles.Bio}>
      {expanded ? bio : bio!.split(' ', 100).join(' ')}
      {!expanded && (
        <button
          className={styles.ShowFullBio}
          type="button"
          onClick={() => setExpanded(true)}
        >
          . . .read more
        </button>
      )}
    </div>
  );
};

export default Biography;
