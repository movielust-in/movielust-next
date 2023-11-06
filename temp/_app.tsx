// /* eslint-disable react/jsx-props-no-spreading */
// import { useEffect, useRef, useState } from 'react';
// import { ToastContainer } from 'react-toastify';
// import Router from 'next/router';
// import type { AppProps } from 'next/app';
// import { Provider } from 'react-redux';

// import { useWrappedStore } from '../redux/store';
// import Layout from '../components/Layout';
// import Loading from '../components/UI/Loading';

// // eslint-disable-next-line import/no-unresolved
// import 'swiper/css';
// // eslint-disable-next-line import/no-unresolved
// import 'swiper/css/navigation';
// import '../styles/global.scss';
// import '../styles/font.css';
// import 'react-toastify/dist/ReactToastify.css';

// function MyApp({ Component, ...rest }: AppProps) {
//   const [loading, setLoading] = useState(false);

//   const { store, props } = useWrappedStore(rest);

//   const currentLink = useRef('');

//   useEffect(() => {
//     const start = (e: string) => {
//       if (currentLink.current !== e.split('?')[0]) {
//         [currentLink.current] = e.split('?');
//         setLoading(true);
//       }
//     };
//     const end = () => setLoading(false);

//     Router.events.on('routeChangeStart', start);
//     Router.events.on('routeChangeComplete', end);

//     Router.events.on('routeChangeError', end);
//     Router.events.on('routeChangeError', end);
//     return () => {
//       Router.events.off('routeChangeStart', start);
//       Router.events.off('routeChangeComplete', end);
//       Router.events.off('routeChangeError', end);
//     };
//   }, []);

//   return (
//     <>
//       <Provider store={store}>
//         <Layout>
//           {loading ? <Loading /> : null}
//           <Component {...props.pageProps} />
//         </Layout>
//       </Provider>
//       <ToastContainer
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="dark"
//       />
//     </>
//   );
// }

// export default MyApp;
