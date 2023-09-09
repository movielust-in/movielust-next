import Head from 'next/head';
import Link from 'next/link';
import NextErrorComponent from 'next/error';
import { BackgroundImage } from '../components/UI';

import styles from '../styles/error.module.scss';

const CustomErrorComponent = ({ status }: { status: number }) => (
  <div className={styles.container}>
    <Head>
      <title>{status} | Error - Movielust</title>
    </Head>
    <BackgroundImage src="/images/crash.webp" />
    <Link href="/" replace>
      <a className={styles.homeButton}>Go Home</a>
    </Link>
    <p className={styles.message}>
      {status} &nbsp;|&nbsp; An error has occured.
    </p>
  </div>
);

CustomErrorComponent.getInitialProps = async (contextData: any) =>
  NextErrorComponent.getInitialProps(contextData);

export default CustomErrorComponent;
