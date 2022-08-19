import React from "react";
import Footer from "./UI/Footer";
import Header from "./UI/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header isOnline />
      <main>{children}</main>
      <Footer />
    </>
  );
}
