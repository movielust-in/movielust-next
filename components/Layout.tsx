import { ReactNode } from 'react';
import { useSetUser } from '../hooks';
import FooterTabs from './UI/FooterTabs';
import Header from './UI/Header';
import Footer from './UI/Footer';
import ScrollTop from './UI/ScrollTop';

export default function Layout({ children }: { children: ReactNode }) {
  useSetUser();

  return (
    <>
      <Header isOnline />
      <main className="layout__main">{children}</main>
      <Footer />
      <FooterTabs />
      <ScrollTop />
    </>
  );
}
