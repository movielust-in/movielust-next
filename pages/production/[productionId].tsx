import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useDispatch, useSelector } from '../../redux';

import { fetchCompanies } from '../../helpers/tmdb/company';
import {
  fetchCompanyMovies,
  CompaniesTopImages,
} from '../../helpers/tmdb/movies';

// import { Loading, Scroller } from '../components';

import Loading from '../../components/UI/Loading';
import Scroller from '../../components/UI/Scroller';

import { setCurrentPage } from '../../redux/reducers/nav.reducer';
import ProductionImageSlider from '../../components/Carousels/ProductionImageSlider';
import {
  setProductionMovies,
  setProductionTotal,
  resetMovies,
} from '../../redux/reducers/movie.reducer';
import { ProductionCompany } from '../../types/tmdb';

export function Production() {
  const [isLoading, setIsLoading] = useState(true);
  const [production, setProduction] = useState<ProductionCompany>();
  const [company, setcompany] = useState<any>([]);

  const router = useRouter();

  const id = router.query.productionId as string;

  const dispatch = useDispatch();
  const total = useSelector((state) => state.movie.production.total);
  const storeMovies = useSelector((state) => state.movie.production.movies);

  useEffect(() => {
    dispatch(setCurrentPage('production'));
    document.title = 'Production - Movielust';
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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
      }}
    >
      {company.length ? <ProductionImageSlider data={company} /> : null}

      {production && (
        <div>
          <Image
            width={200}
            unoptimized
            height={70}
            src={`https://image.tmdb.org/t/p/w300/${production.logo_path}`}
            alt="Logo"
          />
        </div>
      )}

      <Scroller movies={storeMovies} total={total} type="movie" />
    </div>
  );
}
export default Production;
