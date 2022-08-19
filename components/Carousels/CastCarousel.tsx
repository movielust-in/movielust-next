import { memo } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useRouter as useNavigate } from "next/router";
import { SwiperSlide } from "swiper/react";

import Carousel from "./Carousel";
import PCard from "../CarouselSlices/PersonCard";
import ShowAllButton from "../CarouselSlices/ShowAllButton";
import { Title } from "../../styles/Carousel-Styled";
import { dashedTitle } from "../../utils";

interface CastCarouselProps {
  cast: any[];
  title: string;
  type?: string;
  id?: string;
  dom: any;
  contentTitle?: string;
}

CastCarousel.defaultProps = {
  id: null,
  type: null,
  contentTitle: "",
};

function CastCarousel({
  cast,
  title,
  type,
  id,
  dom,
  contentTitle,
}: CastCarouselProps) {
  const navigate = useNavigate();
  const casts = cast.slice(0, 20);

  return (
    <BigContainer dom={dom}>
      {type === "tv"
        ? cast.length > 0 && (
            <Title>
              <h2>{title}</h2>
              {id && contentTitle && (
                <ShowAllButton
                  link={`/cast/${type}/${id}/${dashedTitle(contentTitle)}`}
                  label="See all cast"
                />
              )}
            </Title>
          )
        : cast.length > 0 && (
            <Title>
              <h2>{title}</h2>
            </Title>
          )}

      <Carousel carosel_id="cast_slider">
        {casts
          .filter((member) => member.profile_path)
          .map((member) => (
            <SwiperSlide
              id="cast_slider"
              key={member.id}
              onClick={() => {
                navigate.push(`/person/${member.id}`);
              }}
            >
              {type === "tv" ? (
                <PCard
                  src={`https://image.tmdb.org/t/p/w780/${member.profile_path}`}
                  alt={member.name!}
                  title={`${member.name} ${
                    member.roles[0].character
                      ? ` as ${member.roles[0].character}`
                      : ""
                  }`}
                />
              ) : (
                <PCard
                  src={`https://image.tmdb.org/t/p/w780/${member.profile_path}`}
                  alt={member.name}
                  title={`${member.name} ${
                    member.character ? ` as ${member.character}` : ""
                  }`}
                />
              )}
            </SwiperSlide>
          ))}
      </Carousel>
    </BigContainer>
  );
}

export default memo(CastCarousel);

const BigContainer = styled.div<{ dom: any }>`
  border-radius: 15px;
  box-shadow: 5px 3px 20px black;
  margin-top: 10px;
  overflow: hidden;
  /* background: hsla(0, 0%, 100%, 0.2); */
  padding: 10px;
  position: relative;
  @media (min-width: 724px) {
    ${({ dom }) =>
      dom.length > 0
        ? css`
            background-color: rgba(${dom[0]}, ${dom[1]}, ${dom[2]}, 0.2);
          `
        : ""};
  }
`;

// const Title = styled.div`
//     z-index: -1;
//     display: flex;
//     justify-content: space-between;
//     font-weight: bold;
//     letter-spacing: 1.5px;
//     h2 {
//         font-size: 30px;
//         margin: 10px 0 10px 0;
//     }
//     p {
//         font-weight: 700;
//         cursor: pointer;
//         color: silver;
//         margin-top: 12px;
//         margin-right: 10px;
//         transition: color 1s, font-size 0.5s;

//         &:hover {
//             color: greenyellow;
//             font-size: 20px;
//             transition: all 1s, color 1s, font-size 0.5s;
//         }
//         @media (orientation: landscape) and (min-width: 600px) and (max-width: 896px) {
//             h2 {
//                 font-size: 15px;
//                 margin: 0;
//             }
//         }
//     }
//     @media (max-width: 724px) {
//         h2 {
//             font-size: 20px;
//             margin: 0;
//         }
//         p {
//             font-weight: 700;
//             font-size: 12px;
//             cursor: pointer;
//             margin-top: 5px;
//         }
//     }
// `;

// const Card = styled.div`
//   display: flex;
//   flex-direction: column;
//   border-radius: 4px;
//   margin: 0;
//   padding: 0;
//   overflow: hidden;
//   height: 100%;
//   width: 100%;

//   &:first-child {
//     margin-left: 0;
//   }

//   div {
//     flex: 2;
//     &:hover {
//       transform: none !important;
//     }
//   }
// `;

// const Detail = styled.div`
//   margin-top: 6px;
//   text-align: center;
//   font-weight: 500;
//   font-size: 20px;
//   text-align: center;
//   flex-shrink: 2;
//   div {
//     color: #a6a6a6;
//     font-size: 15px;
//     text-align: center;
//   }
//   @media (max-width: 724px) {
//     font-size: 15px;
//     div {
//       font-size: 11px;
//     }
//   }

/* &:hover {
    transform: scale(1.1);
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 3000ms;
  } */
