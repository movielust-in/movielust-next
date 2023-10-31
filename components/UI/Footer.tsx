import Link from 'next/link';

import styles from '../../styles/footer.module.scss';

async function Footer() {
  return (
    <div className={styles.Container}>
      <Link href="/">
        <div className={styles.TitleBar}>
          <h1 className={styles.Title}> Movielust </h1>
        </div>
      </Link>
      <div className={styles.Footernotice}>
        <Link href="/aboutus">About us</Link>
        <Link href="/disclaimer">Disclaimer</Link>
        <Link href="/contactus">Contact us</Link>
      </div>
      <div className={styles.MDBContainer}>
        &copy; {new Date().getFullYear()} Copyright : The DBA Pvt.{' '}
      </div>
      <div className={styles.MDBContainer}>All rights reserved</div>
    </div>
  );
}
export default Footer;
