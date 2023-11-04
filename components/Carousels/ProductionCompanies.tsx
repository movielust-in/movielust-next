'use client';

// import { useRouter } from 'next/navigation';
import { SwiperSlide } from 'swiper/react';

import ProductionWrap from '../CarouselSlices/ProductionWrap';
import styles from '../../styles/carousel.module.scss';
import prodCompaniesStyles from '../../styles/production_companies.module.scss';

import Carousel from './Carousel';

interface ProductionCompaniesPros {
  data: any[];
  title: string;
}

function ProductionCompanies({ data, title }: ProductionCompaniesPros) {
  // const router = useRouter();

  return (
    <div className={prodCompaniesStyles.Container}>
      {title &&
      data.filter((detail) => detail.logo_path !== null).length > 0 ? (
        <div className={styles.Title}>
          <h2>{title}</h2>
        </div>
      ) : null}
      <Carousel carosel_id="movie_slider">
        {data &&
          data.map((detail) => (
            <SwiperSlide
              key={detail.id}
              // onClick={() => router.push(`/production/${detail.id}  `)}
            >
              <ProductionWrap
                src={
                  detail.logo_path
                    ? `https://image.tmdb.org/t/p/original/${detail.logo_path}`
                    : 'https://ik.imagekit.io/movielust/cinema_RTLQPVDM8.jpg'
                }
                alt={detail.name}
              />

              {detail.name && (
                <div className={prodCompaniesStyles.Detail}>{detail.name}</div>
              )}
            </SwiperSlide>
          ))}
      </Carousel>
    </div>
  );
}

export default ProductionCompanies;
