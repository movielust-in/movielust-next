import React from "react";
import { useSetUser } from "../hooks";
import Footer from "./UI/Footer";
import FooterTabs from "./UI/FooterTabs";
import Header from "./UI/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  useSetUser();

  return (
    <>
      <Header isOnline />
      <main className="layout__main">{children}</main>
      <Footer />
      <FooterTabs />
    </>
  );
}
