import { useEffect } from "react";
import styled from "@emotion/styled";
import Helmet from "next/head";

import { useDispatch } from "../redux";

import TrendingCarousel from "../components/Carousels/HomeCarousel";
import Footer from "../components/UI/Footer";
import Movies from "../components/Movies/HomeMovies";

import { setCurrentPage } from "../redux/reducers/nav.reducer";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Home - Movielust | Latest Movies and TV Shows";
    dispatch(setCurrentPage("home"));
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Home - Movielust</title>
      </Helmet>
      <Container>
        <TrendingCarousel />
        <Movies />
      </Container>
    </>
  );
}

export default Home;

const Container = styled.div`
  position: relative;
  min-height: calc(100vh - 65px);
  margin-bottom: 20px;
  overflow-x: hidden;
  overflow-y: hidden;
  @media (max-width: 724px) {
    padding: 10px calc(3.5vw + 5px);
  }
`;
