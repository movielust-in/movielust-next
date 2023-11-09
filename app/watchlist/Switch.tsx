import Link from 'next/link';

import styles from './watchlist.module.scss';

interface Props {
  view: 'movie' | 'tv';
  label: string;
  active: boolean;
}

const Switch = ({ view, label, active }: Props) => (
  <Link
    className={`${styles.Switch} ${active && styles.Switch_active}`}
    type="button"
    href={`/watchlist?view=${view}`}
  >
    {label}
  </Link>
);

export default Switch;
