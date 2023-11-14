import React from 'react';
import { Metadata } from 'next';
import { Bounce, ToastContainer } from 'react-toastify';

import Footer from '../components/UI/Footer';
import Header from '../components/UI/Header';
import ScrollTop from '../components/UI/ScrollTop';
import AuthContext from '../context/AuthContext';
import FooterTabs from '../components/UI/FooterTabs';
import 'swiper/css';
import 'swiper/css/navigation';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/global.scss';
import { Bariol } from '../fonts/Bariol';

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body>
      <AuthContext>
        <Header />
        <main className={`layout__main ${Bariol.className}`}>{children}</main>
        <Footer />
        <FooterTabs />
        <ScrollTop />
        <ToastContainer
          autoClose={2000}
          draggable
          position="top-center"
          bodyClassName="toastBody_asas"
          transition={Bounce}
          className="toast_container_asas"
          toastClassName="toast_asas"
          closeButton
          limit={2}
          theme="dark"
        />
      </AuthContext>
    </body>
  </html>
);

export default RootLayout;

export const metadata: Metadata = {
  title: {
    template: '%s | Movielust',
    default: 'Movielust',
  },
  description: 'Discover and found about Movies and Shows.',
  applicationName: 'Movielust',
  authors: [
    { name: 'Anurag Parmar', url: 'https://github.com/meAnurag' },
    { name: 'Nitin Mishra', url: 'https://github.com/nitin2806' },
  ],
  generator: 'Next.js',
  keywords: ['movielust', 'movies', 'shows', 'tv', 'anime', 'tmdb'],
  alternates: { canonical: 'https://movie-lust.vercel.app' },
  manifest: '/manifest.json',

  other: {
    'msapplication-TileColor': '#081c34',
    'msapplication-TileImage': '/favicons/ms-icon-144x144.png',
    'theme-color': '#081c34',
    'mobile-web-app-capable': 'yes',
    'application-name': 'Movielust',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Movielust',
    'msapplication-config': '/browserconfig.xml',
  },
  verification: {
    google: 'fqeOQHhSUNkPPyKlmSHfOv0oBK7Ypp51JBujJLKN9M8',
    yandex: '9760716a8ebb3bda',
  },
  openGraph: {
    title: 'Movielust',
    description: 'Discover and found about Movies and Shows.',
    siteName: 'Movielust',
    url: 'https://movie-lust.vercel.app/',
    type: 'website',
    images: [
      {
        url: 'https://movie-lust.vercel.app/favicons/android-icon-192x192',
        height: 192,
        width: 192,
      },
      {
        url: 'https://movie-lust.vercel.app/favicons/apple-icon-180x180',
        height: 180,
        width: 180,
      },
      {
        url: 'https://movie-lust.vercel.app/favicons/ms-icon-310x310',
        height: 310,
        width: 310,
      },
      {
        url: 'https://movie-lust.vercel.app/maskables/512.png',
        height: 512,
        width: 512,
      },
    ],
  },
  icons: [
    {
      rel: 'apple-touch-icon',
      sizes: '57x57',
      url: '/favicons/apple-icon-57x57.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '60x60',
      url: '/favicons/apple-icon-60x60.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '72x72',
      url: '/favicons/apple-icon-72x72.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '76x76',
      url: '/favicons/apple-icon-76x76.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '114x114',
      url: '/favicons/apple-icon-114x114.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '120x120',
      url: '/favicons/apple-icon-120x120.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '144x144',
      url: '/favicons/apple-icon-144x144.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '152x152',
      url: '/favicons/apple-icon-152x152.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/favicons/apple-icon-180x180.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '192x192',
      url: '/favicons/android-icon-192x192.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicons/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '96x96',
      url: '/favicons/favicon-96x96.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicons/favicon-16x16.png',
    },
  ],
};
