/* eslint-disable @next/next/no-img-element */
import { MouseEventHandler, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { FaAngleDown } from "react-icons/fa";
import { useRouter } from "next/router";
import StarRatings from "react-star-ratings";

import Spinner from "../UI/Spinner";

import { fetchSimilar } from "../../helpers/tmdb";
import { Magnet } from "../../types/apiResponses";
import {
  VideoContainer,
  BackArrow,
  PLayerContainer,
  Title,
} from "./Player-Styled";
import { ImdbRating } from "../Details/DetailTypes";

interface PlayerModalProps {
  title: string;
  magnet: string;
  poster: string;
  onClose: MouseEventHandler;
  magnets: Magnet[];
  genres: any;
  collection: any;
  rating: ImdbRating;
}

function PlayerModal({
  title,
  magnet,
  poster,
  onClose,
  magnets,
  genres,
  collection,
  rating,
}: PlayerModalProps) {
  const router = useRouter();
  const [id, setId] = useState<string>();
  const [type, setType] = useState<string>();
  const [qualityText, setQualityText] = useState("Select Quality");
  const [currManget, setMagnet] = useState(magnet);
  const [showQualityOpt, setShowQualityOpt] = useState(false);
  const [similar, setSimilar] = useState<any[]>([]);

  useEffect(() => {
    const paramMag = router.query["m"] as string;
    if (paramMag !== null) setMagnet(paramMag);
    const quality = router.query["q"] as string;
    if (quality !== null) setQualityText(quality);
    const url = router.pathname.split("/");
    setId(url[2]);
    setType(url[1]);
  }, [router]);

  useEffect(() => {
    const webtorScript = document.createElement("script");
    webtorScript.src =
      "https://cdn.jsdelivr.net/npm/@webtor/embed-sdk-js/dist/index.min.js";
    webtorScript.async = true;
    document.body.append(webtorScript);
    return () => {
      document.body.removeChild(webtorScript);
    };
  }, [router.pathname, title, magnet, currManget]);

  useEffect(() => {
    if (id && type) {
      fetchSimilar(id, type, genres).then((res) => {
        if (collection && collection.length > 0) {
          setSimilar([...collection, ...res]);
        } else {
          setSimilar(res);
        }
      });
    }
  }, [id, type, genres, collection]);

  return (
    <PLayerContainer>
      <Background>
        <img src={poster} alt="poster" />
      </Background>
      <Box onClick={onClose}>
        <BackArrow />
      </Box>

      <VidContainer>
        <Video
          controls
          autoPlay
          preload="auto"
          poster={poster}
          data-title={title}
          src={currManget}
          width="100%"
        />
        <Spinner width={100} />
        <Info>
          <Select
            role="presentation"
            onClick={() => setShowQualityOpt((state) => !state)}
          >
            {qualityText}
            <AngleDownIcon open={showQualityOpt} />
          </Select>
          <Options show={showQualityOpt} n={magnets.length}>
            <SelectOptions show={showQualityOpt}>
              {magnets.map((currMagnet) => (
                <li
                  key={currMagnet.quality}
                  // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
                  role="button"
                  tabIndex={0}
                  onKeyDown={() => {
                    const win: Window = window;
                    win.location = "https://github.com/";
                    win.location = `${router.pathname}?m=${currMagnet.magnet}&q=${currMagnet.quality}#player`;
                  }}
                  onClick={() => {
                    const win: Window = window;
                    win.location = "https://github.com/";
                    win.location = `${router.pathname}?m=${currMagnet.magnet}&q=${currMagnet.quality}#player`;
                  }}
                >
                  {currMagnet.quality}
                </li>
              ))}
            </SelectOptions>
          </Options>
          <Title>{title}</Title>
          {rating ? (
            <h5>
              <StarRatings
                rating={rating.rating}
                numberOfStars={10}
                starRatedColor="gold"
                starEmptyColor="gray"
                starDimension="15px"
              />
              &nbsp;&nbsp;&nbsp;
              {rating.rating} / 10
            </h5>
          ) : null}
        </Info>
      </VidContainer>
      <SideBar>
        <h2>Watch Recommendations</h2>
        {similar
          .filter((movie) => new Date(movie.release_date) < new Date())
          .map((movie) => (
            <SideMovie key={movie.title}>
              <img
                src={`https://image.tmdb.org/t/p/w154/${movie.poster_path}`}
                alt={movie.title}
              />
              <div key={movie.id}>
                <h4>
                  {movie.title} ({movie.release_date.split("-")[0]})
                </h4>
                <h5>
                  Rating:
                  {movie.vote_average}
                </h5>
                <View
                  role="presentation"
                  onClick={() => router.push(`/movie/${movie.id}`)}
                >
                  View
                </View>
              </div>
            </SideMovie>
          ))}
      </SideBar>
    </PLayerContainer>
  );
}

export default PlayerModal;

const Background = styled.div`
  bottom: 0;
  left: 0;
  opacity: 0.5;
  position: fixed;
  right: 0;
  top: 7vh;
  z-index: -1;
  img {
    height: 100%;
    object-fit: cover;
    width: 100%;
  }
`;

const Box = styled.button`
  display: flex;
  flex-direction: column;
  border: none;
  background: transparent;
`;

const VidContainer = styled(VideoContainer)`
  margin-top: 55px;
  position: relative;
  @media (max-width: 724px) {
    min-height: 55vh;
    margin-top: 10px;
    padding: 5px;
  }
`;

const Video = styled.video`
  position: relative;
  min-height: 300px;
  @media (max-width: 724px) {
    min-height: 50px;
  }
`;

const Info = styled.div`
  margin-top: 280px;
  @media (max-width: 724px) {
    margin-top: 50px;
  }
`;

const Options = styled.div<{ show: boolean; n: number }>`
  height: ${(props) => (props.show ? `${35 * props.n}px` : 0)};
  transform: ${(props) => (props.show ? "scaleY(1)" : "scaleY(0)")};
  transition: all 0.2s ease;
  width: 150px;
`;

const Select = styled.div`
  border: 1px solid silver;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  justify-content: space-around;
  margin: 15px 0 0px 0;
  padding: 10px;
  width: 150px;
`;

const AngleDownIcon = styled(FaAngleDown)<{ open: boolean }>`
  transform: ${(props) => (props.open ? "rotate(180deg)" : "rotate(0deg)")};
  transition: all 200ms ease;
`;

const SelectOptions = styled.ul<{ show: boolean }>`
  border: 1px solid silver;
  border-radius: 8px;
  list-style: none;
  padding: 0;
  text-align: center;
  li {
    border-bottom: 1px solid silver;
    cursor: pointer;
    padding: 5px;
    &:last-child {
      border-bottom: none;
    }
  }
`;

const SideBar = styled.div`
  background-color: #090c14;
  background-image: linear-gradient(
    315deg,
    rgba(9, 12, 20, 1) 0%,
    rgba(3, 29, 48, 1) 79%
  );
  height: 100vh;
  overflow-y: auto;
  position: fixed;
  right: 0;
  top: 7vh;
  width: 30vw;
  h2 {
    font-weight: 600;
    margin: 12px;
  }
  @media (max-width: 724px) {
    position: relative;
    overflow-y: visible;
    height: auto;
    width: 100vw;
    top: auto;
    padding-bottom: 70px;
  }
`;

const SideMovie = styled.div`
  border: 1px solid silver;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  margin: 10px;
  img {
    border-radius: 8px 0 0 8px;
    margin-right: 10px;
    width: 100px;
  }
`;

const View = styled.div`
  background-color: #090c14;
  background-image: linear-gradient(
    315deg,
    rgba(9, 12, 20, 1) 0%,
    rgba(3, 29, 48, 1) 79%
  );
  border: 1px solid silver;
  border-radius: 4px;
  cursor: pointer;
  margin: 10px;
  text-align: center;
  width: 50px;
`;
