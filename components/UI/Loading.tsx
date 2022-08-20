import { useState, useEffect } from "react";
import styled from "@emotion/styled";

import { LoadingGhost } from "../../assets";
import Image from "next/image";

interface LoadingProps {
  delay?: number;
}

Loading.defaultProps = {
  delay: 250,
};

function Loading({ delay }: LoadingProps) {
  const [message, setMessage] = useState("Coming Up...");

  const [show, setShow] = useState(false);

  let interval: any;

  const timer = () => {
    let count = 1;
    interval = setInterval(() => {
      count += 1;
      switch (count) {
        case 5:
          setMessage("Almost there......");
          break;
        case 10:
          setMessage("It's taking time please wait...");
          break;
        case 30:
          setMessage("Sometimes it's better to let go... :(");
          break;
        default:
          break;
      }
    }, 1000);
  };

  useEffect(() => {
    timer();
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true);
    }, delay);
    return () => {
      clearTimeout(timeout);
    };
  }, [delay]);

  return show ? (
    <Container>
      <Image src={LoadingGhost} alt="loading" />
      <p>{message}</p>
    </Container>
  ) : null;
}

export default Loading;

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  font-family: "bariolregular", sans-serif;
  height: 100vh;
  width: 100vw;
  background-color: rgba(9, 12, 20, 0.4);
  justify-content: center;
  left: 0;
  opacity: 1;
  position: fixed;
  overflow: hidden;
  top: 0;
  user-select: none;
  z-index: 100000000;

  img {
    filter: drop-shadow(0 0 50px #bbdefb);
  }
`;
