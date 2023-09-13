/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useRef, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Router from 'next/router';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import store, { wrapper } from '../redux/store';

import Layout from '../components/Layout';
import Loading from '../components/UI/Loading';

// eslint-disable-next-line import/no-unresolved
import 'swiper/css';
// eslint-disable-next-line import/no-unresolved
import 'swiper/css/navigation';
import '../styles/global.scss';
import '../styles/font.css';

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);

  const currentLink = useRef('');

  useEffect(() => {
    const start = (e: string) => {
      if (currentLink.current !== e.split('?')[0]) {
        [currentLink.current] = e.split('?');
        setLoading(true);
      }
    };
    const end = () => setLoading(false);

    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);

    Router.events.on('routeChangeError', end);
    Router.events.on('routeChangeError', end);
    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);

  return (
    <>
      <Provider store={store}>
        <Layout>{loading ? <Loading /> : <Component {...pageProps} />}</Layout>
      </Provider>
      <ToastContainer />
    </>
  );
}

export default wrapper.withRedux(MyApp);
