import Link from 'next/link';

import styles from '../components.module.scss';

interface ShowAllButtonProps {
  link: string;
  label: string;
}

function ShowAllButton({ link, label }: ShowAllButtonProps) {
  return (
    <Link prefetch={false} href={link} className={styles.show_all_button}>
      {label}
    </Link>
  );
}

export default ShowAllButton;
