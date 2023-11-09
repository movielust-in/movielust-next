import Image from 'next/image';

import { fetchCompanies } from '../../../lib/tmdb/company';
import Scroller from '../../../components/UI/Scroller';
import ProductionImageSlider from '../../../components/Carousels/ProductionImageSlider';
import {
  fetchCompanyMovies,
  fetchCompaniesTopMovies,
} from '../../../lib/tmdb/movie';

const getProductionCompanyData = async (productionId: string) => {
  const { results: company } = await fetchCompaniesTopMovies(productionId);
  const companyMovies = await fetchCompanyMovies(productionId);
  const production = await fetchCompanies(productionId);

  return {
    company,
    companyMovies,
    production,
  };
};

export default async function Production({
  params: { productionId },
}: {
  params: { productionId: string };
}) {
  const { company, companyMovies, production } = await getProductionCompanyData(
    productionId
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
      }}
    >
      {company?.length ? <ProductionImageSlider data={company} /> : null}

      {production && (
        <div>
          <Image
            width={200}
            unoptimized
            height={70}
            src={`https://image.tmdb.org/t/p/w300/${production.logo_path}`}
            alt="Logo"
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        </div>
      )}

      <Scroller
        movies={companyMovies.results}
        total={{
          pages: companyMovies.total_pages,
          results: companyMovies.total_results,
        }}
        type="movie"
      />
    </div>
  );
}
