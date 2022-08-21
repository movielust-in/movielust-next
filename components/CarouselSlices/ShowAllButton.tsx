import Link from "next/link";

import styles from "../components.module.scss";

interface ShowAllButtonProps {
  link: string;
  label: string;
}

function ShowAllButton({ link, label }: ShowAllButtonProps) {
  return (
    <Link href={link}>
      <a className={styles.show_all_button}>{label}</a>
    </Link>
  );
}

export default ShowAllButton;
