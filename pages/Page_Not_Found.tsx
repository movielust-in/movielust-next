import styled from "@emotion/styled";
import Link from "next/link";
import { Helmet } from "react-helmet";

function PageNotFound() {
  return (
    <Container>
      <Helmet>
        <title>404 | Page Not Found- Movielust</title>
      </Helmet>
      <Background>
        <div />
      </Background>

      <Childcontainer>
        <LeftSection>
          <Innercontent>
            <Heading>404</Heading>
            <Subheading>
              Looks like you are lost. <br /> Tap the bench and let&apos;s sit
              together.
              <br />
            </Subheading>
          </Innercontent>
        </LeftSection>
        <WalkContainer>
          <Walk />
        </WalkContainer>
        <Rightsection>
          <SVG
            xmlns="http://www.w3.org/2000/svg"
            viewBox="51.5 -15.288 385 505.565"
          >
            <Link to="/">
              <BenchLegs>
                <path
                  d="M202.778,391.666h11.111v98.611h-11.111V391.666z M370.833,390.277h11.111v100h-11.111V390.277z M183.333,456.944h11.111
          v33.333h-11.111V456.944z M393.056,456.944h11.111v33.333h-11.111V456.944z"
                />
              </BenchLegs>

              <TopBench>
                <path
                  d="M396.527,397.917c0,1.534-1.243,2.777-2.777,2.777H190.972c-1.534,0-2.778-1.243-2.778-2.777v-8.333
          c0-1.535,1.244-2.778,2.778-2.778H393.75c1.534,0,2.777,1.243,2.777,2.778V397.917z M400.694,414.583
          c0,1.534-1.243,2.778-2.777,2.778H188.194c-1.534,0-2.778-1.244-2.778-2.778v-8.333c0-1.534,1.244-2.777,2.778-2.777h209.723
          c1.534,0,2.777,1.243,2.777,2.777V414.583z M403.473,431.25c0,1.534-1.244,2.777-2.778,2.777H184.028
          c-1.534,0-2.778-1.243-2.778-2.777v-8.333c0-1.534,1.244-2.778,2.778-2.778h216.667c1.534,0,2.778,1.244,2.778,2.778V431.25z"
                />
              </TopBench>

              <BottomBench>
                <path
                  d="M417.361,459.027c0,0.769-1.244,1.39-2.778,1.39H170.139c-1.533,0-2.777-0.621-2.777-1.39v-4.86
          c0-0.769,1.244-0.694,2.777-0.694h244.444c1.534,0,2.778-0.074,2.778,0.694V459.027z"
                />
                <path d="M185.417,443.75H400c0,0,18.143,9.721,17.361,10.417l-250-0.696C167.303,451.65,185.417,443.75,185.417,443.75z" />
              </BottomBench>
            </Link>

            <Lamp>
              <LampDetails
                d="M125.694,421.997c0,1.257-0.73,3.697-1.633,3.697H113.44c-0.903,0-1.633-2.44-1.633-3.697V84.917
          c0-1.257,0.73-2.278,1.633-2.278h10.621c0.903,0,1.633,1.02,1.633,2.278V421.997z"
              />
              <Lampaccent
                d="M128.472,93.75c0,1.534-1.244,2.778-2.778,2.778h-13.889c-1.534,0-2.778-1.244-2.778-2.778V79.861
          c0-1.534,1.244-2.778,2.778-2.778h13.889c1.534,0,2.778,1.244,2.778,2.778V93.75z"
              />

              <LampLight cx="119.676" cy="44.22" r="40.51" />
              <LampDetails
                d="M149.306,71.528c0,3.242-13.37,13.889-29.861,13.889S89.583,75.232,89.583,71.528c0-4.166,13.369-13.889,29.861-13.889
          S149.306,67.362,149.306,71.528z"
              />
              <LightGradient
                id="SVGID_1_"
                cx="119.676"
                cy="44.22"
                r="65"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopOpacity="0" />
                <stop offset="50%" stopOpacity="0.5">
                  <animate
                    attributeName="stop-opacity"
                    values="0.0; 0.9; 0.0"
                    dur="4000ms"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="100%" stopOpacity="0" />
              </LightGradient>
              <Link to="/">
                <Glow fill="url(#SVGID_1_)" cx="119.676" cy="44.22" r="65" />
              </Link>
              <Lampbottom
                d="M135.417,487.781c0,1.378-1.244,2.496-2.778,2.496H106.25c-1.534,0-2.778-1.118-2.778-2.496v-74.869
          c0-1.378,1.244-2.495,2.778-2.495h26.389c1.534,0,2.778,1.117,2.778,2.495V487.781z"
              />
            </Lamp>
          </SVG>
        </Rightsection>
      </Childcontainer>
    </Container>
  );
}

export default PageNotFound;

const Container = styled.div`
  overflow: hidden;
  user-select: none;
`;

const Background = styled.div`
  background: linear-gradient(#0c0e10, #446182);
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  div {
    background: #0c0e10;
    bottom: 0;
    height: 25vh;
    position: absolute;
    width: 100%;
    @media (max-width: 724px) {
      /* height: 20vh; */
    }
  }
`;

const Childcontainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  justify-content: space-around;
  margin: 0 auto;
  padding-bottom: 25vh;
  position: relative;
  width: 85%;
  @media (max-width: 724px) {
    flex-direction: column;
    padding-bottom: 0vh;
  }
`;

const LeftSection = styled.div`
  position: relative;
  width: 40%;
  @media (max-width: 724px) {
    width: 100%;
    height: 40%;
    position: absolute;
    top: 0;
  }
`;
const Innercontent = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  @media (max-width: 724px) {
    position: relative;
    padding: 1rem 0;
  }
`;
const Heading = styled.h1`
  font-size: 9em;
  line-height: 1.3em;
  margin: 2rem 0 0.5rem 0;
  padding: 0;
  text-align: center;
  text-shadow: 0 0 1rem #fefefe;
  @media (max-width: 724px) {
    font-size: 7em;
    line-height: 1.15;
    margin: 0;
  }
`;
const Subheading = styled.div`
  font-family: "bariolregular", sans-serif;
  font-size: 1.2em;
  letter-spacing: 0.7px;
  line-height: 2rem;
  margin: 0 auto;
  max-width: 480px;
  padding: 0 1rem;
  text-align: center;
  p {
    font-size: 10px;
  }
  @media (max-width: 724px) {
    font-size: 1rem;
    line-height: 1.15;
    max-width: 100%;
    p {
      font-size: 8px;
    }
  }
`;

const Rightsection = styled.div`
  position: relative;
  width: 50%;
  @media (max-width: 724px) {
    height: 60%;
    position: absolute;
    bottom: 287px;
  }

  @media screen and (max-width: 600px) {
    height: 60%;
    position: absolute;
    bottom: 220px;
  }
  @media screen and (max-width: 768px) {
    /* bottom: 00px;         */
    position: absolute;
  }
  @media screen and (max-width: 844px) {
    position: absolute;
    bottom: 265px;
  }
  @media screen and (max-width: 900px) {
    bottom: 279px;
  }
  @media screen and (max-width: 1024px) {
    /* margin-top: 400px; */
  }
  @media screen and (max-width: 1200px) {
    /* margin-top: 300px; */
  }
`;

const Walk = styled.div`
  animation: walkanim 1s infinite steps(7);
  background-image: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/walk-sequence.svg");
  background-repeat: no-repeat;
  background-size: 800%;
  display: inline-block;
  height: 100%;
  left: 0;
  position: absolute;
  width: 100%;
  @keyframes walkanim {
    to {
      background-position: 100% 0;
    }
  }
  @media (max-width: 724px) {
    /* margin-top: 800px; */
  }
`;

const WalkContainer = styled.div`
  animation: stroll 20s linear infinite;
  display: inline-block;
  margin-top: 16em;
  overflow: hidden;
  position: relative;
  vertical-align: middle;
  width: 20%;
  @keyframes stroll {
    from {
      transform: translateX(-300%);
    }
    to {
      transform: translateX(350%);
    }
  }

  @media screen and (max-width: 600px) {
    margin-bottom: 150px;
  }
  @media screen and (max-width: 768px) {
    height: 10%;
    margin-top: 17em;
  }
  @media screen and (max-width: 844px) {
    margin-bottom: 53px;
  }
  @media screen and (max-width: 900px) {
    margin-bottom: 32px;
  }
  @media screen and (max-width: 1024px) {
    margin-top: 400px;
  }
  @media screen and (max-width: 1200px) {
    margin-top: 300px;
  }
`;
const SVG = styled.svg`
  bottom: 0;
  max-height: 100%;
  max-width: 100%;
  padding-left: 1vh;
  padding-top: 10vh;
  position: absolute;
  @media (max-width: 724px) {
    padding: 0;
  }
`;
// No need to change
const BenchLegs = styled.g`
  fill: #0c0e10;
`;
const TopBench = styled.g`
  fill: #5b3e2b;
  stroke: #0c0e10;
  stroke-width: 1px;
`;
const BottomBench = styled.g`
  fill: #5b3e2b;
  stroke: #0c0e10;
  stroke-width: 1px;
  path:nth-of-type(1) {
    /* stylelint-disable-next-line function-no-unknown */
    fill: darken(#5b3e2b, 7%);
  }
`;
const Lamp = styled.g``;

const LampDetails = styled.path`
  fill: #202425;
`;

const LightGradient = styled.radialGradient`
  stop {
    stop-color: #ededed;
  }
`;

const Lampaccent = styled.path`
  /* stylelint-disable-next-line function-no-unknown */
  fill: lighten(#202425, 5%);
`;

const LampLight = styled.circle`
  fill: #efefef;
`;

const Glow = styled.circle`
  cursor: pointer;

  @keyframes glow {
    0% {
      text-shadow: 0 0 1rem #fefefe;
    }
    50% {
      text-shadow: 0 0 1.5rem #fefefe;
    }
    100% {
      text-shadow: 0 0 1rem #fefefe;
    }
  }
`;
const Lampbottom = styled.path`
  fill: linear-gradient(#202425, #0c0e10);
`;
