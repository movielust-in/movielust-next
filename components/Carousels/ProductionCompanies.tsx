import styled from "@emotion/styled";
// import {useRef} from 'react';

import { SwiperSlide } from "swiper/react";
import { useRouter as useNavigate } from "next/router";
// import ColorThief from 'colorthief';

import { Title } from "../../styles/Carousel-Styled";

import Carousel from "./Carousel";
import ProductionWrap from "../CarouselSlices/ProductionWrap";

interface ProductionCompaniesPros {
  data: any[];
  title: string;
  dom: any;
}

// const backgroundRef = useRef<HTMLImageElement>();

function ProductionCompanies({ data, title, dom }: ProductionCompaniesPros) {
  const navigate = useNavigate();
  return (
    <Container dom={dom}>
      {title &&
      data.filter((detail) => detail.logo_path !== null).length > 0 ? (
        <Title>
          <h2>{title}</h2>
        </Title>
      ) : null}
      <Carousel carosel_id="movie_slider">
        {data &&
          data.map((detail) =>
            detail.logo_path !== null ? (
              <SwiperSlide
                key={detail.id}
                onClick={() => {
                  navigate.push(`/production/${detail.id}`);
                }}
              >
                <ProductionWrap
                  src={`https://image.tmdb.org/t/p/original/${detail.logo_path}`}
                  alt={detail.name}
                />

                {detail.name && <Detail>{detail.name}</Detail>}
              </SwiperSlide>
            ) : (
              <SwiperSlide
                key={detail.id}
                onClick={() => {
                  navigate.push(`/production/${detail.id}`);
                }}
              >
                <ProductionWrap
                  src="https://media.istockphoto.com/vectors/print-vector-id1207316492?k=20&m=1207316492&s=612x612&w=0&h=vIiNQ2cvtKY2XlHPt2GoqoXAQDHyvug-EsUsCJ4L6Fg="
                  alt={detail.name}
                />

                {detail.name && <Detail>{detail.name}</Detail>}
              </SwiperSlide>
            )
          )}
      </Carousel>
    </Container>
  );
}

export default ProductionCompanies;

const Container = styled.div<{ dom: any }>`
  border-radius: 15px;
  box-shadow: 5px 3px 30px black;
  margin: 10px 0;
  overflow: hidden;
  padding: 10px;
  position: relative;
  @media (min-width: 724px) {
    background-color: ${({ dom }) =>
      dom.length > 0 ? `rgba(${dom[0]}, ${dom[1]}, ${dom[2]}, 0.2)` : ""};
  }
`;

const Detail = styled.div`
  font-size: 20px;
  margin-top: 6px;
  text-align: center;

  div {
    color: #a6a6a6;
    text-align: center;
  }
  @media (max-width: 724px) {
    font-size: 15px;
    div {
      font-size: 11px;
    }
  }
  &:hover {
    transform: scale(1.1);
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 3000ms;
  }
`;
