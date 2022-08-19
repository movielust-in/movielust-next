import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "../redux";

import { fetchCompanies } from "../api/tmdb/company";
import { fetchCompanyMovies, CompaniesTopImages } from "../api/tmdb/movies";

// import { Loading, Scroller } from '../components';

import Loading from "../components/UI/Loading";
import Scroller from "../components/UI/Scroller";

import { setCurrentPage } from "../redux/reducers/nav.reducer";
import ProductionImageSlider from "../components/Carousels/ProductionImageSlider";
import {
  setProductionMovies,
  setProductionTotal,
  resetMovies,
} from "../redux/reducers/movie.reducer";
import { ProductionCompany } from "../types/tmdb";
import { useRouter } from "next/router";

export function Production() {
  const [isLoading, setIsLoading] = useState(true);
  const [production, setProduction] = useState<ProductionCompany>();
  const [company, setcompany] = useState<any>([]);

  const router = useRouter();

  const id = router.query["id"] as string;

  const dispatch = useDispatch();
  const total = useSelector((state) => state.movie.production.total);
  const storeMovies = useSelector((state) => state.movie.production.movies);

  useEffect(() => {
    dispatch(setCurrentPage("production"));
    document.title = "Production - Movielust";
  }, [dispatch]);

  const reset = () => dispatch(resetMovies());

  useEffect(() => {
    reset();
    setIsLoading(true);
    CompaniesTopImages(id!).then((data) => {
      setcompany(data);
    });

    const fetchMovies = () => {
      fetchCompanyMovies(id!).then((movies) => {
        dispatch(setProductionMovies(movies.results));
        dispatch(
          setProductionTotal({
            results: movies.total_results,
            pages: movies.total_pages,
          })
        );
      });
    };

    fetchMovies();

    fetchCompanies(id!).then((data) => {
      setProduction(data);
    });
    setIsLoading(false);
    // eslint-disable-next-line
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <Container>
      {company.length ? <ProductionImageSlider data={company} /> : null}

      {production && (
        <Title>
          <img
            src={`https://image.tmdb.org/t/p/w300/${production.logo_path}`}
            alt="Logo"
          />
        </Title>
      )}

      <Scroller movies={storeMovies} total={total} type="movie" />
    </Container>
  );
}
export default Production;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow-x: hidden;
  padding: 0 1px;
  text-align: center;
  @media (max-width: 724px) {
    padding: 0 10px;
    margin-top: 0;
  }
`;

const Title = styled.div`
  margin: 20px 0 20px 0;
  img {
    width: 20%;
  }
  @media (max-width: 724px) {
    img {
      width: 20%;
      max-height: 100px;
    }
  }
`;
