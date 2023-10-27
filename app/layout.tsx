import React from 'react';
import Footer from '../components/UI/Footer';
import Header from '../components/UI/Header';

import 'swiper/css';
import 'swiper/css/navigation';
import '../styles/global.scss';
import '../styles/font.css';
import ScrollTop from '../components/UI/ScrollTop';

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body>
      <Header isOnline />
      <main className="layout__main">{children}</main>
      <Footer />
      <ScrollTop />
    </body>
  </html>
);

export default RootLayout;
