import { SwiperSlide } from 'swiper/react';
import { useRouter } from 'next/router';

import Carousel from './Carousel';
import ProductionWrap from '../CarouselSlices/ProductionWrap';

import styles from '../../styles/carousel.module.scss';

import prodCompaniesStyles from '../../styles/production_companies.modules.scss';

interface ProductionCompaniesPros {
  data: any[];
  title: string;
  // dom: any;
}

// const backgroundRef = useRef<HTMLImageElement>();

function ProductionCompanies({
  data,
  title,
}: // dom
ProductionCompaniesPros) {
  const router = useRouter();
  return (
    <div
      className={prodCompaniesStyles.Container}
      // dom={dom}
    >
      {title &&
      data.filter((detail) => detail.logo_path !== null).length > 0 ? (
        <div className={styles.Title}>
          <h2>{title}</h2>
        </div>
      ) : null}
      <Carousel carosel_id="movie_slider">
        {data &&
          data.map((detail) =>
            detail.logo_path !== null ? (
              <SwiperSlide
                key={detail.id}
                onClick={() => {
                  router.push(`/production/${detail.id}`);
                }}
              >
                <ProductionWrap
                  src={`https://image.tmdb.org/t/p/original/${detail.logo_path}`}
                  alt={detail.name}
                />

                {detail.name && (
                  <div className={prodCompaniesStyles.Detail}>
                    {detail.name}
                  </div>
                )}
              </SwiperSlide>
            ) : (
              <SwiperSlide
                key={detail.id}
                onClick={() => {
                  router.push(`/production/${detail.id}`);
                }}
              >
                <ProductionWrap
                  src="https://media.istockphoto.com/vectors/print-vector-id1207316492?k=20&m=1207316492&s=612x612&w=0&h=vIiNQ2cvtKY2XlHPt2GoqoXAQDHyvug-EsUsCJ4L6Fg="
                  alt={detail.name}
                />

                {detail.name && (
                  <div className={prodCompaniesStyles.Detail}>
                    {detail.name}
                  </div>
                )}
              </SwiperSlide>
            )
          )}
      </Carousel>
    </div>
  );
}

export default ProductionCompanies;
