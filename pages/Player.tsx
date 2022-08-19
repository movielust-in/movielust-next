import { useEffect } from "react";
import styled from "@emotion/styled";
import "../index.css";

function Player() {
  useEffect(() => {
    const webtorScript = document.createElement("script");
    webtorScript.src =
      "https://cdn.jsdelivr.net/npm/@webtor/embed-sdk-js/dist/index.min.js";
    webtorScript.async = true;
    document.body.append(webtorScript);

    //   webtorScript.onload(() => {

    // });

    return () => {
      document.body.removeChild(webtorScript);
    };
  }, []);

  return (
    <Container>
      <VideoPlayer
        controls
        src="magnet:?xt=urn:btih:4047212F26107915E430F8BAAAC6EAB4BCF00EE8&dn=The+Matrix+Resurrections+%282021%29+%5B720p%5D+%5BYTS.MX%5D&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2710%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.ch%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.cyberia.is%3A6969%2Fannounce&tr=http%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannouncel̥"
        poster="https://image.tmdb.org/t/p/w1280/hv7o3VgfsairBoQFAawgaQ4cR1m.jpg"
        data-title="The Matrix Resurrections"
      />
    </Container>
  );
}

export default Player;

const Container = styled.div`
  margin-top: 60px;
`;

const VideoPlayer = styled.video``;
