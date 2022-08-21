import Link from "next/link";

import styles from "../../styles/footer.module.scss";

function Footer() {
  return (
    <div className={styles.Container}>
      <Link href="/">
        <a>
          <div className={styles.TitleBar}>
            <h1 className={styles.Title}> Movielust </h1>
          </div>
        </a>
      </Link>
      <div className={styles.Footernotice}>
        <Link href="/aboutus">
          <a>About us</a>
        </Link>
        <Link href="/disclaimer">
          <a>Disclaimer</a>
        </Link>
        <Link href="/contactus">
          <a>Contact us</a>
        </Link>
      </div>
      <div className={styles.MDBContainer}>
        &copy; {new Date().getFullYear()} Copyright : The DBA Pvt.{" "}
      </div>
      <div className={styles.MDBContainer}>All rights reserved</div>
    </div>
  );
}
export default Footer;
