import Link from "next/link";

import styles from "../components.module.scss";

interface ShowAllButtonProps {
  link: string;
  label: string;
}

function ShowAllButton({ link, label }: ShowAllButtonProps) {
  return (
    <Link href={link} className={styles.show_all_button}>
      <a>{label}</a>
    </Link>
  );
}

export default ShowAllButton;
