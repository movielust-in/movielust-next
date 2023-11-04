import { ReactNode, useEffect, useRef } from 'react';
import { Id, toast } from 'react-toastify';

import { useSetUser } from '../hooks';
import BeforeInstallPromptEvent from '../types/beforeInstallPrompt';

import FooterTabs from './UI/FooterTabs';
import Header from './UI/Header';
import Footer from './UI/Footer';
import ScrollTop from './UI/ScrollTop';
import InstallPrompt from './UI/InstallPrompt';

export default function Layout({ children }: { children: ReactNode }) {
  useSetUser();

  const toastId = useRef<Id>('');

  const beforeInstallPromptHandler = useRef<
    (e: BeforeInstallPromptEvent) => void
  >((e: BeforeInstallPromptEvent) => {
    e.preventDefault();

    toastId.current = toast(
      <InstallPrompt
        beforeInstallPrompt={e}
        toastId={toastId}
        listnerRef={beforeInstallPromptHandler}
      />,
      {
        position: 'bottom-right',
        hideProgressBar: true,
        closeOnClick: false,
        autoClose: 10000,

        bodyClassName: 'install_pwa',
        closeButton: false,
        // icon: '🚀',
      }
    );
  });

  useEffect(() => {
    window.addEventListener(
      'beforeinstallprompt',
      beforeInstallPromptHandler.current as any
    );
  }, []);

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
