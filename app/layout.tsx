import React from 'react';

import Footer from '../components/UI/Footer';
import Header from '../components/UI/Header';
import ScrollTop from '../components/UI/ScrollTop';
import AuthContext from '../context/AuthContext';

import 'swiper/css';
import 'swiper/css/navigation';
import '../styles/global.scss';
import '../styles/font.css';

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body>
      <AuthContext>
        <Header isOnline />
        <main className="layout__main">{children}</main>
        <Footer />
        <ScrollTop />
      </AuthContext>
    </body>
  </html>
);

export default RootLayout;
