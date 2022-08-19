/* eslint-disable no-console */
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { FaAngleDown } from "react-icons/fa";

import { useRouter } from "next/router";
import {
  BackArrow,
  PLayerContainer,
  VideoContainer,
  Title,
} from "./Player-Styled";
import Spinner from "../UI/Spinner";

import BackgroundImage from "../UI/BackgroundImage";
import { Magnet } from "../../types/apiResponses";

interface ShowPlayerProps {
  poster: string;
  playerMag: string;
  title: string;
  season: number;
  episode: string;
  magnets: Magnet[];
  episodemag: Magnet[];
}

function ShowPlayer({
  poster,
  playerMag,
  title,
  season,
  episode,
  magnets,
  episodemag,
}: ShowPlayerProps) {
  // console.log(episodemag)
  const [currMagnet, setMagnet] = useState(playerMag);
  const router = useRouter();

  const [showQualityOpt, setShowQualityOpt] = useState(false);
  const [qualityText, setQualityText] = useState("Select Quality");

  const hash = router.asPath.split("#")[1];

  useEffect(() => {
    const mag = router.query["m"] as string;
    if (mag !== null) {
      setMagnet(mag);
    }
    const quality = router.query["q"] as string;
    if (quality !== null) setQualityText(quality);
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
  }, [router, currMagnet]);

  return (
    <PLayerContainer>
      <BackgroundImage src={poster} />
      <BackArrow
        onClick={() =>
          router.push(router.pathname + hash.replace("player", ""))
        }
      />
      <VidContainer>
        <Video
          controls
          autoPlay
          preload="auto"
          poster={poster}
          data-title={`${title} Season ${season} Episode ${episode}`}
          src={currMagnet}
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
              {episodemag.map((currrMagnet) => (
                <li
                  key={currrMagnet.quality}
                  // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
                  role="button"
                  tabIndex={0}
                  onKeyDown={() => {
                    const win: Window = window;
                    win.location = `${router.pathname}?m=${currrMagnet.magnet}&q=${currrMagnet.quality}#player`;
                  }}
                  onClick={() => {
                    const win: Window = window;

                    win.location = `${router.pathname}?m=${currrMagnet.torrent}&q=${currrMagnet.quality}#player`;
                  }}
                >
                  {currrMagnet.quality}
                </li>
              ))}
            </SelectOptions>
          </Options>

          <Title>
            {title} Season {season} Episode {episode}
          </Title>
        </Info>
      </VidContainer>
    </PLayerContainer>
  );
}

export default ShowPlayer;

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
const Options = styled.div<{ show: boolean; n: number }>`
  height: ${(props) => (props.show ? `${35 * props.n}px` : 0)};
  transform: ${(props) => (props.show ? "scaleY(1)" : "scaleY(0)")};
  transition: all 0.2s ease;
  width: 150px;
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
