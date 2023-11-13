import Link from 'next/link';

import styles from '../../styles/footer.module.scss';
import { Bariol } from '../../fonts/Bariol';

async function Footer() {
  return (
    <div className={`${styles.Container} ${Bariol.className}`}>
      <Link prefetch={false} href="/">
        <div className={styles.TitleBar}>
          <h1 className={styles.Title}> Movielust </h1>
        </div>
      </Link>
      <div className={styles.Footernotice}>
        <Link prefetch={false} href="/aboutus">
          About us
        </Link>
        <Link prefetch={false} href="/disclaimer">
          Disclaimer
        </Link>
        <Link prefetch={false} href="/contactus">
          Contact us
        </Link>
      </div>
      <div className={styles.MDBContainer}>
        &copy; {new Date().getFullYear()} Copyright : The DBA Pvt.{' '}
      </div>
      <div className={styles.MDBContainer}>All rights reserved</div>
    </div>
  );
}
export default Footer;
